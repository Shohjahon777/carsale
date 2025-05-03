'use client';

import { motion } from 'framer-motion';

interface ActiveIndicatorProps {
  isActive: boolean;
}

export const ActiveIndicator = ({ isActive }: ActiveIndicatorProps) => {
  if (!isActive) return null;
  
  return (
    <motion.div 
      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary-light to-primary rounded-full"
      layoutId="activeNavItem"
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
};