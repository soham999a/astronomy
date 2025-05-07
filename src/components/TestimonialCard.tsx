
interface TestimonialCardProps {
  name: string;
  location: string;
  testimonial: string;
  image?: string;
}

const TestimonialCard = ({ name, location, testimonial, image }: TestimonialCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md transition-all duration-300 hover:shadow-xl relative overflow-hidden group">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-mystic-gold/10 to-dusty-lavender/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Subtle corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-mystic-gold/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mystic-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Profile section with enhanced animations */}
      <div className="flex items-center mb-5">
        <div className="h-14 w-14 rounded-full bg-dusty-lavender flex items-center justify-center text-white font-bold text-lg mr-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
          {image ? (
            <img src={image} alt={name} className="h-full w-full object-cover rounded-full" />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div>
          <h4 className="font-medium text-lg text-charcoal">{name}</h4>
          <p className="text-charcoal/80 text-sm">{location}</p>
        </div>
      </div>

      {/* Testimonial text with improved contrast and readability */}
      <p className="text-charcoal italic leading-relaxed mb-4 relative">
        <span className="absolute -left-2 -top-2 text-3xl text-mystic-gold/20">"</span>
        {testimonial}
        <span className="absolute -right-2 bottom-0 text-3xl text-mystic-gold/20">"</span>
      </p>

      {/* Enhanced star rating with animation */}
      <div className="flex mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-mystic-gold transition-all duration-300 group-hover:scale-125 group-hover:text-mystic-gold/90"
            style={{ transitionDelay: `${(star - 1) * 75}ms` }}
          >
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
