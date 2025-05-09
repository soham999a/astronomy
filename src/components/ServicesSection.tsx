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
      imageSrc: "url('/numerology.png')"
    },
    {
      title: "Vastu Consultation",
      description: "Create harmonious living and working spaces that support your well-being and success through ancient architectural science.",
      link: "/vastu",
      icon: Compass,
      // Vastu-themed image
      imageSrc: "url('/vastu.png')"
    },
    {
      title: "Astrology",
      description: "Gain insights into your future and understand cosmic influences on your life through detailed astrological analysis.",
      link: "/astrology",
      icon: Star,
      // Astrology-themed image
      imageSrc: "url('/astrology.png')",
      comingSoon: true
    }
  ];

  return (
    <section id="services" className="section bg-celestial-blue/10 overflow-hidden">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block tracking-wide">
            Our <span className="text-mystic-gold bg-gradient-to-r from-mystic-gold to-amber-500 bg-clip-text text-transparent">Services</span>
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-mystic-gold to-amber-500 rounded-full"></span>
          </h2>
          <p className="text-charcoal max-w-2xl mx-auto leading-relaxed text-lg mt-6">
            Discover how ancient sciences can bring clarity, harmony, and positive transformation to your modern life.
          </p>
        </div>

        {/* Services Cards with Hover Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="animate-fade-in opacity-0 flex flex-col group" style={{ animationDelay: `${index * 150}ms` }}>
              <HoverServiceCard
                title={service.title}
                description={service.description}
                link={service.link}
                icon={service.icon}
                imageSrc={service.imageSrc}
                comingSoon={service.comingSoon}
              />
              {/* Service name below the card */}
              <div className="text-center mt-5 mb-3">
                <h3 className="text-2xl md:text-3xl font-bold relative inline-block bg-gradient-to-r from-mystic-gold to-amber-500 bg-clip-text text-transparent tracking-wide">
                  {service.title}
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-mystic-gold to-amber-500 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
