import React from 'react';
import { Globe, Map, Key, Coffee, Utensils, Car } from 'lucide-react';

export default function HotelPartners() {
  const partners = [
    { 
      id: 1, 
      name: 'Global Booking', 
      icon: <Globe className="w-8 h-8 text-teal-600" />, 
      description: 'Enjoy seamless worldwide hotel reservations with trusted coverage across major destinations.',
    },
    { 
      id: 2, 
      name: 'Premium Transport', 
      icon: <Car className="w-8 h-8 text-blue-600" />, 
      description: 'Get smooth airport transfers and on-demand car rentals, right from check-in to check-out.' 
    },
    { 
      id: 3, 
      name: 'Local Experiences', 
      icon: <Map className="w-8 h-8 text-amber-600" />, 
      description: 'Discover curated tours, cultural adventures, and local activities to enrich every stay.'
    },
    { 
      id: 4, 
      name: 'Digital Keys', 
      icon: <Key className="w-8 h-8 text-violet-600" />, 
      description: 'Say goodbye to the front desk — access your room quickly with secure digital check-in technology.' 
    },
    { 
      id: 5, 
      name: 'Gourmet Dining', 
      icon: <Utensils className="w-8 h-8 text-rose-600" />, 
      description: 'Indulge in exclusive partnerships with top-rated restaurants for unforgettable culinary moments.' 
    },
    { 
      id: 6, 
      name: 'Cafe Connect', 
      icon: <Coffee className="w-8 h-8 text-orange-600" />, 
      description: 'Enjoy relaxing in-house cafes offering fresh beverages and cozy ambiances right where you stay.' 
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-100 to-white p-5 rounded-xl shadow-sm">

      {/* Partners Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map(partner => (
          <div 
            key={partner.id}
            className="bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] group"
          >
            <div className="mb-4 p-3 rounded-full bg-gray-100 inline-block group-hover:bg-blue-50">
              {partner.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{partner.name}</h3>
            <p className="text-gray-600">{partner.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
          Explore Partnerships
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Join over 1,200 hotels worldwide enhancing guest experiences through our partner network
        </p>
      </div>

      {/* Visual Elements - Decorative */}
      <div className="absolute top-8 right-8 w-4 h-4 bg-blue-400 rounded-full opacity-30"></div>
      <div className="absolute bottom-12 left-12 w-6 h-6 bg-teal-400 rounded-full opacity-20"></div>
      <div className="absolute top-1/3 left-8 w-3 h-3 bg-amber-400 rounded-full opacity-30"></div>
    </div>
  );
}