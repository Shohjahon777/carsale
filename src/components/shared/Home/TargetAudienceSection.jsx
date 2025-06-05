// TargetAudienceSection.jsx
'use client';

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from 'framer-motion';

export const TargetAudienceSection = ({audiences, solution, whom, title}) => {
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // const audiences = [
  //   {
  //     title: "Автодилеры",
  //     icon: "🚘",
  //     description: "Повышение эффективности продаж, управление складом и контрактами в едином интерфейсе",
  //     benefits: [
  //       "Снижение времени обработки заказа на 40%",
  //       "Контроль всего склада автомобилей",
  //       "Автоматизация документооборота",
  //       "Аналитика продаж в реальном времени"
  //     ],
  //     color: "#7B2CBF"
  //   },
  //   {
  //     title: "Автосалоны",
  //     icon: "🏢",
  //     description: "Комплексная система управления процессами салона, от первого контакта до послепродажного обслуживания",
  //     benefits: [
  //       "Единая база клиентов и история взаимодействия",
  //       "Управление тест-драйвами и бронированием",
  //       "Интеграция с маркетинговыми инструментами",
  //       "Контроль работы менеджеров"
  //     ],
  //     color: "#0891B2"
  //   },
  //   {
  //     title: "Финансовые структуры",
  //     icon: "💰",
  //     description: "Интеграция с банками и финансовыми организациями для оптимизации процесса кредитования и лизинга",
  //     benefits: [
  //       "Быстрая проверка кредитной истории",
  //       "Автоматическое формирование заявок",
  //       "Отслеживание статуса платежей",
  //       "Прозрачная отчетность"
  //     ],
  //     color: "#F59E0B"
  //   },
  //   {
  //     title: "Импортеры/поставщики",
  //     icon: "🚢",
  //     description: "Оптимизация цепочки поставок и контроль движения автомобилей от производителя до конечного клиента",
  //     benefits: [
  //       "Планирование поставок и прогнозирование",
  //       "Контроль статуса каждого автомобиля",
  //       "Интеграция с таможенными системами",
  //       "Аналитика спроса и продаж"
  //     ],
  //     color: "#059669"
  //   }
  // ];
  //


  return (
    <section 
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Декоративные элементы */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold mb-3"
          >
            {solution}
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {whom}
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "80px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-primary mx-auto rounded-full mb-6"
          />
          
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {title}
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity:.0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              className="relative group"
            >
              <div 
                className={`h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
                  activeCard === index ? 'shadow-xl transform -translate-y-2' : ''
                }`}
                style={{ borderTopColor: audience.color, borderTopWidth: '4px' }}
              >
                <div className="p-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: `${audience.color}15` }}
                  >
                    {audience.icon}
                  </div>
                  
                  <h3 
                    className="text-xl font-bold mb-3" 
                    style={{ color: audience.color }}
                  >
                    {audience.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    {audience.description}
                  </p>
                  
                  <div className="mt-auto">
                    <AnimatePresence>
                      {activeCard === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Преимущества:</h4>
                            <ul className="space-y-2">
                              {audience.benefits.map((benefit, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-start"
                                >
                                  <span 
                                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs mr-2 mt-0.5"
                                    style={{ backgroundColor: audience.color }}
                                  >
                                    ✓
                                  </span>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {benefit}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm font-medium inline-flex items-center"
                        style={{ color: audience.color }}
                        onClick={() => setActiveCard(activeCard === index ? null : index)}
                      >
                        {activeCard === index ? 'Скрыть детали' : 'Подробнее'}
                        <svg 
                          className={`ml-1 w-4 h-4 transition-transform ${activeCard === index ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                      
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${audience.color}20` }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke={audience.color} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            Узнать больше о решениях
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};