'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTelegram } from '@/src/hooks/useTelegram';
import { useLanguageStore } from '@/src/store/language';
import { AnimatedCounter } from '@/src/components/shared/Home/AnimatedCounter';
import { SocialLinks } from '@/src/components/shared/Home/SocialLinks';

const aboutLocalization = {
  ru: {
    hero: {
      title: 'О компании Car-Sale',
      subtitle: 'Ведущая платформа автоматизации для автодилеров',
      description: 'Мы создаем инновационные решения, которые помогают автодилерам по всему миру оптимизировать свои процессы продаж, управления складом и работы с клиентами.'
    },
    history: {
      title: 'Наша история и миссия',
      timeline: [
        {
          year: '2018',
          title: 'Основание компании',
          description: 'Car-Sale была основана группой профессионалов из автомобильной и IT-индустрии, объединенных идеей трансформации процессов в автобизнесе.'
        },
        {
          year: '2019',
          title: 'Запуск первой версии платформы',
          description: 'Разработана и выпущена первая версия CRM-системы для автодилеров, включающая базовые модули управления продажами и складом.'
        },
        {
          year: '2020',
          title: 'Расширение функциональности',
          description: 'Добавлены модули электронных контрактов и аналитики, обеспечивающие полный цикл автоматизации процесса продаж.'
        },
        {
          year: '2022',
          title: 'Интеграция с платежными системами',
          description: 'Реализована полноценная интеграция с банками и платежными шлюзами, обеспечивающая бесшовный процесс оформления покупки.'
        },
        {
          year: '2023',
          title: 'Выход на международный рынок',
          description: 'Начало работы с автодилерами в странах СНГ и Восточной Европы. Локализация системы на различные языки.'
        },
        {
          year: '2024',
          title: 'Новая версия платформы',
          description: 'Выпуск обновленной версии с использованием передовых технологий и улучшенным пользовательским интерфейсом.'
        }
      ],
      mission: {
        title: 'Наша миссия',
        description: 'Трансформировать автомобильный бизнес через цифровизацию, делая процессы продаж прозрачными, эффективными и ориентированными на клиента. Мы стремимся предоставить автодилерам инструменты, которые позволят им сосредоточиться на стратегических задачах, пока наша система берет на себя рутинные операции.'
      },
      values: {
        title: 'Наши ценности',
        items: [
          {
            icon: '🎯',
            title: 'Ориентация на результат',
            description: 'Мы создаем продукты, которые реально решают бизнес-задачи наших клиентов.'
          },
          {
            icon: '🚀',
            title: 'Инновации',
            description: 'Постоянно исследуем новые технологии и подходы для улучшения нашей платформы.'
          },
          {
            icon: '🤝',
            title: 'Партнерство',
            description: 'Выстраиваем долгосрочные отношения с клиентами, основанные на доверии и взаимной выгоде.'
          },
          {
            icon: '⚙️',
            title: 'Качество',
            description: 'Гарантируем стабильность и надежность наших решений на каждом этапе.'
          }
        ]
      }
    },
    expertise: {
      title: 'Наша экспертиза в автосфере',
      description: 'За годы работы мы накопили значительный опыт в автомобильной индустрии, который позволяет нам предлагать решения, отвечающие специфическим потребностям отрасли.',
      areas: [
        {
          icon: '🚗',
          title: 'Управление автосалоном',
          description: 'Оптимизация процессов продаж, взаимодействия с клиентами и управления персоналом в автосалонах.'
        },
        {
          icon: '📊',
          title: 'Аналитика продаж',
          description: 'Глубокий анализ продаж, определение трендов и прогнозирование в автомобильном секторе.'
        },
        {
          icon: '📦',
          title: 'Управление складом',
          description: 'Эффективное управление запасами автомобилей, запчастей и аксессуаров.'
        },
        {
          icon: '📱',
          title: 'Мобильные решения',
          description: 'Разработка мобильных приложений для менеджеров автосалонов и клиентов.'
        },
        {
          icon: '📝',
          title: 'Электронный документооборот',
          description: 'Автоматизация формирования и подписания документов при продаже автомобилей.'
        },
        {
          icon: '🔄',
          title: 'Интеграции',
          description: 'Интеграция с банками, страховыми компаниями, поставщиками и другими участниками рынка.'
        }
      ]
    },
    team: {
      title: 'Наша команда',
      description: 'Car-Sale объединяет профессионалов из разных областей: разработчиков, аналитиков, экспертов автобизнеса и маркетологов, которые вместе создают инновационные решения для автомобильной индустрии.',
      leadership: {
        title: 'Руководство компании',
        members: [
          {
            name: 'Александр Иванов',
            position: 'Генеральный директор',
            bio: 'Более 15 лет опыта в IT и автомобильном бизнесе. Ранее занимал руководящие позиции в крупных автомобильных холдингах.',
            photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop'
          },
          {
            name: 'Елена Петрова',
            position: 'Технический директор',
            bio: 'Эксперт в области разработки программного обеспечения с фокусом на CRM-системы. Руководила IT-проектами для международных компаний.',
            photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop'
          },
          {
            name: 'Дмитрий Сидоров',
            position: 'Директор по продукту',
            bio: 'Специалист по автоматизации бизнес-процессов с опытом работы в автомобильной индустрии более 10 лет.',
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop'
          },
          {
            name: 'Мария Козлова',
            position: 'Директор по маркетингу',
            bio: 'Эксперт в области digital-маркетинга и развития бренда. Реализовала успешные маркетинговые стратегии для B2B компаний.',
            photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop'
          }
        ]
      },
      departments: {
        title: 'Структура компании',
        items: [
          { name: 'Разработка ПО', count: 25, icon: '💻' },
          { name: 'Продуктовый менеджмент', count: 8, icon: '📋' },
          { name: 'Поддержка клиентов', count: 15, icon: '🎧' },
          { name: 'Маркетинг и продажи', count: 12, icon: '📢' },
          { name: 'Аналитика и данные', count: 7, icon: '📊' },
          { name: 'Администрация', count: 5, icon: '🏢' }
        ]
      }
    },
    partners: {
      title: 'Наши партнеры и клиенты',
      description: 'Мы гордимся сотрудничеством с ведущими компаниями автомобильной индустрии, которые доверяют нам автоматизацию своих процессов.',
      partners: [
        { name: 'АвтоПрестиж', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoPrestige' },
        { name: 'АвтоЛюкс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoLux' },
        { name: 'ПремиумКарс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=PremiumCars' },
        { name: 'МегаАвто', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=MegaAuto' },
        { name: 'СтарМоторс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=StarMotors' },
        { name: 'АвтоСити', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoCity' }
      ],
      testimonials: [
        {
          text: 'Внедрение системы Car-Sale позволило нам увеличить эффективность продаж на 30% и значительно упростить работу с документами.',
          author: 'Иван Петров',
          company: 'АвтоПрестиж',
          position: 'Коммерческий директор',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop'
        },
        {
          text: 'Благодаря автоматизации процессов с Car-Sale мы смогли сократить время оформления сделки с 2 часов до 30 минут, что значительно повысило удовлетворенность клиентов.',
          author: 'Анна Сергеева',
          company: 'ПремиумКарс',
          position: 'Директор по развитию',
          avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&h=100&auto=format&fit=crop'
        },
        {
          text: 'Интеграция с банками и страховыми компаниями позволила нам создать единую экосистему и предложить клиентам комплексное решение при покупке автомобиля.',
          author: 'Алексей Николаев',
          company: 'МегаАвто',
          position: 'IT-директор',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&h=100&auto=format&fit=crop'
        }
      ]
    },
    stats: {
      title: 'Car-Sale в цифрах',
      description: 'Наши достижения, которыми мы гордимся',
      items: [
        { value: 250, suffix: '+', label: 'автодилеров', description: 'используют нашу систему' },
        { value: 142000, suffix: '', label: 'автомобилей', description: 'продано через нашу платформу' },
        { value: 98, suffix: '%', label: 'клиентов', description: 'рекомендуют нас партнерам' },
        { value: 12, suffix: '', label: 'регионов', description: 'активно используют систему' }
      ],
      geography: {
        title: 'География присутствия',
        countries: [
          { name: 'Россия', dealers: 145, color: '#7B2CBF' },
          { name: 'Казахстан', dealers: 38, color: '#0891B2' },
          { name: 'Узбекистан', dealers: 27, color: '#F59E0B' },
          { name: 'Беларусь', dealers: 21, color: '#059669' },
          { name: 'Армения', dealers: 12, color: '#DC2626' },
          { name: 'Другие страны', dealers: 7, color: '#9CA3AF' }
        ]
      }
    },
    cta: {
      title: 'Присоединяйтесь к сообществу Car-Sale',
      subtitle: 'Станьте частью успешного будущего автомобильного бизнеса',
      button: 'Запросить демонстрацию'
    }
  },
  en: {
    // Английская локализация (аналогично русской версии)
  },
  uz: {
    // Узбекская локализация (аналогично русской версии)
  }
};

// Основной компонент страницы "О компании"
export default function AboutPage() {
  const { hapticFeedback } = useTelegram();
  const { currentLocale } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  
  const t = aboutLocalization[currentLocale || 'ru'] || aboutLocalization.ru;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCtaClick = () => {
    window.location.href = '/demo';
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
      <section className="pt-8 sm:pt-16 pb-16 sm:pb-24 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary dark:text-primary-light">{t.hero.title}</span>
            </motion.h1>
            
            <motion.h2
              className="text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.hero.subtitle}
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t.hero.description}
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* История и миссия */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.history.title}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-primary mx-auto rounded-full mb-6"
            />
          </motion.div>
          
          {/* Временная линия */}
          <div className="relative max-w-4xl mx-auto mb-20">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 dark:bg-primary/30"></div>
            
            {t.history.timeline.map((item, index) => (
              <motion.div 
                key={index}
                className={`relative mb-8 flex ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              >
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16'}`}>
                  <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 ${
                    index % 2 === 0 ? 'rounded-tr-none' : 'rounded-tl-none'
                  }`}>
                    <span className="text-primary dark:text-primary-light text-lg font-bold">{item.year}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Миссия компании */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="md:w-1/3">
                <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-primary dark:text-primary-light mb-4">{t.history.mission.title}</h3>
                  <div className="flex space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className="w-6 h-6 text-primary dark:text-primary-light" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                  "{t.history.mission.description}"
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Ценности компании */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {t.history.values.items.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 flex items-center justify-center text-2xl mb-4 bg-primary/10 dark:bg-primary/20 rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Экспертиза в автосфере */}
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
              {t.expertise.title}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-primary mx-auto rounded-full mb-6"
            />
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              {t.expertise.description}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.expertise.areas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 flex items-center justify-center text-2xl bg-primary/10 dark:bg-primary/20 rounded-2xl mb-4">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{area.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{area.description}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-primary-light"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${75 + index * 5}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Уровень экспертизы</span>
                    <span className="text-sm font-medium text-primary dark:text-primary-light">{75 + index * 5}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Команда */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.team.title}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-primary mx-auto rounded-full mb-6"
            />
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              {t.team.description}
            </p>
          </motion.div>
          
          {/* Руководство компании */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {t.team.leadership.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {t.team.leadership.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-square">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <div className="flex space-x-2">
                        <a href="#" className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-primary/80 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                          </svg>
                        </a>
                        <a href="#" className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-primary/80 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </a>
                        <a href="#" className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-primary/80 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h4>
                  <p className="text-primary dark:text-primary-light font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Структура компании */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t.team.departments.title}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {t.team.departments.items.map((department, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-3">
                    {department.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{department.name}</h4>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary dark:text-primary-light mr-1">
                      <AnimatedCounter value={department.count} />
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">сотрудников</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Карточка приглашения */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl p-8 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Присоединяйтесь к нашей команде!</h3>
                <p className="opacity-90">Мы всегда ищем талантливых специалистов для развития нашей платформы</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-primary font-medium rounded-full shadow-lg"
              >
                Смотреть вакансии
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Партнеры и клиенты */}
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
              {t.partners.title}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-primary mx-auto rounded-full mb-6"
            />
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              {t.partners.description}
            </p>
          </motion.div>
          
          {/* Логотипы партнеров */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
            {t.partners.partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, filter: 'none' }}
                className="h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="h-full object-contain"
                />
              </motion.div>
            ))}
          </div>
          
          {/* Отзывы клиентов */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Что говорят наши клиенты
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.partners.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
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
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Car-Sale в цифрах */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.stats.title}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-primary mx-auto rounded-full mb-6"
            />
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              {t.stats.description}
            </p>
          </motion.div>
          
          {/* Цифровые показатели */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {t.stats.items.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                {/* Фоновый круг с градиентом */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/5 dark:from-primary/20 dark:to-primary-dark/10 rounded-full transition-all duration-500 group-hover:scale-110"></div>
                
                <div className="relative">
                  <div className="flex items-baseline">
                    <span className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {stat.description}
                    </p>
                    
                    {/* Индикатор прогресса */}
                    <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary-light"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.2 + 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* География присутствия */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t.stats.geography.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Карта с отметками (иллюстративно) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 h-[400px] relative"
              >
                <div className="absolute inset-0 p-5">
                  <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-700/50 overflow-hidden">
                    {/* Здесь в реальном проекте была бы карта с маркерами */}
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400 text-center">
                        Интерактивная карта<br />дилерской сети Car-Sale
                      </p>
                    </div>
                    
                    {/* Маркеры на карте (иллюстративно) */}
                    {t.stats.geography.countries.map((country, i) => (
                      <div 
                        key={i}
                        className="absolute w-3 h-3 rounded-full"
                        style={{ 
                          backgroundColor: country.color,
                          top: `${20 + i * 10}%`, 
                          left: `${20 + Math.sin(i) * 30}%` 
                        }}
                      >
                        <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-current opacity-30 animate-ping" style={{ color: country.color }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* График по странам */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Распределение дилеров по странам
                </h4>
                
                {t.stats.geography.countries.map((country, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{country.name}</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{country.dealers}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full"
                        style={{ backgroundColor: country.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(country.dealers / 250) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA-секция */}
      <section className="py-16 px-4 mb-16 relative overflow-hidden">
        <div className="container mx-auto relative">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl overflow-hidden shadow-xl relative">
            {/* Декоративный фон */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full"></div>
              
              {/* Анимированные частицы */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-white/20 rounded-full"
                  initial={{ 
                    x: Math.random() * 100, 
                    y: Math.random() * 100,
                    opacity: Math.random() * 0.5 + 0.2
                  }}
                  animate={{ 
                    y: [Math.random() * 100, Math.random() * 100 - 50],
                    opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.7 + 0.3]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: Math.random() * 5 + 5
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>

            <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
              <motion.div 
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.h2 
                  className="text-2xl sm:text-3xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {t.cta.title}
                </motion.h2>
                
                <motion.p 
                  className="text-white/80 mb-8 max-w-lg mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {t.cta.subtitle}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button 
                    onClick={handleCtaClick}
                    className="px-8 py-3 bg-white hover:bg-gray-100 text-primary font-medium rounded-full transition-colors inline-flex items-center justify-center shadow-lg"
                  >
                    {t.cta.button}
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}