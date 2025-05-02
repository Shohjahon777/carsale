'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from 'framer-motion';
import * as d3 from 'd3';

interface Integration {
  name: string;
  icon: string;
  category: string;
  description: string;
  popularityScore: number;
  logo?: string;
}

export const IntegrationsSection = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const chartRef = useRef(null);
  
  // Расширенный список интеграций с дополнительной информацией
  const integrations: Integration[] = [
    { 
      name: "1C", 
      icon: "💼", 
      category: "Учет", 
      description: "Полная синхронизация данных с 1С: Предприятие, включая автоматический импорт каталога, выгрузку заказов и актуализацию остатков в режиме реального времени.",
      popularityScore: 85,
      logo: "/assets/logos/1c.svg"
    },
    { 
      name: "Битрикс24", 
      icon: "🔄", 
      category: "CRM", 
      description: "Двусторонняя интеграция с Битрикс24 с автоматической передачей лидов, синхронизацией статусов сделок и возможностью управления документами.",
      popularityScore: 92,
      logo: "/assets/logos/bitrix24.svg"
    },
    { 
      name: "SAP", 
      icon: "🏢", 
      category: "ERP", 
      description: "Корпоративная интеграция с SAP ERP для крупных автодилеров, обеспечивающая единую экосистему управления финансами, складом и логистикой.",
      popularityScore: 78,
      logo: "/assets/logos/sap.svg"
    },
    { 
      name: "AmoCRM", 
      icon: "📊", 
      category: "CRM", 
      description: "Расширенная интеграция с AmoCRM, включая настраиваемые воронки продаж, автоматические уведомления и систему скоринга клиентов.",
      popularityScore: 88,
      logo: "/assets/logos/amocrm.svg"
    },
    { 
      name: "МойСклад", 
      icon: "📦", 
      category: "Склад", 
      description: "Интеграция с МойСклад для полного контроля товарных позиций, автоматического обновления наличия авто и запчастей и управления поставками.",
      popularityScore: 76,
      logo: "/assets/logos/moysklad.svg"
    },
    { 
      name: "СБИС", 
      icon: "📝", 
      category: "Документы", 
      description: "Электронный документооборот через СБИС с возможностью цифрового подписания контрактов, автоматического формирования отчётности и обмена юридически значимыми документами.",
      popularityScore: 72,
      logo: "/assets/logos/sbis.svg"
    },
    { 
      name: "Telegram", 
      icon: "📱", 
      category: "Мессенджеры", 
      description: "Встроенный бот для Telegram, который отправляет уведомления клиентам, помогает выбрать автомобиль и записаться на тест-драйв прямо в мессенджере.",
      popularityScore: 94,
      logo: "/assets/logos/telegram.svg"
    },
    { 
      name: "WhatsApp", 
      icon: "💬", 
      category: "Мессенджеры", 
      description: "Интеграция с WhatsApp Business API для отправки уведомлений, консультаций и подтверждений бронирования, с полной историей переписки в CRM.",
      popularityScore: 90,
      logo: "/assets/logos/whatsapp.svg"
    },
    { 
      name: "Яндекс Метрика", 
      icon: "📈", 
      category: "Аналитика", 
      description: "Расширенные возможности аналитики с помощью Яндекс Метрики, включая отслеживание воронки продаж, эффективности рекламных кампаний и поведения пользователей.",
      popularityScore: 83,
      logo: "/assets/logos/yandex.svg"
    },
    { 
      name: "Google Analytics", 
      icon: "🔍", 
      category: "Аналитика", 
      description: "Полная интеграция с Google Analytics 4 для сквозной аналитики, построения атрибуционных моделей и оценки эффективности маркетинговых каналов.",
      popularityScore: 86,
      logo: "/assets/logos/google.svg"
    },
    { 
      name: "Stripe", 
      icon: "💳", 
      category: "Платежи", 
      description: "Прием онлайн-платежей через Stripe с поддержкой рассрочки, регулярных платежей и разнообразных платежных методов по всему миру.",
      popularityScore: 81,
      logo: "/assets/logos/stripe.svg"
    },
    { 
      name: "ЮKassa", 
      icon: "💰", 
      category: "Платежи", 
      description: "Интеграция с ЮKassa для приема платежей, внесения предоплаты за автомобили и сервисное обслуживание, с поддержкой всех популярных способов оплаты в России.",
      popularityScore: 79,
      logo: "/assets/logos/yookassa.svg"
    },
  ];
  
  // Получаем все уникальные категории
  const categories = ['all', ...Array.from(new Set(integrations.map(i => i.category)))];
  
  // Фильтрация интеграций по категории и поисковому запросу
  const filteredIntegrations = integrations
    .filter(i => filter === 'all' || i.category === filter)
    .filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                i.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                i.category.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Генерируем диаграмму популярности интеграций
  useEffect(() => {
    if (!isInView || !chartRef.current || typeof window === 'undefined') return;
    
    try {
      // Очищаем предыдущий график
      d3.select(chartRef.current).selectAll("*").remove();
      
      const container = chartRef.current;
      const width = container.clientWidth;
      const height = 300;
      const margin = { top: 30, right: 30, bottom: 70, left: 60 };
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;
      
      // Создаем SVG
      const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("style", "max-width: 100%; height: auto;");
      
      // Добавляем группу для графика
      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      
      // Выбираем только топ-8 популярных интеграций
      const topIntegrations = [...integrations]
        .sort((a, b) => b.popularityScore - a.popularityScore)
        .slice(0, 8);
      
      // Создаем шкалы
      const x = d3.scaleBand()
        .domain(topIntegrations.map(d => d.name))
        .range([0, chartWidth])
        .padding(0.3);
      
      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([chartHeight, 0]);
      
      // Создаем градиент для столбцов
      const defs = svg.append("defs");
      const gradient = defs.append("linearGradient")
        .attr("id", "barGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#7B2CBF");
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#9D4EDD");
      
      // Добавляем оси
      g.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "12px")
        .style("fill", "#666");
      
      g.append("g")
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
        .selectAll("text")
        .style("font-size", "12px")
        .style("fill", "#666");
      
      // Добавляем сетку
      g.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y)
          .tickSize(-chartWidth)
          .tickFormat('')
          .ticks(5))
        .select(".domain")
        .remove();
      
      g.selectAll(".grid line")
        .attr("stroke", "#e0e0e0")
        .attr("stroke-opacity", 0.7);
      
      // Добавляем заголовок
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#666")
        .style("font-weight", "bold")
        .text("Популярность интеграций");
      
      // Рисуем столбцы с анимацией
      g.selectAll(".bar")
        .data(topIntegrations)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("width", x.bandwidth())
        .attr("y", chartHeight)
        .attr("height", 0)
        .attr("fill", "url(#barGradient)")
        .attr("rx", 4)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr("y", d => y(d.popularityScore))
        .attr("height", d => chartHeight - y(d.popularityScore));
      
      // Добавляем метки значений над столбцами
      g.selectAll(".label")
        .data(topIntegrations)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => x(d.name) + x.bandwidth() / 2)
        .attr("y", d => y(d.popularityScore) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "#666")
        .style("font-weight", "bold")
        .style("opacity", 0)
        .text(d => `${d.popularityScore}%`)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100 + 500)
        .style("opacity", 1);
      
    } catch (error) {
      console.error("Ошибка при создании графика:", error);
    }
  }, [isInView, filter]);
  
  const openIntegrationDetails = (integration: Integration) => {
    setSelectedIntegration(integration);
  };
  
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50" ref={sectionRef}>
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-primary dark:text-primary-light font-semibold mb-2">РАСШИРЯЙТЕ ВОЗМОЖНОСТИ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Мощные интеграции для вашего бизнеса
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Наша система легко интегрируется с популярными бизнес-приложениями и сервисами, 
            создавая единую экосистему для управления автомобильным бизнесом
          </p>
        </motion.div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            {/* Фильтры категорий */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category 
                      ? 'bg-primary text-white shadow-md shadow-primary/20' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === 'all' ? 'Все' : category}
                </motion.button>
              ))}
            </div>
            
            {/* Поиск и переключение вида */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <input 
                  type="text" 
                  placeholder="Поиск интеграций..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <svg 
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`p-2 rounded-full ${
                    isGridView ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`p-2 rounded-full ${
                    !isGridView ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* График популярности - виден только в режиме списка */}
          <AnimatePresence>
            {!isGridView && (
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div ref={chartRef} className="w-full h-[300px]"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Отображение интеграций в виде сетки или списка */}
        <AnimatePresence mode="wait">
          {isGridView ? (
            <motion.div 
              key="grid"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredIntegrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
                  onClick={() => openIntegrationDetails(integration)}
                >
                  <div className="flex flex-col items-center justify-center text-center h-40">
                    <div className="text-4xl mb-3 bg-primary/10 dark:bg-primary-dark/20 w-16 h-16 rounded-full flex items-center justify-center">
                      {integration.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {integration.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {integration.category}
                    </span>
                    <div className="w-full mt-3 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary to-primary-light"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${integration.popularityScore}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredIntegrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 cursor-pointer"
                  onClick={() => openIntegrationDetails(integration)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl bg-primary/10 dark:bg-primary-dark/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      {integration.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {integration.name}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {integration.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {integration.description}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="w-full h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-primary to-primary-light"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${integration.popularityScore}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                          ></motion.div>
                        </div>
                        <span className="ml-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                          {integration.popularityScore}%
                        </span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Модальное окно с деталями интеграции */}
        <AnimatePresence>
          {selectedIntegration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              onClick={() => setSelectedIntegration(null)}
            >
           <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl bg-primary/10 dark:bg-primary-dark/20 w-16 h-16 rounded-full flex items-center justify-center">
                      {selectedIntegration.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedIntegration.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {selectedIntegration.category}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setSelectedIntegration(null)}
                  >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {selectedIntegration.description}
                </p>
                
                {/* Рейтинг популярности */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Популярность среди автодилеров
                  </h4>
                  <div className="flex items-center">
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary to-primary-light"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedIntegration.popularityScore}%` }}
                        transition={{ duration: 0.8 }}
                      ></motion.div>
                    </div>
                    <span className="ml-3 font-bold text-primary dark:text-primary-light">
                      {selectedIntegration.popularityScore}%
                    </span>
                  </div>
                </div>
                
                {/* Ключевые возможности */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Ключевые возможности
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Синхронизация данных в реальном времени",
                      "Автоматизация рутинных процессов",
                      "Единый интерфейс управления",
                      "Масштабируемое решение для бизнеса",
                      "Настраиваемые правила и триггеры",
                      "Подробная аналитика и отчеты"
                    ].map((feature, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <svg className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* Процесс интеграции */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Процесс интеграции
                  </h4>
                  <div className="relative pl-8">
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    
                    {["Подключение API-ключей", "Настройка правил синхронизации", "Тестирование на демо-данных", "Запуск в рабочем режиме"].map((step, index) => (
                      <motion.div 
                        key={index}
                        className="mb-4 relative"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="absolute -left-8 bg-primary rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {step}
                        </h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {index === 0 && "Получите и настройте API-ключи в личном кабинете."}
                          {index === 1 && "Определите, какие данные и события будут синхронизироваться."}
                          {index === 2 && "Проверьте работу на тестовых данных перед запуском."}
                          {index === 3 && "Запустите интеграцию в боевом режиме с мониторингом."}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Кнопки действий */}
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-white dark:bg-gray-700 border border-primary dark:border-primary-light text-primary dark:text-primary-light rounded-full text-sm font-medium"
                  >
                    Подробная документация
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium"
                  >
                    Подключить интеграцию
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Отображение, если нет результатов */}
        {filteredIntegrations.length === 0 && (
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-md border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Интеграции не найдены
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Не найдено интеграций, соответствующих вашему запросу. Попробуйте изменить параметры поиска.
            </p>
            <button 
              onClick={() => {setFilter('all'); setSearchTerm('');}}
              className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Сбросить фильтры
            </button>
          </motion.div>
        )}
        
        {/* CTA секция */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Не нашли нужную интеграцию?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Мы постоянно расширяем список доступных интеграций. Свяжитесь с нами, чтобы заказать разработку 
            специальной интеграции для вашего бизнеса.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-colors shadow-lg inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Запросить интеграцию
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium rounded-full transition-colors inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Техническая консультация
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};