import { Calendar, UserCheck, Phone, Award, Compass, Star, Sparkles, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ServiceCard from '@/components/ServiceCard';
import ServiceSlideshow from '@/components/ServiceSlideshow';
import TestimonialCard from '@/components/TestimonialCard';
import ServicesSection from '@/components/ServicesSection';
import HomePageAnimation from '@/components/HomePageAnimation';

const Index = () => {
  const [showHomeAnimation, setShowHomeAnimation] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // Always show the animation when the home page loads
  useEffect(() => {
    // Start with the animation showing and content hidden
    setShowHomeAnimation(true);
    setContentVisible(false);

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

  // Handle animation completion
  const handleAnimationComplete = () => {
    setShowHomeAnimation(false);
    setContentVisible(true);
  };

  return (
    <div className="min-h-screen bg-soft-cream">
      {/* Home page animation - shows on every page refresh */}
      {showHomeAnimation && (
        <HomePageAnimation onComplete={handleAnimationComplete} duration={4000} />
      )}

      {/* Main content - initially hidden until animation completes */}
      <div style={{ visibility: contentVisible ? 'visible' : 'hidden' }}>
        <Navbar />
        <WhatsAppButton />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="section">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative animate-fade-in opacity-0">
              <img
                src="astrologer.webp"
                alt="Spiritual Expert"
                className="rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
            </div>

            <div className="animate-fade-in opacity-0" style={{ animationDelay: '300ms' }}>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">About <span className="text-mystic-gold">Our Expert</span></h2>
              <p className="text-charcoal mb-4">
                Welcome to HarmonySeeker, where ancient wisdom meets modern living. Our founder, with over 20 years of experience in Vedic sciences, has helped thousands transform their lives through the power of numbers, spaces, and celestial knowledge.
              </p>
              <p className="text-charcoal mb-6">
                Trained in traditional Vedic practices and contemporary applications, our expert provides authentic guidance that blends time-tested wisdom with practical solutions for today's challenges.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-dusty-lavender/20 flex items-center justify-center text-mystic-gold mr-3">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Certified Expert</p>
                    <p className="text-sm text-cool-gray">Vedic Sciences</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-dusty-lavender/20 flex items-center justify-center text-mystic-gold mr-3">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <p className="font-medium">1000+ Clients</p>
                    <p className="text-sm text-cool-gray">Worldwide</p>
                    <p className="font-medium text-mystic-gold">20+ Years of Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Hover Effect Cards */}
      <ServicesSection />

      {/* Why Choose Us */}
      <section id="why-us" className="section">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in opacity-0">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why <span className="text-mystic-gold">Choose Us</span></h2>
            <p className="text-charcoal max-w-2xl mx-auto">
              Our approach combines ancient wisdom with modern understanding to provide solutions that truly work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Feature 1 - Enhanced for better hover and mobile */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center animate-fade-in opacity-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                 style={{ animationDelay: '150ms' }}>
              <div className="h-14 w-14 rounded-full bg-dusty-lavender/20 flex items-center justify-center mb-4 text-mystic-gold mx-auto transition-all duration-300 hover:bg-mystic-gold hover:text-white transform">
                <Award size={24} />
              </div>
              <h3 className="font-medium mb-2 text-charcoal">Authentic</h3>
              <p className="text-charcoal text-sm">Traditional knowledge, authentic practices</p>
            </div>

            {/* Feature 2 - Enhanced for better hover and mobile */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center animate-fade-in opacity-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                 style={{ animationDelay: '300ms' }}>
              <div className="h-14 w-14 rounded-full bg-dusty-lavender/20 flex items-center justify-center mb-4 text-mystic-gold mx-auto transition-all duration-300 hover:bg-mystic-gold hover:text-white transform">
                <UserCheck size={24} />
              </div>
              <h3 className="font-medium mb-2 text-charcoal">Personalized</h3>
              <p className="text-charcoal text-sm">Tailored solutions for individual needs</p>
            </div>

            {/* Feature 3 - Enhanced for better hover and mobile */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center animate-fade-in opacity-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                 style={{ animationDelay: '450ms' }}>
              <div className="h-14 w-14 rounded-full bg-dusty-lavender/20 flex items-center justify-center mb-4 text-mystic-gold mx-auto transition-all duration-300 hover:bg-mystic-gold hover:text-white transform">
                <UserCheck size={24} />
              </div>
              <h3 className="font-medium mb-2 text-charcoal">1000+ Clients</h3>
              <p className="text-charcoal text-sm">Trusted by clients worldwide</p>
            </div>

            {/* Feature 4 - Enhanced for better hover and mobile */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center animate-fade-in opacity-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                 style={{ animationDelay: '600ms' }}>
              <div className="h-14 w-14 rounded-full bg-dusty-lavender/20 flex items-center justify-center mb-4 text-mystic-gold mx-auto transition-all duration-300 hover:bg-mystic-gold hover:text-white transform">
                <Phone size={24} />
              </div>
              <h3 className="font-medium mb-2 text-charcoal">Always Available</h3>
              <p className="text-charcoal text-sm">Continuous support and follow-up</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section bg-dusty-lavender/10">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in opacity-0">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Client <span className="text-mystic-gold">Testimonials</span></h2>
            <p className="text-charcoal max-w-2xl mx-auto">
              Don't just take our word for it – hear from those whose lives have been transformed.
            </p>
          </div>

          {/* Testimonial Cards with Slideshow Effect */}
          <div className="relative overflow-hidden py-4">
            {/* Subtle background animation */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-dusty-lavender/10 to-celestial-blue/10 animate-pulse" style={{ animationDuration: '4s' }}></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Testimonial 1 with enhanced animation */}
              <div className="animate-fade-in opacity-0 transition-all duration-500 hover:transform hover:scale-105"
                   style={{ animationDelay: '150ms' }}>
                <TestimonialCard
                  name="Priya Sharma"
                  location="Delhi, India"
                  testimonial="The numerology analysis was eye-opening. The name correction suggestions have brought positive changes in my career."
                />
              </div>

              {/* Testimonial 2 with enhanced animation */}
              <div className="animate-fade-in opacity-0 transition-all duration-500 hover:transform hover:scale-105"
                   style={{ animationDelay: '300ms' }}>
                <TestimonialCard
                  name="Rahul Mehra"
                  location="Mumbai, India"
                  testimonial="The Vastu consultation completely transformed our home energy. We feel more peaceful and prosperous."
                />
              </div>

              {/* Testimonial 3 with enhanced animation */}
              <div className="animate-fade-in opacity-0 transition-all duration-500 hover:transform hover:scale-105"
                   style={{ animationDelay: '450ms' }}>
                <TestimonialCard
                  name="Anjali Patel"
                  location="Bengaluru, India"
                  testimonial="I was skeptical at first, but the personal number analysis was incredibly accurate and helpful."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section id="quick-contact" className="section bg-mystic-gold text-white text-center">
        <div className="container mx-auto max-w-3xl animate-fade-in opacity-0">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ready to Transform Your Life?</h2>
          <p className="mb-8 text-white/90">
            Take the first step towards harmony and positive transformation with a personalized consultation.
          </p>
          <Link to="/contact" target='_blank' className="px-8 py-3 bg-white text-mystic-gold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center">
            <Calendar size={20} className="mr-2" />
            Get Consultation
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      </div>
    </div>
  );
};

export default Index;
