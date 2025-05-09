
import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Numerology from "./pages/Numerology";
import NumerologyPage from "./pages/NumerologyPage";
import Vastu from "./pages/Vastu";
import Astrology from "./pages/Astrology";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import IOSFixes from "./components/IOSFixes";
import LoadingAnimation from "./components/LoadingAnimation";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Set loading state immediately
  useEffect(() => {
    // For all pages, set loading to false immediately
    // We don't want loading animations on non-home pages
    setIsLoading(false);

    // Make sure the navbar logo is visible
    const showNavbarLogo = () => {
      const navbarLogo = document.querySelector('header .logo-video-container');
      if (navbarLogo) {
        (navbarLogo as HTMLElement).style.opacity = '1';
      }
    };

    // Show the navbar logo
    showNavbarLogo();

    // Preload the logo video for better performance
    const preloadVideo = () => {
      const video = document.createElement('video');
      video.src = '/logo video.mp4';
      video.muted = true;
      video.preload = 'auto';
    };

    // Preload assets
    preloadVideo();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <IOSFixes />
        <Toaster />
        <Sonner />

        <BrowserRouter>
          {/* No loading animation for any pages - home page has its own animation */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/numerology" element={<Numerology />} />
            <Route path="/numerology-new" element={<NumerologyPage />} />
            <Route path="/vastu" element={<Vastu />} />
            <Route path="/astrology" element={<Astrology />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
