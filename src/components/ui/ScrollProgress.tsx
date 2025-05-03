'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (window.scrollY / scrollHeight) * 100;
      setScrollPercentage(Math.min(percentage, 100));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 h-1 bg-primary/20 dark:bg-primary/30 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollPercentage > 5 ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="h-full bg-gradient-to-r from-primary to-primary-light"
        style={{ width: `${scrollPercentage}%` }}
        transition={{ duration: 0.05 }}
      />
    </motion.div>
  );
};

export default ScrollProgress;