'use client';

import { useEffect, useRef } from "react";
import {  motion, useAnimation, useInView } from 'framer-motion';
import { AnimatedCounter } from "./AnimatedCounter.jsx";
import { CircularIndicator } from "./CircularIndicator";


export const FeaturesSection = ({ features, title }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section className="py-16 px-4 overflow-hidden relative" ref={ref}>
      {/* Декоративные элементы фона */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="bg-white dark:bg-gray-800/80 backdrop-blur rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/10 dark:group-hover:shadow-primary-light/10 group-hover:border-primary/40 dark:group-hover:border-primary-light/40 relative">
                {/* Верхняя часть карточки с градиентным фоном и иконкой */}
                <div className="h-24 bg-gradient-to-r from-primary/90 to-primary-dark flex items-center justify-start px-6 relative overflow-hidden">
                  {/* Декоративные круги на фоне */}
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  
                  {/* Иконка в белом круге */}
                  <div className="w-16 h-16 bg-white/95 dark:bg-white/90 rounded-full flex items-center justify-center shadow-lg relative">
                    <div className="text-primary dark:text-primary">
                      {index === 0 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      )}
                      {index === 3 && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Название функции со светлым текстом */}
                  <h3 className="text-xl font-bold text-white ml-4 relative">
                    {feature.title}
                  </h3>
                </div>
                
                {/* Содержимое карточки */}
                <div className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Статистика с визуальным индикатором */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="relative">
                      {/* Визуальный индикатор прогресса */}
                      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-primary to-primary-light"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${feature.stats.value <= 100 ? feature.stats.value : 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        ></motion.div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-primary dark:text-primary-light mr-1">
                            <AnimatedCounter value={feature.stats.value} suffix={feature.stats.suffix} />
                          </span>
                          <span className="text-base font-medium text-gray-600 dark:text-gray-400">
                            {feature.stats.label}
                          </span>
                        </div>
                        
                        {/* Круговой индикатор с анимацией */}
                        <CircularIndicator percentage={feature.stats.value <= 100 ? feature.stats.value : 100} />
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic">
                        {feature.stats.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};