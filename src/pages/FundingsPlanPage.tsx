import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import {
    BadgeIndianRupee,
    FileText,
    Mail,
    Layers3,
    Search,
    Filter,
    ArrowUpDown,
    LayoutGrid,
    Rows3,
    Loader2,
    RefreshCw,
    BarChart3,
    TrendingUp,
    Database,
} from "lucide-react";
import { toast } from "sonner";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    CartesianGrid,
} from "recharts";

type Funding = {
    id: number;
    s_no?: number;
    title: string;
    submission_type: string;
    description: string | null;
    budget_amount: number | null;
    contact_email: string | null;
    created_at?: string | null;
};

const CHART_COLORS = [
    "#00629b",
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#14b8a6",
    "#f97316",
];

const cardContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const cardItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const formatCurrency = (value: number | null | undefined) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatDate = (value?: string | null) => {
    if (!value) return "N/A";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const getYearFromFunding = (item: Funding) => {
    if (item.created_at) {
        const d = new Date(item.created_at);
        if (!Number.isNaN(d.getTime())) return String(d.getFullYear());
    }

    const text = `${item.title} ${item.description || ""}`;
    const match = text.match(/\b(19|20)\d{2}\b/);
    return match ? match[0] : "Unknown";
};

const FundingsPage = () => {
    const [fundings, setFundings] = useState<Funding[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [sortBy, setSortBy] = useState<"latest" | "highest" | "lowest">("latest");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchFundings();
    }, []);

    const fetchFundings = async () => {
        setLoading(true);
        setErrorMessage("");

        const { data, error } = await supabase
            .from("funding_submissions")
            .select("*")
            .order("created_at", { ascending: false });

        console.log("funding_submissions data:", data);
        console.log("funding_submissions error:", error);

        if (error) {
            console.error(error);
            setErrorMessage(error.message || "Failed to load funding records.");
            toast.error("Failed to load funding records.");
            setFundings([]);
        } else {
            setFundings((data as Funding[]) || []);
            toast.success("Funding records loaded");
        }

        setLoading(false);
    };

    const submissionTypes = useMemo(() => {
        const types = new Set(
            fundings.map((f) => f.submission_type).filter((v): v is string => Boolean(v))
        );
        return ["All", ...Array.from(types).sort()];
    }, [fundings]);

    const years = useMemo(() => {
        const values = Array.from(new Set(fundings.map((f) => getYearFromFunding(f))))
            .filter((y) => y !== "Unknown")
            .sort((a, b) => Number(b) - Number(a));
        return ["All", ...values];
    }, [fundings]);

    const filteredFundings = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        const result = fundings.filter((f) => {
            const matchesSearch =
                !term ||
                f.title?.toLowerCase().includes(term) ||
                f.submission_type?.toLowerCase().includes(term) ||
                (f.description || "").toLowerCase().includes(term) ||
                (f.contact_email || "").toLowerCase().includes(term);

            const matchesType =
                selectedType === "All" || f.submission_type === selectedType;

            const matchesYear =
                selectedYear === "All" || getYearFromFunding(f) === selectedYear;

            return matchesSearch && matchesType && matchesYear;
        });

        result.sort((a, b) => {
            if (sortBy === "highest") return (b.budget_amount || 0) - (a.budget_amount || 0);
            if (sortBy === "lowest") return (a.budget_amount || 0) - (b.budget_amount || 0);

            const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
            const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
            return bTime - aTime;
        });

        return result;
    }, [fundings, searchTerm, selectedType, selectedYear, sortBy]);

    const totalFilteredAmount = useMemo(
        () => filteredFundings.reduce((sum, f) => sum + Number(f.budget_amount || 0), 0),
        [filteredFundings]
    );

    const highestFunding = useMemo(
        () =>
            filteredFundings.reduce((max, curr) => {
                return Number(curr.budget_amount || 0) > Number(max?.budget_amount || 0)
                    ? curr
                    : max;
            }, filteredFundings[0]),
        [filteredFundings]
    );

    const chartByType = useMemo(() => {
        const grouped = filteredFundings.reduce<Record<string, number>>((acc, item) => {
            const key = item.submission_type || "Other";
            acc[key] = (acc[key] || 0) + Number(item.budget_amount || 0);
            return acc;
        }, {});

        return Object.entries(grouped).map(([name, amount]) => ({
            name,
            amount,
        }));
    }, [filteredFundings]);

    const chartByYear = useMemo(() => {
        const grouped = filteredFundings.reduce<Record<string, number>>((acc, item) => {
            const key = getYearFromFunding(item);
            acc[key] = (acc[key] || 0) + Number(item.budget_amount || 0);
            return acc;
        }, {});

        return Object.entries(grouped)
            .filter(([year]) => year !== "Unknown")
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .map(([year, amount]) => ({
                year,
                amount,
            }));
    }, [filteredFundings]);

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedType("All");
        setSelectedYear("All");
        setSortBy("latest");
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <Navbar />

            <section className="relative overflow-hidden bg-gradient-to-b from-[#002a4d] to-[#004f7d] text-white pt-32 pb-32">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-blue-100 text-xs font-bold uppercase tracking-widest mb-6 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-md"
                    >
                        <Layers3 size={16} className="text-cyan-300" />
                        IEEE SREC Finance Hub
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200"
                    >
                        Funding Records
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed font-medium"
                    >
                        Search, filter, analyze, and track funding records, rebates,
                        sponsorships, and budget allocations from the student branch.
                    </motion.p>
                </div>
                
                <div className="absolute bottom-[-2px] left-0 right-0 overflow-hidden">
                    <svg viewBox="0 0 1440 120" className="w-full h-auto text-slate-50 fill-current block" preserveAspectRatio="none">
                        <path d="M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z"></path>
                    </svg>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        whileHover={{ y: -5 }}
                        className="group relative bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-lg shadow-slate-200/20 p-6 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative flex items-start justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Records</p>
                                <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                                    {filteredFundings.length}
                                </h3>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-[#00629b] flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:rotate-3 transition-all">
                                <Database size={26} strokeWidth={2.5} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group relative bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-lg shadow-slate-200/20 p-6 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative flex items-start justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Visible Total</p>
                                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#00629b] to-cyan-500 tracking-tight">
                                    {formatCurrency(totalFilteredAmount)}
                                </h3>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-rotate-3 transition-all shrink-0 ml-4">
                                <BadgeIndianRupee size={26} strokeWidth={2.5} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        whileHover={{ y: -5 }}
                        className="group relative bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-lg shadow-slate-200/20 p-6 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative flex items-start justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Categories</p>
                                <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                                    {submissionTypes.length - 1}
                                </h3>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:rotate-3 transition-all">
                                <Filter size={26} strokeWidth={2.5} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ y: -5 }}
                        className="group relative bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-lg shadow-slate-200/20 p-6 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative flex items-start justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Highest Record</p>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight line-clamp-2 mt-1">
                                    {highestFunding ? formatCurrency(highestFunding.budget_amount) : "₹0"}
                                </h3>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-rotate-3 transition-all shrink-0 ml-4">
                                <BarChart3 size={26} strokeWidth={2.5} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm mb-10 flex flex-col xl:flex-row gap-5 xl:items-center justify-between">
                    <div className="relative flex-1 max-w-xl">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search records by title, type, description, or email..."
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#00629b]/20 focus:border-[#00629b] transition text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative shrink-0">
                            <Filter
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00629b]"
                                size={16}
                            />
                            <select
                                aria-label="Filter by Category"
                                className="pl-10 pr-8 py-3 bg-blue-50 text-[#00629b] border border-blue-100 rounded-xl outline-none focus:ring-2 focus:ring-[#00629b]/20 text-sm font-bold appearance-none cursor-pointer"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                {submissionTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type === "All" ? "All Categories" : type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <select
                            aria-label="Filter by Year"
                            className="px-4 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-[#00629b]/20 text-sm font-bold appearance-none cursor-pointer"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year === "All" ? "All Years" : year}
                                </option>
                            ))}
                        </select>

                        <div className="relative shrink-0">
                            <ArrowUpDown
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                size={16}
                            />
                            <select
                                aria-label="Sort by"
                                className="pl-10 pr-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-[#00629b]/20 text-sm font-bold appearance-none cursor-pointer"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as "latest" | "highest" | "lowest")}
                            >
                                <option value="latest">Newest First</option>
                                <option value="highest">Highest Amount</option>
                                <option value="lowest">Lowest Amount</option>
                            </select>
                        </div>

                        <button
                            onClick={resetFilters}
                            className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition"
                        >
                            Reset
                        </button>

                        <button
                            onClick={fetchFundings}
                            className="px-4 py-3 bg-[#00629b] text-white rounded-xl font-bold text-sm hover:bg-[#004f7d] transition inline-flex items-center gap-2"
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </button>

                        <div className="w-px h-8 bg-slate-200 hidden md:block mx-1"></div>

                        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                            <button
                                aria-label="Grid view"
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition ${viewMode === "grid"
                                        ? "bg-white shadow-sm text-[#00629b]"
                                        : "text-slate-400 hover:text-slate-700"
                                    }`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                aria-label="List view"
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-lg transition ${viewMode === "list"
                                        ? "bg-white shadow-sm text-[#00629b]"
                                        : "text-slate-400 hover:text-slate-700"
                                    }`}
                            >
                                <Rows3 size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#00629b] flex items-center justify-center border border-blue-100">
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Funding</h3>
                                <p className="text-sm font-medium text-slate-500">
                                    Total amount grouped by submission type
                                </p>
                            </div>
                        </div>

                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartByType}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }} />
                                    <Tooltip 
                                        cursor={{ fill: "#f1f5f9" }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                                        formatter={(value: number) => formatCurrency(value)} 
                                    />
                                    <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={40}>
                                        {chartByType.map((_, index) => (
                                            <Cell
                                                key={`bar-${index}`}
                                                fill={CHART_COLORS[index % CHART_COLORS.length]}
                                                className="hover:opacity-80 transition-opacity cursor-pointer"
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Funding by Year</h3>
                                <p className="text-sm font-medium text-slate-500">
                                    Historical budget amount trend
                                </p>
                            </div>
                        </div>

                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartByYear} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                                        formatter={(value: number) => formatCurrency(value)} 
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="amount" 
                                        stroke="#0ea5e9" 
                                        strokeWidth={4}
                                        dot={{ fill: "#00629b", r: 6, strokeWidth: 2, stroke: "#fff" }}
                                        activeDot={{ r: 8, strokeWidth: 0, fill: "#00629b" }}
                                        animationDuration={1500}
                                        animationEasing="ease-out"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>



                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                    <p className="text-slate-500 font-medium tracking-wide">
                        Showing <span className="font-bold text-slate-900">{filteredFundings.length}</span> records
                    </p>
                    <div className="inline-flex items-center gap-3 bg-[#00629b] text-white px-4 py-2 rounded-xl shadow-md">
                        <span className="text-xs uppercase tracking-wider font-semibold opacity-80">
                            Visible Total
                        </span>
                        <span className="text-xl font-black tracking-tight">
                            {formatCurrency(totalFilteredAmount)}
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className="py-24 flex flex-col items-center">
                        <Loader2 className="w-12 h-12 animate-spin text-[#00629b]/50 mb-4" />
                        <p className="text-slate-500 font-medium tracking-wide animate-pulse">
                            Loading Funding Database...
                        </p>
                    </div>
                ) : errorMessage ? (
                    <div className="bg-white rounded-3xl border border-red-200 py-16 text-center px-4">
                        <FileText size={48} className="mx-auto text-red-300 mb-4" />
                        <h3 className="text-xl font-bold text-red-700 mb-2">
                            Unable to load records
                        </h3>
                        <p className="text-red-500 max-w-lg mx-auto">{errorMessage}</p>
                        <button
                            onClick={fetchFundings}
                            className="mt-6 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : filteredFundings.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-slate-300 py-24 text-center px-4">
                        <FileText size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No Records Found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            Try adjusting your search or filters.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="mt-6 px-6 py-2.5 bg-blue-50 text-[#00629b] font-bold rounded-xl hover:bg-[#00629b] hover:text-white transition-colors"
                        >
                            Reset All Filters
                        </button>
                    </div>
                ) : (
                    <motion.div
                        variants={cardContainer}
                        initial="hidden"
                        animate="visible"
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "flex flex-col gap-4"
                        }
                    >
                        <AnimatePresence>
                            {filteredFundings.map((fund) => (
                                <motion.div
                                    key={fund.id}
                                    variants={cardItem}
                                    layout
                                    className={`group relative bg-white rounded-3xl border border-slate-200/80 hover:border-[#00629b]/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden ${viewMode === "list" ? "flex flex-col md:flex-row" : "flex flex-col"
                                        }`}
                                >
                                    {/* Top decorative gradient line on hover */}
                                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00629b] to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${viewMode === "list" ? "md:bottom-0 md:top-0 md:left-0 md:w-1.5 md:h-full" : ""}`} />

                                    <div
                                        className={`bg-slate-50/50 relative overflow-hidden group-hover:bg-[#f8fafc] transition-colors duration-500 border-b border-slate-100 p-7 ${viewMode === "list"
                                                ? "w-full md:w-1/3 min-w-[300px] border-b-0 border-r md:flex md:flex-col md:justify-center"
                                                : ""
                                            }`}
                                    >
                                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-100/50 rounded-full blur-[20px] group-hover:bg-blue-200/50 transition-colors" />

                                        <div className="relative flex items-start justify-between gap-4 mb-5">
                                            <span className="inline-flex items-center rounded-lg bg-white shadow-sm text-[#00629b] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                                                {fund.submission_type}
                                            </span>
                                            {fund.s_no && (
                                                <span className="text-slate-400 font-black text-sm">#{fund.s_no}</span>
                                            )}
                                        </div>

                                        <h2 className="relative text-xl font-black text-slate-800 leading-snug line-clamp-3 group-hover:text-[#00629b] transition-colors mb-5">
                                            {fund.title}
                                        </h2>

                                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">
                                            Added on {formatDate(fund.created_at)}
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                                                Amount
                                            </p>
                                            <h3 className="text-2xl font-black text-[#00629b]">
                                                {formatCurrency(fund.budget_amount)}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col justify-center">
                                        <div className="space-y-5">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                                        Description
                                                    </p>
                                                    <p className="text-slate-600 text-sm leading-relaxed">
                                                        {fund.description || "Detailed description unavailable."}
                                                    </p>
                                                </div>
                                            </div>

                                            {fund.contact_email && (
                                                <div className="flex gap-4">
                                                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                                        <Mail size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                                            Point of Contact
                                                        </p>
                                                        <p className="text-slate-700 text-sm font-semibold">
                                                            {fund.contact_email}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default FundingsPage;