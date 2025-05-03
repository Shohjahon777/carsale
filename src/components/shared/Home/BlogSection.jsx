// BlogSection.jsx
'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';

export const BlogSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  
  const blogPosts = [
    {
      title: "Как автоматизация помогает увеличить продажи автомобилей на 35%",
      excerpt: "Результаты исследования показывают, что дилерские центры с полной автоматизацией процессов продаж показывают значительный рост конверсии и выручки.",
      category: "Исследования",
      date: "3 дня назад",
      readTime: "6 мин",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=300&h=200&auto=format&fit=crop",
      author: {
        name: "Елена Смирнова",
        position: "Директор по маркетингу",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=50&h=50&auto=format&fit=crop"
      }
    },
    {
      title: "Тренды автомобильного рынка 2025: что ждет дилеров?",
      excerpt: "Анализ ключевых тенденций автомобильного рынка и прогнозы для дилерских центров на предстоящий год.",
      category: "Тренды",
      date: "1 неделя назад",
      readTime: "8 мин",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=300&h=200&auto=format&fit=crop",
      author: {
        name: "Алексей Петров",
        position: "Аналитик рынка",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=50&h=50&auto=format&fit=crop"
      }
    },
    {
      title: "Цифровизация контрактов: юридические аспекты и преимущества",
      excerpt: "Как электронный документооборот упрощает процесс продажи автомобилей и какие юридические нюансы нужно учитывать.",
      category: "Законодательство",
      date: "2 недели назад",
      readTime: "5 мин",
      image: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?q=80&w=300&h=200&auto=format&fit=crop",
      author: {
        name: "Мария Иванова",
        position: "Юрист",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=50&h=50&auto=format&fit=crop"
      }
    }
  ];
  
  return (
    <section 
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="mb-4 md:mb-0"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold mb-3"
            >
              ПОЛЕЗНЫЕ МАТЕРИАЛЫ
            </motion.span>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Блог и новости
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Актуальные статьи, исследования и новости автомобильной отрасли
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium rounded-full shadow-sm inline-flex items-center"
            >
              Все статьи
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-shadow duration-300"
            >
              {/* Изображение */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full shadow-lg"
                  >
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime} чтения</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <div>
                      <span className="block text-sm font-medium text-gray-900 dark:text-white leading-tight">
                        {post.author.name}
                      </span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">
                        {post.author.position}
                      </span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ x: 3 }}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-primary/10 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-light transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Подписка на новости */}
        <motion.div 
          className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {/* Декоративные элементы */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full"></div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Будьте в курсе последних новостей
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Подпишитесь на нашу рассылку, чтобы получать полезные материалы, новости отрасли и советы по оптимизации бизнес-процессов
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Мы отправляем только полезный контент и никакого спама
              </p>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  Еженедельная рассылка с полезными материалами
                </span>
              </div>
              <div className="flex items-start mt-2">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  Приоритетный доступ к вебинарам и мероприятиям
                </span>
              </div>
              <div className="flex items-start mt-2">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  Эксклюзивные исследования и аналитика
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Подписаться на рассылку
              </h4>
              
              <form>
                <div className="mb-3">
                  <input 
                    type="text" 
                    placeholder="Имя" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="flex items-start mb-4">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    className="w-4 h-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="privacy" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    Я согласен с обработкой персональных данных в соответствии с <a href="#" className="text-primary dark:text-primary-light underline">политикой конфиденциальности</a>
                  </label>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-lg"
                >
                  Подписаться
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};