import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/shared/ui/AppLayout";
import { HomeMain } from "@/features/home";
import { HowItWorksMain } from "@/features/how-it-works";
import { MixingMain } from "@/features/mixing";
import { FeesMain } from "@/features/fees";
import { FAQMain } from "@/features/faq";
import { ContactMain } from "@/features/contact";
import { NotFoundMain } from "@/features/not-found";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomeMain />} />
            <Route path="/how-it-works" element={<HowItWorksMain />} />
            <Route path="/mixer" element={<MixingMain />} />
            <Route path="/fees" element={<FeesMain />} />
            <Route path="/faq" element={<FAQMain />} />
            <Route path="/contact" element={<ContactMain />} />
            <Route path="*" element={<NotFoundMain />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
