'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLanguageStore } from '@/src/store/language';
import { useTelegram } from '@/src/hooks/useTelegram';
import { 
  ArrowRightIcon, 
  ChevronRightIcon, 
  CheckCircleIcon, 
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

// Данные локализации
const localization = {
  ru: {
    hero: {
      title: 'Кейсы внедрения Car-Sale',
      subtitle: 'Истории успеха наших клиентов',
      description: 'Узнайте, как различные компании автомобильного сектора трансформировали свой бизнес с помощью нашей платформы.'
    },
    filters: {
      all: 'Все кейсы',
      dealers: 'Автодилеры',
      showrooms: 'Автосалоны',
      finance: 'Финансовые структуры',
      importers: 'Импортеры',
      service: 'Сервисные центры',
      marketplace: 'Маркетплейсы'
    },
    metrics: {
      efficiency: 'Эффективность',
      sales: 'Рост продаж',
      clients: 'Клиентская база',
      time: 'Экономия времени',
      cost: 'Снижение расходов'
    },
    cases: [
      {
        id: 'case-1',
        title: 'Автоматизация сети премиальных автосалонов',
        category: 'dealers',
        company: 'АвтоПрестиж',
        location: 'Москва, Россия',
        date: 'Сентябрь 2023',
        duration: '3 месяца',
        logo: 'https://via.placeholder.com/100x100/f3f4f6/7B2CBF?text=AP',
        image: 'https://images.unsplash.com/photo-1567077406681-a8633fc21cbb?q=80&w=800&h=400&auto=format&fit=crop',
        challenge: 'Сеть премиальных автосалонов «АвтоПрестиж» столкнулась с проблемами в управлении растущим бизнесом. Несогласованность между отделами, ручное ведение документации и отсутствие единой клиентской базы приводили к задержкам в обслуживании клиентов и упущенным возможностям продаж.',
        solution: 'Внедрение комплексной системы Car-Sale с модулями CRM, управления складом и электронного документооборота. Особое внимание было уделено интеграции с существующими системами учета и обучению персонала.',
        results: [
          'Увеличение конверсии лидов в продажи на 35%',
          'Сокращение времени оформления сделки с 3 часов до 40 минут',
          'Повышение точности прогнозирования продаж до 92%',
          'Сокращение расходов на административные процессы на 28%',
          'Рост повторных обращений клиентов на 45%'
        ],
        quote: {
          text: 'Car-Sale помогла нам оптимизировать все процессы, от первого контакта с клиентом до послепродажного обслуживания. Мы получили полную прозрачность бизнеса и значительно повысили уровень сервиса.',
          author: 'Алексей Петров',
          position: 'Коммерческий директор, АвтоПрестиж'
        },
        metrics: {
          efficiency: 87,
          sales: 35,
          clients: 45,
          time: 78,
          cost: 28
        }
      },
      {
        id: 'case-2',
        title: 'Оптимизация складского учета автомобилей',
        category: 'showrooms',
        company: 'АвтоМир',
        location: 'Санкт-Петербург, Россия',
        date: 'Июль 2023',
        duration: '2 месяца',
        logo: 'https://via.placeholder.com/100x100/f3f4f6/0891B2?text=AM',
        image: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=800&h=400&auto=format&fit=crop',
        challenge: 'Компания «АвтоМир» управляет сетью из 5 автосалонов с общим парком более 1000 автомобилей. Учет и перемещение автомобилей между площадками осуществлялись в Excel, что приводило к ошибкам, несоответствиям в инвентаризации и сложностям в поиске нужных автомобилей.',
        solution: 'Внедрение модуля складского учета Car-Sale с функцией отслеживания местоположения автомобилей в реальном времени. Система была интегрирована с сайтом компании для автоматического обновления каталога доступных автомобилей.',
        results: [
          'Сокращение времени инвентаризации на 85%',
          'Устранение расхождений в учете автомобилей',
          'Ускорение поиска нужного автомобиля с 25 минут до 30 секунд',
          'Увеличение оборачиваемости склада на 22%',
          'Сокращение простоя автомобилей на 35%'
        ],
        quote: {
          text: 'Благодаря единой системе учета мы можем мгновенно предоставить клиенту всю информацию по любому автомобилю из нашего каталога. Car-Sale сделала наш бизнес гораздо более прозрачным и управляемым.',
          author: 'Ирина Смирнова',
          position: 'Руководитель отдела продаж, АвтоМир'
        },
        metrics: {
          efficiency: 92,
          sales: 18,
          clients: 25,
          time: 85,
          cost: 32
        }
      },
      {
        id: 'case-3',
        title: 'Ускорение процесса автокредитования',
        category: 'finance',
        company: 'АвтоФинанс Банк',
        location: 'Казань, Россия',
        date: 'Октябрь 2023',
        duration: '4 месяца',
        logo: 'https://via.placeholder.com/100x100/f3f4f6/F59E0B?text=AFB',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&h=400&auto=format&fit=crop',
        challenge: 'Банк «АвтоФинанс» специализируется на автокредитовании и сталкивался с длительными сроками рассмотрения заявок и оформления кредитов. Каждая заявка требовала в среднем 2-3 дня на обработку, что приводило к потере потенциальных клиентов.',
        solution: 'Внедрение финансового модуля Car-Sale с автоматической проверкой заемщиков и интеграцией с кредитным бюро и государственными сервисами. Разработка API для прямой интеграции с системами автодилеров.',
        results: [
          'Сокращение времени рассмотрения заявки до 30 минут',
          'Увеличение одобренных заявок на 25%',
          'Рост числа выданных кредитов на 40%',
          'Снижение операционных затрат на 35%',
          'Уменьшение количества документов для клиента на 70%'
        ],
        quote: {
          text: 'Интеграция с Car-Sale позволила нам сократить время рассмотрения заявки с 2 дней до 30 минут. Это революционное изменение в нашем бизнесе, которое привело к значительному росту объема выданных кредитов.',
          author: 'Максим Иванов',
          position: 'Директор по автокредитованию, АвтоФинанс Банк'
        },
        metrics: {
          efficiency: 78,
          sales: 40,
          clients: 52,
          time: 94,
          cost: 35
        }
      },
      {
        id: 'case-4',
        title: 'Оптимизация импорта и дистрибуции автомобилей',
        category: 'importers',
        company: 'ИмпортАвто',
        location: 'Владивосток, Россия',
        date: 'Декабрь 2023',
        duration: '6 месяцев',
        logo: 'https://via.placeholder.com/100x100/f3f4f6/059669?text=IA',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800&h=400&auto=format&fit=crop',
        challenge: 'Компания «ИмпортАвто» занимается импортом и дистрибуцией автомобилей из Азии. Сложности с отслеживанием статуса автомобилей в пути, таможенным оформлением и распределением по дилерской сети приводили к задержкам поставок и неэффективному использованию ресурсов.',
        solution: 'Внедрение модуля логистики Car-Sale с функциями отслеживания поставок, автоматизации таможенного оформления и планирования дистрибуции. Разработка аналитических инструментов для прогнозирования спроса по регионам.',
        results: [
          'Сокращение среднего времени поставки на 20%',
          'Увеличение объема обрабатываемых автомобилей на 35%',
          'Снижение расходов на логистику на 18%',
          'Повышение точности прогнозирования региональных продаж до 85%',
          'Сокращение простоя автомобилей на складах на 40%'
        ],
        quote: {
          text: 'Car-Sale помогла нам создать прозрачную систему распределения автомобилей по всей дилерской сети с учетом региональных особенностей спроса. Мы значительно ускорили процесс доставки автомобилей клиентам.',
          author: 'Андрей Соколов',
          position: 'Операционный директор, ИмпортАвто'
        },
        metrics: {
          efficiency: 75,
          sales: 35,
          clients: 30,
          time: 62,
          cost: 42
        }
      },
      {
        id: 'case-5',
        title: 'Автоматизация сервисного центра',
        category: 'service',
        company: 'АвтоТехСервис',
        location: 'Екатеринбург, Россия',
        date: 'Ноябрь 2023',
        duration: '3 месяца',
        logo: 'https://via.placeholder.com/100x100/f3f4f6/DC2626?text=ATS',
        image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?q=80&w=800&h=400&auto=format&fit=crop',
        challenge: 'Сеть сервисных центров «АвтоТехСервис» сталкивалась с проблемами неравномерной загрузки мощностей, сложностями в планировании закупок запчастей и отсутствием единой истории обслуживания автомобилей клиентов.',
        solution: 'Внедрение сервисного модуля Car-Sale с функциями онлайн-записи, планирования загрузки персонала, учета запчастей и истории обслуживания автомобилей. Интеграция с поставщиками запчастей для автоматических заказов.',
        results: [
          'Увеличение пропускной способности сервисных центров на 30%',
          'Сокращение времени ожидания клиентов на 40%',
          'Уменьшение складских запасов запчастей на 25% при сохранении доступности',
          'Рост среднего чека на 15% за счет дополнительных услуг',
          'Увеличение количества постоянных клиентов на 35%'
        ],
        quote: {
          text: 'Система позволила нам оптимизировать процессы записи, диагностики и ремонта, что существенно повысило эффективность работы. Теперь мы можем обслуживать больше клиентов и делать это качественнее.',
          author: 'Дмитрий Васильев',
          position: 'Директор сервисного центра, АвтоТехСервис'
        },
        metrics: {
          efficiency: 80,
          sales: 22,
          clients: 35,
          time: 68,
          cost: 25
        }
      },
      {
        id: 'case-6',
        title: 'Оптимизация работы онлайн-площадки автомобилей',
        category: 'marketplace',
        company: 'АвтоМаркет',
        location: 'Москва, Россия',
        date: 'Январь 2024',
        duration: '5 месяцев',
        logo: 'https://via.placeholder.com/100x100/f3f4f6/7C3AED?text=AM',
        image: 'https://images.unsplash.com/photo-1607211851821-8be3cd6146f0?q=80&w=800&h=400&auto=format&fit=crop',
        challenge: 'Онлайн-маркетплейс «АвтоМаркет» столкнулся с проблемами актуализации информации о наличии автомобилей у дилеров, сложностями интеграции с разнородными системами поставщиков и высокой нагрузкой на службу поддержки.',
        solution: 'Внедрение API Car-Sale для интеграции с системами автодилеров, обеспечивающее обновление данных в реальном времени. Разработка унифицированной системы модерации объявлений и автоматизация проверки информации.',
        results: [
          'Рост среднемесячных продаж через платформу на 45%',
          'Увеличение количества автодилеров на площадке на 60%',
          'Сокращение времени публикации объявлений на 90%',
          'Снижение нагрузки на службу поддержки на 50%',
          'Повышение удовлетворенности пользователей на 38%'
        ],
        quote: {
          text: 'Благодаря интеграции с Car-Sale наш маркетплейс получил доступ к актуальным данным по наличию автомобилей у дилеров в реальном времени. Это кардинально изменило пользовательский опыт и повысило эффективность платформы.',
          author: 'Елена Кузнецова',
          position: 'CEO, АвтоМаркет'
        },
        metrics: {
          efficiency: 88,
          sales: 45,
          clients: 60,
          time: 90,
          cost: 38
        }
      }
    ],
    cta: {
      title: 'Готовы добавить свою компанию в список историй успеха?',
      description: 'Свяжитесь с нами, чтобы узнать, как Car-Sale может помочь в решении задач вашего бизнеса',
      button: 'Запросить демонстрацию'
    }
  },
  en: {
    // Английская локализация (аналогично русской)
  },
  uz: {
    // Узбекская локализация (аналогично русской)
  }
};

// Компонент Радар-диаграммы для показателей кейса
const RadarChart = ({ metrics, color = '#7B2CBF' }) => {
  const size = 200;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.4;
  
  // Функция для расчета координат точек на диаграмме
  const calculatePoint = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total;
    const adjustedValue = value / 100; // Нормализация значения (0-100%)
    const x = centerX + radius * adjustedValue * Math.sin(angle);
    const y = centerY - radius * adjustedValue * Math.cos(angle);
    return { x, y };
  };
  
  // Формируем точки для полигона
  const categories = Object.keys(metrics);
  const points = categories.map((key, index) => 
    calculatePoint(metrics[key], index, categories.length)
  );
  
  // Формируем строку точек для полигона
  const polygonPoints = points.map(point => `${point.x},${point.y}`).join(' ');
  
  // Оси и шкалы
  const axes = categories.map((key, index) => {
    const angle = (Math.PI * 2 * index) / categories.length;
    const lineX = centerX + radius * Math.sin(angle);
    const lineY = centerY - radius * Math.cos(angle);
    
    return {
      line: { x1: centerX, y1: centerY, x2: lineX, y2: lineY },
      label: { 
        x: centerX + (radius + 15) * Math.sin(angle), 
        y: centerY - (radius + 15) * Math.cos(angle),
        key
      }
    };
  });
  
  return (
    <div className="relative w-full max-w-[200px] mx-auto">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Фоновые круги */}
        <circle cx={centerX} cy={centerY} r={radius} fill="transparent" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
        <circle cx={centerX} cy={centerY} r={radius * 0.75} fill="transparent" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
        <circle cx={centerX} cy={centerY} r={radius * 0.5} fill="transparent" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
        <circle cx={centerX} cy={centerY} r={radius * 0.25} fill="transparent" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
        
        {/* Оси категорий */}
        {axes.map((axis, index) => (
          <line 
            key={index}
            x1={axis.line.x1}
            y1={axis.line.y1}
            x2={axis.line.x2}
            y2={axis.line.y2}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Данные - полигон */}
        <motion.polygon 
          points={polygonPoints}
          fill={`${color}30`}
          stroke={color}
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        
        {/* Точки данных */}
        {points.map((point, index) => (
          <motion.circle 
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
          />
        ))}
      </svg>
      
      {/* Подписи категорий */}
      {axes.map((axis, index) => (
        <div 
          key={index}
          className="absolute text-xs text-gray-500 dark:text-gray-400 text-center"
          style={{ 
            left: `${axis.label.x}px`, 
            top: `${axis.label.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {axis.label.key === 'efficiency' && 'Эффективность'}
          {axis.label.key === 'sales' && 'Продажи'}
          {axis.label.key === 'clients' && 'Клиенты'}
          {axis.label.key === 'time' && 'Время'}
          {axis.label.key === 'cost' && 'Расходы'}
        </div>
      ))}
    </div>
  );
};

// Компонент прогресс-бара с анимацией
const AnimatedProgressBar = ({ value, label, color = '#7B2CBF', delay = 0 }) => {
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true });
  
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700 dark:text-gray-300">{label}</span>
        <span className="font-medium" style={{ color }}>{value}%</span>
      </div>
      
      <div 
        ref={barRef}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      >
        {isInView && (
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.8, delay: delay }}
          />
        )}
      </div>
    </div>
  );
};

// Основной компонент страницы кейсов
export default function CasesPage() {
  const { currentLocale } = useLanguageStore();
  const { hapticFeedback } = useTelegram();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCase, setActiveCase] = useState(null);
  const [casesInView, setCasesInView] = useState({});
  const [mounted, setMounted] = useState(false);
  
  // Получаем локализованные строки
  const t = localization[currentLocale || 'ru'] || localization.ru;
  
  // Для скроллинга к секциям
  const casesRef = useRef(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Обработчик изменения фильтра
  const handleFilterChange = (filter) => {
    if (hapticFeedback) hapticFeedback('selection');
    setActiveFilter(filter);
  };
  
  // Обработчик клика на кейс
  const handleCaseClick = (caseId) => {
    if (hapticFeedback) hapticFeedback('impact');
    setActiveCase(caseId === activeCase ? null : caseId);
  };
  
  // Получение отфильтрованных кейсов
  const filteredCases = activeFilter === 'all' 
    ? t.cases 
    : t.cases.filter(caseItem => caseItem.category === activeFilter);
  
  // Получение данных активного кейса
  const activeCaseData = t.cases.find(caseItem => caseItem.id === activeCase);
  
  // Получение цвета для определенной категории
  const getCategoryColor = (category) => {
    switch(category) {
      case 'dealers': return '#7B2CBF';
      case 'showrooms': return '#0891B2';
      case 'finance': return '#F59E0B';
      case 'importers': return '#059669';
      case 'service': return '#DC2626';
      case 'marketplace': return '#7C3AED';
      default: return '#7B2CBF';
    }
  };
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="relative overflow-hidden page-scrollable">
      {/* Фоновые градиенты */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-white to-accent/10 dark:from-primary-dark/20 dark:via-black dark:to-primary-dark/5"></div>
      
      {/* Героическая секция */}
      <section className="pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary dark:text-primary-light">{t.hero.title}</span>
              </motion.h1>
              
              <motion.h2
                className="text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t.hero.subtitle}
              </motion.h2>
              
              <motion.p 
                className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t.hero.description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button 
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-colors inline-flex items-center justify-center shadow-lg shadow-primary/20"
                  onClick={() => casesRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Посмотреть истории успеха
                  <ChevronRightIcon className="w-5 h-5 ml-1" />
                </button>
              </motion.div>
            </div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Визуализация ключевых показателей в кейсах */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 overflow-hidden">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Результаты внедрения Car-Sale
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mx-auto mb-3">
                      <ChartBarIcon className="w-6 h-6 text-primary dark:text-primary-light" />
                    </div>
                    <div className="text-3xl font-bold text-primary dark:text-primary-light mb-1">+37%</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">средний рост эффективности</div>
                  </div>
                  
                <div className="bg-blue-500/10 dark:bg-blue-500/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center mx-auto mb-3">
                      <UserGroupIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-1">+42%</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">увеличение клиентской базы</div>
                  </div>
                  
                  <div className="bg-green-500/10 dark:bg-green-500/20 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 dark:bg-green-500/30 flex items-center justify-center mx-auto mb-3">
                      <CurrencyDollarIcon className="w-6 h-6 text-green-500 dark:text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-green-500 dark:text-green-400 mb-1">-28%</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">сокращение расходов</div>
                  </div>
                </div>
                
                {/* Сводная диаграмма результатов */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    Средние показатели по всем кейсам
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <AnimatedProgressBar value={83} label="Общая эффективность" color="#7B2CBF" delay={0.5} />
                      <AnimatedProgressBar value={32} label="Рост продаж" color="#0891B2" delay={0.6} />
                      <AnimatedProgressBar value={41} label="Увеличение клиентской базы" color="#F59E0B" delay={0.7} />
                      <AnimatedProgressBar value={79} label="Экономия времени" color="#059669" delay={0.8} />
                      <AnimatedProgressBar value={33} label="Снижение расходов" color="#DC2626" delay={0.9} />
                    </div>
                    
                    <div className="hidden md:block">
                      <RadarChart 
                        metrics={{
                          efficiency: 83,
                          sales: 32,
                          clients: 41,
                          time: 79,
                          cost: 33
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Декоративные элементы */}
              <motion.div 
                className="absolute -top-4 -right-4 h-16 w-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg -rotate-12 flex items-center justify-center z-10"
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ duration: 0.6, delay: 1.1, type: "spring" }}
              >
                <span className="text-xl">📊</span>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 h-14 w-14 bg-white dark:bg-gray-800 rounded-2xl shadow-lg rotate-12 flex items-center justify-center z-10"
                initial={{ opacity: 0, scale: 0, rotate: 45 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
              >
                <span className="text-xl">💼</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Основная секция с кейсами */}
      <section ref={casesRef} className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50 relative">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Истории успеха</h2>
            
            {/* Фильтры категорий */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {Object.entries(t.filters).map(([key, value], index) => (
                <motion.button
                  key={key}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === key 
                      ? 'bg-primary text-white shadow-md shadow-primary/20' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => handleFilterChange(key)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                >
                  {value}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Сетка кейсов */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 cursor-pointer ${
                      activeCase === caseItem.id ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900' : ''
                    }`}
                    onClick={() => handleCaseClick(caseItem.id)}
                  >
                    {/* Изображение кейса */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={caseItem.image} 
                        alt={caseItem.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      
                      {/* Категория */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs">
                        {t.filters[caseItem.category]}
                      </div>
                      
                      {/* Логотип компании */}
                      <div className="absolute bottom-4 left-4 flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-white">
                          <img 
                            src={caseItem.logo} 
                            alt={caseItem.company} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-white font-medium">{caseItem.company}</div>
                          <div className="text-white/70 text-xs">{caseItem.location}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Содержимое кейса */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {caseItem.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="text-gray-500 dark:text-gray-400">{caseItem.date}</div>
                        <div className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs text-gray-700 dark:text-gray-300">
                          {caseItem.duration}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {caseItem.challenge}
                      </p>
                      
                      {/* Ключевые результаты */}
                      <div className="mt-4 space-y-2">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Ключевые результаты:
                        </div>
                        {caseItem.results.slice(0, 2).map((result, idx) => (
                          <div key={idx} className="flex items-start text-sm">
                            <CheckCircleIcon className="w-4 h-4 text-primary dark:text-primary-light mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400">{result}</span>
                          </div>
                        ))}
                        {caseItem.results.length > 2 && (
                          <div className="text-xs text-primary dark:text-primary-light mt-2">
                            +{caseItem.results.length - 2} других результатов
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Нажмите для подробностей
                        </div>
                        <div className="w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <ChevronRightIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Пустое состояние, если нет кейсов */}
          {filteredCases.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Кейсы не найдены
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                По выбранному фильтру не найдено историй успеха. Попробуйте изменить фильтр или вернуться позже.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Подробная информация о выбранном кейсе */}
      <AnimatePresence>
        {activeCase && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCase(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {activeCaseData && (
                <>
                  {/* Верхняя цветная полоса */}
                  <div className="h-2" style={{ backgroundColor: getCategoryColor(activeCaseData.category) }}></div>
                  
                  {/* Изображение */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={activeCaseData.image} 
                      alt={activeCaseData.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    
                    {/* Информация о компании */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white">
                          <img 
                            src={activeCaseData.logo} 
                            alt={activeCaseData.company} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-white text-2xl font-bold">{activeCaseData.company}</div>
                          <div className="text-white/70">{activeCaseData.location}</div>
                        </div>
                      </div>
                      
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <div className="text-white/80 text-sm">Длительность проекта</div>
                        <div className="text-white font-medium">{activeCaseData.duration}</div>
                      </div>
                    </div>
                    
                    {/* Кнопка закрытия */}
                    <button 
                      className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                      onClick={() => setActiveCase(null)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      {activeCaseData.title}
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                      <div className="lg:col-span-2">
                        <div className="space-y-8">
                          {/* Задача */}
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                              <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              Задача
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                              {activeCaseData.challenge}
                            </p>
                          </div>
                          
                          {/* Решение */}
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>
                              Решение
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                              {activeCaseData.solution}
                            </p>
                          </div>
                          
                          {/* Результаты */}
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              Результаты
                            </h3>
                            <div className="space-y-3">
                              {activeCaseData.results.map((result, index) => (
                                <div key={index} className="flex items-start">
                                  <CheckCircleIcon 
                                    className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" 
                                    style={{ color: getCategoryColor(activeCaseData.category) }}
                                  />
                                  <p className="text-gray-700 dark:text-gray-300">{result}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Цитата */}
                          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 border-l-4" style={{ borderColor: getCategoryColor(activeCaseData.category) }}>
                            <blockquote className="italic text-gray-700 dark:text-gray-300 mb-4">
                              "{activeCaseData.quote.text}"
                            </blockquote>
                            <div className="flex items-center">
                              <div className="mr-3">
                                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{activeCaseData.quote.author}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{activeCaseData.quote.position}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Боковая панель с метриками */}
                      <div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 sticky top-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 text-center">
                            Ключевые метрики
                          </h3>
                          
                          <div className="mb-6">
                            <RadarChart 
                              metrics={activeCaseData.metrics}
                              color={getCategoryColor(activeCaseData.category)}
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <AnimatedProgressBar 
                              value={activeCaseData.metrics.efficiency} 
                              label="Эффективность" 
                              color={getCategoryColor(activeCaseData.category)}
                              delay={0.3} 
                            />
                            <AnimatedProgressBar 
                              value={activeCaseData.metrics.sales} 
                              label="Рост продаж" 
                              color={getCategoryColor(activeCaseData.category)}
                              delay={0.4} 
                            />
                            <AnimatedProgressBar 
                              value={activeCaseData.metrics.clients} 
                              label="Клиентская база" 
                              color={getCategoryColor(activeCaseData.category)}
                              delay={0.5} 
                            />
                            <AnimatedProgressBar 
                              value={activeCaseData.metrics.time} 
                              label="Экономия времени" 
                              color={getCategoryColor(activeCaseData.category)}
                              delay={0.6} 
                            />
                            <AnimatedProgressBar 
                              value={activeCaseData.metrics.cost} 
                              label="Снижение затрат" 
                              color={getCategoryColor(activeCaseData.category)}
                              delay={0.7} 
                            />
                          </div>
                          
                          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <button 
                              className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md inline-flex items-center justify-center"
                              style={{ backgroundColor: getCategoryColor(activeCaseData.category) }}
                            >
                              Запросить похожее решение
                              <ArrowRightIcon className="w-4 h-4 ml-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Другие кейсы */}
                    <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-700">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Другие истории успеха
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {t.cases
                          .filter(caseItem => caseItem.id !== activeCase)
                          .slice(0, 3)
                          .map((caseItem, index) => (
                            <div 
                              key={index}
                              className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => {
                                setActiveCase(caseItem.id);
                                window.scrollTo(0, 0);
                              }}
                            >
                              <div className="flex items-center mb-3">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: getCategoryColor(caseItem.category) }}
                                ></div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {t.filters[caseItem.category]}
                                </span>
                              </div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{caseItem.title}</h4>
                              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{caseItem.company}</div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500 dark:text-gray-400">{caseItem.date}</span>
                                <ChevronRightIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CTA секция */}
      <section className="py-16 px-4 relative">
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
              
              <motion.button
                className="px-8 py-4 bg-white hover:bg-gray-100 text-primary font-medium rounded-lg transition-colors inline-flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.cta.button}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}