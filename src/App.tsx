import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Index from "./pages/Index";
import OfficeBearersPage from "./pages/OfficeBearersPage";
import AboutPage from "./pages/AboutPage";
import SocietiesPage from "./pages/SocietiesPage";
import ContactPage from "./pages/ContactPage";
import MembersPage from "./pages/MembersPage";
import AdminDashboardRoute from "./pages/AdminDashboard.tsx";
import AdminLoginPage from "./pages/AdminLoginPage.tsx";
import AwardsPage from "./pages/AwardsPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import ActivitiesPage from "./pages/ActivitiesPage.tsx";
import AnnualPlansPage from "./pages/AnnualPlansPage.tsx";
import Gallery from "./pages/Gallery.tsx";
import FundingsPlanPage from "./pages/FundingsPlanPage.tsx";
import SeniorMembersPage from "./pages/SeniorMembersPage.tsx";
import TeamPage from "./pages/Team.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SpeedInsights />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/Team" element={<TeamPage />} />
          <Route path="/office-bearers" element={<OfficeBearersPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/senior-members" element={<SeniorMembersPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/annual-plans" element={<AnnualPlansPage />} />
          <Route path="/funding" element={<FundingsPlanPage />} />
          <Route path="/societies" element={<SocietiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin/*" element={<AdminDashboardRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;