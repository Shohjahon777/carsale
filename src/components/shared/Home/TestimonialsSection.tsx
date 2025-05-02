'use client';

import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
export const TestimonialsSection = () => {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  
  const testimonials = [
    {
      name: "Автосалон «Престиж»",
      position: "Сеть из 5 автосалонов",
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=150&h=150&auto=format&fit=crop",
      quote: "После внедрения системы время оформления сделки сократилось на 40%. Менеджеры довольны, клиенты тоже.",
      rating: 5,
      stats: { sales: "+25%", efficiency: "+40%", clients: "+30%" }
    },
    {
      name: "ГК «АвтоЛидер»",
      position: "Официальный дилер 3 брендов",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=150&h=150&auto=format&fit=crop",
      quote: "Интеграция со складом позволила нам в реальном времени отслеживать наличие автомобилей и предлагать клиентам актуальные варианты.",
      rating: 5,
      stats: { sales: "+18%", efficiency: "+35%", clients: "+22%" }
    },
    {
      name: "«Моторс Плюс»",
      position: "Премиальный сегмент",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=150&h=150&auto=format&fit=crop",
      quote: "Система позволила нам обеспечить высокий уровень сервиса для требовательных клиентов. Все документы оформляются быстро и без ошибок.",
      rating: 4.9,
      stats: { sales: "+20%", efficiency: "+33%", clients: "+15%" }
    }
  ];
  
  const paginate = (newDirection) => {
    const newIndex = activeIndex + newDirection;
    if (newIndex >= 0 && newIndex < testimonials.length) {
      setActiveIndex([newIndex, newDirection]);
    }
  };
  
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };
  
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-primary dark:text-primary-light font-semibold mb-2">ОТЗЫВЫ КЛИЕНТОВ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Истории успеха наших клиентов
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        {/* Карусель отзывов */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Фото и информация */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center md:text-left md:items-start">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-primary/20">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {testimonials[activeIndex].name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {testimonials[activeIndex].position}
                </p>
                
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(testimonials[activeIndex].rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                    {testimonials[activeIndex].rating}
                  </span>
                </div>
                
                {/* Статистика результатов */}
                <div className="grid grid-cols-3 gap-4 w-full mt-auto">
                  <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <div className="text-xl font-bold text-primary dark:text-primary-light">
                      {testimonials[activeIndex].stats.sales}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Продажи
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <div className="text-xl font-bold text-primary dark:text-primary-light">
                      {testimonials[activeIndex].stats.efficiency}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Эффективность
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <div className="text-xl font-bold text-primary dark:text-primary-light">
                      {testimonials[activeIndex].stats.clients}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Клиенты
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Цитата */}
              <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 md:p-10 relative">
                <svg 
                  className="w-16 h-16 text-primary/20 dark:text-primary/20 absolute top-4 left-4" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 4.15-2.246 4.983-3.85h-4.983v-12h9.978zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 4.15-2.246 4.983-3.85h-4.983v-12h9.996z" />
                </svg>
                
                <div className="relative z-10">
                  <p className="text-lg md:text-xl text-gray-800 dark:text-gray-100 mb-6 italic">
                    {testimonials[activeIndex].quote}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <motion.button
                      onClick={() => paginate(-1)}
                      disabled={activeIndex === 0}
                      className={`p-2 rounded-full ${
                        activeIndex === 0 
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                          : 'bg-white dark:bg-gray-800 text-primary dark:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      whileHover={activeIndex !== 0 ? { scale: 1.1 } : {}}
                      whileTap={activeIndex !== 0 ? { scale: 0.9 } : {}}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>
                    
                    <div className="flex space-x-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex([index, index > activeIndex ? 1 : -1])}
                          className={`w-2.5 h-2.5 rounded-full ${
                            index === activeIndex 
                              ? 'bg-primary' 
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => paginate(1)}
                      disabled={activeIndex === testimonials.length - 1}
                      className={`p-2 rounded-full ${
                        activeIndex === testimonials.length - 1 
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                          : 'bg-white dark:bg-gray-800 text-primary dark:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      whileHover={activeIndex !== testimonials.length - 1 ? { scale: 1.1 } : {}}
                      whileTap={activeIndex !== testimonials.length - 1 ? { scale: 0.9 } : {}}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* CTA */}
        <div className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-colors shadow-lg"
          >
            Смотреть все истории успеха
          </motion.button>
        </div>
      </div>
    </section>
  );
};