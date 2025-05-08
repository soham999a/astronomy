import { Calendar, UserCheck, Phone, Award, Compass, Star, Sparkles, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ServiceCard from '@/components/ServiceCard';
import ServiceSlideshow from '@/components/ServiceSlideshow';
import TestimonialCard from '@/components/TestimonialCard';

const Index = () => {
  return (
    <div className="min-h-screen bg-soft-cream">
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
              <div className="hidden md:block absolute -bottom-6 -right-6 bg-mystic-gold text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">20+ Years</p>
                <p className="text-sm">of Experience</p>
              </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Enhanced Slideshow */}
      <section id="services" className="section bg-celestial-blue/10 overflow-hidden">
        <div className="container mx-auto">
          {/* Section header with enhanced animation */}
          <div className="text-center mb-8 animate-fade-in opacity-0 relative">
            {/* Decorative elements */}
            <div className="absolute -left-4 top-1/2 w-8 h-8 rounded-full bg-mystic-gold/5 blur-md animate-float hidden md:block"
                 style={{ animationDuration: '5s' }}></div>
            <div className="absolute -right-4 top-1/3 w-6 h-6 rounded-full bg-dusty-lavender/5 blur-md animate-float hidden md:block"
                 style={{ animationDuration: '7s', animationDelay: '1s' }}></div>

            <h2 className="text-3xl md:text-4xl font-semibold mb-4 relative inline-block">
              Our <span className="text-mystic-gold relative">
                Services
                {/* Underline effect */}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-mystic-gold/50"></span>
                {/* Subtle glow */}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-mystic-gold/20 blur-sm"></span>
              </span>

              {/* Decorative star */}
              <span className="absolute -top-1 -right-6 text-mystic-gold/40 animate-pulse-soft hidden md:inline-block"
                    style={{ animationDuration: '3s' }}>
                <Sparkles size={16} />
              </span>
            </h2>

            <p className="text-charcoal max-w-2xl mx-auto leading-relaxed">
              Discover how ancient sciences can bring clarity, harmony, and positive transformation to your modern life.
            </p>
          </div>

          {/* Enhanced Service Slideshow Component */}
          <ServiceSlideshow
            services={[
              {
                title: "Compatibility Checking",
                description: "Analyze relationship compatibility based on number vibrations and energy patterns.",
                link: "/numerology",
                icon: Calendar,
                external: true
              },
              {
                title: "Office/Business Vastu",
                description: "Optimize workspace energy for better productivity and business growth.",
                link: "/vastu",
                icon: Compass,
                external: true
              },
              {
                title: "Predictive Astrology",
                description: "Insights into upcoming life phases and guidance for navigating challenges.",
                link: "/astrology",
                icon: Star,
                external: true
              },
              {
                title: "Name Correction",
                description: "Optimize your name's numerical vibration to attract positive energies and success.",
                link: "/numerology/name",
                icon: Sparkles,
                external: true
              },
              {
                title: "Home Vastu Analysis",
                description: "Create harmonious living spaces that support health, wealth and relationships.",
                link: "/vastu/home",
                icon: Compass,
                external: true
              },
              {
                title: "Birth Chart Reading",
                description: "Detailed analysis of your natal chart to reveal your life path and potential.",
                link: "/astrology/birth-chart",
                icon: Star,
                external: true
              }
            ]}
            autoplaySpeed={2000}
          />

          {/* Decorative bottom wave */}
          <div className="w-full h-12 mt-8 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full opacity-10">
              <path fill="#CDB06C" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
      </section>

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
  );
};

export default Index;
