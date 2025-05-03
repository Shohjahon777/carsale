// EventsSection.jsx
'use client';

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from 'framer-motion';

export const EventsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedEvent, setExpandedEvent] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  
  const categories = [
    { id: 'all', name: 'Все мероприятия' },
    { id: 'webinar', name: 'Вебинары' },
    { id: 'demo', name: 'Демонстрации' },
    { id: 'training', name: 'Обучение' }
  ];
  
  const events = [
    {
      id: 1,
      title: "Продажа автомобилей в 2025: новые стратегии",
      type: "webinar",
      typeName: "Вебинар",
      date: "15 мая, 14:00",
      duration: "60 минут",
      speaker: {
        name: "Александр Иванов",
        position: "Руководитель отдела продаж",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=50&h=50&auto=format&fit=crop"
      },
      description: "На вебинаре мы обсудим актуальные стратегии продаж автомобилей, тренды рынка и эффективные инструменты для увеличения конверсии в 2025 году.",
      color: "#7B2CBF"
    },
    {
      id: 2,
      title: "Демонстрация новых функций системы — версия 3.5",
      type: "demo",
      typeName: "Демонстрация",
      date: "18 мая, 12:00",
      duration: "45 минут",
      speaker: {
        name: "Елена Петрова",
        position: "Продакт-менеджер",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=50&h=50&auto=format&fit=crop"
      },
      description: "Подробная демонстрация новых возможностей системы версии 3.5: электронные контракты, интеграция с банками и улучшенная аналитика.",
      color: "#0891B2"
    },
    {
      id: 3,
      title: "Мастер-класс: оптимизация воронки продаж",
      type: "training",
      typeName: "Обучение",
      date: "25 мая, 11:00",
      duration: "90 минут",
      speaker: {
        name: "Дмитрий Сидоров",
        position: "Бизнес-тренер",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=50&h=50&auto=format&fit=crop"
      },
      description: "Практический мастер-класс по настройке и оптимизации воронки продаж в системе. Участники научатся выявлять узкие места и улучшать конверсию на каждом этапе.",
      color: "#F59E0B"
    },
    {
      id: 4,
      title: "Аналитика продаж: интерпретация отчетов",
      type: "webinar",
      typeName: "Вебинар",
      date: "30 мая, 15:00",
      duration: "60 минут",
      speaker: {
        name: "Ольга Смирнова",
        position: "Аналитик данных",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=50&h=50&auto=format&fit=crop"
      },
      description: "На вебинаре вы узнаете, как правильно интерпретировать отчеты по продажам, выявлять тренды и принимать данные решения на основе аналитики.",
      color: "#059669"
    }
  ];
  
  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(event => event.type === activeCategory);
  
  const handleRegister = (id) => {
    // Здесь обработчик регистрации на мероприятие
    console.log(`Регистрация на мероприятие ${id}`);
  };
  
  return (
    <section 
      className="py-20 px-4 bg-white dark:bg-gray-900 relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Декоративные элементы */}
    {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10"></div>
      
      <div className="container mx-auto relative">
        <motion.div 
          className="text-center mb-12"
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
            РАСПИСАНИЕ МЕРОПРИЯТИЙ
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Предстоящие события
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
            Присоединяйтесь к нашим вебинарам, демонстрациям и обучающим мероприятиям
          </motion.p>
        </motion.div>
        
        {/* Фильтры категорий */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Список мероприятий */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 ${
                expandedEvent === event.id ? 'border-l-4' : ''
              }`}
              style={{ borderLeftColor: expandedEvent === event.id ? event.color : '' }}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Левая колонка */}
                  <div className="md:w-1/4 flex flex-col">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 max-w-max"
                      style={{ 
                        backgroundColor: `${event.color}15`,
                        color: event.color
                      }}
                    >
                      {event.typeName}
                    </span>
                    
                    <div className="flex items-center mb-3">
                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{event.date}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{event.duration}</span>
                    </div>
                  </div>
                  
                  {/* Центральная колонка */}
                  <div className="md:w-2/4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center mb-4">
                      <img 
                        src={event.speaker.avatar} 
                        alt={event.speaker.name} 
                        className="w-8 h-8 rounded-full object-cover mr-3"
                      />
                      <div>
                        <span className="block text-sm font-medium text-gray-900 dark:text-white">
                          {event.speaker.name}
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">
                          {event.speaker.position}
                        </span>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedEvent === event.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden text-gray-600 dark:text-gray-300 mb-4"
                        >
                          <p>{event.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Правая колонка */}
                  <div className="md:w-1/4 flex md:flex-col md:items-end items-center justify-between">
                    <button
                      onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                      className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light flex items-center transition-colors"
                    >
                      <span className="mr-1 text-sm">
                        {expandedEvent === event.id ? 'Скрыть' : 'Подробнее'}
                      </span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${expandedEvent === event.id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <motion.button
                      onClick={() => handleRegister(event.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg"
                    >
                      Зарегистрироваться
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA-секция */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Не нашли подходящее мероприятие?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Запросите индивидуальную демонстрацию системы в удобное для вас время
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white dark:bg-gray-800 text-primary dark:text-primary-light border border-primary dark:border-primary-light hover:bg-primary/5 dark:hover:bg-primary-dark/10 font-medium rounded-full shadow-sm inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Заказать демонстрацию
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};