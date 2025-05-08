import { Calculator, Hash, Grid, Calendar, Edit, Phone, Users, Shield } from 'lucide-react';
import NumerologyCardSlider from '../components/NumerologyCardSlider';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const NumerologyPage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const numerologyServices = [
    {
      title: "Personality Number Analysis",
      description: "Discover your innate traits, strengths, and challenges through your personality number.",
      icon: <Calculator size={24} />
    },
    {
      title: "Destiny Number Reading",
      description: "Uncover your life's purpose and the path you're meant to follow with destiny number insights.",
      icon: <Hash size={24} />
    },
    {
      title: "Grid Analysis (Lo-Shu)",
      description: "Analyze your birth date using the ancient Lo-Shu grid to reveal hidden patterns in your life.",
      icon: <Grid size={24} />
    },
    {
      title: "Dasha Calculation",
      description: "Understand the different time periods in your life and what each may bring through Vedic calculations.",
      icon: <Calendar size={24} />
    },
    {
      title: "Name Correction",
      description: "Optimize your name's vibration to align with your life path and enhance positive energies.",
      icon: <Edit size={24} />
    },
    {
      title: "Number Corrections",
      description: "Harmonize your mobile, bank account, car, and house numbers for maximum positive influence.",
      icon: <Phone size={24} />
    },
    {
      title: "Compatibility Checking",
      description: "Evaluate relationship compatibility through numerological analysis of both individuals.",
      icon: <Users size={24} />
    },
    {
      title: "Remedies",
      description: "Receive personalized remedies to overcome challenges revealed in your numerology chart.",
      icon: <Shield size={24} />
    }
  ];

  const faqs = [
    {
      question: "What is Vedic Numerology?",
      answer: "Vedic Numerology is an ancient Indian system that studies the mystical relationship between numbers and events. It analyzes the influence of numbers on human life and provides insights into personality traits, life path, and future possibilities."
    },
    {
      question: "How is Lo-Shu Grid different from regular numerology?",
      answer: "The Lo-Shu Grid is a 3x3 magic square used in Chinese numerology that maps your birth date numbers to reveal strengths, weaknesses, and karmic lessons. Unlike linear numerology calculations, it provides a visual representation of energy distribution in your life."
    },
    {
      question: "Can changing my name really affect my life?",
      answer: "According to numerological principles, your name creates vibrations that influence your life experiences. Name corrections aim to align these vibrations with your birth path to create harmony and potentially improve life circumstances."
    },
    {
      question: "How long does it take to see results from numerology remedies?",
      answer: "Results vary depending on the individual and the specific remedy. Some people notice changes within weeks, while deeper transformations may take 3-6 months. Consistency in applying the remedies is key to experiencing their full benefits."
    },
    {
      question: "Is numerology scientifically proven?",
      answer: "Numerology is considered a metaphysical science rather than a conventional science. While it lacks empirical scientific validation, many people find value in its insights and practical applications in their lives."
    }
  ];

  return (
    <div className="min-h-screen bg-soft-cream">
      <Navbar />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-dusty-lavender/30 to-celestial-blue/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in opacity-0">
            Personalized Vedic & Lo-Shu<br />
            <span className="text-mystic-gold">Numerology Services</span>
          </h1>
          <p className="text-lg text-cool-gray max-w-2xl mx-auto mb-8 animate-fade-in opacity-0" style={{ animationDelay: '300ms' }}>
            Empower your life through numbers. Discover your true potential and align with your destiny.
          </p>
        </div>
      </section>

      {/* Services Slider Section */}
      <section className="py-16 bg-gradient-to-r from-charcoal/5 to-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <NumerologyCardSlider services={numerologyServices} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <span className="transform transition-transform duration-300">
                    {expandedFaq === index ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-cool-gray">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-mystic-gold/10 to-mystic-gold/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Need Your Numbers Corrected?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-gradient-to-r from-mystic-gold to-amber-500
                     text-white px-8 py-4 rounded-md border-2 border-white/30
                     hover:from-amber-500 hover:to-mystic-gold transition-all duration-300
                     font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contact Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NumerologyPage;
