// StatsSection.jsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedCounter } from "./AnimatedCounter";

export const StatsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  
  const stats = [
    { value: 250, suffix: '+', label: 'автодилеров', description: 'используют нашу систему' },
    { value: 142000, suffix: '', label: 'автомобилей', description: 'продано через нашу платформу' },
    { value: 98, suffix: '%', label: 'клиентов', description: 'рекомендуют нас партнерам' },
    { value: 12, suffix: '', label: 'регионов', description: 'активно используют систему' }
  ];
  
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 relative overflow-hidden" ref={sectionRef}>
      {/* Декоративные элементы фона */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold mb-3"
          >
            ЦИФРЫ И ФАКТЫ
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Нам доверяют лидеры отрасли
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "80px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-primary mx-auto rounded-full mb-4"
          />
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ключевые показатели, которыми мы гордимся
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              {/* Фоновый круг с градиентом */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/5 dark:from-primary/20 dark:to-primary-dark/10 rounded-full transition-all duration-500 group-hover:scale-110"></div>
              
              <div className="relative">
                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                
                <div className="mt-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {stat.description}
                  </p>
                  
                  {/* Индикатор прогресса */}
                  <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary-light"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : { width: 0 }}
                      transition={{ duration: 1.5, delay: index * 0.2 + 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Секция с логотипами клиентов */}
        <motion.div
          className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-center text-lg font-medium text-gray-600 dark:text-gray-400 mb-8">
            Нам доверяют более 250 компаний
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 0.7, y: 0 } : { opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.9 }}
                className="h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all"
              >
                <div className="w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                  <div className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    АВТОДИЛЕР {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};