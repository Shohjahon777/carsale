// SupportSection.jsx
'use client';

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from 'framer-motion';

export const SupportSection = () => {
  const [activeTab, setActiveTab] = useState('24-7');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  
  const supportPlans = [
    {
      id: '24-7',
      title: "Круглосуточная поддержка",
      description: "Профессиональная поддержка 24/7 по всем вопросам использования системы",
      icon: "⏰",
      features: [
        "Время реакции на критичные инциденты — 15 минут",
        "Поддержка по телефону, email и в чате",
        "Выделенный менеджер поддержки",
        "Мониторинг системы в реальном времени",
        "Приоритетная обработка запросов"
      ],
      channels: [
        { name: "Телефон", icon: "📞", available: "24/7" },
        { name: "Email", icon: "✉️", available: "24/7" },
        { name: "Чат", icon: "💬", available: "24/7" },
        { name: "Выезд специалиста", icon: "🚗", available: "По запросу" }
      ],
      color: "#7B2CBF"
    },
    {
      id: 'onboarding',
      title: "Онбординг и обучение",
      description: "Полное обучение вашей команды работе с системой и поддержка на этапе внедрения",
      icon: "🎓",
      features: [
        "Индивидуальная программа обучения",
        "Онлайн и офлайн тренинги",
        "Обучающие материалы и видеоуроки",
        "Тестовая среда для практики",
        "Сертификация пользователей"
      ],
      channels: [
        { name: "Онлайн-курсы", icon: "💻", available: "24/7" },
        { name: "Вебинары", icon: "🖥️", available: "По расписанию" },
        { name: "Тренинги", icon: "👨‍🏫", available: "По запросу" },
        { name: "База знаний", icon: "📚", available: "24/7" }
      ],
      color: "#0891B2"
    },
    {
      id: 'updates',
      title: "Обновления и улучшения",
      description: "Регулярные обновления функционала и техническая поддержка системы",
      icon: "🔄",
      features: [
        "Ежемесячные обновления функционала",
        "Исправление ошибок в приоритетном порядке",
        "Внедрение улучшений по запросам клиентов",
        "Предварительный доступ к новым функциям",
        "Масштабирование системы под растущие потребности"
      ],
      channels: [
        { name: "Автообновления", icon: "🔄", available: "Ежемесячно" },
        { name: "Релизы", icon: "📦", available: "Ежеквартально" },
        { name: "Багфиксы", icon: "🐞", available: "По необходимости" },
        { name: "Уведомления", icon: "🔔", available: "Автоматически" }
      ],
      color: "#F59E0B"
    }
  ];
  
  return (
    <section 
      className="py-20 px-4 bg-white dark:bg-gray-900 relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      
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
            ВСЕГДА НА СВЯЗИ
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Техническая поддержка мирового уровня
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
            Мы обеспечиваем полный цикл поддержки от внедрения до масштабирования системы
          </motion.p>
        </motion.div>
        
        {/* Табы с планами поддержки */}
        <div className="mb-12">
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {supportPlans.map((plan) => (
              <motion.button
                key={plan.id}
                onClick={() => setActiveTab(plan.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                  activeTab === plan.id 
                    ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/20' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2">{plan.icon}</span>
                {plan.title}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Содержимое активного таба */}
          <AnimatePresence mode="wait">
            {supportPlans.map((plan) => (
              activeTab === plan.id && (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  {/* Левая колонка */}
                  <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg relative overflow-hidden">
                    <motion.div 
                      className="absolute -top-10 -right-10 w-40 h-40 rounded-full" 
                      style={{ background: `radial-gradient(circle, ${plan.color}20, transparent 70%)` }}
                    ></motion.div>
                    
                    <div className="relative">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6"
                        style={{ backgroundColor: `${plan.color}15` }}
                      >
                        {plan.icon}
                      </div>
                      
                      <h3 
                        className="text-2xl font-bold mb-3"
                        style={{ color: plan.color }}
                      >
                        {plan.title}
                      </h3>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {plan.description}
                      </p>
                      
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                          Что включено:
                        </h4>
                        
                        <div className="space-y-3">
                          {plan.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start"
                            >
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mr-3 mt-0.5 flex-shrink-0"
                                style={{ backgroundColor: plan.color }}
                              >
                                ✓
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-full text-white font-medium transition-all duration-300 flex items-center justify-center shadow-lg"
                        style={{ 
                          background: `linear-gradient(to right, ${plan.color}, ${plan.color}DD)`,
                          boxShadow: `0 10px 15px -3px ${plan.color}30`
                        }}
                      >
                        Подробнее о поддержке
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Правая колонка */}
                  <div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-8">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        Каналы поддержки
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {plan.channels.map((channel, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="bg-gray-50 dark:bg-gray-900/30 rounded-xl p-4 flex flex-col items-center"
                          >
                            <span className="text-2xl mb-2">{channel.icon}</span>
                            <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-1">{channel.name}</h5>
                            <span 
                              className="text-xs px-2 py-1 rounded-full"
                              style={{ 
                                backgroundColor: `${plan.color}15`,
                                color: plan.color 
                              }}
                            >
                              {channel.available}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                            Гарантия качества поддержки
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Мы гарантируем соблюдение SLA и высокое качество сервиса
                          </p>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                          <p>
                            <strong>SLA для критичных инцидентов:</strong> Реакция в течение 15 минут
                          </p>
                          <p>
                            <strong>SLA для обычных запросов:</strong> Реакция в течение 2 часов
                          </p>
                          <p>
                            <strong>SLA для консультаций:</strong> Реакция в течение 4 часов
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-gray-700 dark:text-gray-300 font-medium">
                            Удовлетворенность клиентов:
                          </div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg 
                                key={star}
                                className="w-5 h-5 text-yellow-400" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                              4.9/5
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        
        {/* Контактная информация */}
        <motion.div 
          className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl p-8 text-white overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {/* Декоративные элементы */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full"></div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                Нужна помощь прямо сейчас?
              </h3>
              <p className="text-white/80 mb-6">
                Наша техническая поддержка доступна 24/7. Выберите удобный для вас способ связи, и наши специалисты помогут решить любой вопрос в кратчайшие сроки.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-xl mb-3">
                    📞
                  </div>
                  <h4 className="font-medium text-white mb-1">Телефон</h4>
                  <p className="text-white/80 text-sm">+7 (800) 123-45-67</p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-xl mb-3">
                    ✉️
                  </div>
                  <h4 className="font-medium text-white mb-1">Email</h4>
                  <p className="text-white/80 text-sm">support@car-sale.com</p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-xl mb-3">
                    💬
                  </div>
                  <h4 className="font-medium text-white mb-1">Чат</h4>
                  <p className="text-white/80 text-sm">В приложении или на сайте</p>
                </div>
              </div>
              
              <div className="flex items-center text-white/90 text-sm">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Среднее время ожидания: менее 2 минут</span>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="font-bold text-white mb-3">База знаний</h4>
              <p className="text-white/80 text-sm mb-4">
                Найдите быстрые ответы на часто задаваемые вопросы в нашей базе знаний
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                  <h5 className="font-medium text-white text-sm">Руководство пользователя</h5>
                </div>
                <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                  <h5 className="font-medium text-white text-sm">Видеоуроки</h5>
                </div>
                <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                  <h5 className="font-medium text-white text-sm">Часто задаваемые вопросы</h5>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 bg-white text-primary font-medium rounded-full"
              >
                Открыть базу знаний
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};