import { Compass, Calculator, Star } from 'lucide-react';
import HoverServiceCard from './HoverServiceCard';

const ServicesSection = () => {
  // Using Vedic/futuristic style images
  const services = [
    {
      title: "Numerology Services",
      description: "Discover how numbers influence your life path and personality. Unlock your potential through personalized numerology analysis.",
      link: "/numerology",
      icon: Calculator,
      // Numerology-themed image
      imageSrc: "url('/images/numerology-bg.jpg')"
    },
    {
      title: "Vastu Consultation",
      description: "Create harmonious living and working spaces that support your well-being and success through ancient architectural science.",
      link: "/vastu",
      icon: Compass,
      // Vastu-themed image
      imageSrc: "url('/images/vastu-bg.jpg')"
    },
    {
      title: "Astrology",
      description: "Gain insights into your future and understand cosmic influences on your life through detailed astrological analysis.",
      link: "/astrology",
      icon: Star,
      // Astrology-themed image
      imageSrc: "url('/images/astrology-bg.jpg')",
      comingSoon: true
    }
  ];

  return (
    <section id="services" className="section bg-celestial-blue/10 overflow-hidden">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 relative inline-block">
            Our <span className="text-mystic-gold">Services</span>
          </h2>
          <p className="text-charcoal max-w-2xl mx-auto leading-relaxed">
            Discover how ancient sciences can bring clarity, harmony, and positive transformation to your modern life.
          </p>
        </div>

        {/* Services Cards with Hover Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="animate-fade-in opacity-0" style={{ animationDelay: `${index * 150}ms` }}>
              <HoverServiceCard
                title={service.title}
                description={service.description}
                link={service.link}
                icon={service.icon}
                imageSrc={service.imageSrc}
                comingSoon={service.comingSoon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
