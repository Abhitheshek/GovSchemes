"use client"

import { Building, Users, GraduationCap, CreditCard } from 'lucide-react';

export const mainCards = [
  {
    id: 'state',
    title: 'State Schemes',
    description: 'Explore schemes launched by various state governments across India',
    icon: Building,
    color: 'from-blue-500 to-blue-600',
    count: '500+ Schemes'
  },
  {
    id: 'national',
    title: 'National Schemes',
    description: 'Central government schemes for the welfare of citizens',
    icon: Users,
    color: 'from-green-500 to-green-600',
    count: '200+ Schemes'
  },
  {
    id: 'scholarship',
    title: 'Scholarship Programs',
    description: 'Educational scholarships for students across all levels',
    icon: GraduationCap,
    color: 'from-purple-500 to-purple-600',
    count: '150+ Programs'
  },
  {
    id: 'financial',
    title: 'Financial Aid',
    description: 'Financial assistance and support schemes for citizens',
    icon: CreditCard,
    color: 'from-orange-500 to-orange-600',
    count: '300+ Aids'
  }
];