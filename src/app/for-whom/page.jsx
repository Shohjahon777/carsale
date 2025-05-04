'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '@/src/store/language';
import { useTelegram } from '@/src/hooks/useTelegram';
import { ArrowRightIcon, CheckCircleIcon, PlayIcon } from '@heroicons/react/24/outline';

// Данные локализации
const localization = {
  ru: {
    hero: {
      title: 'Кому подходит Car-Sale',
      subtitle: 'Оптимизируйте свой автобизнес с нашей платформой',
      description: 'Car-Sale разработан для различных игроков автомобильного рынка. Узнайте, как наша система может решить задачи именно вашего бизнеса.'
    },
    segments: {
      title: 'Целевые сегменты',
      description: 'Наша платформа разработана для удовлетворения потребностей всех участников автомобильного рынка',
      list: [
        {
          id: 'dealers',
          name: 'Автодилеры',
          icon: '🚗',
          color: '#7B2CBF',
          description: 'Официальные представители автопроизводителей, управляющие полным циклом продаж новых автомобилей.',
          benefits: [
            'Управление запасами автомобилей в реальном времени',
            'Автоматизация процесса оформления сделок',
            'Единая база клиентов с историей взаимодействия',
            'Интеграция с CRM-системами и маркетинговыми инструментами',
            'Финансовая отчетность и аналитика продаж'
          ],
          caseStudy: {
            company: 'АвтоПрестиж',
            result: 'Увеличение продаж на 35% за 6 месяцев после внедрения системы',
            quote: 'Car-Sale помогла нам оптимизировать все процессы, от первого контакта с клиентом до послепродажного обслуживания.',
            author: 'Алексей Петров, коммерческий директор'
          }
        },
        {
          id: 'showrooms',
          name: 'Автосалоны',
          icon: '🏢',
          color: '#0891B2',
          description: 'Независимые площадки по продаже новых и подержанных автомобилей различных марок.',
          benefits: [
            'Каталогизация разнородного автопарка с детальным описанием',
            'Гибкие инструменты ценообразования и специальных предложений',
            'Управление комиссиями и системой мотивации менеджеров',
            'Контроль технического состояния подержанных автомобилей',
            'Инструменты для продвижения в маркетплейсах'
          ],
          caseStudy: {
            company: 'АвтоМир',
            result: 'Сокращение времени обслуживания клиента на 40%',
            quote: 'Благодаря единой системе учета мы можем мгновенно предоставить клиенту всю информацию по любому автомобилю из нашего каталога.',
            author: 'Ирина Смирнова, руководитель отдела продаж'
          }
        },
        {
          id: 'finance',
          name: 'Финансовые структуры',
          icon: '💰',
          color: '#F59E0B',
          description: 'Банки, МФО и лизинговые компании, предоставляющие финансовые услуги при покупке автомобилей.',
          benefits: [
            'API для моментальной интеграции с системами автодилеров',
            'Автоматическая проверка заявок на кредит/лизинг',
            'Цифровое подписание финансовой документации',
            'Мониторинг и управление финансовыми рисками',
            'Аналитика финансовых продуктов и их эффективности'
          ],
          caseStudy: {
            company: 'АвтоФинанс Банк',
            result: 'Увеличение одобренных заявок на автокредиты на 25%',
            quote: 'Интеграция с Car-Sale позволила нам сократить время рассмотрения заявки с 2 дней до 30 минут.',
            author: 'Максим Иванов, директор по автокредитованию'
          }
        },
        {
          id: 'importers',
          name: 'Импортеры/поставщики',
          icon: '🚢',
          color: '#059669',
          description: 'Компании, занимающиеся импортом и оптовой поставкой автомобилей и запчастей на рынок.',
          benefits: [
            'Управление логистическими цепочками поставок',
            'Отслеживание партий автомобилей в реальном времени',
            'Прогнозирование спроса и оптимизация закупок',
            'Интеграция с таможенными системами',
            'Оптимизация распределения по дилерской сети'
          ],
          caseStudy: {
            company: 'ИмпортАвто',
            result: 'Сокращение сроков поставки на 20% и увеличение оборота на 15%',
            quote: 'Car-Sale помогла нам создать прозрачную систему распределения автомобилей по всей дилерской сети с учетом региональных особенностей спроса.',
            author: 'Андрей Соколов, операционный директор'
          }
        },
        {
          id: 'service',
          name: 'Сервисные центры',
          icon: '🔧',
          color: '#DC2626',
          description: 'Технические центры по обслуживанию и ремонту автомобилей различных марок.',
          benefits: [
            'Учет сервисной истории каждого автомобиля',
            'Планирование загрузки сервисных мощностей',
            'Управление запасами запчастей и расходных материалов',
            'Автоматическое напоминание клиентам о плановом ТО',
            'Аналитика эффективности сервисных работ'
          ],
          caseStudy: {
            company: 'АвтоТехСервис',
            result: 'Увеличение пропускной способности сервиса на 30%',
            quote: 'Система позволила нам оптимизировать процессы записи, диагностики и ремонта, что существенно повысило эффективность работы.',
            author: 'Дмитрий Васильев, директор сервисного центра'
          }
        },
        {
          id: 'marketplace',
          name: 'Маркетплейсы',
          icon: '🌐',
          color: '#7C3AED',
          description: 'Онлайн-площадки для продажи автомобилей, объединяющие предложения от различных продавцов.',
          benefits: [
            'API для интеграции с множеством поставщиков автомобилей',
            'Унифицированная система каталогизации автомобилей',
            'Автоматическая проверка объявлений и модерация',
            'Инструменты для аналитики рынка и ценообразования',
            'Система рейтингов и отзывов о продавцах'
          ],
          caseStudy: {
            company: 'АвтоМаркет',
            result: 'Рост среднемесячных продаж через платформу на 45%',
            quote: 'Благодаря интеграции с Car-Sale наш маркетплейс получил доступ к актуальным данным по наличию автомобилей у дилеров в реальном времени.',
            author: 'Елена Кузнецова, CEO'
          }
        }
      ],
    },
    customSolutions: {
      title: 'Индивидуальные решения',
      description: 'Мы понимаем, что каждый бизнес уникален и может иметь особые потребности. Наша команда готова разработать индивидуальное решение, соответствующее вашим специфическим требованиям.',
      list: [
        {
          title: 'Интеграции с вашими системами',
          description: 'Мы создадим необходимые API и коннекторы для бесшовной интеграции Car-Sale с вашими существующими ИТ-системами.',
          icon: '🔄'
        },
        {
          title: 'Кастомные модули',
          description: 'Разработаем дополнительные модули под ваши уникальные бизнес-процессы и задачи.',
          icon: '⚙️'
        },
        {
          title: 'Индивидуальная аналитика',
          description: 'Создадим специализированные отчеты и дашборды для анализа ключевых показателей вашего бизнеса.',
          icon: '📊'
        },
        {
          title: 'Масштабируемые решения',
          description: 'Наша система будет расти вместе с вашим бизнесом, легко адаптируясь к увеличению объемов и новым направлениям.',
          icon: '📈'
        }
      ]
    },
    testimonials: {
      title: 'Истории успеха наших клиентов',
      description: 'Узнайте, как различные компании автомобильного сектора трансформировали свой бизнес с помощью Car-Sale',
      list: [
        {
          name: 'Autocar Group',
          position: 'Сеть из 12 автосалонов',
          quote: 'После внедрения Car-Sale мы смогли централизовать управление всей сетью автосалонов, что повысило прозрачность процессов и способствовало росту продаж на 28% в первый год.',
          image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=150&h=150&auto=format&fit=crop',
          rating: 5
        },
        {
          name: 'PremiumAuto',
          position: 'Дилер премиальных брендов',
          quote: 'Car-Sale помогла нам создать премиальный клиентский опыт, соответствующий статусу продаваемых нами автомобилей. Количество повторных обращений выросло на 40%.',
          image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=150&h=150&auto=format&fit=crop',
          rating: 5
        },
        {
          name: 'AutoFinGroup',
          position: 'Лизинговая компания',
          quote: 'Интеграция с Car-Sale позволила нам сократить цикл оформления лизинговой сделки с 5 дней до 1 дня, что значительно повысило конверсию и удовлетворенность клиентов.',
          image: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?q=80&w=150&h=150&auto=format&fit=crop',
          rating: 4
        }
      ]
    },
    cta: {
      title: 'Готовы трансформировать ваш автобизнес?',
      description: 'Свяжитесь с нами, чтобы узнать, как Car-Sale может решить задачи именно вашего бизнеса',
      primaryButton: 'Запросить демо',
      secondaryButton: 'Связаться с экспертом'
    }
  },
  en: {
    // Английская версия (аналогично структуре русской)
  },
  uz: {
    // Узбекская версия (аналогично структуре русской)
  }
};

// Анимированный элемент-индикатор
const CircleIndicator = ({ color, active, initial }) => {
  return (
    <div className="relative h-4 w-4">
      <div className={`absolute inset-0 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm border ${active ? 'border-primary dark:border-primary-light' : 'border-gray-300 dark:border-gray-600'}`}></div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ scale: initial ? 1 : 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: color }}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Компонент для анимированного появления чисел
const AnimatedCounter = ({ value, suffix = '', duration = 1.5 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      let startTimestamp;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setDisplayValue(Math.floor(progress * value));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value, duration, started]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

// Компонент виртуальной карточки (3D эффект)
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Рассчитываем угол наклона (максимум 15 градусов)
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 5;
    const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 5;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovering ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300,
      }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
      
      {/* Эффект свечения при наведении */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow: isHovering 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px 2px rgba(123, 44, 191, 0.15)'
            : '0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}
        style={{
          zIndex: -1,
        }}
      />
    </motion.div>
  );
};

// Основной компонент страницы "Для кого это"
export default function ForWhomPage() {
  const { currentLocale } = useLanguageStore();
  const { hapticFeedback } = useTelegram();
  const [activeSegment, setActiveSegment] = useState('dealers');
  const [mounted, setMounted] = useState(false);
  
  // Получаем локализованные строки
  const t = localization[currentLocale || 'ru'] || localization.ru;
  
  // Для скроллинга к секциям
  const segmentsRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleSegmentClick = (id) => {
    if (hapticFeedback) hapticFeedback('selection');
    setActiveSegment(id);
  };
  
  // Получаем активный сегмент
  const activeSegmentData = t.segments.list.find(segment => segment.id === activeSegment);
  
  // Динамические статистические данные (для визуализации)
  const statistics = {
    dealers: [
      { value: 35, label: 'Увеличение продаж', suffix: '%' },
      { value: 150, label: 'Среднее число сделок в месяц', suffix: '' },
      { value: 98, label: 'Удовлетворенность клиентов', suffix: '%' }
    ],
    showrooms: [
      { value: 40, label: 'Сокращение времени обслуживания', suffix: '%' },
      { value: 280, label: 'Автомобилей в каталоге', suffix: '+' },
      { value: 2, label: 'Среднее время оформления сделки', suffix: ' ч' }
    ],
    finance: [
      { value: 25, label: 'Рост одобренных заявок', suffix: '%' },
      { value: 30, label: 'Среднее время рассмотрения заявки', suffix: ' мин' },
      { value: 75, label: 'Конверсия в выданные кредиты', suffix: '%' }
    ],
    importers: [
      { value: 20, label: 'Ускорение поставок', suffix: '%' },
      { value: 15, label: 'Увеличение оборота', suffix: '%' },
      { value: 95, label: 'Точность прогнозирования спроса', suffix: '%' }
    ],
    service: [
      { value: 30, label: 'Рост пропускной способности', suffix: '%' },
      { value: 45, label: 'Увеличение среднего чека', suffix: '%' },
      { value: 90, label: 'Постоянных клиентов', suffix: '%' }
    ],
    marketplace: [
      { value: 45, label: 'Рост продаж через платформу', suffix: '%' },
      { value: 5000, label: 'Автомобилей в каталоге', suffix: '+' },
      { value: 200, label: 'Новых объявлений ежедневно', suffix: '+' }
    ]
  };
  
  // Определение цвета для каждого сегмента
  const getSegmentColor = (id) => {
    const segment = t.segments.list.find(segment => segment.id === id);
    return segment ? segment.color : '#7B2CBF';
  };
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="relative overflow-hidden page-scrollable">
      {/* Фоновые градиенты */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-white to-accent/10 dark:from-primary-dark/20 dark:via-black dark:to-primary-dark/5"></div>
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-20 left-[5%] w-72 h-72 bg-accent/20 dark:bg-primary-dark/10 rounded-full blur-3xl opacity-70"></div>
      
      {/* Герой-секция */}
{/* Вводная секция - обзор экосистемы автобизнеса */}
<section className="pt-8 sm:pt-16 pb-16 sm:pb-24 px-4 relative">
  <div className="container mx-auto">
    {/* Заголовок */}
    <div className="text-center mb-12">
      <motion.h1 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-primary dark:text-primary-light">{t.hero.title}</span>
      </motion.h1>
      
      <motion.p 
        className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t.hero.description}
      </motion.p>
      
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {t.segments.list.slice(0, 6).map((segment, index) => (
          <span 
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <span className="mr-1.5">{segment.icon}</span>
            {segment.name}
          </span>
        ))}
      </motion.div>
    </div>
    
    {/* Схема экосистемы автобизнеса */}
    <motion.div 
      className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Экосистема автомобильного бизнеса
      </h2>
      
      <div className="relative">
        {/* Центральный элемент - Car-Sale */}
        <div className="flex justify-center mb-12">
          <div className="w-36 h-36 rounded-full bg-primary shadow-lg flex items-center justify-center relative">
            <div className="text-center text-white">
              <div className="text-lg font-bold">Car-Sale</div>
              <div className="text-xs mt-1">Платформа автоматизации</div>
            </div>
            
            {/* Пульсирующее кольцо */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 0.4, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
          </div>
        </div>
        
        {/* Группы сегментов - в виде блок-схемы */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Левая группа */}
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">🏢</span>
                Поставщики автомобилей
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-6 list-disc">
                <li>Импортеры и дистрибьюторы</li>
                <li>Производители автомобилей</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">🔧</span>
                Сервисные центры
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-6 list-disc">
                <li>Авторизованные сервисы</li>
                <li>Независимые мастерские</li>
              </ul>
            </div>
          </div>
          
          {/* Центральная группа */}
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">🚗</span>
                Автодилеры
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-6 list-disc">
                <li>Официальные представители</li>
                <li>Мультибрендовые салоны</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">🏢</span>
                Автосалоны
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-6 list-disc">
                <li>Продажа новых автомобилей</li>
                <li>Продажа б/у автомобилей</li>
              </ul>
            </div>
          </div>
          
          {/* Правая группа */}
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">💰</span>
                Финансовые структуры
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-6 list-disc">
                <li>Банки и кредитные организации</li>
                <li>Лизинговые компании</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border-l-4 border-indigo-500">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">🌐</span>
                Маркетплейсы
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-6 list-disc">
                <li>Онлайн-площадки авто</li>
                <li>Агрегаторы предложений</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Соединительные линии */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Вертикальные линии к центру */}
          <div className="absolute left-1/6 top-[160px] bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="absolute left-1/2 top-[160px] bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="absolute left-5/6 top-[160px] bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
          
          {/* Горизонтальная линия */}
          <div className="absolute left-1/6 right-5/6 top-[160px] h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-center mt-8">
        Car-Sale объединяет всех участников автомобильного рынка в единую экосистему, обеспечивая автоматизацию и оптимизацию бизнес-процессов.
      </p>
    </motion.div>
    
    {/* Ключевые преимущества - кратко */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Единая платформа</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Все инструменты для управления автобизнесом в одном приложении, от склада до продаж и сервиса.
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Оптимизация процессов</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Автоматизация рутинных операций и ускорение всех этапов работы с клиентами и автомобилями.
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Аналитика и отчёты</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Детальная бизнес-аналитика поможет принимать обоснованные решения и контролировать все показатели.
        </p>
      </motion.div>
    </div>
    
    {/* Кнопки навигации */}
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <motion.button
        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md inline-flex items-center justify-center"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => segmentsRef.current?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Изучить решения для бизнеса
        <ArrowRightIcon className="w-5 h-5 ml-2" />
      </motion.button>
      
      <motion.button
        className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium rounded-lg inline-flex items-center justify-center"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => testimonialsRef.current?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Истории успеха клиентов
      </motion.button>
    </div>
  </div>
  
  {/* CSS для позиционирования */}
  <style jsx>{`
    .left-1/6 {
      left: 16.666667%;
    }
    
    .left-5/6 {
      left: 83.333333%;
    }
    
    .right-5/6 {
      right: 83.333333%;
    }
  `}</style>
</section>
      
      {/* Целевые сегменты - расширенный интерактивный раздел */}
      <section 
        ref={segmentsRef}
        className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.segments.title}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-primary mx-auto rounded-full mb-6"
            />
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              {t.segments.description}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Навигация по сегментам - вертикальная на больших экранах, горизонтальная на мобильных */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Выберите сегмент</h3>
                  
                  {/* Вертикальное меню для больших экранов */}
                  <div className="hidden lg:block space-y-2">
                    {t.segments.list.map((segment) => (
                      <motion.button
                        key={segment.id}
                        className={`w-full text-left py-3 px-4 rounded-lg flex items-center transition-all ${
                          activeSegment === segment.id 
                            ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => handleSegmentClick(segment.id)}
                        whileHover={{ x: activeSegment === segment.id ? 0 : 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" 
                            style={{ 
                              backgroundColor: activeSegment === segment.id 
                                ? `${segment.color}30` 
                                : 'rgba(209, 213, 219, 0.3)' 
                            }}
                          >
                            <span className="text-2xl">{segment.icon}</span>
                          </div>
                          <span className="font-medium">{segment.name}</span>
                        </div>
                        
                        {/* Активный индикатор */}
                        {activeSegment === segment.id && (
                          <motion.div 
                            className="ml-auto w-2 h-10 rounded-full" 
                            style={{ backgroundColor: segment.color }}
                            layoutId="activeSegmentIndicator"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Горизонтальный скролл-меню для мобильных */}
                  <div className="lg:hidden overflow-x-auto flex space-x-2 pb-2 no-scrollbar">
                    {t.segments.list.map((segment) => (
                      <motion.button
                        key={segment.id}
                        className={`flex-shrink-0 py-2 px-4 rounded-lg flex items-center transition-all ${
                          activeSegment === segment.id 
                            ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light' 
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                        style={{ 
                          borderLeft: activeSegment === segment.id 
                            ? `3px solid ${segment.color}` 
                            : '3px solid transparent' 
                        }}
                        onClick={() => handleSegmentClick(segment.id)}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-xl mr-2">{segment.icon}</span>
                        <span className="whitespace-nowrap font-medium">{segment.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Статистика по сегменту */}
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-4 p-4 border border-gray-100 dark:border-gray-700 hidden lg:block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Эффективность решения</h3>
                  
                  <div className="space-y-4">
                    {statistics[activeSegment]?.map((stat, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                          <span className="text-lg font-bold" style={{ color: getSegmentColor(activeSegment) }}>
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full rounded-full"
                            style={{ backgroundColor: getSegmentColor(activeSegment) }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(stat.value / 100) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Детальная информация о сегменте */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSegment}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  {/* Верхняя цветная полоса */}
                  <div className="h-2" style={{ backgroundColor: getSegmentColor(activeSegment) }}></div>
                  
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center mb-6">
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center mr-4" 
                        style={{ backgroundColor: `${getSegmentColor(activeSegment)}20` }}
                      >
                        <span className="text-3xl">{activeSegmentData?.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                          {activeSegmentData?.name}
                        </h3>
                        <div className="flex space-x-1 mt-1">
                          {t.segments.list.map((segment, index) => (
                            <button 
                              key={index}
                              onClick={() => handleSegmentClick(segment.id)}
                              className="outline-none focus:outline-none"
                              aria-label={`Switch to ${segment.name}`}
                            >
                              <CircleIndicator 
                                color={segment.color} 
                                active={activeSegment === segment.id} 
                                initial={index === 0}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
                      {activeSegmentData?.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {/* Основные преимущества */}
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                          <CheckCircleIcon className="w-5 h-5 mr-2 text-primary dark:text-primary-light" />
                          Ключевые преимущества для {activeSegmentData?.name.toLowerCase()}
                        </h4>
                        
                        <div className="space-y-3">
                          {activeSegmentData?.benefits.map((benefit, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0" 
                                style={{ backgroundColor: `${getSegmentColor(activeSegment)}20` }}
                              >
                                <svg 
                                  className="w-4 h-4" 
                                  style={{ color: getSegmentColor(activeSegment) }}
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M5 13l4 4L19 7" 
                                  />
                                </svg>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Пример внедрения */}
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                          <svg 
                            className="w-5 h-5 mr-2" 
                            style={{ color: getSegmentColor(activeSegment) }}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                            />
                          </svg>
                          Кейс внедрения
                        </h4>
                        
                        <TiltCard className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 shadow-md">
                          <div className="space-y-3">
                            <div 
                              className="text-lg font-bold mb-2" 
                              style={{ color: getSegmentColor(activeSegment) }}
                            >
                              {activeSegmentData?.caseStudy.company}
                            </div>
                            
                            <div className="flex items-center mb-3">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                                style={{ backgroundColor: `${getSegmentColor(activeSegment)}20` }}
                              >
                                <svg 
                                  className="w-4 h-4" 
                                  style={{ color: getSegmentColor(activeSegment) }}
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
                                  />
                                </svg>
                              </div>
                              <span className="text-gray-700 dark:text-gray-300 font-medium">
                                {activeSegmentData?.caseStudy.result}
                              </span>
                            </div>
                            
                            <div className="relative pl-8 italic text-gray-600 dark:text-gray-400">
                              <svg 
                                className="absolute top-0 left-0 w-6 h-6 text-gray-300 dark:text-gray-600"
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path d="M7.5 6.75V15h-1.5V6.75H1.5v-1.5h6v1.5zm9 0V15h-1.5V6.75H10.5v-1.5h6v1.5z" />
                              </svg>
                              
                              <p>{activeSegmentData?.caseStudy.quote}</p>
                              
                              <p className="mt-2 not-italic text-sm text-gray-500 dark:text-gray-500">
                                — {activeSegmentData?.caseStudy.author}
                              </p>
                            </div>
                          </div>
                        </TiltCard>
                        
                        <motion.div
                          className="mt-4 text-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <button
                            className="inline-flex items-center py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <PlayIcon className="w-4 h-4 mr-2" />
                            Посмотреть видео кейса
                          </button>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Статистика по сегменту для мобильных */}
                    <div className="lg:hidden bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 mb-6">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Эффективность решения</h4>
                      
                      <div className="grid grid-cols-3 gap-4">
                        {statistics[activeSegment]?.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div 
                              className="text-2xl font-bold mb-1" 
                              style={{ color: getSegmentColor(activeSegment) }}
                            >
                              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Кнопки действий */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button 
                          className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg inline-flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Скачать презентацию
                        </button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button 
                          className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg inline-flex items-center justify-center shadow-lg shadow-primary/20"
                          style={{ backgroundColor: getSegmentColor(activeSegment) }}
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                          </svg>
                          Запросить демонстрацию
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Интерактивная сравнительная таблица */}
              <motion.div 
                className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Сравнение с другими решениями
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Функциональность</th>
                          <th className="text-center py-3 px-4 text-primary dark:text-primary-light font-medium">
                            Car-Sale
                            <div className="text-xs font-normal mt-1">Полная экосистема</div>
                          </th>
                          <th className="text-center py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                            Конкурент А
                            <div className="text-xs font-normal mt-1">Традиционная CRM</div>
                          </th>
                          <th className="text-center py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                            Конкурент Б
                            <div className="text-xs font-normal mt-1">Система учета</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { feature: 'Полная интеграция модулей', carSale: true, compA: false, compB: false },
                          { feature: 'Управление складом автомобилей', carSale: true, compA: true, compB: true },
                          { feature: 'Электронные контракты', carSale: true, compA: false, compB: true },
                          { feature: 'Интеграция с банками', carSale: true, compA: true, compB: false },
                          { feature: 'API для внешних систем', carSale: true, compA: false, compB: false },
                          { feature: 'Мобильное приложение', carSale: true, compA: true, compB: false }
                        ].map((row, index) => (
                          <motion.tr 
                            key={index}
                            className="border-b border-gray-100 dark:border-gray-700"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.feature}</td>
                            <td className="py-3 px-4 text-center">
                              {row.carSale ? (
                                <div className="mx-auto w-6 h-6 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="mx-auto w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {row.compA ? (
                                <div className="mx-auto w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="mx-auto w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {row.compB ? (
                                <div className="mx-auto w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="mx-auto w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </div>
                              )}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Индивидуальные решения */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto">
         <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.customSolutions.title}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-primary mx-auto rounded-full mb-6"
            />
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              {t.customSolutions.description}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {t.customSolutions.list.map((solution, index) => (
              <TiltCard
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">{solution.icon}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{solution.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{solution.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          
          {/* Интерактивная визуализация процесса кастомизации */}
          <motion.div 
            className="bg-gradient-to-br from-primary/5 to-primary-light/5 dark:from-primary/10 dark:to-primary-light/10 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 dark:bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary-light/10 dark:bg-primary-dark/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Процесс разработки индивидуального решения
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Мы создаем решения, полностью адаптированные под ваши потребности, следуя четкому процессу, который гарантирует результат.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { 
                        step: 1, 
                        title: 'Анализ требований', 
                        description: 'Детальное изучение ваших бизнес-процессов и выявление ключевых потребностей'
                      },
                      { 
                        step: 2, 
                        title: 'Проектирование', 
                        description: 'Разработка архитектуры решения и прототипирование интерфейсов'
                      },
                      { 
                        step: 3, 
                        title: 'Разработка', 
                        description: 'Создание и тестирование индивидуальных модулей и интеграций'
                      },
                      { 
                        step: 4, 
                        title: 'Внедрение', 
                        description: 'Развертывание системы и обучение персонала'
                      }
                    ].map((phase, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 text-white font-bold">
                          {phase.step}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{phase.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400">{phase.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                      Примеры индивидуальных решений
                    </h4>
                    
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Интеграция с системой поставщика',
                          client: 'ИмпортАвто',
                          description: 'Создание API для автоматического обновления складских запасов при поступлении новых автомобилей от производителя'
                        },
                        {
                          title: 'Кастомизированная аналитика',
                          client: 'АвтоПрестиж',
                          description: 'Разработка уникальных отчетов для оценки эффективности маркетинговых кампаний и их влияния на продажи'
                        },
                        {
                          title: 'Мобильное приложение для клиентов',
                          client: 'ПремиумКарс',
                          description: 'Создание приложения для клиентов с возможностью отслеживания статуса заказа и записи на сервис'
                        }
                      ].map((example, index) => (
                        <motion.div 
                          key={index}
                          className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <div className="flex justify-between items-start">
                            <h5 className="text-lg font-bold text-gray-900 dark:text-white">{example.title}</h5>
                            <span className="text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light px-2 py-1 rounded">
                              {example.client}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                            {example.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <motion.button
                        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg inline-flex items-center shadow-lg shadow-primary/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Заказать индивидуальное решение
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Истории успеха */}
      <section 
        ref={testimonialsRef}
        className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.testimonials.title}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-primary mx-auto rounded-full mb-6"
            />
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              {t.testimonials.description}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {t.testimonials.list.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover mr-4" />
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <svg 
                      className="absolute -top-2 -left-2 w-8 h-8 text-gray-200 dark:text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                    <p className="pt-2 text-gray-700 dark:text-gray-300 italic">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Клиентская база - визуализация */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Наши клиенты по сегментам
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { segment: 'Автодилеры', count: 125, color: '#7B2CBF', icon: '🚗' },
                { segment: 'Автосалоны', count: 84, color: '#0891B2', icon: '🏢' },
                { segment: 'Финансовые структуры', count: 36, color: '#F59E0B', icon: '💰' },
                { segment: 'Импортеры', count: 18, color: '#059669', icon: '🚢' },
                { segment: 'Сервисные центры', count: 42, color: '#DC2626', icon: '🔧' },
                { segment: 'Маркетплейсы', count: 7, color: '#7C3AED', icon: '🌐' }
              ].map((clientGroup, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${clientGroup.color}30` }}>
                    <span className="text-2xl">{clientGroup.icon}</span>
                  </div>
                  <div 
                    className="text-2xl font-bold mb-1" 
                    style={{ color: clientGroup.color }}
                  >
                    <AnimatedCounter value={clientGroup.count} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{clientGroup.segment}</div>
                  
                  {/* Прогресс-бар заполнения */}
                  <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ backgroundColor: clientGroup.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(clientGroup.count / 150) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Более 300 компаний из автомобильной индустрии уже оптимизировали свои бизнес-процессы с помощью Car-Sale
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA-секция */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="container mx-auto">
          <motion.div 
            className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl overflow-hidden shadow-xl relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Декоративные элементы */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full"></div>
            
            <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {t.cta.title}
              </h2>
              
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                {t.cta.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-white hover:bg-gray-100 text-primary font-medium rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.cta.primaryButton}
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white font-medium rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.cta.secondaryButton}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}