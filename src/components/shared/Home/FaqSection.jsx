'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useMotionValue } from 'framer-motion';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Для интерактивного курсора
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSize = useMotionValue(20);
  
  // Расширенные данные FAQ с категориями и ключевыми словами
  const faqData = [
    {
      question: "Как быстро можно внедрить систему?",
      answer: "Базовое внедрение занимает от 2 до 4 недель, в зависимости от размера компании и необходимых интеграций. Мы предоставляем полное сопровождение на всех этапах внедрения, включая обучение персонала.",
      category: "Внедрение",
      icon: "⏱️",
      popularityScore: 98,
      keywords: ["внедрение", "сроки", "обучение", "запуск"],
      expandedContent: {
        steps: [
          { name: "Анализ бизнес-процессов", duration: "3-5 дней" },
          { name: "Настройка системы", duration: "7-10 дней" },
          { name: "Обучение персонала", duration: "2-5 дней" },
          { name: "Тестовая эксплуатация", duration: "5-7 дней" },
          { name: "Запуск в работу", duration: "1-2 дня" }
        ],
        note: "Параллельно с внедрением мы проводим интеграцию с вашими текущими системами без прерывания рабочих процессов."
      }
    },
    {
      question: "Какая техническая поддержка предоставляется?",
      answer: "Мы обеспечиваем круглосуточную техническую поддержку 24/7 по всем каналам связи: телефон, email, чат. Время реакции на критические инциденты составляет не более 15 минут. Также доступны регулярные обновления и расширения функционала.",
      category: "Поддержка",
      icon: "🛠️",
      popularityScore: 87,
      keywords: ["поддержка", "техподдержка", "обновления", "инциденты"],
      expandedContent: {
        supportLevels: [
          { level: "Базовый", responseTime: "24 часа", availability: "Рабочие дни 9-18" },
          { level: "Расширенный", responseTime: "4 часа", availability: "Ежедневно 8-22" },
          { level: "Премиум", responseTime: "15 минут", availability: "24/7/365" }
        ],
        channels: ["Телефон горячей линии", "Email", "Чат в приложении", "Выделенный менеджер"]
      }
    },
    {
      question: "Можно ли интегрировать систему с нашим текущим ПО?",
      answer: "Да, наша система поддерживает интеграцию с большинством популярных бизнес-приложений через API. Мы также можем разработать индивидуальные коннекторы для специфических решений, используемых в вашей компании.",
      category: "Интеграции",
      icon: "🔄",
      popularityScore: 95,
      keywords: ["интеграция", "API", "коннекторы", "синхронизация"],
      expandedContent: {
        supportedSystems: [
          { name: "1C:Предприятие", integration: "Полная двусторонняя" },
          { name: "SAP", integration: "Полная двусторонняя" },
          { name: "Битрикс24", integration: "Полная двусторонняя" },
          { name: "AmoCRM", integration: "Полная двусторонняя" },
          { name: "MS Dynamics", integration: "Полная двусторонняя" },
          { name: "Другое ПО", integration: "Через REST API" }
        ],
        diagram: "integration-diagram.svg"
      }
    },
    {
      question: "Как обеспечивается безопасность данных?",
      answer: "Мы используем шифрование на всех уровнях, многофакторную аутентификацию, регулярные аудиты безопасности и соответствуем требованиям законодательства о защите персональных данных. Все данные хранятся в защищенных дата-центрах с резервным копированием.",
      category: "Безопасность",
      icon: "🔒",
      popularityScore: 92,
      keywords: ["безопасность", "шифрование", "защита", "данные", "персональные данные"],
      expandedContent: {
        securityMeasures: [
          "Шифрование AES-256 для всех данных в покое и при передаче",
          "Многофакторная аутентификация для всех пользователей",
          "Детальное логирование всех действий в системе",
          "Регулярные пентесты и аудиты безопасности",
          "Соответствие требованиям 152-ФЗ"
        ],
        certifications: ["ISO 27001", "PCI DSS", "GDPR Compliant"]
      }
    },
    {
      question: "Какие варианты лицензирования доступны?",
      answer: "Мы предлагаем гибкую модель лицензирования: подписка (ежемесячная или годовая) с разными тарифными планами в зависимости от функционала и количества пользователей, а также возможность приобретения постоянной лицензии с последующей технической поддержкой.",
      category: "Лицензирование",
      icon: "📜",
      popularityScore: 89,
      keywords: ["лицензия", "подписка", "тарифы", "цены"],
      expandedContent: {
        plans: [
          { name: "Старт", users: "до 10", price: "от 30 000 ₽/мес" },
          { name: "Бизнес", users: "до 50", price: "от 90 000 ₽/мес" },
          { name: "Корпорация", users: "неограниченно", price: "Индивидуально" }
        ],
        discounts: "При годовой оплате предоставляется скидка 20%. Образовательным учреждениям и некоммерческим организациям доступны специальные условия."
      }
    },
    {
      question: "Возможна ли доработка системы под наши требования?",
      answer: "Да, мы предлагаем услуги по кастомизации системы под ваши уникальные бизнес-процессы. Наша команда разработчиков проведет анализ требований и реализует необходимые доработки в кратчайшие сроки.",
      category: "Функционал",
      icon: "🛠️",
      popularityScore: 91,
      keywords: ["доработка", "кастомизация", "настройка", "индивидуально"],
      expandedContent: {
        customizationOptions: [
          "Создание специфических бизнес-процессов",
          "Разработка индивидуальных отчетов и дашбордов",
          "Настройка уникальных интеграций",
          "Создание специализированных модулей",
          "Адаптация интерфейса под корпоративный стиль"
        ],
        process: "Доработка начинается с подробного обсуждения требований и подготовки технического задания. Затем мы предоставляем оценку сроков и стоимости работ. После согласования выполняем разработку и тестирование в тесном контакте с вашей командой."
      }
    },
    {
      question: "Как происходит обучение персонала?",
      answer: "Мы предлагаем комплексное обучение пользователей разных уровней: от базовых навыков для рядовых сотрудников до расширенного курса для администраторов системы. Доступны онлайн и очные тренинги, а также обширная база знаний.",
      category: "Внедрение",
      icon: "🎓",
      popularityScore: 85,
      keywords: ["обучение", "тренинг", "персонал", "пользователи"],
      expandedContent: {
        trainingOptions: [
          { type: "Базовый онлайн-курс", duration: "2 часа", audience: "Рядовые пользователи" },
          { type: "Расширенный тренинг", duration: "1 день", audience: "Менеджеры" },
          { type: "Администрирование системы", duration: "3 дня", audience: "IT-специалисты" },
          { type: "Индивидуальное обучение", duration: "По запросу", audience: "VIP-клиенты" }
        ],
        materials: ["Видеоуроки", "Интерактивные симуляторы", "Учебные пособия", "База знаний"]
      }
    }
  ];
  
  // Все доступные категории
  const categories = [
    { id: 'all', name: 'Все вопросы', icon: '📋' },
    ...Array.from(new Set(faqData.map(item => item.category))).map(cat => ({
      id: cat.toLowerCase(),
      name: cat,
      icon: faqData.find(item => item.category === cat)?.icon || '❓'
    }))
  ];
  
  // Эффект для фильтрации вопросов при вводе в поиск
  useEffect(() => {
    if (searchQuery.trim() === '' && activeCategory === 'all') {
      setFilteredFaqs(faqData);
      setIsSearching(false);
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const filtered = faqData.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category.toLowerCase() === activeCategory;
      const matchesQuery = query === '' || 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query) ||
        faq.keywords.some(keyword => keyword.toLowerCase().includes(query));
      
      return matchesCategory && matchesQuery;
    });
    
    setFilteredFaqs(filtered);
    setIsSearching(searchQuery.trim() !== '');
  }, [searchQuery, activeCategory]);
  
  // Инициализация при первой загрузке
  useEffect(() => {
    setFilteredFaqs(faqData);
  }, []);
  
  // Обработчик движения мыши для интерактивного курсора
  const handleMouseMove = (e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };
  
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    cursorSize.set(openIndex === index ? 20 : 40);
    
    // Возвращаем к нормальному размеру через 0.5 сек
    setTimeout(() => {
      cursorSize.set(20);
    }, 500);
  };
  
  // Форматирование количества популярных запросов
  const formatPopularity = (score) => {
    if (score > 95) return 'Очень частый вопрос';
    if (score > 90) return 'Частый вопрос';
    if (score > 80) return 'Популярный вопрос';
    return 'Стандартный вопрос';
  };
  
  return (
    <section 
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50 overflow-hidden relative"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Кастомный курсор */}
      <motion.div
        className="fixed w-5 h-5 rounded-full bg-primary/30 dark:bg-primary/40 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      
      {/* Декоративные элементы */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold mb-3"
          >
            ПОДДЕРЖКА КЛИЕНТОВ
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ответы на ваши вопросы
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
            Нашли ответы на самые распространенные вопросы о нашей системе управления автодилерами
          </motion.p>
        </motion.div>
        
        {/* Поисковая строка */}
        <motion.div 
          className="relative mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="relative">
            <input 
              type="text" 
              placeholder="Поиск по вопросам..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pl-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg"
            />
            <svg 
              className="absolute left-4 top-4 h-6 w-6 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Результаты поиска */}
          {isSearching && (
            <div className="absolute top-full left-0 right-0 mt-2 text-sm text-gray-500 dark:text-gray-400">
              Найдено результатов: <span className="font-bold text-primary dark:text-primary-light">{filteredFaqs.length}</span>
            </div>
          )}
        </motion.div>
        
        {/* Категории */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Список FAQ */}
        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {filteredFaqs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">По вашему запросу ничего не найдено</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Попробуйте изменить параметры поиска или просмотреть все вопросы
                </p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-full"
                >
                  Показать все вопросы
                </button>
              </motion.div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div 
                    className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 ${
                      openIndex === index ? 'shadow-xl shadow-primary/10' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-start p-6 text-left relative overflow-hidden"
                    >
                      {/* Индикатор популярности */}
                      <div 
                        className="absolute top-0 right-0 px-3 py-1 text-xs font-medium rounded-bl-xl"
                        style={{ 
                          background: `rgba(123, 44, 191, ${faq.popularityScore / 100})`,
                          color: 'white'
                        }}
                      >
                        {formatPopularity(faq.popularityScore)}
                      </div>
                      
                      {/* Иконка */}
                      <div className="mr-4 mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-xl text-primary dark:text-primary-light">
                        {faq.icon}
                      </div>
                      
                      {/* Текст вопроса */}
                      <div className="flex-grow pr-10">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {faq.question}
                        </h3>
                        
                        {/* Бейдж категории */}
                        <div className="flex items-center mt-2">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Иконка раскрытия */}
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-primary dark:text-primary-light ml-4 flex-shrink-0 absolute right-6 top-6"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>
                    
                    {/* Анимированный контент ответа */}
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-gray-700 dark:text-gray-300 mb-4">
                              {faq.answer}
                            </div>
                            
                            {/* Расширенное содержимое */}
                            <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                              {faq.expandedContent.steps && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Этапы внедрения:</h4>
                                  <div className="relative pl-8">
                                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-primary/30 dark:bg-primary/50"></div>
                                    
                                    {faq.expandedContent.steps.map((step, idx) => (
                                      <motion.div 
                                        key={idx}
                                        className="mb-3 relative"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                      >
                                        <div className="absolute -left-5 top-0 w-4 h-4 rounded-full bg-primary"></div>
                                        <div className="flex justify-between">
                                          <span className="font-medium text-gray-800 dark:text-gray-200">{step.name}</span>
                                          <span className="text-sm text-gray-500 dark:text-gray-400">{step.duration}</span>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                  
                                  {faq.expandedContent.note && (
                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 italic">
                                      {faq.expandedContent.note}
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {faq.expandedContent.supportLevels && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Уровни поддержки:</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {faq.expandedContent.supportLevels.map((level, idx) => (
                                      <motion.div 
                                        key={idx}
                                        className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                      >
                                        <div className="text-primary dark:text-primary-light font-bold mb-1">{level.level}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                          <div>Время отклика: {level.responseTime}</div>
                                          <div>Доступность: {level.availability}</div>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                  
                                  {faq.expandedContent.channels && (
                                    <div className="mt-3">
                                      <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Каналы связи:</h5>
                                      <div className="flex flex-wrap gap-2">
                                        {faq.expandedContent.channels.map((channel, idx) => (
                                          <span 
                                            key={idx}
                                            className="px-2 py-1 text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light rounded-full"
                                          >
                                            {channel}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {faq.expandedContent.supportedSystems && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Поддерживаемые системы:</h4>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {faq.expandedContent.supportedSystems.map((system, idx) => (
                                      <motion.div 
                                        key={idx}
                                        className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                      >
                                       <div className="font-medium text-gray-800 dark:text-gray-200">{system.name}</div>
                                        <div className="text-xs text-primary dark:text-primary-light">{system.integration}</div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {faq.expandedContent.securityMeasures && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Меры безопасности:</h4>
                                  <div className="space-y-2">
                                    {faq.expandedContent.securityMeasures.map((measure, idx) => (
                                      <motion.div 
                                        key={idx}
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                      >
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
                                        <div className="text-sm text-gray-700 dark:text-gray-300">{measure}</div>
                                      </motion.div>
                                    ))}
                                  </div>
                                  
                                  {faq.expandedContent.certifications && (
                                    <div className="mt-3">
                                      <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Сертификации:</h5>
                                      <div className="flex flex-wrap gap-2">
                                        {faq.expandedContent.certifications.map((cert, idx) => (
                                          <span 
                                            key={idx}
                                            className="px-2 py-1 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full"
                                          >
                                            {cert}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {faq.expandedContent.plans && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Тарифные планы:</h4>
                                  <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                      <thead className="bg-gray-100 dark:bg-gray-800">
                                        <tr>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">План</th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Пользователи</th>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Стоимость</th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {faq.expandedContent.plans.map((plan, idx) => (
                                          <motion.tr 
                                            key={idx}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + idx * 0.1 }}
                                          >
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">{plan.name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{plan.users}</td>
                                            <td className="px-4 py-2 text-sm text-primary dark:text-primary-light font-medium">{plan.price}</td>
                                          </motion.tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  
                                  {faq.expandedContent.discounts && (
                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                      <strong>Скидки:</strong> {faq.expandedContent.discounts}
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {faq.expandedContent.customizationOptions && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Возможности доработки:</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {faq.expandedContent.customizationOptions.map((option, idx) => (
                                      <motion.div 
                                        key={idx}
                                        className="flex items-center"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                      >
                                        <span className="text-primary dark:text-primary-light mr-2">•</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
                                      </motion.div>
                                    ))}
                                  </div>
                                  
                                  {faq.expandedContent.process && (
                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                      <strong>Процесс доработки:</strong> {faq.expandedContent.process}
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {faq.expandedContent.trainingOptions && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Варианты обучения:</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {faq.expandedContent.trainingOptions.map((option, idx) => (
                                      <motion.div 
                                        key={idx}
                                        className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                      >
                                        <div className="font-medium text-gray-900 dark:text-white mb-1">{option.type}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Длительность: {option.duration}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Для: {option.audience}</div>
                                      </motion.div>
                                    ))}
                                  </div>
                                  
                                  {faq.expandedContent.materials && (
                                    <div className="mt-3">
                                      <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Учебные материалы:</h5>
                                      <div className="flex flex-wrap gap-2">
                                        {faq.expandedContent.materials.map((material, idx) => (
                                          <span 
                                            key={idx}
                                            className="px-2 py-1 text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light rounded-full"
                                          >
                                            {material}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            {/* Кнопки для связи */}
                            <div className="mt-6 flex flex-wrap gap-3">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-full shadow-md inline-flex items-center"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Задать уточняющий вопрос
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full shadow-sm inline-flex items-center"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Документация по теме
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full shadow-sm inline-flex items-center"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                </svg>
                                Демонстрация функционала
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        
        {/* CTA секция */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="relative">
            {/* Декоративные элементы */}
            <div className="absolute -top-8 left-1/4 w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/30 blur-xl"></div>
            <div className="absolute -bottom-8 right-1/4 w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/30 blur-xl"></div>
            
            <div className="bg-gradient-to-r from-primary/10 via-white to-primary/10 dark:from-primary/20 dark:via-gray-800 dark:to-primary/20 rounded-2xl p-8 max-w-2xl mx-auto shadow-lg relative overflow-hidden border border-gray-100 dark:border-gray-700">
              <motion.div 
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/10 dark:bg-primary/20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 15, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
                Не нашли ответ на свой вопрос?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 relative z-10">
                Свяжитесь с нами напрямую, и мы с удовольствием ответим на все ваши вопросы
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(123, 44, 191, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Написать нам
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium rounded-full inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                  </svg>
                  Позвонить в поддержку
                </motion.button>
              </div>
              
              <div className="flex items-center justify-center mt-6 relative z-10 gap-4">
                <motion.a 
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.126-5.864 10.126-11.854z"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05-.78-.83-1.9-1.36-3.13-1.36-2.37 0-4.3 1.92-4.3 4.3 0 .33.03.66.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4.01 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16.44 21 21.06 14.16 21.06 8.29V7.84c.85-.62 1.56-1.387 2.14-2.27z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Стили для 3D эффектов и анимаций */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        .float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};