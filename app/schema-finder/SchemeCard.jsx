import React from 'react';
import { MapPin, Users, Calendar, ExternalLink, ChevronRight, Award, Briefcase, GraduationCap, Heart, Home, Leaf, Laptop, Mountain, Sprout, Store, Stethoscope, Wallet, Star } from 'lucide-react';
import { getCategoryIcon, getCategoryColorScheme } from './utils';

const SchemeCard = ({ scheme, onClick }) => {
  // Get the appropriate icon based on category or iconType
  const IconComponent = {
    'agriculture': Sprout,
    'education': GraduationCap,
    'health': Stethoscope,
    'women': Heart,
    'social': Users,
    'employment': Briefcase,
    'housing': Home,
    'rural': Mountain,
    'financial': Wallet,
    'digital': Laptop,
    'environment': Leaf,
    'business': Store
  }[scheme.iconType] || Award;
  
  // Get color scheme based on category or color hint
  const colorScheme = getCategoryColorScheme(scheme.color || scheme.category);
  
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${colorScheme.border} overflow-hidden group cursor-pointer transform hover:-translate-y-2`}
      onClick={() => onClick(scheme)}
    >
      {/* Card header with glass morphism */}
      <div className="relative">
        <div className={`h-24 bg-gradient-to-r ${colorScheme.gradient} w-full overflow-hidden relative`}>
          {/* Abstract pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          {/* Icon and category */}
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 border border-white/30">
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <span className="text-white/90 font-medium text-sm">{scheme.category}</span>
          </div>
          
          {/* Ministry badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/90 border border-white/30">
              {scheme.ministry}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className={`text-xl font-bold text-gray-900 line-clamp-2 group-hover:${colorScheme.accent} transition-colors`}>
            {scheme.name}
          </h3>
          <div className={`rounded-full p-2 ${colorScheme.light} group-hover:bg-gradient-to-r group-hover:${colorScheme.gradient} transition-all`}>
            <ChevronRight className={`h-5 w-5 ${colorScheme.accent} group-hover:text-white transition-colors`} />
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
          {scheme.description}
        </p>
        
        {/* Info badges with modern design */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl border border-gray-200">
            <div className={`rounded-full p-1.5 ${colorScheme.light}`}>
              <MapPin className={`h-4 w-4 ${colorScheme.accent}`} />
            </div>
            <div>
              <span className="text-xs text-gray-500 block">Level</span>
              <span className="font-medium text-gray-800">{scheme.level}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl border border-gray-200">
            <div className={`rounded-full p-1.5 ${colorScheme.light}`}>
              <Calendar className={`h-4 w-4 ${colorScheme.accent}`} />
            </div>
            <div>
              <span className="text-xs text-gray-500 block">Year</span>
              <span className="font-medium text-gray-800">{scheme.launchYear}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm mb-6 bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl border border-gray-200">
          <div className={`rounded-full p-1.5 ${colorScheme.light}`}>
            <Users className={`h-4 w-4 ${colorScheme.accent}`} />
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Beneficiary</span>
            <span className="font-medium text-gray-800">{scheme.beneficiary}</span>
          </div>
        </div>
        
        {/* Benefits preview */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className={`h-4 w-4 ${colorScheme.accent}`} />
            <span className="text-sm font-medium text-gray-700">Key Benefits</span>
          </div>
          <p className="text-xs text-gray-600 line-clamp-2">
            {scheme.benefits || "Detailed benefits information available in the full view."}
          </p>
        </div>
      </div>
      
      <div className={`px-6 py-4 bg-gradient-to-r from-gray-50 to-${colorScheme.light.replace('bg-', '')} group-hover:from-${colorScheme.light.replace('bg-', '')} group-hover:to-${colorScheme.light.replace('bg-', '')} transition-colors border-t border-gray-100`}>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${colorScheme.accent} group-hover:${colorScheme.text}`}>View Complete Details</span>
          <ExternalLink className={`h-4 w-4 ${colorScheme.accent}`} />
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;