'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRightIcon, MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTelegram } from '@/src/hooks/useTelegram';
import { useTranslation } from '@/src/hooks/useTranslation';
import { AnimatedCounter } from '@/src/components/shared/Home/AnimatedCounter';
import { SocialLinks } from '@/src/components/shared/Home/SocialLinks';
import { CircularIndicator } from '@/src/components/shared/Home/CircularIndicator';

// Локализация для страницы "О компании"
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
          description: 'Car-Sale была основана группой профессионалов из автомобильной и IT-индустрии, объединенных идеей трансформации процессов в автобизнесе.',
          icon: '🚀'
        },
        {
          year: '2019',
          title: 'Запуск первой версии платформы',
          description: 'Разработана и выпущена первая версия CRM-системы для автодилеров, включающая базовые модули управления продажами и складом.',
          icon: '💻'
        },
        {
          year: '2020',
          title: 'Расширение функциональности',
          description: 'Добавлены модули электронных контрактов и аналитики, обеспечивающие полный цикл автоматизации процесса продаж.',
          icon: '📈'
        },
        {
          year: '2022',
          title: 'Интеграция с платежными системами',
          description: 'Реализована полноценная интеграция с банками и платежными шлюзами, обеспечивающая бесшовный процесс оформления покупки.',
          icon: '💳'
        },
        {
          year: '2023',
          title: 'Выход на международный рынок',
          description: 'Начало работы с автодилерами в странах СНГ и Восточной Европы. Локализация системы на различные языки.',
          icon: '🌎'
        },
        {
          year: '2024',
          title: 'Новая версия платформы',
          description: 'Выпуск обновленной версии с использованием передовых технологий и улучшенным пользовательским интерфейсом.',
          icon: '🔄'
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
          description: 'Оптимизация процессов продаж, взаимодействия с клиентами и управления персоналом в автосалонах.',
          percentage: 95
        },
        {
          icon: '📊',
          title: 'Аналитика продаж',
          description: 'Глубокий анализ продаж, определение трендов и прогнозирование в автомобильном секторе.',
          percentage: 92
        },
        {
          icon: '📦',
          title: 'Управление складом',
          description: 'Эффективное управление запасами автомобилей, запчастей и аксессуаров.',
          percentage: 97
        },
        {
          icon: '📱',
          title: 'Мобильные решения',
          description: 'Разработка мобильных приложений для менеджеров автосалонов и клиентов.',
          percentage: 89
        },
        {
          icon: '📝',
          title: 'Электронный документооборот',
          description: 'Автоматизация формирования и подписания документов при продаже автомобилей.',
          percentage: 94
        },
        {
          icon: '🔄',
          title: 'Интеграции',
          description: 'Интеграция с банками, страховыми компаниями, поставщиками и другими участниками рынка.',
          percentage: 91
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
            photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'alexander@carsale.com'
            }
          },
          {
            name: 'Елена Петрова',
            position: 'Технический директор',
            bio: 'Эксперт в области разработки программного обеспечения с фокусом на CRM-системы. Руководила IT-проектами для международных компаний.',
            photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'elena@carsale.com'
            }
          },
          {
            name: 'Дмитрий Сидоров',
            position: 'Директор по продукту',
            bio: 'Специалист по автоматизации бизнес-процессов с опытом работы в автомобильной индустрии более 10 лет.',
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'dmitry@carsale.com'
            }
          },
          {
            name: 'Мария Козлова',
            position: 'Директор по маркетингу',
            bio: 'Эксперт в области digital-маркетинга и развития бренда. Реализовала успешные маркетинговые стратегии для B2B компаний.',
            photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'maria@carsale.com'
            }
          }
        ]
      },
      departments: {
        title: 'Структура компании',
        items: [
          { name: 'Разработка ПО', count: 25, icon: '💻', color: '#7B2CBF' },
          { name: 'Продуктовый менеджмент', count: 8, icon: '📋', color: '#0891B2' },
          { name: 'Поддержка клиентов', count: 15, icon: '🎧', color: '#059669' },
          { name: 'Маркетинг и продажи', count: 12, icon: '📢', color: '#F59E0B' },
          { name: 'Аналитика и данные', count: 7, icon: '📊', color: '#DC2626' },
          { name: 'Администрация', count: 5, icon: '🏢', color: '#4F46E5' }
        ]
      }
    },
    partners: {
      title: 'Наши партнеры и клиенты',
      description: 'Мы гордимся сотрудничеством с ведущими компаниями автомобильной индустрии, которые доверяют нам автоматизацию своих процессов.',
      partners: [
        { name: 'АвтоПрестиж', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoPrestige', color: '#7B2CBF' },
        { name: 'АвтоЛюкс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoLux', color: '#0891B2' },
        { name: 'ПремиумКарс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=PremiumCars', color: '#059669' },
        { name: 'МегаАвто', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=MegaAuto', color: '#F59E0B' },
        { name: 'СтарМоторс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=StarMotors', color: '#DC2626' },
        { name: 'АвтоСити', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoCity', color: '#4F46E5' }
      ],
      testimonials: [
        {
          text: 'Внедрение системы Car-Sale позволило нам увеличить эффективность продаж на 30% и значительно упростить работу с документами.',
          author: 'Иван Петров',
          company: 'АвтоПрестиж',
          position: 'Коммерческий директор',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop',
          rating: 5
        },
        {
          text: 'Благодаря автоматизации процессов с Car-Sale мы смогли сократить время оформления сделки с 2 часов до 30 минут, что значительно повысило удовлетворенность клиентов.',
          author: 'Анна Сергеева',
          company: 'ПремиумКарс',
          position: 'Директор по развитию',
          avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&h=100&auto=format&fit=crop',
          rating: 5
        },
        {
          text: 'Интеграция с банками и страховыми компаниями позволила нам создать единую экосистему и предложить клиентам комплексное решение при покупке автомобиля.',
          author: 'Алексей Николаев',
          company: 'МегаАвто',
          position: 'IT-директор',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&h=100&auto=format&fit=crop',
          rating: 4
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
        description: 'Мы активно расширяем географию нашего присутствия, помогая автодилерам по всему миру внедрять современные технологии',
        countries: [
          { name: 'Россия', dealers: 145, color: '#7B2CBF', coordinates: { lat: 55.7558, lng: 37.6173 } },
          { name: 'Казахстан', dealers: 38, color: '#0891B2', coordinates: { lat: 51.1694, lng: 71.4491 } },
          { name: 'Узбекистан', dealers: 27, color: '#F59E0B', coordinates: { lat: 41.3111, lng: 69.2407 } },
          { name: 'Беларусь', dealers: 21, color: '#059669', coordinates: { lat: 53.9045, lng: 27.5615 } },
          { name: 'Армения', dealers: 12, color: '#DC2626', coordinates: { lat: 40.1792, lng: 44.4991 } },
          { name: 'Другие страны', dealers: 7, color: '#9CA3AF', coordinates: { lat: 48.3794, lng: 31.1656 } }
        ],
        regions: [
          { name: 'Европа', dealersCount: 168, percentage: 67, color: '#7B2CBF' },
          { name: 'Центральная Азия', dealersCount: 65, percentage: 26, color: '#0891B2' },
          { name: 'Южная Азия', dealersCount: 12, percentage: 5, color: '#F59E0B' },
          { name: 'Ближний Восток', dealersCount: 5, percentage: 2, color: '#059669' }
        ],
        growth: {
          thisYear: 35,
          lastYear: 28,
          projected: 42
        }
      }
    },
    cta: {
      title: 'Присоединяйтесь к сообществу Car-Sale',
      subtitle: 'Станьте частью успешного будущего автомобильного бизнеса',
      button: 'Запросить демонстрацию',
      contactInfo: {
        email: 'info@car-sale.com',
        phone: '+7 (999) 123-45-67',
        address: 'г. Москва, ул. Автомобильная, 42'
      }
    }
  },
  en: {
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
          description: 'Car-Sale была основана группой профессионалов из автомобильной и IT-индустрии, объединенных идеей трансформации процессов в автобизнесе.',
          icon: '🚀'
        },
        {
          year: '2019',
          title: 'Запуск первой версии платформы',
          description: 'Разработана и выпущена первая версия CRM-системы для автодилеров, включающая базовые модули управления продажами и складом.',
          icon: '💻'
        },
        {
          year: '2020',
          title: 'Расширение функциональности',
          description: 'Добавлены модули электронных контрактов и аналитики, обеспечивающие полный цикл автоматизации процесса продаж.',
          icon: '📈'
        },
        {
          year: '2022',
          title: 'Интеграция с платежными системами',
          description: 'Реализована полноценная интеграция с банками и платежными шлюзами, обеспечивающая бесшовный процесс оформления покупки.',
          icon: '💳'
        },
        {
          year: '2023',
          title: 'Выход на международный рынок',
          description: 'Начало работы с автодилерами в странах СНГ и Восточной Европы. Локализация системы на различные языки.',
          icon: '🌎'
        },
        {
          year: '2024',
          title: 'Новая версия платформы',
          description: 'Выпуск обновленной версии с использованием передовых технологий и улучшенным пользовательским интерфейсом.',
          icon: '🔄'
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
          description: 'Оптимизация процессов продаж, взаимодействия с клиентами и управления персоналом в автосалонах.',
          percentage: 95
        },
        {
          icon: '📊',
          title: 'Аналитика продаж',
          description: 'Глубокий анализ продаж, определение трендов и прогнозирование в автомобильном секторе.',
          percentage: 92
        },
        {
          icon: '📦',
          title: 'Управление складом',
          description: 'Эффективное управление запасами автомобилей, запчастей и аксессуаров.',
          percentage: 97
        },
        {
          icon: '📱',
          title: 'Мобильные решения',
          description: 'Разработка мобильных приложений для менеджеров автосалонов и клиентов.',
          percentage: 89
        },
        {
          icon: '📝',
          title: 'Электронный документооборот',
          description: 'Автоматизация формирования и подписания документов при продаже автомобилей.',
          percentage: 94
        },
        {
          icon: '🔄',
          title: 'Интеграции',
          description: 'Интеграция с банками, страховыми компаниями, поставщиками и другими участниками рынка.',
          percentage: 91
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
            photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'alexander@carsale.com'
            }
          },
          {
            name: 'Елена Петрова',
            position: 'Технический директор',
            bio: 'Эксперт в области разработки программного обеспечения с фокусом на CRM-системы. Руководила IT-проектами для международных компаний.',
            photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'elena@carsale.com'
            }
          },
          {
            name: 'Дмитрий Сидоров',
            position: 'Директор по продукту',
            bio: 'Специалист по автоматизации бизнес-процессов с опытом работы в автомобильной индустрии более 10 лет.',
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'dmitry@carsale.com'
            }
          },
          {
            name: 'Мария Козлова',
            position: 'Директор по маркетингу',
            bio: 'Эксперт в области digital-маркетинга и развития бренда. Реализовала успешные маркетинговые стратегии для B2B компаний.',
            photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'maria@carsale.com'
            }
          }
        ]
      },
      departments: {
        title: 'Структура компании',
        items: [
          { name: 'Разработка ПО', count: 25, icon: '💻', color: '#7B2CBF' },
          { name: 'Продуктовый менеджмент', count: 8, icon: '📋', color: '#0891B2' },
          { name: 'Поддержка клиентов', count: 15, icon: '🎧', color: '#059669' },
          { name: 'Маркетинг и продажи', count: 12, icon: '📢', color: '#F59E0B' },
          { name: 'Аналитика и данные', count: 7, icon: '📊', color: '#DC2626' },
          { name: 'Администрация', count: 5, icon: '🏢', color: '#4F46E5' }
        ]
      }
    },
    partners: {
      title: 'Наши партнеры и клиенты',
      description: 'Мы гордимся сотрудничеством с ведущими компаниями автомобильной индустрии, которые доверяют нам автоматизацию своих процессов.',
      partners: [
        { name: 'АвтоПрестиж', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoPrestige', color: '#7B2CBF' },
        { name: 'АвтоЛюкс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoLux', color: '#0891B2' },
        { name: 'ПремиумКарс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=PremiumCars', color: '#059669' },
        { name: 'МегаАвто', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=MegaAuto', color: '#F59E0B' },
        { name: 'СтарМоторс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=StarMotors', color: '#DC2626' },
        { name: 'АвтоСити', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoCity', color: '#4F46E5' }
      ],
      testimonials: [
        {
          text: 'Внедрение системы Car-Sale позволило нам увеличить эффективность продаж на 30% и значительно упростить работу с документами.',
          author: 'Иван Петров',
          company: 'АвтоПрестиж',
          position: 'Коммерческий директор',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop',
          rating: 5
        },
        {
          text: 'Благодаря автоматизации процессов с Car-Sale мы смогли сократить время оформления сделки с 2 часов до 30 минут, что значительно повысило удовлетворенность клиентов.',
          author: 'Анна Сергеева',
          company: 'ПремиумКарс',
          position: 'Директор по развитию',
          avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&h=100&auto=format&fit=crop',
          rating: 5
        },
        {
          text: 'Интеграция с банками и страховыми компаниями позволила нам создать единую экосистему и предложить клиентам комплексное решение при покупке автомобиля.',
          author: 'Алексей Николаев',
          company: 'МегаАвто',
          position: 'IT-директор',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&h=100&auto=format&fit=crop',
          rating: 4
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
        description: 'Мы активно расширяем географию нашего присутствия, помогая автодилерам по всему миру внедрять современные технологии',
        countries: [
          { name: 'Россия', dealers: 145, color: '#7B2CBF', coordinates: { lat: 55.7558, lng: 37.6173 } },
          { name: 'Казахстан', dealers: 38, color: '#0891B2', coordinates: { lat: 51.1694, lng: 71.4491 } },
          { name: 'Узбекистан', dealers: 27, color: '#F59E0B', coordinates: { lat: 41.3111, lng: 69.2407 } },
          { name: 'Беларусь', dealers: 21, color: '#059669', coordinates: { lat: 53.9045, lng: 27.5615 } },
          { name: 'Армения', dealers: 12, color: '#DC2626', coordinates: { lat: 40.1792, lng: 44.4991 } },
          { name: 'Другие страны', dealers: 7, color: '#9CA3AF', coordinates: { lat: 48.3794, lng: 31.1656 } }
        ],
        regions: [
          { name: 'Европа', dealersCount: 168, percentage: 67, color: '#7B2CBF' },
          { name: 'Центральная Азия', dealersCount: 65, percentage: 26, color: '#0891B2' },
          { name: 'Южная Азия', dealersCount: 12, percentage: 5, color: '#F59E0B' },
          { name: 'Ближний Восток', dealersCount: 5, percentage: 2, color: '#059669' }
        ],
        growth: {
          thisYear: 35,
          lastYear: 28,
          projected: 42
        }
      }
    },
    cta: {
      title: 'Присоединяйтесь к сообществу Car-Sale',
      subtitle: 'Станьте частью успешного будущего автомобильного бизнеса',
      button: 'Запросить демонстрацию',
      contactInfo: {
        email: 'info@car-sale.com',
        phone: '+7 (999) 123-45-67',
        address: 'г. Москва, ул. Автомобильная, 42'
      }
    }
  },
  uz: {
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
          description: 'Car-Sale была основана группой профессионалов из автомобильной и IT-индустрии, объединенных идеей трансформации процессов в автобизнесе.',
          icon: '🚀'
        },
        {
          year: '2019',
          title: 'Запуск первой версии платформы',
          description: 'Разработана и выпущена первая версия CRM-системы для автодилеров, включающая базовые модули управления продажами и складом.',
          icon: '💻'
        },
        {
          year: '2020',
          title: 'Расширение функциональности',
          description: 'Добавлены модули электронных контрактов и аналитики, обеспечивающие полный цикл автоматизации процесса продаж.',
          icon: '📈'
        },
        {
          year: '2022',
          title: 'Интеграция с платежными системами',
          description: 'Реализована полноценная интеграция с банками и платежными шлюзами, обеспечивающая бесшовный процесс оформления покупки.',
          icon: '💳'
        },
        {
          year: '2023',
          title: 'Выход на международный рынок',
          description: 'Начало работы с автодилерами в странах СНГ и Восточной Европы. Локализация системы на различные языки.',
          icon: '🌎'
        },
        {
          year: '2024',
          title: 'Новая версия платформы',
          description: 'Выпуск обновленной версии с использованием передовых технологий и улучшенным пользовательским интерфейсом.',
          icon: '🔄'
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
          description: 'Оптимизация процессов продаж, взаимодействия с клиентами и управления персоналом в автосалонах.',
          percentage: 95
        },
        {
          icon: '📊',
          title: 'Аналитика продаж',
          description: 'Глубокий анализ продаж, определение трендов и прогнозирование в автомобильном секторе.',
          percentage: 92
        },
        {
          icon: '📦',
          title: 'Управление складом',
          description: 'Эффективное управление запасами автомобилей, запчастей и аксессуаров.',
          percentage: 97
        },
        {
          icon: '📱',
          title: 'Мобильные решения',
          description: 'Разработка мобильных приложений для менеджеров автосалонов и клиентов.',
          percentage: 89
        },
        {
          icon: '📝',
          title: 'Электронный документооборот',
          description: 'Автоматизация формирования и подписания документов при продаже автомобилей.',
          percentage: 94
        },
        {
          icon: '🔄',
          title: 'Интеграции',
          description: 'Интеграция с банками, страховыми компаниями, поставщиками и другими участниками рынка.',
          percentage: 91
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
            photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'alexander@carsale.com'
            }
          },
          {
            name: 'Елена Петрова',
            position: 'Технический директор',
            bio: 'Эксперт в области разработки программного обеспечения с фокусом на CRM-системы. Руководила IT-проектами для международных компаний.',
            photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'elena@carsale.com'
            }
          },
          {
            name: 'Дмитрий Сидоров',
            position: 'Директор по продукту',
            bio: 'Специалист по автоматизации бизнес-процессов с опытом работы в автомобильной индустрии более 10 лет.',
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'dmitry@carsale.com'
            }
          },
          {
            name: 'Мария Козлова',
            position: 'Директор по маркетингу',
            bio: 'Эксперт в области digital-маркетинга и развития бренда. Реализовала успешные маркетинговые стратегии для B2B компаний.',
            photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop',
            socials: {
              linkedin: '#',
              twitter: '#',
              email: 'maria@carsale.com'
            }
          }
        ]
      },
      departments: {
        title: 'Структура компании',
        items: [
          { name: 'Разработка ПО', count: 25, icon: '💻', color: '#7B2CBF' },
          { name: 'Продуктовый менеджмент', count: 8, icon: '📋', color: '#0891B2' },
          { name: 'Поддержка клиентов', count: 15, icon: '🎧', color: '#059669' },
          { name: 'Маркетинг и продажи', count: 12, icon: '📢', color: '#F59E0B' },
          { name: 'Аналитика и данные', count: 7, icon: '📊', color: '#DC2626' },
          { name: 'Администрация', count: 5, icon: '🏢', color: '#4F46E5' }
        ]
      }
    },
    partners: {
      title: 'Наши партнеры и клиенты',
      description: 'Мы гордимся сотрудничеством с ведущими компаниями автомобильной индустрии, которые доверяют нам автоматизацию своих процессов.',
      partners: [
        { name: 'АвтоПрестиж', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoPrestige', color: '#7B2CBF' },
        { name: 'АвтоЛюкс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoLux', color: '#0891B2' },
        { name: 'ПремиумКарс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=PremiumCars', color: '#059669' },
        { name: 'МегаАвто', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=MegaAuto', color: '#F59E0B' },
        { name: 'СтарМоторс', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=StarMotors', color: '#DC2626' },
        { name: 'АвтоСити', logo: 'https://via.placeholder.com/150x50/f0f0f0/333333?text=AutoCity', color: '#4F46E5' }
      ],
      testimonials: [
        {
          text: 'Внедрение системы Car-Sale позволило нам увеличить эффективность продаж на 30% и значительно упростить работу с документами.',
          author: 'Иван Петров',
          company: 'АвтоПрестиж',
          position: 'Коммерческий директор',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop',
          rating: 5
        },
        {
          text: 'Благодаря автоматизации процессов с Car-Sale мы смогли сократить время оформления сделки с 2 часов до 30 минут, что значительно повысило удовлетворенность клиентов.',
          author: 'Анна Сергеева',
          company: 'ПремиумКарс',
          position: 'Директор по развитию',
          avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&h=100&auto=format&fit=crop',
          rating: 5
        },
        {
          text: 'Интеграция с банками и страховыми компаниями позволила нам создать единую экосистему и предложить клиентам комплексное решение при покупке автомобиля.',
          author: 'Алексей Николаев',
          company: 'МегаАвто',
          position: 'IT-директор',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&h=100&auto=format&fit=crop',
          rating: 4
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
        description: 'Мы активно расширяем географию нашего присутствия, помогая автодилерам по всему миру внедрять современные технологии',
        countries: [
          { name: 'Россия', dealers: 145, color: '#7B2CBF', coordinates: { lat: 55.7558, lng: 37.6173 } },
          { name: 'Казахстан', dealers: 38, color: '#0891B2', coordinates: { lat: 51.1694, lng: 71.4491 } },
          { name: 'Узбекистан', dealers: 27, color: '#F59E0B', coordinates: { lat: 41.3111, lng: 69.2407 } },
          { name: 'Беларусь', dealers: 21, color: '#059669', coordinates: { lat: 53.9045, lng: 27.5615 } },
          { name: 'Армения', dealers: 12, color: '#DC2626', coordinates: { lat: 40.1792, lng: 44.4991 } },
          { name: 'Другие страны', dealers: 7, color: '#9CA3AF', coordinates: { lat: 48.3794, lng: 31.1656 } }
        ],
        regions: [
          { name: 'Европа', dealersCount: 168, percentage: 67, color: '#7B2CBF' },
          { name: 'Центральная Азия', dealersCount: 65, percentage: 26, color: '#0891B2' },
          { name: 'Южная Азия', dealersCount: 12, percentage: 5, color: '#F59E0B' },
          { name: 'Ближний Восток', dealersCount: 5, percentage: 2, color: '#059669' }
        ],
        growth: {
          thisYear: 35,
          lastYear: 28,
          projected: 42
        }
      }
    },
    cta: {
      title: 'Присоединяйтесь к сообществу Car-Sale',
      subtitle: 'Станьте частью успешного будущего автомобильного бизнеса',
      button: 'Запросить демонстрацию',
      contactInfo: {
        email: 'info@car-sale.com',
        phone: '+7 (999) 123-45-67',
        address: 'г. Москва, ул. Автомобильная, 42'
      }
    }
  }
};

// Компонент карты для секции географии
const GeographyMap = ({ countries, activeCountry, setActiveCountry }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden p-5 shadow-lg border border-gray-100 dark:border-gray-700 h-[400px] relative">
      <div className="absolute inset-0 p-5">
        <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-700/50 overflow-hidden relative">
          {/* Фон карты мира (иллюстративно) */}
          <div className="w-full h-full absolute left-0 top-0 bg-gradient-to-br from-blue-50 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            {/* Здесь можно будет добавить реальный SVG карты мира */}
            <svg className="w-full h-full opacity-10 dark:opacity-5" viewBox="0 0 800 500">
              <path d="M219.3,141.9c1.4,0.1,0.8-1.1,1.5-1.5s0.8,0.6,1.5,0.5s0.1-1,0.9-1.3c0.8-0.3,1.1-0.7,0.9-1.6s-0.9-0.7-0.9-1.4 s0.8-1.1,1.4-1.1s0.6-0.7,0.9-1.1c0.3-0.4,0.4-1.2,1.1-1c0.8,0.2,1.5-0.1,1.1-1s0.4-1.4,1-1.3c0.6,0.1,1.5-0.3,1.5-1 c0-0.7-0.9-1-0.9-1.4c0-0.5,0.6-0.7,1.1-0.7c0.5,0,0.1-0.9,0.6-0.9c0.5,0,0.8,0.3,1-0.2c0.2-0.5,0.1-0.8,0.9-0.8s0.8,0,1.4-0.1 c0.6-0.1,0.9-0.5,1.5-0.5c0.6,0,1.2,0.2,1.6-0.2s0.4-1.1,1-1.5c0.6-0.4,0.4-1.6,1.3-1.6s0.7-0.5,1.5-0.3c0.8,0.2,1-0.6,1.5-0.8 c0.5-0.2,0.8-0.5,1.4-0.5c0.6,0,1.2,0,1.7-0.2c0.6-0.3,0.1-1.3,0.6-1.3c0.5,0,1.4,0.1,1.4-0.5s0.5-0.6,1-0.8c0.5-0.2,0.7-0.6,1.4-0.6 s0.9-0.1,1.5-0.1s1.1-0.5,1.6-0.5s0.6-0.5,1.1-0.5c0.5,0,0.5-0.6,1-0.6s0.9,0,1.1-0.4c0.2-0.4,0.4-0.2,0.9-0.6 c0.6-0.4,0.8-0.6,1.3-0.6c0.5,0,0.9-0.1,1.2-0.5" fill="none" stroke="#888" strokeWidth="0.5"/>
            </svg>
          </div>
          
          {/* Маркеры на карте для стран */}
          {countries.map((country, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: activeCountry === i ? 1.2 : 1, 
                opacity: 1,
                boxShadow: activeCountry === i ? '0 0 15px rgba(255,255,255,0.5)' : 'none'
              }}
              transition={{ duration: 0.3 }}
              className="absolute cursor-pointer"
              style={{ 
                backgroundColor: country.color,
                top: `${15 + i * 12}%`, 
                left: `${20 + i * 10}%`,
                width: activeCountry === i ? '30px' : '20px',
                height: activeCountry === i ? '30px' : '20px',
                borderRadius: '50%',
                zIndex: activeCountry === i ? 10 : 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white'
              }}
              onClick={() => setActiveCountry(i)}
            >
              <div className={`absolute -top-1 -left-1 w-full h-full rounded-full animate-ping opacity-30`} 
                   style={{ backgroundColor: country.color, animationDuration: `${1 + i*0.2}s` }}></div>
              
              {activeCountry === i && (
                <div className="text-white text-xs font-bold">{country.dealers}</div>
              )}
            </motion.div>
          ))}
          
          {/* Информация о выбранной стране */}
          {activeCountry !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: countries[activeCountry].color }}></div>
                <span className="font-medium">{countries[activeCountry].name}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Количество дилеров: <span className="font-semibold text-primary dark:text-primary-light">{countries[activeCountry].dealers}</span>
                </span>
                <div className="flex items-center text-xs">
                  <MapPinIcon className="w-4 h-4 mr-1 text-primary dark:text-primary-light" />
                  <span className="text-gray-500 dark:text-gray-400">
                    {countries[activeCountry].coordinates.lat.toFixed(2)}, {countries[activeCountry].coordinates.lng.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Компонент графика распределения по регионам
const RegionsDistribution = ({ regions }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700">
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        Распределение дилеров по регионам
      </h4>
      
      <div className="relative pt-16 pb-10">
        <div className="absolute top-0 left-0 right-0 flex justify-between px-4">
          {regions.map((region, index) => (
            <motion.div 
              key={index}
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center"
              style={{ width: `${100/regions.length}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold" style={{ color: region.color }}>{region.dealersCount}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-[80px]">{region.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex h-[180px] items-end gap-4 justify-between">
          {regions.map((region, index) => (
            <motion.div 
              key={index}
              className="flex-1 relative group"
              initial={{ height: 0 }}
              whileInView={{ height: `${region.percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
              style={{ 
                background: `linear-gradient(to top, ${region.color}, ${region.color}90)`,
                borderRadius: '6px 6px 0 0'
              }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded">
                {region.percentage}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2 border-t border-gray-100 dark:border-gray-700 pt-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">Всего дилеров: <span className="font-semibold">250</span></div>
        <div className="text-sm text-primary dark:text-primary-light">
          <Link href="/network" className="flex items-center">
            <span className="mr-1">Подробная карта</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Компонент графика роста
const GrowthChart = ({ growth }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700">
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Динамика роста сети
      </h4>
      
      <div className="mb-6">
        <div className="relative pt-5 pb-3">
          <div className="flex h-[120px] items-end gap-6 justify-center">
            <motion.div className="flex flex-col items-center">
              <motion.div 
                className="w-16 bg-primary/70 rounded-t-lg relative"
                initial={{ height: 0 }}
                whileInView={{ height: `${(growth.lastYear/50) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-sm font-medium">{growth.lastYear}%</span>
              </motion.div>
              <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">Прошлый год</span>
            </motion.div>
            
            <motion.div className="flex flex-col items-center">
              <motion.div 
                className="w-16 bg-primary rounded-t-lg relative"
                initial={{ height: 0 }}
                whileInView={{ height: `${(growth.thisYear/50) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-sm font-medium">{growth.thisYear}%</span>
              </motion.div>
              <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">Текущий год</span>
            </motion.div>
            
            <motion.div className="flex flex-col items-center">
              <motion.div 
                className="w-16 bg-primary/30 rounded-t-lg relative group"
                initial={{ height: 0 }}
                whileInView={{ height: `${(growth.projected/50) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.2) 5px, rgba(255,255,255,0.2) 10px)' }}
              >
                <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-sm font-medium text-primary/70">{growth.projected}%</span>
              </motion.div>
              <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">Прогноз</span>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-3">
        <div className="flex items-center">
          <GlobeAltIcon className="w-4 h-4 mr-2 text-primary dark:text-primary-light" />
          <span>Рост присутствия по прогнозу: <span className="font-medium">+{growth.projected - growth.thisYear}%</span></span>
        </div>
      </div>
    </div>
  );
};

// Анимированная временная шкала для истории компании
const TimelineItem = ({ item, index, total }) => {
  const isEven = index % 2 === 0;
  const isInView = useInView({ once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={isInView.ref}
      className={`relative mb-12 md:mb-0 ${isEven ? 'md:left-0' : 'md:right-0'} md:w-5/12 md:ml-auto md:clear-right`}
      initial={{ opacity: 0, y: 20, x: isEven ? -20 : 20 }}
      animate={isInView.inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: isEven ? -20 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Линия соединения с центральной осью (видна только на десктопах) */}
      <div className={`hidden md:block absolute top-6 ${isEven ? 'right-0 left-auto' : 'left-0 right-auto'} border-t-2 border-dashed border-primary/30 dark:border-primary/50 w-8`}></div>
      
      {/* Маркер с годом */}
      <div className={`absolute top-0 ${isEven ? 'right-0 -mr-16' : 'left-0 -ml-16'} hidden md:flex h-12 w-12 rounded-full bg-primary items-center justify-center shadow-lg z-10`}>
        <span className="text-white font-bold">{item.year}</span>
      </div>
      
      {/* Карточка события */}
      <div className={`md:w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 relative`}>
        {/* Маркер года (видимый на мобильных устройствах) */}
        <div className="flex items-center mb-4 md:hidden">
          <div className="flex h-10 w-10 rounded-full bg-primary items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">{item.year}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white ml-3">{item.title}</h3>
        </div>
        
        {/* Заголовок (видимый только на десктопах) */}
        <h3 className="hidden md:block text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
          <span className="text-2xl mr-3">{item.icon}</span>
          {item.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
        
        {/* Индикатор прогресса */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="w-full h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-primary-light"
              initial={{ width: 0 }}
              animate={isInView.inView ? { width: `${((index + 1) / total) * 100}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Основание</span>
            <span>Сегодня</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Основной компонент страницы "О компании"
export default function AboutPage() {
  const { hapticFeedback } = useTelegram();
  const [mounted, setMounted] = useState(false);
  const [activeCountry, setActiveCountry] = useState(null);
  const [activeTeamMember, setActiveTeamMember] = useState(null);
  
  // Используем хук useTranslation с передачей локализации
  const { t } = useTranslation(aboutLocalization);
  
  // Настройки для анимаций при скролле
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const timelineRef = useRef();
  const timelineIsInView = useInView(timelineRef, { once: false, amount: 0.1 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCtaClick = () => {
    hapticFeedback && hapticFeedback('impact');
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
      
      {/* Прогресс-скролл */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
      />
      
      {/* Герой-секция */}
      <motion.section
        className="pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 min-h-[50vh] flex items-center"
        style={{ opacity: heroOpacity }}
      >
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary">{t.hero.title}</span>
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
            
            <motion.div
              className="mt-8 flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg"
                onClick={handleCtaClick}
              >
                Запросить демо
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-medium rounded-full"
              >
                Смотреть видео о компании
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
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
          
          {/* Улучшенная временная линия */}
          <div ref={timelineRef} className="relative max-w-6xl mx-auto mb-20">
            {/* Центральная линия (видна только на десктопах) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/10 via-primary/50 to-primary/10"></div>
            
            {/* Маркеры на временной шкале */}
            {[...Array(t.history.timeline.length)].map((_, i) => (
              <motion.div
                key={i}
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-primary"
                style={{ top: `${(i / (t.history.timeline.length - 1)) * 100}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={timelineIsInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
              />
            ))}
            
            {/* События */}
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {t.history.timeline.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} total={t.history.timeline.length} />
              ))}
            </div>
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
                <p className="text-lg text-gray-700 dark:text-gray-300 italic relative">
                  <span className="absolute -left-6 top-0 text-5xl text-primary/20 dark:text-primary/30 font-serif">"</span>
                  {t.history.mission.description}
                  <span className="absolute -right-2 bottom-0 text-5xl text-primary/20 dark:text-primary/30 font-serif">"</span>
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Ценности компании - улучшенная версия */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {t.history.values.items.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -5, boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center text-2xl mb-4 bg-primary/10 dark:bg-primary/20 rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                
                {/* Доп. эффект при наведении */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-b-xl opacity-0 group-hover:opacity-100"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Экспертиза в автосфере - улучшенная версия */}
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
                whileHover={{ y: -5 }}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center text-2xl bg-primary/10 dark:bg-primary/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {area.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{area.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{area.description}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Уровень экспертизы</span>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-primary dark:text-primary-light mr-2">{area.percentage}%</span>
                      <CircularIndicator percentage={area.percentage} />
                    </div>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary-light"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${area.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Команда - улучшенная версия */}
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
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
                onMouseEnter={() => setActiveTeamMember(index)}
                onMouseLeave={() => setActiveTeamMember(null)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between px-4 pb-4`}>
                    <div className="text-white">
                      <div className="text-sm font-medium opacity-80">{member.name}</div>
                      <div className="text-xs opacity-70">{member.position}</div>
                    </div>
                    <div className="flex space-x-2">
                      <motion.a
                        href={member.socials.linkedin}
                        className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-primary/80 transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </motion.a>
                      <motion.a
                        href={member.socials.twitter}
                        className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-primary/80 transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </motion.a>
                      <motion.a
                        href={`mailto:${member.socials.email}`}
                        className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-primary/80 transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h4>
                  <p className="text-primary dark:text-primary-light font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                </div>
                
                {/* Интерактивный индикатор для активного элемента */}
                {activeTeamMember === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                    layoutId="activeTeamMember"
                    transition={{ duration: 0.3, type: "spring" }}
                  />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Структура компании - улучшенный интерактивный дизайн */}
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
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700 text-center relative overflow-hidden group"
                >
                  {/* Фоновый круг с градиентом */}
                  <div className="absolute -right-10 -top-10 w-20 h-20 rounded-full bg-gradient-to-br transition-all duration-300 group-hover:scale-150 opacity-10"
                    style={{ backgroundColor: department.color }}></div>
                  
                  <div className="w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-3 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                    style={{ backgroundColor: `${department.color}20`, color: department.color }}>
                    {department.icon}
                  </div>
                  
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[2.5rem]">{department.name}</h4>
                  
                  <div className="flex items-center justify-center relative z-10">
                    <span className="text-2xl font-bold mr-1 bg-clip-text text-transparent bg-gradient-to-br"
                      style={{ backgroundImage: `linear-gradient(to right, ${department.color}, ${department.color}90)` }}>
                      <AnimatedCounter value={department.count} />
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">сотрудников</span>
                  </div>
                  
                  {/* Полоска индикатора наведения */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                    style={{ backgroundColor: department.color }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Карточка приглашения - улучшенный дизайн */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-primary rounded-2xl transform skew-y-0 -rotate-1 -z-10"></div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 text-white">
                  <h3 className="text-2xl font-bold mb-2">Присоединяйтесь к нашей команде!</h3>
                  <p className="opacity-90">Мы всегда ищем талантливых специалистов для развития нашей платформы</p>
                  
                  <div className="flex items-center mt-4 space-x-3">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden">
                          <img
                            src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                            alt="Team member"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-xs text-white font-bold">+12</div>
                    </div>
                    <span className="text-sm text-white/80">Уже присоединились в этом году</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-primary font-medium rounded-full shadow-lg"
                  >
                    Смотреть вакансии
                  </motion.button>
                  <a href="#" className="text-white/80 text-sm text-center hover:text-white transition-colors">Узнать о корпоративной культуре</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Партнеры и клиенты - улучшенная версия */}
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
          
          {/* Логотипы партнеров - улучшенная интерактивность */}
          <div className="flex flex-wrap justify-center items-center gap-5 md:gap-8 mb-16">
            {t.partners.partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, filter: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                className="h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all"
              >
                <motion.div
                  className="relative p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
                  whileHover={{
                    boxShadow: `0 10px 25px -5px ${partner.color}30`,
                    borderColor: partner.color
                  }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full max-h-14 object-contain"
                  />
                  <div className="absolute -bottom-2 left-0 right-0 mx-auto w-3/4 h-0.5 bg-gradient-to-r opacity-0 hover:opacity-100 transition-opacity"
                    style={{ backgroundImage: `linear-gradient(to right, ${partner.color}00, ${partner.color}, ${partner.color}00)` }}></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Отзывы клиентов - улучшенная карусель */}
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
                  whileHover={{ y: -5, boxShadow: '0 15px 30px -5px rgba(0,0,0,0.1)' }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 relative group"
                >
                  {/* Уголок с цветом */}
                  <div className="absolute top-0 right-0 w-10 h-10 bg-primary rounded-tr-xl rounded-bl-xl opacity-80"></div>
                  
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`inline-block w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic relative min-h-[120px]">
                    <span className="absolute -left-2 top-0 text-3xl text-primary/20 dark:text-primary/30 font-serif">"</span>
                    {testimonial.text}
                    <span className="absolute -right-2 bottom-0 text-3xl text-primary/20 dark:text-primary/30 font-serif">"</span>
                  </p>
                  
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white dark:border-gray-700 shadow-md group-hover:border-primary transition-colors"
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
                  
                  {/* Тонкая линия при наведении */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left rounded-b-xl"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Car-Sale в цифрах - полностью переработанная секция */}
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
          
          {/* Цифровые показатели - улучшенные карточки */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {t.stats.items.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)' }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden group transition-all duration-300"
              >
                {/* Фоновый градиент */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/5 dark:from-primary/20 dark:to-primary-dark/10 rounded-full transform group-hover:scale-150 transition-transform duration-700"></div>
                
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
                    
                    {/* Прогресс-кольцо вместо линейного индикатора */}
                    <div className="flex items-center justify-end mt-4">
                      <CircularIndicator percentage={index === 0 ? 92 : index === 1 ? 88 : index === 2 ? 98 : 75} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* География присутствия - полностью переработанная секция */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              {t.stats.geography.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 text-center">
              {t.stats.geography.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Интерактивная карта */}
              <div className="md:col-span-2">
                <GeographyMap
                  countries={t.stats.geography.countries}
                  activeCountry={activeCountry}
                  setActiveCountry={setActiveCountry}
                />
              </div>
              
              {/* Боковая панель с распределением по регионам и графиком роста */}
              <div className="space-y-8">
                <RegionsDistribution regions={t.stats.geography.regions} />
                <GrowthChart growth={t.stats.geography.growth} />
              </div>
            </div>
          </div>
          
          {/* Дополнительная секция с преимуществами глобального присутствия */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto mt-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xl mb-4">
                  🌐
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Единый интерфейс</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Независимо от региона, наши клиенты работают в едином интерфейсе с поддержкой разных языков.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xl mb-4">
                  ⚙️
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Локальные интеграции</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Мы адаптируем нашу систему под особенности каждого рынка и интегрируемся с местными сервисами.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xl mb-4">
                  🛡️
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Защита данных</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Соблюдаем требования законодательства о защите данных во всех странах присутствия.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA-секция - улучшенная версия */}
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

            <div className="relative px-6 py-12 sm:px-12 sm:py-16">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <motion.div
                  className="md:max-w-xl"
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
                    className="text-white/80 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {t.cta.subtitle}
                  </motion.p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-white/90 text-sm">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {t.cta.contactInfo.email}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {t.cta.contactInfo.phone}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Запросить демонстрацию</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Имя"
                        className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Компания"
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <textarea
                      placeholder="Сообщение"
                      rows={3}
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    ></textarea>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 bg-white hover:bg-gray-100 text-primary font-medium rounded-lg transition-colors shadow-xl"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCtaClick();
                      }}
                    >
                      {t.cta.button}
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}