// CtaSection.jsx (обновленная версия)
'use client';

import { useEffect, useRef } from "react";
import { motion } from 'framer-motion';

export const CtaSection = ({ ctaSection, onCtaClick }) => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Анимированный фон с градиентом
    const container = sectionRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
  }, []);
  
  return (
    <section className="py-16 px-4 mb-16 relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto relative">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl overflow-hidden shadow-xl relative">
          {/* Декоративный фон */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full"></div>
            
            {/* Анимированные частицы */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white/20 rounded-full"
                initial={{ 
                  x: Math.random() * 100, 
                  y: Math.random() * 100,
                  opacity: Math.random() * 0.5 + 0.2
                }}
                animate={{ 
                  y: [Math.random() * 100, Math.random() * 100 - 50],
                  opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.7 + 0.3]
                }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: Math.random() * 5 + 5
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>

          <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {ctaSection?.title || 'Готовы к трансформации продаж?'}
              </motion.h2>
              
              <motion.p 
                className="text-white/80 mb-8 max-w-lg mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {ctaSection?.subtitle || 'Присоединяйтесь к сотням автодилеров, которые уже оптимизировали свои процессы'}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={onCtaClick}
                  className="px-8 py-3 bg-white hover:bg-gray-100 text-primary font-medium rounded-full transition-colors inline-flex items-center justify-center shadow-lg"
                >
                  {ctaSection?.button || 'Запросить демонстрацию'}
                </button>
              </motion.div>
            </motion.div>
            
            {/* Декоративные элементы */}
            <motion.div 
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            ></motion.div>
            
            <motion.div 
              className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/5"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};