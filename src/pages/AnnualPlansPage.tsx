import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  CalendarDays,
  Search,
  RefreshCw,
  Table2,
  LayoutList,
  Grid3X3,
  ChevronRight,
  FolderOpen,
  Clock3,
  CheckCircle2,
  Activity,
  Star,
  Download,
  ArrowUpDown,
} from "lucide-react";

type AnnualPlan = {
  id: number;
  s_no: number;
  event: string;
  sub_event: string | null;
  schedule: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } as any
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 } as any
  },
};

const AnnualPlansPage = () => {
  const [plans, setPlans] = useState<AnnualPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [viewMode, setViewMode] = useState<"table" | "timeline" | "cards">("table");
  const [sortBy, setSortBy] = useState<"s_no" | "event" | "schedule">("s_no");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("annual_plan")
      .select("id, s_no, event, sub_event, schedule")
      .order("s_no", { ascending: true });

    if (error) {
      toast.error("Failed to load annual plans");
      console.error(error);
    } else {
      setPlans((data as AnnualPlan[]) || []);
      setLastUpdated(new Date());
    }
    setLoading(false);
  };

  const months = useMemo(() => {
    const unique = Array.from(new Set(plans.map((item) => item.schedule)));
    return ["All", ...unique.sort()];
  }, [plans]);

  const filteredAndSortedPlans = useMemo(() => {
    const result = plans.filter((plan) => {
      const term = search.toLowerCase();
      return (
        (!term ||
          plan.event.toLowerCase().includes(term) ||
          (plan.sub_event || "").toLowerCase().includes(term) ||
          plan.schedule.toLowerCase().includes(term)) &&
        (selectedMonth === "All" || plan.schedule === selectedMonth)
      );
    });

    result.sort((a, b) => {
      if (sortBy === "s_no") return a.s_no - b.s_no;
      if (sortBy === "event") return a.event.localeCompare(b.event);
      return a.schedule.localeCompare(b.schedule);
    });

    return result;
  }, [plans, search, selectedMonth, sortBy]);

  const totalPlans = plans.length;
  const recurringCount = plans.filter((p) => p.schedule === "Every Month").length;
  const monthCount = new Set(
    plans.filter((p) => p.schedule !== "Every Month").map((p) => p.schedule)
  ).size;

  const highlightedPlan = filteredAndSortedPlans[0];

  const exportToCSV = () => {
    if (filteredAndSortedPlans.length === 0) return toast.error("No data to export");

    const csvRows = [
      ["S.No", "Event", "Sub Event", "Schedule"],
      ...filteredAndSortedPlans.map(p => [
        p.s_no.toString(),
        p.event,
        p.sub_event || "",
        p.schedule
      ])
    ];

    const csvContent = csvRows.map(row => row.map(field => `"${field}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `IEEE_SREC_Annual_Plans_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success("Downloaded successfully");
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      {/* Catchy & Smooth Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2a5e] via-[#1e40af] to-[#3b82f6] py-24 text-white">
        {/* Soft floating accents */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 right-24 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/10 border border-white/30 backdrop-blur text-sm font-medium">
              <Star className="text-amber-300" size={18} />
              IEEE SREC STUDENT BRANCH
            </div>

            <h1 className="mt-8 text-6xl md:text-7xl font-bold tracking-tighter leading-none">
              Annual Activity <span className="text-blue-200">Roadmap</span>
            </h1>

            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Discover the complete official schedule of events, workshops, and initiatives for the academic year
            </p>
          </div>

          {/* Stats - More Catchy */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Events", value: totalPlans, icon: FolderOpen },
              { label: "Months Covered", value: monthCount, icon: CalendarDays },
              { label: "Recurring Events", value: recurringCount, icon: Clock3 },
              { label: "Showing Now", value: filteredAndSortedPlans.length, icon: CheckCircle2, highlight: true },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03, y: -6 }}
                className={`rounded-3xl p-8 flex flex-col justify-between h-full transition-all ${
                  s.highlight 
                    ? "bg-white text-[#0a2a5e] shadow-2xl" 
                    : "bg-white/10 backdrop-blur-xl border border-white/20"
                }`}
              >
                <div>
                  <p className={`text-sm ${s.highlight ? "text-slate-500" : "text-blue-200"}`}>{s.label}</p>
                  <p className="text-5xl font-bold mt-4 tracking-tighter">{s.value}</p>
                </div>
                <s.icon className={`mt-8 w-9 h-9 ${s.highlight ? "text-blue-600" : "text-white"}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 md:px-8 -mt-10 pb-20 relative z-10">
        {/* Enhanced Control Bar */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-12">
          <div className="flex flex-col xl:flex-row gap-6 items-end">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, sub-events..."
                className="w-full pl-14 py-4 bg-zinc-50 border border-slate-200 rounded-2xl focus:border-[#0a2a5e] focus:ring-4 focus:ring-blue-100 outline-none text-base"
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={fetchPlans}
                className="flex items-center gap-3 px-8 py-4 bg-[#0a2a5e] hover:bg-[#08244d] text-white rounded-2xl font-medium transition-all active:scale-95"
              >
                <RefreshCw size={20} /> Refresh
              </button>

              <button
                onClick={exportToCSV}
                className="flex items-center gap-3 px-8 py-4 border border-slate-300 hover:bg-slate-50 rounded-2xl font-medium transition-all"
              >
                <Download size={20} /> Export CSV
              </button>

              {/* Segmented View Toggle - Catchier */}
              <div className="flex bg-slate-100 rounded-2xl p-1">
                {[
                  { mode: "table", icon: Table2, label: "Table" },
                  { mode: "timeline", icon: LayoutList, label: "Timeline" },
                  { mode: "cards", icon: Grid3X3, label: "Cards" },
                ].map(({ mode, icon: Icon }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as "table" | "timeline" | "cards")}
                    className={`px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all ${
                      viewMode === mode 
                        ? "bg-white shadow text-[#0a2a5e]" 
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    <Icon size={19} />
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3 bg-slate-100 rounded-2xl px-5 py-3">
                <ArrowUpDown size={19} className="text-slate-400" />
                <select
                  aria-label="Sort by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "s_no" | "event" | "schedule")}
                  className="bg-transparent font-medium outline-none text-slate-700"
                >
                  <option value="s_no">S.No</option>
                  <option value="event">Event</option>
                  <option value="schedule">Schedule</option>
                </select>
              </div>
            </div>
          </div>

          {/* Month Filters */}
          <div className="mt-8 flex flex-wrap gap-3">
            {months.map((month) => (
              <motion.button
                key={month}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedMonth(month)}
                className={`px-7 py-3 rounded-2xl text-sm font-medium transition-all ${
                  selectedMonth === month
                    ? "bg-[#0a2a5e] text-white shadow-md"
                    : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                {month}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Highlighted + Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 bg-white rounded-3xl p-10 border border-slate-100 shadow"
          >
            <div className="uppercase text-xs tracking-widest font-semibold text-blue-600 mb-4">HIGHLIGHT OF THE YEAR</div>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">
              {highlightedPlan ? highlightedPlan.event : "No highlighted plan"}
            </h2>
            {highlightedPlan?.sub_event && (
              <p className="mt-5 text-xl text-slate-600">{highlightedPlan.sub_event}</p>
            )}
            {highlightedPlan && (
              <div className="mt-8 flex gap-5">
                <div className="bg-slate-100 px-8 py-4 rounded-2xl font-mono text-lg">S.No {highlightedPlan.s_no}</div>
                <div className="bg-blue-50 text-[#0a2a5e] px-8 py-4 rounded-2xl font-semibold text-lg">
                  {highlightedPlan.schedule}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 bg-white rounded-3xl p-10 border border-slate-100 shadow"
          >
            <div className="uppercase text-xs tracking-widest font-semibold text-slate-500 mb-6">STATUS</div>
            <div className="space-y-7">
              <div className="flex gap-5">
                <CheckCircle2 className="text-emerald-600 mt-1" size={28} />
                <div className="space-y-1">
                  <p className="font-semibold">Connected Live</p>
                  <p className="text-sm text-slate-600">Supabase • Real-time data</p>
                </div>
              </div>
              <div className="flex gap-5">
                <Activity className="text-blue-600 mt-1" size={28} />
                <div className="space-y-1">
                  <p className="font-semibold">Filters Active</p>
                  <p className="text-sm text-slate-600">Search • Sort • Month filter</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Explorer */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          <div className="px-10 py-7 border-b bg-slate-50 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Star className="text-amber-500" size={32} />
              <h2 className="text-3xl font-bold text-slate-900">Event Explorer</h2>
            </div>
            <p className="text-slate-600">
              {filteredAndSortedPlans.length} of {totalPlans} events
            </p>
          </div>

          {loading ? (
            <div className="py-24 flex flex-col items-center">
              <div className="w-9 h-9 border-4 border-slate-200 border-t-[#0a2a5e] rounded-full animate-spin" />
              <p className="mt-6 text-slate-500">Loading the roadmap...</p>
            </div>
          ) : filteredAndSortedPlans.length === 0 ? (
            <div className="py-24 text-center">
              <Search size={64} className="mx-auto text-slate-300" />
              <p className="mt-6 text-2xl font-medium">No events match your filter</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* Table View */}
              {viewMode === "table" && (
                <motion.div
                  key="table"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="overflow-x-auto"
                >
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b">
                        <th className="px-10 py-6 text-left font-semibold text-slate-600">S.No</th>
                        <th className="px-10 py-6 text-left font-semibold text-slate-600">Event</th>
                        <th className="px-10 py-6 text-left font-semibold text-slate-600">Schedule</th>
                      </tr>
                    </thead>
                    <motion.tbody variants={stagger} initial="hidden" animate="visible">
                      {filteredAndSortedPlans.map((plan, idx) => (
                        <motion.tr
                          key={plan.id}
                          variants={fadeUp}
                          whileHover={{ backgroundColor: "#f8fafc" }}
                          className="border-b hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-10 py-7">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-xl font-bold text-[#0a2a5e]">
                              {plan.s_no}
                            </div>
                          </td>
                          <td className="px-10 py-7">
                            <div className="font-semibold text-lg">{plan.event}</div>
                            {plan.sub_event && (
                              <div className="mt-2 text-slate-600 flex items-center gap-2">
                                <ChevronRight size={18} /> {plan.sub_event}
                              </div>
                            )}
                          </td>
                          <td className="px-10 py-7">
                            <span className="bg-blue-100 text-blue-700 px-7 py-3 rounded-2xl text-sm font-medium">
                              {plan.schedule}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </motion.tbody>
                  </table>
                </motion.div>
              )}

              {/* Timeline & Cards - Similar smooth styling */}
              {viewMode === "timeline" && (
                <div className="p-10 space-y-8">
                  {filteredAndSortedPlans.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="flex gap-8"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0a2a5e] to-blue-600 text-white rounded-3xl flex items-center justify-center text-3xl font-bold shadow-md">
                        {plan.s_no}
                      </div>
                      <div className="flex-1 bg-white border border-slate-100 rounded-3xl p-8">
                        <h3 className="text-2xl font-semibold">{plan.event}</h3>
                        {plan.sub_event && <p className="text-slate-600 mt-3">{plan.sub_event}</p>}
                        <div className="mt-6 inline-block bg-slate-100 px-6 py-3 rounded-2xl text-sm font-medium">
                          {plan.schedule}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {viewMode === "cards" && (
                <div className="p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredAndSortedPlans.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -10 }}
                      className="bg-white border border-slate-100 rounded-3xl p-9 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="flex justify-between">
                        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-slate-700">
                          {plan.s_no}
                        </div>
                        <span className="px-6 py-2 bg-blue-50 text-blue-700 rounded-2xl text-sm font-medium self-start">
                          {plan.schedule}
                        </span>
                      </div>
                      <h3 className="mt-9 text-2xl font-semibold leading-tight">{plan.event}</h3>
                      {plan.sub_event && <p className="mt-6 text-slate-600">{plan.sub_event}</p>}
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnnualPlansPage;