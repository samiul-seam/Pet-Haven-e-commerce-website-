import { ShieldCheck, HeartPulse, Home, Users, Wallet, Headset } from 'lucide-react';
import Card from './Card';

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Health Guaranteed',
      desc: 'All our pets undergo thorough health screenings and come with complete vaccination records and health certificates.',
      icon: <ShieldCheck className="text-teal-600" size={20} />,
    },
    {
      title: 'Lifetime Support',
      desc: 'We provide ongoing guidance and support throughout your pet\'s life, from training tips to health advice.',
      icon: <HeartPulse className="text-teal-600" size={20} />,
    },
    {
      title: 'Safe Adoption Process',
      desc: 'Our thorough screening ensures every pet finds the perfect forever home with responsible, loving owners.',
      icon: <Home className="text-teal-600" size={20} />,
    },
    {
      title: 'Expert Team',
      desc: 'Our experienced veterinarians and pet care specialists are dedicated to animal welfare and your satisfaction.',
      icon: <Users className="text-teal-600" size={20} />,
    },
    {
      title: 'Fair Pricing',
      desc: 'Transparent pricing with no hidden fees. We offer flexible payment options and special adoption discounts.',
      icon: <Wallet className="text-teal-600" size={20} />,
    },
    {
      title: '24/7 Customer Care',
      desc: 'Round-the-clock support for any questions or concerns about your new companion. We\'re always here to help.',
      icon: <Headset className="text-teal-600" size={20} />,
    },
  ];

  return (
    <div className="font-sans mb-5 p-3">
      {/* Why Choose Us Section */}
      <section className="px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Us?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We are committed to connecting loving families with their perfect pet
            companions through a safe, transparent, and caring process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white">
              <Card feature={feature} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;