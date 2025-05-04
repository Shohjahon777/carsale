'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTelegram } from '@/src/hooks/useTelegram';
import { useLanguageStore } from '@/src/store/language';

// Импортируем иконки
import {
  ArrowRightIcon,
  PlayIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CubeTransparentIcon,
  CogIcon,
  LightBulbIcon,
  ClockIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

// Компонент демо-секции с интерактивным интерфейсом
const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState('crm');
  const demoRef = useRef(null);
  const isInView = useInView(demoRef, { once: true, threshold: 0.3 });
  const [isPlaying, setIsPlaying] = useState(false);

  const tabData = {
    crm: {
      title: 'CRM для автодилеров',
      description: 'Интерактивная демонстрация CRM-системы для управления продажами автомобилей. Интуитивный интерфейс позволяет эффективно вести клиентов через всю воронку продаж.',
      features: ['Карточки клиентов', 'Воронка продаж', 'Календарь встреч', 'История активности'],
      color: '#7B2CBF'
    },
    inventory: {
      title: 'Учет складов и автомобилей',
      description: 'Система управления автомобильным парком позволяет отслеживать состояние, местоположение и доступность каждого автомобиля в реальном времени.',
      features: ['Каталог автомобилей', 'Статусы доступности', 'Учет документов', 'Фото и описания'],
      color: '#0891B2'
    },
    contracts: {
      title: 'Электронные контракты',
      description: 'Генерируйте договоры, акты и счета в несколько кликов. Система упрощает документооборот и ускоряет процесс оформления сделок.',
      features: ['Шаблоны документов', 'Электронная подпись', 'Архив контрактов', 'Проверка статуса'],
      color: '#F59E0B'
    },
    analytics: {
      title: 'Аналитика и отчетность',
      description: 'Интерактивные дашборды предоставляют детальную аналитику по продажам, маркетингу и работе менеджеров в наглядном визуальном формате.',
      features: ['Интерактивные графики', 'Фильтры и сегментация', 'Экспорт отчетов', 'Прогнозирование'],
      color: '#DC2626'
    }
  };

  return (
    <motion.div
      ref={demoRef}
      className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Верхняя панель с табами */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {Object.keys(tabData).map((tab) => (
          <button
            key={tab}
            className={`relative px-6 py-3 flex items-center text-sm font-medium ${
              activeTab === tab
                ? 'text-primary dark:text-primary-light'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            {tabData[tab].title}
          </button>
        ))}
      </div>

      {/* Контент демо */}
      <div className="p-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-video w-full overflow-hidden"
          >
            {/* Заглушка интерфейса */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <div className="absolute inset-0 p-4 flex flex-col">
                {/* Заголовок интерфейса */}
                <div className="flex justify-between items-center mb-4">
                  <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </div>

                {/* Макет контента в зависимости от вкладки */}
                {activeTab === 'crm' && (
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    <div className="col-span-1 bg-white dark:bg-gray-700 rounded-xl shadow-md p-3 h-full flex flex-col">
                      <div className="h-5 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
                      <div className="space-y-3 flex-1">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <div
                            key={item}
                            className={`h-12 rounded-lg ${
                              item === 2
                                ? 'bg-primary/20 dark:bg-primary/30'
                                : 'bg-gray-100 dark:bg-gray-600'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-3 bg-white dark:bg-gray-700 rounded-xl shadow-md h-full p-4">
                      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-600 rounded mb-6"></div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="h-24 bg-gray-100 dark:bg-gray-600 rounded-lg"></div>
                        ))}
                      </div>
                      
                      <div className="space-y-3">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center px-4">
                            <div className="h-4 w-4 bg-primary/40 rounded-full mr-3"></div>
                            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-500 rounded"></div>
                            <div className="ml-auto h-4 w-24 bg-gray-200 dark:bg-gray-500 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'inventory' && (
                  <div className="flex-1 grid grid-cols-12 gap-4">
                    <div className="col-span-3 bg-white dark:bg-gray-700 rounded-xl shadow-md p-3 h-full">
                      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <div key={item} className="h-5 bg-gray-100 dark:bg-gray-600 rounded"></div>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-9 grid grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                          key={item}
                          className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden"
                        >
                          <div className="h-24 bg-gray-200 dark:bg-gray-600"></div>
                          <div className="p-3">
                            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                            <div className="h-4 w-full bg-gray-100 dark:bg-gray-600 rounded mb-2"></div>
                            <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-600 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'contracts' && (
                  <div className="flex-1 flex gap-4">
                    <div className="w-1/3 bg-white dark:bg-gray-700 rounded-xl shadow-md p-4 h-full">
                      <div className="h-6 w-40 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
                      <div className="space-y-3">
                        {[1, 2, 3, 4].map((item) => (
                          <div
                            key={item}
                            className={`h-16 rounded-lg p-3 ${
                              item === 1
                                ? 'bg-primary/20 dark:bg-primary/30 border-l-4 border-primary'
                                : 'bg-gray-100 dark:bg-gray-600'
                            }`}
                          >
                            <div className="h-4 w-28 bg-gray-200 dark:bg-gray-500 rounded mb-2"></div>
                            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-500 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-2/3 bg-white dark:bg-gray-700 rounded-xl shadow-md h-full p-4">
                      <div className="flex justify-between mb-6">
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        <div className="flex gap-2">
                          <div className="h-8 w-24 bg-primary/30 dark:bg-primary/40 rounded-md"></div>
                          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
                        </div>
                      </div>
                      
                      <div className="h-64 w-full bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                        <div className="h-32 w-32 bg-gray-200 dark:bg-gray-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'analytics' && (
                  <div className="flex-1 grid grid-cols-12 gap-4">
                    <div className="col-span-12 bg-white dark:bg-gray-700 rounded-xl shadow-md p-4 h-16 flex items-center">
                      <div className="space-x-4 flex">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="h-6 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        ))}
                      </div>
                      <div className="ml-auto space-x-2 flex">
                        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        <div className="h-8 w-8 bg-primary/30 dark:bg-primary/40 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="col-span-8 bg-white dark:bg-gray-700 rounded-xl shadow-md p-4 h-64">
                      <div className="h-6 w-48 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
                      <div className="h-40 w-full bg-gray-100 dark:bg-gray-600 rounded-lg flex items-end px-4 pb-4">
                        {[30, 60, 45, 75, 50, 80, 65].map((height, index) => (
                          <motion.div
                            key={index}
                            className="h-full flex-1 mx-2 flex items-end"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 1 }}
                          >
                            <motion.div
                              className="w-full bg-primary/60 dark:bg-primary/70 rounded-t"
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{
                                type: "spring",
                                stiffness: 50,
                                delay: index * 0.1 + 1
                              }}
                            ></motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="col-span-4 space-y-4">
                      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-4 h-32">
                        <div className="h-5 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                        <div className="flex items-center justify-center h-16">
                          <div className="h-16 w-16 rounded-full border-4 border-primary"></div>
                          <div className="h-5 w-20 bg-gray-200 dark:bg-gray-600 rounded absolute"></div>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-4 h-28">
                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                        <div className="space-y-2">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="h-4 bg-gray-100 dark:bg-gray-600 rounded"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Кнопка воспроизведения демо */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(true)}
                  className="group"
                >
                  <div className="w-20 h-20 bg-white dark:bg-gray-900 rounded-full shadow-xl flex items-center justify-center transition-transform">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PlayIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <span className="absolute mt-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-white whitespace-nowrap">
                    Смотреть демо
                  </span>
                </motion.button>
              </div>
            )}

            {/* Плавающие подсказки */}
            {isPlaying && (
              <>
                {activeTab === 'crm' && (
                  <motion.div
                    className="absolute top-20 left-1/3 max-w-xs bg-white dark:bg-gray-700 rounded-xl shadow-xl p-4 border border-primary/20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <LightBulbIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Интеллектуальная карточка клиента</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Вся информация о клиенте и история взаимодействий в одном месте</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'inventory' && (
                  <motion.div
                    className="absolute bottom-20 right-1/4 max-w-xs bg-white dark:bg-gray-700 rounded-xl shadow-xl p-4 border border-primary/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <CubeTransparentIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Визуальный каталог</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Просматривайте актуальные данные об автомобилях в реальном времени</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Нижняя панель с особенностями */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{tabData[activeTab].title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{tabData[activeTab].description}</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {tabData[activeTab].features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex items-start"
            >
              <CheckCircleIcon className="w-5 h-5 text-primary dark:text-primary-light mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-full inline-flex items-center"
            style={{ backgroundColor: tabData[activeTab].color }}
          >
            Запросить полное демо
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Компонент "Форма запроса демо"
const DemoRequestForm = () => {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, threshold: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: 'all',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
    // Показать сообщение об успешной отправке
    alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <motion.div
      ref={formRef}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Запросить демонстрацию</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Заполните форму, и наш консультант свяжется с вами для организации персональной демонстрации
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ваше имя *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                placeholder="Иван Иванов"
                required
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Компания *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                placeholder="ООО Автоцентр"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Электронная почта *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                placeholder="example@company.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Телефон *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                placeholder="+998 XX XXX XX XX"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Интересующие решения
              </label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Вся экосистема решений</option>
                <option value="crm">CRM для автодилеров</option>
                <option value="inventory">Учет складов и автомобилей</option>
                <option value="contracts">Электронные контракты</option>
                <option value="finance">Управление платежами</option>
                <option value="analytics">Аналитика и отчетность</option>
                <option value="integration">API и интеграции</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Комментарий
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                placeholder="Опишите ваши потребности или задайте вопросы"
              ></textarea>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Поля, отмеченные * обязательны для заполнения
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center"
            >
              Запросить демонстрацию
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

// Компонент "График демонстрации"
const DemoSchedule = () => {
  const scheduleRef = useRef(null);
  const isInView = useInView(scheduleRef, { once: true, threshold: 0.2 });
  
  const upcomingDemos = [
    {
      title: 'Обзор CRM для автодилеров',
      date: 'Вторник, 28 мая 2024',
      time: '11:00',
      duration: '45 минут',
      presenter: 'Александр Петров',
      type: 'Вебинар',
      registrations: 24,
      color: '#7B2CBF'
    },
    {
      title: 'Интеграция с платежными системами',
      date: 'Четверг, 30 мая 2024',
      time: '14:00',
      duration: '60 минут',
      presenter: 'Елена Смирнова',
      type: 'Онлайн-демо',
      registrations: 18,
      color: '#059669'
    },
    {
      title: 'Аналитика и отчетность: новые возможности',
      date: 'Понедельник, 3 июня 2024',
      time: '15:30',
      duration: '50 минут',
      presenter: 'Дмитрий Иванов',
      type: 'Вебинар',
      registrations: 32,
      color: '#DC2626'
    }
  ];

  return (
    <motion.div
      ref={scheduleRef}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Расписание ближайших демонстраций</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Зарегистрируйтесь на одну из запланированных демонстраций и узнайте больше о наших решениях
        </p>
        
        <div className="space-y-6">
          {upcomingDemos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-600"
            >
              <div className="h-2" style={{ backgroundColor: demo.color }}></div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{demo.title}</h4>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span>{demo.date}, {demo.time}</span>
                      </div>
                      <div className="flex items-center">
                        <DocumentTextIcon className="w-4 h-4 mr-1" />
                        <span>{demo.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <ChatBubbleBottomCenterTextIcon className="w-4 h-4 mr-1" />
                        <span>{demo.presenter}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Тип: </span>
                      <span className="font-medium" style={{ color: demo.color }}>{demo.type}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-full text-sm text-white font-medium"
                      style={{ backgroundColor: demo.color }}
                    >
                      Зарегистрироваться
                    </motion.button>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-600 flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Уже зарегистрировано: <span className="font-medium text-gray-700 dark:text-gray-200">{demo.registrations} человек</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700 overflow-hidden bg-gray-200 -ml-1"
                        style={{ zIndex: 5 - i }}
                      ></div>
                    ))}
                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 -ml-1">
                      +{demo.registrations - 5}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Компонент "Варианты демонстрации"
const DemoOptions = () => {
  const optionsRef = useRef(null);
  const isInView = useInView(optionsRef, { once: true, threshold: 0.2 });
  
  const demoOptions = [
    {
      title: 'Онлайн-демо',
      description: 'Интерактивная демонстрация с нашим специалистом в режиме реального времени. Вы сможете задать вопросы и получить подробные ответы.',
      icon: <DevicePhoneMobileIcon className="w-12 h-12 text-primary" />,
      features: [
        'Индивидуальный подход',
        'Возможность задать вопросы',
        'Демонстрация всех модулей',
        'Консультация специалиста'
      ],
      color: '#7B2CBF',
      action: 'Записаться на онлайн-демо'
    },
    {
      title: 'Демо в вашем офисе',
      description: 'Наш специалист приедет к вам с полной демонстрацией нашего решения и ответит на все вопросы вашей команды.',
      icon: <ComputerDesktopIcon className="w-12 h-12 text-[#0891B2]" />,
      features: [
        'Встреча с командой',
        'Детальная презентация',
        'Обсуждение интеграции',
        'Индивидуальные рекомендации'
      ],
      color: '#0891B2',
      action: 'Запросить визит специалиста'
    }
  ];

  return (
    <motion.div
      ref={optionsRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {demoOptions.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 hover:shadow-2xl transition-shadow relative overflow-hidden"
          >
            {/* Декоративный круг */}
            <div
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
              style={{ backgroundColor: option.color }}
            ></div>
            
            <div className="relative">
              <div className="flex items-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mr-4" 
                  style={{ backgroundColor: `${option.color}15` }}
                >
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{option.title}</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {option.description}
              </p>
              
              <div className="space-y-3 mb-8">
                {option.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: option.color }} />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-full text-white font-medium flex items-center justify-center"
                style={{ backgroundColor: option.color }}
              >
                {option.action}
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Компонент FAQ
const FAQ = () => {
  const faqRef = useRef(null);
  const isInView = useInView(faqRef, { once: true, threshold: 0.2 });
  const [openItem, setOpenItem] = useState(null);
  
  const faqItems = [
    {
      question: 'Как долго длится демонстрация?',
      answer: 'Стандартная онлайн-демонстрация длится около 45-60 минут. За это время мы показываем ключевые функции выбранных вами модулей и отвечаем на вопросы. Для более глубокого погружения мы можем организовать дополнительные сессии.'
    },
    {
      question: 'Нужно ли устанавливать специальное ПО для онлайн-демо?',
      answer: 'Нет, для участия в онлайн-демонстрации не требуется установка специального программного обеспечения. Демонстрация проводится через браузер с использованием популярных платформ для видеоконференций (Zoom, Google Meet и т.д.).'
    },
    {
      question: 'Можно ли получить тестовый доступ к системе?',
      answer: 'Да, после демонстрации мы можем предоставить ограниченный тестовый доступ к системе на срок до 14 дней. Это позволит вам и вашей команде более детально изучить функционал и оценить удобство использования решения.'
    },
    {
      question: 'Сколько стоит внедрение системы?',
      answer: 'Стоимость внедрения зависит от выбранных модулей, количества пользователей и необходимых интеграций с вашими системами. После демонстрации наши специалисты подготовят индивидуальное коммерческое предложение с учетом ваших потребностей.'
    },
    {
      question: 'Можно ли настроить систему под наши бизнес-процессы?',
      answer: 'Да, система обладает гибкими возможностями настройки под ваши бизнес-процессы. В базовый пакет внедрения входит адаптация основных рабочих процессов, шаблонов документов и отчетов. Для более сложных кастомизаций мы предлагаем дополнительные услуги.'
    }
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <motion.div
      ref={faqRef}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Часто задаваемые вопросы</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Ответы на популярные вопросы о демонстрации и внедрении системы
        </p>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                className="w-full p-5 text-left flex justify-between items-center bg-gray-50 dark:bg-gray-700/50"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                    openItem === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openItem === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Компонент "Отзывы о демо"
const DemoTestimonials = () => {
  const testimonialsRef = useRef(null);
  const isInView = useInView(testimonialsRef, { once: true, threshold: 0.2 });
  
  const testimonials = [
    {
      text: 'Демонстрация была очень информативной и наглядной. Особенно впечатлили интеграционные возможности CRM с учетной системой. После короткого тестового периода мы приняли решение о внедрении.',
      author: 'Андрей Смирнов',
      position: 'Операционный директор',
      company: 'АвтоПремиум',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format'
    },
    {
      text: 'Консультант терпеливо ответил на все наши вопросы и показал, как система решает именно наши бизнес-задачи. Особенно порадовало, что демонстрация была адаптирована под специфику нашего автосалона.',
      author: 'Елена Козлова',
      position: 'Руководитель отдела продаж',
      company: 'МегаАвто',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format'
    },
    {
      text: 'После живой демонстрации в нашем офисе все сомнения отпали. Система оказалась именно тем, что мы искали для автоматизации наших процессов. Внедрение прошло гладко, а техподдержка работает оперативно.',
      author: 'Дмитрий Петров',
      position: 'IT-директор',
      company: 'АвтоСити',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format'
    }
  ];

  return (
    <motion.div
      ref={testimonialsRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
          >
            <div className="mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="inline-block w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
              "{testimonial.text}"
            </p>
            
            <div className="flex items-center">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{testimonial.author}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}, {testimonial.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Компонент "Призыв к действию"
const DemoCTA = () => {
  const ctaRef = useRef(null);
  const isInView = useInView(ctaRef, { once: true, threshold: 0.2 });
  
  return (
    <motion.div
      ref={ctaRef}
      className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl overflow-hidden shadow-xl text-white relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Декоративные элементы */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full"></div>
      
      <div className="relative p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Готовы увидеть, как система работает?
          </motion.h2>
          
          <motion.p 
            className="text-xl opacity-90 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Запросите демонстрацию сегодня и узнайте, как наши решения могут оптимизировать процессы в вашем автобизнесе
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-primary hover:bg-gray-100 font-medium rounded-full shadow-lg"
            >
              Запросить демонстрацию
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white font-medium rounded-full"
            >
              Связаться с консультантом
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Основной компонент страницы
export default function DemoPage() {
  const { hapticFeedback } = useTelegram();
  const { currentLocale } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  
  // Ссылка на верхнюю часть страницы для анимации при скролле
  const topRef = useRef(null);
  const isTopInView = useInView(topRef, { once: true });
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative overflow-hidden page-scrollable">
      {/* Улучшенные фоновые градиенты */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-light/15 via-white to-accent/15 dark:from-primary-dark/30 dark:via-black dark:to-primary-dark/20 -z-10 pointer-events-none"></div>
      <div className="fixed top-[10%] right-[5%] w-96 h-96 bg-primary/30 dark:bg-primary/20 rounded-full blur-3xl opacity-70 -z-10 animate-pulse-slow pointer-events-none"></div>
      <div className="fixed bottom-[10%] left-[5%] w-96 h-96 bg-accent/30 dark:bg-primary-dark/20 rounded-full blur-3xl opacity-70 -z-10 animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>
      
      <section className="pt-8 sm:pt-16 pb-16 sm:pb-24 px-4">
          <InteractiveDemo />
      </section>
      
      {/* Варианты демонстрации */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Выберите удобный формат</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Мы предлагаем различные форматы демонстрации, чтобы вы могли выбрать наиболее удобный для вас способ знакомства с нашей системой
            </p>
          </div>
          
          <DemoOptions />
        </div>
      </section>
      
      {/* Расписание демонстраций */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ближайшие демонстрации</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Присоединяйтесь к запланированным групповым демонстрациям и вебинарам
            </p>
          </div>
          
          <DemoSchedule />
        </div>
      </section>
      
      {/* Форма запроса демо */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Запросить индивидуальную демонстрацию</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Заполните форму, и мы организуем персональную демонстрацию в удобное для вас время
            </p>
          </div>
          
          <DemoRequestForm />
        </div>
      </section>
      
      {/* Отзывы о демо */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Отзывы клиентов</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Что говорят клиенты, которые уже прошли демонстрацию и внедрили нашу систему
            </p>
          </div>
          
          <DemoTestimonials />
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Частые вопросы</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ответы на популярные вопросы о демонстрации и внедрении системы
            </p>
          </div>
          
          <FAQ />
        </div>
      </section>
      
    {/* CTA секция */}
      <section className="py-16 px-4 mb-16">
        <div className="container mx-auto">
          <DemoCTA />
        </div>
      </section>
    </div>
  );
}