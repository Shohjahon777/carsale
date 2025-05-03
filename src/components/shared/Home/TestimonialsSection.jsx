'use client';

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Для эффекта "плавающего" 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  
  // Расширенные данные отзывов с дополнительной информацией
  const testimonials = [
    {
      name: "Автосалон «Престиж»",
      position: "Сеть из 5 автосалонов",
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=150&h=150&auto=format&fit=crop",
      personImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
      personName: "Александр Никитин",
      personPosition: "Директор по продажам",
      quote: "После внедрения системы время оформления сделки сократилось на 40%. Менеджеры довольны, клиенты тоже.",
      extendedQuote: "Наши показатели конверсии выросли в первый же месяц. Система полностью изменила подход к работе с клиентами, позволив нам сосредоточиться на качестве сервиса, а не на оформлении документов.",
      rating: 5,
      stats: { sales: "+25%", efficiency: "+40%", clients: "+30%" },
      color: "#7B2CBF",
      badges: ["Премиум интеграция", "Полная автоматизация", "Лидер продаж"],
      implementationDate: "Март 2024",
      previousSystem: "1C Автосалон"
    },
    {
      name: "ГК «АвтоЛидер»",
      position: "Официальный дилер 3 брендов",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=150&h=150&auto=format&fit=crop",
      personImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop",
      personName: "Елена Соколова",
      personPosition: "CEO",
      quote: "Интеграция со складом позволила нам в реальном времени отслеживать наличие автомобилей и предлагать клиентам актуальные варианты.",
      extendedQuote: "Благодаря единой системе управления складом и продажами мы избавились от ситуаций, когда менеджеры предлагали клиентам уже проданные автомобили. Это существенно повысило доверие к нашему салону.",
      rating: 5,
      stats: { sales: "+18%", efficiency: "+35%", clients: "+22%" },
      color: "#0891B2",
      badges: ["Склад и CRM", "Мультибренд", "Быстрый старт"],
      implementationDate: "Январь 2024",
      previousSystem: "Excel + самописная CRM"
    },
    {
      name: "«Моторс Плюс»",
      position: "Премиальный сегмент",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=150&h=150&auto=format&fit=crop",
      personImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&h=150&auto=format&fit=crop",
      personName: "Михаил Дорохов",
      personPosition: "Руководитель направления",
      quote: "Система позволила нам обеспечить высокий уровень сервиса для требовательных клиентов. Все документы оформляются быстро и без ошибок.",
      extendedQuote: "Работа с премиальным сегментом требует безупречного сервиса. Теперь мы можем предложить клиенту цифровой контракт за считанные минуты, не заставляя его ждать и заполнять десятки бумаг.",
      rating: 4.9,
      stats: { sales: "+20%", efficiency: "+33%", clients: "+15%" },
      color: "#F59E0B",
      badges: ["Премиум сегмент", "Электронные контракты", "Высокий NPS"],
      implementationDate: "Февраль 2024",
      previousSystem: "SAP"
    }
  ];
  
  // Управление автопрокруткой
  useEffect(() => {
    if (autoplay && isInView) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, isInView, testimonials.length]);
  
  // Обработчик движения мыши для 3D-эффекта
  const handleMouseMove = (e) => {
    if (!carouselRef.current) return;
    const rect = carouselRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    // Плавный возврат в исходное положение
    mouseX.set(0);
    mouseY.set(0);
    setAutoplay(true);
  };
  
  const handleMouseEnter = () => {
    setAutoplay(false);
  };
  
  // Генерация градиентной строки для фона
  const getGradientBackground = (color) => {
    return `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`;
  };
  
  // Вычисление процента позитивных отзывов
  const positiveReviewPercentage = Math.round(
    (testimonials.reduce((acc, item) => acc + (item.rating >= 4.5 ? 1 : 0), 0) / testimonials.length) * 100
  );
  
  return (
    <section 
      className="py-20 px-4 overflow-hidden relative" 
      ref={sectionRef}
      style={{ 
        background: `radial-gradient(circle at 30% 70%, rgba(123, 44, 191, 0.08), transparent 20%), 
                     radial-gradient(circle at 70% 30%, rgba(157, 78, 221, 0.08), transparent 20%)`,
      }}
    >
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold mb-3"
          >
            ИСТОРИИ УСПЕХА
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Что говорят наши клиенты
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
            Более 200 автодилеров уже трансформировали свой бизнес с нашей системой
          </motion.p>
        </motion.div>
        
        {/* Статистика отзывов */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-4xl font-bold text-primary dark:text-primary-light">{testimonials.length * 43}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Активных внедрений</div>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-4xl font-bold text-primary dark:text-primary-light">{positiveReviewPercentage}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Положительных отзывов</div>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-4xl font-bold text-primary dark:text-primary-light">3.5x</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Рост эффективности</div>
          </div>
        </motion.div>
        
        {/* 3D карусель отзывов */}
        <div 
          ref={carouselRef}
          className="relative mx-auto max-w-7xl perspective-1000 mb-12"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <motion.div
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9, z: -100 }}
                animate={{ opacity: 1, scale: 1, z: 0 }}
                exit={{ opacity: 0, scale: 0.9, z: -100 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative"
              >
               <div 
  className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
  style={{ background: getGradientBackground(testimonials[activeIndex].color) }}
>
                  {/* Левая колонка с информацией о компании */}
                  <div className="lg:col-span-4 relative overflow-hidden bg-white dark:bg-gray-800 p-8 flex flex-col">
                    {/* Фоновый элемент */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{ 
                        background: `radial-gradient(circle at 30% 70%, ${testimonials[activeIndex].color}, transparent 60%)` 
                      }}
                    ></div>
                    
                    {/* Логотип компании */}
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-700 p-1 shadow-lg mb-6 overflow-hidden">
                        <img 
                          src={testimonials[activeIndex].image} 
                          alt={testimonials[activeIndex].name} 
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {testimonials[activeIndex].name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {testimonials[activeIndex].position}
                      </p>
                    </div>
                    
                    {/* Бейджи */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {testimonials[activeIndex].badges.map((badge, idx) => (
                        <motion.span 
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="px-3 py-1 text-xs font-medium rounded-full"
                          style={{ 
                            background: `${testimonials[activeIndex].color}15`,
                            color: testimonials[activeIndex].color,
                            border: `1px solid ${testimonials[activeIndex].color}30`
                          }}
                        >
                          {badge}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Информация о внедрении */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Внедрение:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{testimonials[activeIndex].implementationDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Предыдущая система:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{testimonials[activeIndex].previousSystem}</span>
                      </div>
                    </div>
                    
                    {/* Статистика результатов */}
                    <div className="mt-auto">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Результаты внедрения:</div>
                      <div className="grid grid-cols-3 gap-3">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="rounded-lg p-3"
                          style={{ background: `${testimonials[activeIndex].color}10` }}
                        >
                          <div className="text-lg font-bold" style={{ color: testimonials[activeIndex].color }}>
                            {testimonials[activeIndex].stats.sales}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Продажи
                          </div>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="rounded-lg p-3"
                          style={{ background: `${testimonials[activeIndex].color}10` }}
                        >
                          <div className="text-lg font-bold" style={{ color: testimonials[activeIndex].color }}>
                            {testimonials[activeIndex].stats.efficiency}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Эффективность
                          </div>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="rounded-lg p-3"
                          style={{ background: `${testimonials[activeIndex].color}10` }}
                        >
                          <div className="text-lg font-bold" style={{ color: testimonials[activeIndex].color }}>
                            {testimonials[activeIndex].stats.clients}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Клиенты
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Правая колонка с отзывом */}
                  <div className="lg:col-span-8 p-8 bg-white dark:bg-gray-800 relative">
                    {/* Декоративные элементы */}
                    <div 
                      className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                      style={{ background: `radial-gradient(circle, ${testimonials[activeIndex].color}, transparent 70%)` }}
                    ></div>
                    
                    <div className="flex items-start mb-8">
                      {/* Фото представителя компании */}
                      <div className="flex-shrink-0 mr-4">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-lg"
                          style={{ borderColor: testimonials[activeIndex].color }}
                        >
                          <img 
                            src={testimonials[activeIndex].personImage} 
                            alt={testimonials[activeIndex].personName} 
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </div>
                      
                      {/* Информация о представителе */}
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          {testimonials[activeIndex].personName}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonials[activeIndex].personPosition}
                        </p>
                        
                        {/* Рейтинг со звездами */}
                        <div className="flex items-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <motion.svg 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(testimonials[activeIndex].rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                          ))}
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            {testimonials[activeIndex].rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Стилизованная цитата */}
                    <div className="relative mb-8">
                      <svg 
                        className="w-12 h-12 absolute -top-6 -left-6 text-gray-200 dark:text-gray-700" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 4.15-2.246 4.983-3.85h-4.983v-12h9.978zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 4.15-2.246 4.983-3.85h-4.983v-12h9.996z" />
                      </svg>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-6 shadow-sm relative"
                      >
                        <p className="text-lg md:text-xl text-gray-800 dark:text-gray-100 mb-4 leading-relaxed italic">
                          "{testimonials[activeIndex].quote}"
                        </p>
                        <p className="text-base text-gray-600 dark:text-gray-300">
                          {testimonials[activeIndex].extendedQuote}
                        </p>
                      </motion.div>
                    </div>
                    
                    {/* Интерактивная шкала внедрения */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Процесс внедрения</span>
                        <span className="text-sm font-bold" style={{ color: testimonials[activeIndex].color }}>Завершено</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full"
                          style={{ background: testimonials[activeIndex].color }}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: 0.6 }}
                        ></motion.div>
                      </div>
                      
                      {/* Шаги внедрения */}
                      <div className="flex justify-between mt-2">
                        {['Подключение', 'Настройка', 'Обучение', 'Запуск'].map((step, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + idx * 0.2 }}
                            className="flex flex-col items-center"
                          >
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                              style={{ background: testimonials[activeIndex].color }}
                            >
                              ✓
                            </div>
                            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">{step}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Индикатор и кнопки управления */}
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-12 h-1 rounded-full transition-all duration-300 ${
                              index === activeIndex 
                                ? '' 
                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                            }`}
                            style={{ 
                              backgroundColor: index === activeIndex 
                                ? testimonials[activeIndex].color 
                                : undefined
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                          </svg>
                        </motion.button>
                        
                        <motion.button
                          onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* CTA Секция */}
        <motion.div 
          className="relative mx-auto max-w-4xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative px-8 py-10 md:p-12 text-center">
              {/* Фоновые элементы */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/5 rounded-full"></div>
              
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 100 }}
                  className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6"
             >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  Готовы присоединиться к успешным компаниям?
                </motion.h3>
                
                <motion.p 
                  className="text-white/80 mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Запишитесь на демонстрацию и наши эксперты покажут, как система может трансформировать именно ваш бизнес
                </motion.p>
                
                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-white text-primary font-medium rounded-full shadow-xl transform transition-all duration-300 hover:translate-y-[-3px]"
                  >
                    Запросить демонстрацию
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-transparent border-2 border-white/50 text-white font-medium rounded-full hover:bg-white/10 transform transition-all duration-300 hover:translate-y-[-3px]"
                  >
                    Изучить кейсы
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Логотипы компаний клиентов */}
        <div className="mt-20">
          <motion.p 
            className="text-center text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.9 }}
          >
            Нам доверяют ведущие компании автомобильной отрасли
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            {/* Здесь можно добавить логотипы компаний, в данном примере используем заглушки */}
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ delay: 1 + idx * 0.1 }}
                className="h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all"
              >
                <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                  <div className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    ЛОГО {idx + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* CSS для 3D эффектов */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};