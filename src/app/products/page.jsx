'use client';

import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Импортируем иконки
import {
  CubeIcon, ChartBarIcon, DocumentTextIcon, 
  CreditCardIcon, PresentationChartLineIcon, ArrowPathIcon,
  ArrowRightIcon, CheckCircleIcon, PlayIcon, ChevronDownIcon
} from '@heroicons/react/24/outline';

// Компонент "Карточка решения"
const SolutionCard = ({ solution, index, onSelect, isSelected }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      className={`relative overflow-hidden rounded-xl border ${
        isSelected 
          ? 'border-primary dark:border-primary-light shadow-xl shadow-primary/10 scale-[1.02]' 
          : 'border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl'
      } bg-white dark:bg-gray-800 transition-all duration-300`}
      onClick={() => onSelect(solution.id)}
    >
      {/* Цветная полоса сверху */}
      <div className="h-2" style={{ backgroundColor: solution.color }}></div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
              style={{ backgroundColor: `${solution.color}15` }}
            >
              {solution.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{solution.title}</h3>
          </div>
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center" 
            style={{ backgroundColor: `${solution.color}15` }}
          >
            <ArrowRightIcon className="w-4 h-4" style={{ color: solution.color }} />
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{solution.description}</p>
        
        <div className="space-y-2 mb-4">
          {solution.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-primary dark:text-primary-light mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
            </div>
          ))}
        </div>
        
        {solution.features.length > 3 && (
          <p className="text-sm text-primary dark:text-primary-light font-medium">
            +{solution.features.length - 3} дополнительных функций
          </p>
        )}
      </div>
    </motion.div>
  );
};

// Компонент "Детальное представление решения"
const SolutionDetail = ({ solution, onClose }) => {
  const detailRef = useRef(null);
  const isInView = useInView(detailRef, { once: true });
  
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" style={{ zIndex: 100 }}>
      <motion.div 
        ref={detailRef}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Хедер с цветом решения */}
        <div className="h-3" style={{ backgroundColor: solution.color }}></div>
        
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mr-4" 
                style={{ backgroundColor: `${solution.color}15` }}
              >
                {solution.icon}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{solution.title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{solution.description}</p>
            
            {/* Скриншот или мокап */}
            <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 h-[300px] mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Интерактивный предпросмотр</p>
                  <button 
                    className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-full inline-flex items-center"
                  >
                    <PlayIcon className="w-5 h-5 mr-2" />
                    Смотреть демо
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Функциональность */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ключевые возможности</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solution.features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${solution.color}15` }}>
                    <CheckCircleIcon className="w-5 h-5" style={{ color: solution.color }} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Преимущества */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ключевые преимущества</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {solution.benefits.map((benefit, idx) => (
                <div 
                  key={idx} 
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold" style={{ color: solution.color }}>{benefit.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{benefit.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Кейс */}
          {solution.caseStudy && (
            <div className="mb-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{solution.caseStudy.title}</h3>
              <div className="flex items-start">
                <div className="text-4xl mr-4">❝</div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">{solution.caseStudy.quote}</p>
                  <div className="flex items-center">
                    <img 
                      src={solution.caseStudy.author.avatar} 
                      alt={solution.caseStudy.author.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{solution.caseStudy.author.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{solution.caseStudy.author.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <Link 
              href={solution.demoLink}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center justify-center"
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              Запросить демо
            </Link>
            <Link 
              href={`/products/${solution.id}`}
              className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-medium rounded-full inline-flex items-center justify-center"
            >
              Подробнее о решении
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Основной компонент страницы
export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [activeSolution, setActiveSolution] = useState(null);
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  
  // Имитация данных (в реальном проекте будет из API или хранилища)
  const tabs = [
    { id: 'all', name: 'Все решения' },
    { id: 'crm', name: 'CRM' },
    { id: 'inventory', name: 'Склад' },
    { id: 'contracts', name: 'Контракты' },
    { id: 'finance', name: 'Финансы' },
    { id: 'analytics', name: 'Аналитика' },
    { id: 'integration', name: 'Интеграции' }
  ];
  
  const solutions = [
    {
      id: 'crm',
      title: 'CRM для автодилеров',
      icon: <CubeIcon className="w-6 h-6" />,
      color: '#7B2CBF',
      description: 'Полноценная CRM-система, специально разработанная для автодилеров. Управляйте контактами, ведите клиентов через всю воронку продаж.',
      features: [
        'Единая база клиентов с историей взаимодействия',
        'Настраиваемая воронка продаж для разных типов клиентов',
        'Автоматические уведомления и напоминания',
        'Интеграция с телефонией и мессенджерами',
        'Мобильное приложение для менеджеров',
        'Система задач и планирования рабочего времени'
      ],
      benefits: [
        { value: '42%', label: 'увеличение конверсии продаж' },
        { value: '30%', label: 'экономия времени менеджеров' },
        { value: '95%', label: 'снижение количества упущенных лидов' }
      ],
      demoLink: '/demo/crm',
      caseStudy: {
        title: 'Успешное внедрение в АвтоПрестиж',
        quote: 'Внедрение CRM-системы Car-Sale позволило нам увеличить конверсию лидов в продажи на 38% за первые 3 месяца.',
        author: {
          name: 'Александр Петров',
          position: 'Коммерческий директор, АвтоПрестиж',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format'
        }
      }
    },
    {
      id: 'inventory',
      title: 'Учет складов и автомобилей',
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: '#0891B2',
      description: 'Система управления автомобильным парком и складом запчастей. Отслеживайте состояние, местоположение и доступность каждого автомобиля.',
      features: [
        'Учет всех автомобилей с подробными характеристиками',
        'Отслеживание состояния и местоположения автомобилей',
        'Резервирование автомобилей для клиентов',
        'Управление складом запчастей и аксессуаров',
        'Система оповещений о критических остатках',
        'Автоматическое формирование заказов поставщикам'
      ],
      benefits: [
        { value: '98%', label: 'автомобилей доступны для продажи' },
        { value: '45%', label: 'сокращение времени поиска' },
        { value: '25%', label: 'снижение складских издержек' }
      ],
      demoLink: '/demo/inventory',
      caseStudy: {
        title: 'Оптимизация склада в MegaAuto',
        quote: 'Благодаря системе учета мы сократили время, затрачиваемое на инвентаризацию, на 70% и исключили ошибки в наличии.',
        author: {
          name: 'Мария Иванова',
          position: 'Директор по логистике, MegaAuto',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format'
        }
      }
    },
    {
      id: 'contracts',
      title: 'Электронные контракты',
      icon: <DocumentTextIcon className="w-6 h-6" />,
      color: '#F59E0B',
      description: 'Система электронного документооборота для автоматизации процесса оформления сделок. Генерируйте договоры, акты и счета в несколько кликов.',
      features: [
        'Автоматическое формирование документов по шаблонам',
        'Электронная подпись документов',
        'Хранение всей документации в едином архиве',
        'Отслеживание статуса подписания документов',
        'Интеграция с государственными сервисами',
        'Автоматическое заполнение данных из CRM'
      ],
      benefits: [
        { value: '85%', label: 'контрактов подписываются онлайн' },
        { value: '60%', label: 'сокращение времени оформления' },
        { value: '90%', label: 'снижение количества ошибок' }
      ],
      demoLink: '/demo/contracts',
      caseStudy: {
        title: 'Цифровизация документооборота в АвтоЛюкс',
        quote: 'Перейдя на электронные контракты, мы сократили время оформления сделки с 2 часов до 20 минут и повысили удовлетворенность клиентов.',
        author: {
          name: 'Дмитрий Соколов',
          position: 'CEO, АвтоЛюкс',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format'
        }
      }
    },
    {
      id: 'finance',
      title: 'Управление платежами',
      icon: <CreditCardIcon className="w-6 h-6" />,
      color: '#059669',
      description: 'Финансовый модуль для управления платежами, кредитами и лизингом. Интегрируйтесь с банками и платежными системами для ускорения финансовых операций.',
      features: [
        'Интеграция с банками и платежными системами',
        'Онлайн-оплата для клиентов',
        'Управление рассрочками и кредитами',
        'Автоматический расчет комиссий и налогов',
        'Формирование финансовой отчетности',
        'Отслеживание статуса всех платежей'
      ],
      benefits: [
        { value: '3.5', label: 'минуты — среднее время обработки' },
        { value: '70%', label: 'увеличение скорости операций' },
        { value: '40%', label: 'рост продаж с кредитами' }
      ],
      demoLink: '/demo/finance',
      caseStudy: {
        title: 'Инновации в финансовых процессах PremiumCars',
        quote: 'Интеграция с банками напрямую из системы позволила нам утроить количество одобренных кредитов и существенно увеличить продажи.',
        author: {
          name: 'Анна Новикова',
          position: 'Финансовый директор, PremiumCars',
          avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&auto=format'
        }
      }
    },
    {
      id: 'analytics',
      title: 'Аналитика и отчетность',
      icon: <PresentationChartLineIcon className="w-6 h-6" />,
      color: '#DC2626',
      description: 'Система бизнес-аналитики с интерактивными дашбордами и настраиваемыми отчетами. Анализируйте эффективность продаж, маркетинга и работы менеджеров.',
      features: [
        'Интерактивные дашборды для руководителей',
        'Детальная аналитика по продажам и маркетингу',
        'KPI менеджеров и отделов',
        'Прогнозирование продаж',
        'Анализ воронки продаж',
        'Экспорт отчетов в различных форматах'
      ],
      benefits: [
        { value: '87%', label: 'руководителей используют данные' },
        { value: '35%', label: 'повышение точности прогнозов' },
        { value: '20%', label: 'рост эффективности маркетинга' }
      ],
      demoLink: '/demo/analytics',
      caseStudy: {
        title: 'Трансформация принятия решений в StarMotors',
        quote: 'Аналитический модуль Car-Sale дал нам полную прозрачность бизнес-процессов и помог выявить точки роста, невидимые ранее.',
        author: {
          name: 'Игорь Васильев',
          position: 'CEO, StarMotors',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format'
        }
      }
    },
    {
      id: 'integration',
      title: 'API и интеграции',
      icon: <ArrowPathIcon className="w-6 h-6" />,
      color: '#7C3AED',
      description: 'Гибкие API и готовые интеграции с популярными сервисами. Создайте единую экосистему для вашего бизнеса, объединив все используемые инструменты.',
      features: [
        'Интеграция с государственными сервисами (OneID, ГНИ)',
        'Подключение к маркетплейсам автомобилей',
        'API для разработки собственных решений',
        'Интеграция с банками и страховыми компаниями',
        'Подключение к Telegram и другим мессенджерам',
        'Интеграция с IP-телефонией'
      ],
      benefits: [
        { value: '50+', label: 'готовых интеграций' },
        { value: '65%', label: 'сокращение ручного ввода' },
        { value: '100%', label: 'синхронизация данных' }
      ],
      demoLink: '/demo/integration',
      caseStudy: {
        title: 'Единая экосистема AutoCity',
        quote: 'Благодаря интеграциям мы создали бесшовный процесс от онлайн-заявки до получения автомобиля, включая оформление страховки и кредита.',
        author: {
          name: 'Елена Смирнова',
          position: 'IT-директор, AutoCity',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&auto=format'
        }
      }
    }
  ];
  
  const handleSelectSolution = (id) => {
    setSelectedSolution(id);
    // В полной версии здесь может быть редирект или открытие модального окна
  };
  
  const handleShowDetail = (id) => {
    setActiveSolution(solutions.find(s => s.id === id));
  };
  
  const handleCloseDetail = () => {
    setActiveSolution(null);
  };
  
  const handleOpenSolution = (id) => {
    router.push(`/products/${id}`);
  };
  
  // Фильтрация решений в зависимости от активного таба
  const filteredSolutions = activeTab === 'all' 
    ? solutions 
    : solutions.filter(solution => solution.id === activeTab);
  
  return (
    <div className="relative page-scrollable">
      {/* Фоновые градиенты */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-light/10 via-white to-accent/10 dark:from-primary-dark/20 dark:via-black dark:to-primary-dark/5 -z-10"></div>
      
      {/* Герой-секция */}
      <section className="pt-10 sm:pt-16 pb-10 sm:pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left lg:pr-10 mb-10 lg:mb-0">
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Решения для автоматизации <span className="text-primary dark:text-primary-light">автомобильного бизнеса</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-700 dark:text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Мы создали экосистему продуктов, автоматизирующую каждый этап продажи — от первого контакта до послепродажного обслуживания.
              </motion.p>
              
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button 
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center"
                  onClick={() => document.getElementById('solutionsGrid').scrollIntoView({ behavior: 'smooth' })}
                >
                  Изучить решения
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button 
                  className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium rounded-full inline-flex items-center"
                >
                  Запросить демо
                </button>
              </motion.div>
            </div>
            
            {/* Визуализация "Путь решения" */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Создаем визуальную схему пути решения задач */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Комплексный подход к автоматизации</h3>
                    
                    {/* Путь решения - визуальное представление */}
                    <div className="relative">
                      {/* Соединительная линия */}
                      <div className="absolute left-6 top-0 w-1 h-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      
                      {solutions.slice(0, 4).map((solution, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start mb-8 relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                        >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md" 
                            style={{ backgroundColor: solution.color }}
                          >
                            <span className="text-white">{solution.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">{solution.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{solution.description.split('.')[0]}.</p>
                            <button 
                              className="mt-2 text-sm font-medium inline-flex items-center"
                              style={{ color: solution.color }}
                              onClick={() => handleShowDetail(solution.id)}
                            >
                              Подробнее
                              <ArrowRightIcon className="w-4 h-4 ml-1" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                      
                   {/* Кнопка "Показать все решения" */}
                      <motion.div 
                        className="flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <button 
                          className="text-primary dark:text-primary-light font-medium"
                          onClick={() => document.getElementById('solutionsGrid').scrollIntoView({ behavior: 'smooth' })}
                        >
                          Показать все решения
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Декоративные элементы */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent/10 dark:bg-primary-dark/20 rounded-full -z-10"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Секция "Экосистема решений Car-Sale" - переработанная */}
      <section className="py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            ref={sectionRef}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Экосистема решений Car-Sale</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Наши решения работают как единый цифровой организм, где каждый компонент усиливает возможности других
              </p>
            </div>
            
            {/* Переработанная экосистема решений */}
            <div className="max-w-4xl mx-auto mb-10">
              {/* Центральный элемент (CRM) */}
              <div className="flex justify-center mb-12">
                <motion.div
                  className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-xl max-w-md"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                        <CubeIcon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">CRM-система</h3>
                    </div>
                    <button 
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                      onClick={() => handleShowDetail('crm')}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-white/80 text-sm mb-4">
                    Ядро всей экосистемы. Объединяет клиентов, сделки и автомобили в единую базу данных и управляет всеми бизнес-процессами.
                  </p>
                  <div className="flex justify-center mt-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="flex justify-center items-center"
                    >
                      <div className="relative w-[80px] h-[80px]">
                        <div className="absolute inset-0 rounded-full bg-white/10 animate-ping"></div>
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              {/* Связанные модули - размещаем вокруг CRM */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {solutions.filter(s => s.id !== 'crm').map((solution, index) => (
                  <motion.div
                    key={solution.id}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    whileHover={{ y: -5, boxShadow: '0 12px 25px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="h-2" style={{ backgroundColor: solution.color }}></div>
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
                          style={{ backgroundColor: `${solution.color}20` }}
                        >
                          {solution.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{solution.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {solution.description.split('.')[0]}.
                      </p>
                      
                      {/* Интеграционные линии к CRM */}
                      <div className="flex items-center">
                        <div style={{ backgroundColor: solution.color }} className="flex-grow h-0.5 opacity-30"></div>
                        <div className="px-2 text-xs text-gray-500 dark:text-gray-400">Интеграция с CRM</div>
                        <div style={{ backgroundColor: solution.color }} className="flex-grow h-0.5 opacity-30"></div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => handleShowDetail(solution.id)}
                          className="text-sm font-medium flex items-center"
                          style={{ color: solution.color }}
                        >
                          Подробнее
                          <ArrowRightIcon className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Интеграционная диаграмма */}
              <div className="mt-12 relative">
                <motion.svg 
                  className="w-full h-[200px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <defs>
                    <linearGradient id="integrationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7B2CBF" />
                      <stop offset="100%" stopColor="#9D4EDD" />
                    </linearGradient>
                  </defs>
                  
                  {/* Горизонтальная линия */}
                  <motion.line 
                    x1="10%" 
                    y1="50%" 
                    x2="90%" 
                    y2="50%" 
                    stroke="url(#integrationGradient)" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                  />
                  
                  {/* Точки подключения */}
                  {[15, 30, 45, 60, 75, 85].map((position, index) => (
                    <motion.circle 
                      key={index}
                      cx={`${position}%`}
                      cy="50%"
                      r="4"
                      fill="#7B2CBF"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.5 + index * 0.2 }}
                    />
                  ))}
                  
                  {/* Текст интеграции */}
                  <text x="50%" y="30%" textAnchor="middle" fill="#666" fontSize="14">
                    Единый обмен данными через API
                  </text>
                  
                  {/* Анимированные точки интеграции */}
                  <motion.circle
                    cx="20%" 
                    cy="50%" 
                    r="3" 
                    fill="#7B2CBF"
                    animate={{ x: [0, 400, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.circle
                    cx="70%" 
                    cy="50%" 
                    r="3" 
                    fill="#9D4EDD"
                    animate={{ x: [0, -300, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
                  />
                </motion.svg>
                
                <div className="text-center mt-8">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Все компоненты системы обмениваются данными в реальном времени.
                    Изменения в одном модуле мгновенно отражаются во всех связанных модулях.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Кнопки действий */}
            <div className="flex justify-center mt-8">
              <motion.button
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShowDetail('crm')}
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                Смотреть демо экосистемы
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Основная секция с решениями */}
      <section id="solutionsGrid" className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Наши решения для автоматизации
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Выберите нужные модули или используйте всю экосистему для максимального эффекта
            </motion.p>
          </div>
          
          {/* Фильтры решений */}
          <motion.div 
            className="flex overflow-x-auto pb-4 justify-center space-x-2 no-scrollbar mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </motion.div>
          
          {/* Сетка с решениями */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredSolutions.map((solution, index) => (
              <SolutionCard 
                key={solution.id}
                solution={solution}
                index={index}
                onSelect={handleShowDetail}
                isSelected={selectedSolution === solution.id}
              />
            ))}
          </div>
          
          {/* CTA - комплексное решение */}
          <motion.div 
            className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl overflow-hidden shadow-xl text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Декоративные элементы */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full"></div>
            
            <div className="relative p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">Комплексное решение</h3>
                  <p className="text-white/90 mb-6">
                    Максимальный эффект достигается при использовании всех модулей в рамках единой экосистемы. Мы предлагаем интегрированное решение, которое покрывает все потребности автомобильного бизнеса.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Единый вход и авторизация для всех модулей</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Автоматический обмен данными между решениями</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                      <span>Комплексная аналитика по всем бизнес-процессам</span>
                    </li>
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-primary hover:bg-gray-100 font-medium rounded-full shadow-lg"
                  >
                    Запросить комплексное демо
                  </motion.button>
                </div>
                
                {/* Визуализация комплексного решения */}
                <div className="relative">
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="grid grid-cols-3 gap-4">
                      {solutions.map((solution, idx) => (
                        <motion.div
                          key={idx}
                          className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm"
                          whileHover={{ y: -5, scale: 1.05 }}
                        >
                          <div 
                            className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2" 
                            style={{ backgroundColor: `${solution.color}50` }}
                          >
                            {solution.icon}
                          </div>
                          <p className="text-xs font-medium">{solution.title.split(' ')[0]}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-center">
                      <span className="text-xs uppercase tracking-wider font-medium">Единая экосистема</span>
                    </div>
                  </div>
                  
                  {/* Световые эффекты */}
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Процесс внедрения */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Процесс внедрения решений
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Мы обеспечиваем плавный переход на новую систему с минимальными рисками
            </motion.p>
          </div>
          
          {/* Шаги внедрения */}
          <div className="relative max-w-5xl mx-auto">
            {/* Соединительная линия */}
            <div className="absolute top-0 left-[28px] sm:left-1/2 sm:-ml-1 w-2 sm:w-1 h-full bg-gradient-to-b from-primary via-primary-light to-accent rounded-full"></div>
            
            <div className="space-y-12 sm:space-y-16 relative">
              {[
                {
                  number: '01',
                  title: 'Аудит и планирование',
                  description: 'Анализируем ваши текущие бизнес-процессы и формируем план внедрения',
                  icon: 'https://cdn-icons-png.flaticon.com/512/2058/2058256.png'
                },
                {
                  number: '02',
                  title: 'Настройка и интеграция',
                  description: 'Адаптируем систему под ваши требования и интегрируем с существующими решениями',
                  icon: 'https://cdn-icons-png.flaticon.com/512/1053/1053210.png'
                },
                {
                  number: '03',
                  title: 'Миграция данных',
                  description: 'Переносим данные из ваших текущих систем без потери информации',
                  icon: 'https://cdn-icons-png.flaticon.com/512/1585/1585354.png'
                },
                {
                  number: '04',
                  title: 'Обучение персонала',
                  description: 'Проводим тренинги для сотрудников, чтобы они могли эффективно использовать систему',
                  icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995539.png'
                },
                {
                  number: '05',
                  title: 'Запуск и сопровождение',
                  description: 'Запускаем систему в боевом режиме и обеспечиваем постоянную поддержку',
                  icon: 'https://cdn-icons-png.flaticon.com/512/2307/2307993.png'
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className={`relative flex flex-col sm:flex-row ${index % 2 !== 0 ? 'sm:flex-row-reverse' : ''} items-center sm:items-start gap-6`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {/* Номер шага */}
                  <div className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full text-xl font-bold shadow-lg z-10">
                    {step.number}
                  </div>
                  
                  {/* Контент шага */}
                  <div className={`sm:w-1/2 ${index % 2 !== 0 ? 'sm:text-right' : ''}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center mt-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center"
            >
              Начать внедрение
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </div>
      </section>
      
      {/* FAQ секция */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Часто задаваемые вопросы
            </motion.h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                question: 'Какие требования к оборудованию для работы с системой?',
                answer: 'Наша система работает в облаке и доступна через браузер на любом устройстве с доступом в интернет. Для комфортной работы рекомендуется современный браузер (Chrome, Firefox, Safari, Edge) и стабильное интернет-соединение от 5 Мбит/с.'
              },
              {
                question: 'Сколько времени занимает внедрение системы?',
                answer: 'Срок внедрения зависит от размера вашей компании и количества выбранных модулей. Базовое внедрение CRM-системы занимает от 2 до 4 недель. Полный комплекс решений может быть внедрен за 1-3 месяца.'
              },
              {
                question: 'Можно ли интегрировать систему с нашим текущим ПО?',
                answer: 'Да, наша система имеет открытый API и готовые интеграции с популярными сервисами. Мы можем разработать индивидуальные коннекторы для вашего программного обеспечения. В среднем, интеграция занимает от 1 до 3 недель в зависимости от сложности.'
              },
              {
                question: 'Как обеспечивается безопасность данных?',
                answer: 'Мы используем многоуровневую систему защиты: шифрование данных, двухфакторную аутентификацию, регулярное резервное копирование и мониторинг безопасности 24/7. Наши серверы расположены в защищенных дата-центрах с высоким уровнем отказоустойчивости.'
              },
              {
                question: 'Как рассчитывается стоимость решений?',
                answer: 'Стоимость зависит от выбранных модулей, количества пользователей и дополнительных услуг. Мы предлагаем гибкую модель ценообразования с возможностью подключения только необходимых вам функций. Свяжитесь с нами для получения индивидуального расчета.'
              }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              >
                <button 
                  className="w-full p-6 text-left flex justify-between items-center"
                  onClick={() => setSelectedSolution(selectedSolution === `faq-${index}` ? null : `faq-${index}`)}
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</h3>
                  <ChevronDownIcon 
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                      selectedSolution === `faq-${index}` ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    selectedSolution === `faq-${index}` ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
{/* CTA секция */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-dark to-primary">
        <div className="container mx-auto max-w-5xl">
          {/* Декоративные элементы */}
          <div className="w-64 h-64 bg-white/10 rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="w-64 h-64 bg-white/5 rounded-full absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 blur-2xl"></div>
          
          <div className="text-center text-white relative">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Готовы к трансформации автобизнеса?
            </motion.h2>
            
            <motion.p 
              className="text-xl opacity-90 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Присоединяйтесь к сотням автодилеров, которые уже оптимизировали свои процессы и увеличили продажи
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
      </section>
      
      <AnimatePresence>
        {activeSolution && (
          <SolutionDetail 
            solution={activeSolution} 
            onClose={handleCloseDetail} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}