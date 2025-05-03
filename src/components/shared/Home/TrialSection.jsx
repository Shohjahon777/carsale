// TrialSection.jsx
'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';

export const TrialSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  
  const trialFeatures = [
    {
      title: "Полный функционал",
      description: "Доступ ко всем возможностям системы без ограничений",
      icon: "✨"
    },
    {
      title: "Техническая поддержка",
      description: "Помощь экспертов на всех этапах тестирования",
      icon: "🛠️"
    },
    {
      title: "Интеграции",
      description: "Возможность протестировать все доступные интеграции",
      icon: "🔄"
    },
    {
      title: "Обучающие материалы",
      description: "Доступ к базе знаний и обучающим видео",
      icon: "📚"
    }
  ];
  
  const steps = [
    {
      number: 1,
      title: "Оставьте заявку",
      description: "Заполните простую форму, и мы свяжемся с вами"
    },
    {
      number: 2,
      title: "Получите доступ",
      description: "Мы настроим тестовый аккаунт специально для вас"
    },
    {
      number: 3,
      title: "Тестируйте систему",
      description: "Изучите возможности платформы в течение 14 дней"
    }
  ];
  
  return (
    <section 
      className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800 relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - информация */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold mb-3"
            >
              ПОПРОБУЙТЕ БЕСПЛАТНО
            </motion.span>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              14 дней бесплатного доступа
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Оцените все возможности нашей системы автоматизации продаж автомобилей совершенно бесплатно в течение 14 дней. Никаких скрытых платежей и обязательств.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {trialFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="flex items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                    {feature.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Начать бесплатный период
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium rounded-full inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Посмотреть демо
              </motion.button>
            </div>
          </motion.div>
          
          {/* Правая колонка - форма и шаги */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Оставьте заявку
              </h3>
              
              <form className="space-y-4 mb-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ваше имя
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Иван Иванов" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Название компании
                  </label>
                  <input 
                    type="text" 
                    id="company" 
                    placeholder="Авто-Престиж" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Электронная почта
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="ivanov@example.com" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Телефон
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="+7 (999) 123-45-67" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="agreement" 
                    className="w-4 h-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="agreement" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    Я согласен с <a href="#" className="text-primary dark:text-primary-light hover:underline">условиями использования</a> и <a href="#" className="text-primary dark:text-primary-light hover:underline">политикой конфиденциальности</a>
                  </label>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 mt-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-lg flex items-center justify-center"
                >
                  Получить доступ
                </motion.button>
              </form>
              
              {/* Шаги процесса */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Как это работает:
                </h4>
                
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                      className="flex items-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {step.title}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Дополнительная информация */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-primary dark:text-primary-light mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Не требуется банковская карта. Никаких скрытых платежей.
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Отзывы о тестовом периоде */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Отзывы компаний, попробовавших тестовый период
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Всего за две недели тестового периода мы увидели, насколько удобнее и быстрее стал процесс продаж. Решение о внедрении было принято единогласно.",
                author: "Алексей Смирнов",
                company: "АвтоЛюкс"
              },
              {
                quote: "Особенно впечатлила техническая поддержка во время тестового периода. Все наши вопросы решались оперативно, а интеграция с нашими системами прошла гладко.",
                author: "Марина Петрова",
                company: "ПремиумКарс"
              },
              {
                quote: "Тестовый период позволил нам не только оценить функционал, но и адаптировать систему под наши уникальные бизнес-процессы. Рекомендуем всем дилерам!",
                author: "Дмитрий Николаев",
                company: "АвтоПрестиж"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 1.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      className="inline-block w-5 h-5 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {testimonial.author}
                    </h4>
                 <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.company}
                    </p>
                  </div>
                  
                  <span className="text-primary dark:text-primary-light text-sm font-medium">
                    Клиент
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};