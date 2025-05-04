'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLanguageStore } from '@/src/store/language';
import { useTelegram } from '@/src/hooks/useTelegram';
import { 
  ArrowRightIcon, 
  ArrowPathIcon, 
  CheckCircleIcon, 
  CodeBracketIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';

// Данные локализации
const localization = {
  ru: {
    hero: {
      title: 'Интеграции Car-Sale',
      subtitle: 'Объединяем ваш автобизнес в единую экосистему',
      description: 'Car-Sale предоставляет гибкие возможности интеграции с популярными сервисами и государственными системами для создания единой цифровой среды автомобильного бизнеса.'
    },
    categories: {
      all: 'Все интеграции',
      government: 'Государственные сервисы',
      banks: 'Банки и платежи',
      crm: 'CRM и маркетинг',
      marketplaces: 'Маркетплейсы',
      messengers: 'Мессенджеры',
      api: 'API и разработчикам'
    },
    tabs: {
      ready: 'Готовые интеграции',
      custom: 'Индивидуальные решения',
      api: 'API для разработчиков'
    },
    integrations: [
      {
        id: 'oneid',
        name: 'OneID / ЕСИА',
        category: 'government',
        icon: '/icons/oneid.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=OneID',
        description: 'Интеграция с системой цифровой идентификации граждан для быстрой верификации личности покупателя и заполнения данных в документах.',
        features: [
          'Автоматическое заполнение данных клиента',
          'Верификация личности покупателя',
          'Электронная подпись документов',
          'Юридически значимые транзакции'
        ],
        benefits: [
          'Сокращение времени оформления документов на 70%',
          'Исключение ошибок при вводе данных',
          'Повышение безопасности сделок',
          'Соответствие требованиям законодательства'
        ],
        implementation: 'Интеграция с OneID осуществляется через официальное API. Подключение требует предварительной регистрации в системе и получения доступа.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/oneid-integration'
      },
      {
        id: 'emib',
        name: 'E-MIB / ГНИ',
        category: 'government',
        icon: '/icons/emib.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=E-MIB',
        description: 'Взаимодействие с электронной системой Государственной налоговой инспекции для автоматизации отчетности и учета налогов при продаже автомобилей.',
        features: [
          'Автоматический расчет налогов и сборов',
          'Электронная подача деклараций',
          'Получение справок и выписок',
          'Учет НДС при сделках'
        ],
        benefits: [
          'Соответствие требованиям налогового законодательства',
          'Минимизация рисков штрафов и пеней',
          'Сокращение административной нагрузки',
          'Ускорение процесса регистрации транспортных средств'
        ],
        implementation: 'Подключение к E-MIB требует наличия электронной подписи и регистрации в личном кабинете налогоплательщика. Car-Sale обеспечивает автоматический обмен данными по защищенным каналам.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/emib-integration'
      },
      {
        id: 'sberbank',
        name: 'Сбербанк',
        category: 'banks',
        icon: '/icons/sberbank.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=Сбербанк',
        description: 'Интеграция с крупнейшим банком России для автоматизации процессов кредитования, лизинга и проведения платежей при покупке автомобилей.',
        features: [
          'Онлайн-заявки на автокредиты',
          'Интеграция с эквайрингом',
          'Автоматическая проверка заемщиков',
          'Расчет графика платежей'
        ],
        benefits: [
          'Увеличение одобренных заявок на 25%',
          'Сокращение времени рассмотрения кредита до 30 минут',
          'Автоматическое отслеживание платежей',
          'Снижение нагрузки на менеджеров'
        ],
        implementation: 'Интеграция со Сбербанком реализована через защищенный API, требует заключения договора с банком и получения доступа к партнерскому порталу.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/sberbank-integration'
      },
      {
        id: 'tinkoff',
        name: 'Тинькофф',
        category: 'banks',
        icon: '/icons/tinkoff.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=Тинькофф',
        description: 'Комплексное решение для работы с Тинькофф Банком, включающее кредитование, эквайринг и проведение онлайн-платежей на сайте автодилера.',
        features: [
          'Мгновенные решения по кредитам',
          'Интернет-эквайринг для сайта',
          'Платежи по QR-коду',
          'API для интеграции с банковскими сервисами'
        ],
        benefits: [
          'Конверсия заявок в выданные кредиты до 80%',
          'Комиссия за эквайринг от 1.2%',
          'Моментальное зачисление средств',
          'Автоматическая сверка платежей'
        ],
        implementation: 'Подключение к Тинькофф осуществляется через личный кабинет для бизнеса. Car-Sale предоставляет готовые коннекторы для всех основных сервисов банка.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/tinkoff-integration'
      },
      {
        id: 'bitrix24',
        name: 'Битрикс24',
        category: 'crm',
        icon: '/icons/bitrix24.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=Битрикс24',
        description: 'Двусторонняя синхронизация данных между Car-Sale и Битрикс24 для автодилеров, которые используют обе системы в своей работе.',
        features: [
          'Синхронизация клиентской базы',
          'Обмен данными о сделках',
          'Интеграция с бизнес-процессами',
          'Автоматическое создание задач'
        ],
        benefits: [
          'Отсутствие дублирования данных',
          'Комплексная аналитика продаж',
          'Единый источник информации для всех отделов',
          'Повышение эффективности маркетинговых кампаний'
        ],
        implementation: 'Интеграция с Битрикс24 настраивается через API. Car-Sale предоставляет готовое решение, требующее минимальной настройки со стороны пользователя.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/bitrix24-integration'
      },
      {
        id: 'amocrm',
        name: 'AmoCRM',
        category: 'crm',
        icon: '/icons/amocrm.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=AmoCRM',
        description: 'Интеграция с популярной CRM-системой для синхронизации клиентов, сделок и воронки продаж между Car-Sale и AmoCRM.',
        features: [
          'Двусторонняя синхронизация контактов',
          'Обмен информацией о сделках',
          'Интеграция с Digital Pipeline',
          'Автоматизация воронки продаж'
        ],
        benefits: [
          'Единая клиентская база',
          'Автоматическое обновление статусов сделок',
          'Повышение эффективности продаж на 30%',
          'Улучшение контроля за работой менеджеров'
        ],
        implementation: 'Подключение к AmoCRM происходит через OAuth 2.0. Car-Sale предоставляет виджет, который можно установить в маркетплейсе AmoCRM.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/amocrm-integration'
      },
      {
        id: 'avito',
        name: 'Авито',
        category: 'marketplaces',
        icon: '/icons/avito.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=Авито',
        description: 'Автоматическая публикация объявлений о продаже автомобилей на Авито из базы Car-Sale с синхронизацией статусов и обработкой заявок.',
        features: [
          'Автоматическая выгрузка объявлений',
          'Синхронизация наличия автомобилей',
          'Обработка заявок из Авито',
          'Получение статистики просмотров'
        ],
        benefits: [
          'Экономия времени на размещении объявлений',
          'Исключение ошибок и дублирования',
          'Увеличение охвата потенциальных клиентов',
          'Централизованное управление всеми площадками'
        ],
        implementation: 'Интеграция с Авито осуществляется через официальное API. Требуется наличие бизнес-аккаунта на Авито и получение API-ключа.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/avito-integration'
      },
      {
        id: 'auto-ru',
        name: 'Auto.ru',
        category: 'marketplaces',
        icon: '/icons/auto-ru.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=Auto.ru',
        description: 'Интеграция с крупнейшим автомобильным маркетплейсом России для автоматической публикации объявлений и обработки входящих заявок.',
        features: [
          'Автоматическая выгрузка автомобилей',
          'Обновление наличия в реальном времени',
          'Обработка сообщений от клиентов',
          'Аналитика эффективности размещения'
        ],
        benefits: [
          'Увеличение количества продаж на 35%',
          'Сокращение времени на публикацию',
          'Автоматическое обновление цен',
          'Централизованное управление каталогом'
        ],
        implementation: 'Подключение к Auto.ru требует заключения договора и получения доступа к API для дилеров. Car-Sale предоставляет полностью настроенное решение.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/auto-ru-integration'
      },
      {
        id: 'telegram',
        name: 'Telegram',
        category: 'messengers',
        icon: '/icons/telegram.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=Telegram',
        description: 'Создание Telegram-бота для автосалона с функциями просмотра каталога, записи на тест-драйв и консультации с менеджерами.',
        features: [
          'Интерактивный каталог автомобилей',
          'Запись на тест-драйв через бота',
          'Чат с менеджером прямо в Telegram',
          'Уведомления о статусе заказа'
        ],
        benefits: [
          'Увеличение конверсии лидов на 25%',
          'Сокращение нагрузки на колл-центр',
          'Повышение удовлетворенности клиентов',
          'Новый канал привлечения клиентов'
        ],
        implementation: 'Интеграция с Telegram осуществляется через Bot API. Car-Sale предоставляет конструктор ботов с возможностью настройки под требования конкретного дилера.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/telegram-integration'
      },
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        category: 'messengers',
        icon: '/icons/whatsapp.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=WhatsApp',
        description: 'Подключение бизнес-аккаунта WhatsApp для автоматизации обмена сообщениями с клиентами, отправки уведомлений и консультаций.',
        features: [
          'Автоматические уведомления о статусе заказа',
          'Отправка документов и счетов',
          'Чат с сотрудниками автосалона',
          'Шаблоны сообщений для быстрых ответов'
        ],
        benefits: [
          'Коммуникация в привычном для клиентов канале',
          'Сокращение времени ответа до 5 минут',
          'Повышение удовлетворенности клиентов',
          'Увеличение конверсии в продажи на 20%'
        ],
        implementation: 'Интеграция с WhatsApp Business API требует верификации бизнес-аккаунта и подключения через официального партнера. Car-Sale обеспечивает полный процесс подключения.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/whatsapp-integration'
      },
      {
        id: 'rest-api',
        name: 'REST API',
        category: 'api',
        icon: '/icons/api.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=API',
        description: 'Полный набор REST API для интеграции Car-Sale с внешними системами и разработки собственных решений на базе платформы.',
        features: [
          'Полная документация OpenAPI/Swagger',
          'Аутентификация OAuth 2.0',
          'Поддержка JSON и XML форматов',
          'Инструменты для разработчиков'
        ],
        benefits: [
          'Создание собственных интеграций',
          'Автоматизация уникальных бизнес-процессов',
          'Расширение функциональности системы',
          'Гибкая настройка под нужды бизнеса'
        ],
        implementation: 'REST API доступно всем клиентам Car-Sale. Для начала работы необходимо получить API-ключ в личном кабинете и ознакомиться с документацией.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/rest-api'
      },
      {
        id: 'webhooks',
        name: 'Webhooks',
        category: 'api',
        icon: '/icons/webhooks.svg',
        imagePlaceholder: 'https://via.placeholder.com/80x80/e2e8f0/475569?text=Webhooks',
        description: 'Система уведомлений о событиях в Car-Sale через HTTP-запросы для создания реактивных интеграций с внешними системами.',
        features: [
          'Уведомления о новых клиентах',
          'События изменения статуса сделок',
          'Мониторинг складских операций',
          'Настраиваемые фильтры событий'
        ],
        benefits: [
          'Моментальная реакция на события',
          'Снижение нагрузки на основные системы',
          'Асинхронная обработка данных',
          'Высокая отказоустойчивость'
        ],
        implementation: 'Webhooks настраиваются в личном кабинете Car-Sale. Для каждого типа событий можно указать URL для отправки уведомлений и выбрать формат данных.',
        status: 'ready',
        docsUrl: 'https://docs.example.com/webhooks'
      }
    ],
    custom: {
      title: 'Индивидуальные интеграции',
      description: 'Мы понимаем, что каждый бизнес уникален и может использовать специфические системы. Наша команда готова разработать индивидуальное решение для интеграции Car-Sale с вашими внутренними или внешними системами.',
      types: [
        {
          title: 'Интеграция с внутренними ERP-системами',
          description: 'Подключение к корпоративным ERP-системам для синхронизации данных о клиентах, заказах, складских остатках и финансах.',
          icon: 'https://via.placeholder.com/60x60/7B2CBF/FFFFFF?text=ERP'
        },
        {
          title: 'Интеграция с аналитическими системами',
          description: 'Передача данных в системы бизнес-аналитики (BI) для создания комплексных дашбордов и отчетов по всем аспектам бизнеса.',
          icon: 'https://via.placeholder.com/60x60/0891B2/FFFFFF?text=BI'
        },
        {
          title: 'Интеграция с телефонией',
          description: 'Подключение к IP-телефонии для автоматического создания карточек клиентов при входящих звонках и совершения вызовов из системы.',
          icon: 'https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=IP'
        },
        {
          title: 'Интеграция с бухгалтерскими системами',
          description: 'Обмен данными с 1С, SAP и другими бухгалтерскими системами для автоматизации финансового учета и формирования отчетности.',
          icon: 'https://via.placeholder.com/60x60/059669/FFFFFF?text=ACC'
        }
      ],
      process: [
        {
          title: 'Анализ требований',
          description: 'Мы изучаем ваши бизнес-процессы и системы, с которыми необходимо обеспечить интеграцию, формируем детальные требования.'
        },
        {
          title: 'Проектирование',
          description: 'Разрабатываем архитектуру интеграционного решения, обеспечивающую надежный обмен данными и безопасность информации.'
        },
        {
          title: 'Разработка',
          description: 'Создаем коннекторы и необходимые компоненты для обмена данными между Car-Sale и вашими системами.'
        },
        {
          title: 'Тестирование',
          description: 'Проводим всестороннее тестирование разработанного решения для обеспечения его стабильности и производительности.'
        },
        {
          title: 'Внедрение',
          description: 'Осуществляем установку и настройку интеграционного решения в вашей инфраструктуре, обучаем персонал.'
        },
        {
          title: 'Поддержка',
          description: 'Обеспечиваем техническую поддержку, мониторинг работоспособности и развитие интеграционного решения.'
        }
      ]
    },
    api: {
      title: 'API для разработчиков',
      description: 'Car-Sale предоставляет мощный и гибкий API для создания собственных интеграций и расширений. Используйте наши инструменты для разработки уникальных решений для вашего бизнеса.',
      features: [
        {
          title: 'Полная документация',
          description: 'Подробная документация API с примерами запросов и ответов, схемами данных и руководствами по использованию.',
          icon: <DocumentTextIcon className="w-6 h-6" />
        },
        {
          title: 'Безопасность',
          description: 'Защита данных с помощью OAuth 2.0, HTTPS, цифровых подписей и других современных методов безопасности.',
          icon: <ShieldCheckIcon className="w-6 h-6" />
        },
        {
          title: 'Расширяемость',
          description: 'Возможность создания плагинов и расширений для добавления новой функциональности в систему Car-Sale.',
          icon: <CubeTransparentIcon className="w-6 h-6" />
        },
        {
          title: 'Реактивность',
          description: 'Система уведомлений о событиях через webhooks позволяет создавать реактивные приложения и интеграции.',
          icon: <ArrowPathIcon className="w-6 h-6" />
        }
      ],
      endpoints: [
        {
          name: 'Клиенты',
          description: 'Управление клиентской базой: создание, обновление, поиск и получение информации о клиентах.',
          method: 'GET/POST/PUT',
          path: '/api/v1/clients',
          sample: `
{
  "id": "client-123",
  "name": "Иван Петров",
  "email": "ivan@example.com",
  "phone": "+79001234567",
  "created_at": "2023-05-15T14:30:00Z",
  "last_activity": "2023-06-20T10:15:30Z"
}
          `
        },
        {
          name: 'Автомобили',
          description: 'Работа с каталогом автомобилей: добавление, обновление, поиск по параметрам, управление наличием.',
          method: 'GET/POST/PUT',
          path: '/api/v1/vehicles',
          sample: `
{
  "id": "vehicle-456",
  "make": "Toyota",
  "model": "Camry",
  "year": 2023,
  "vin": "1NXBR32E84Z123456",
  "price": 2500000,
  "status": "available",
  "location": "main-showroom"
}
          `
        },
        {
          name: 'Сделки',
          description: 'Управление продажами: создание, изменение статуса, привязка к клиентам и автомобилям.',
          method: 'GET/POST/PUT',
          path: '/api/v1/deals',
          sample: `
{
  "id": "deal-789",
  "client_id": "client-123",
  "vehicle_id": "vehicle-456",
  "status": "contract_signed",
  "amount": 2450000,
  "created_at": "2023-06-25T09:45:00Z",
  "payment_method": "credit",
  "manager_id": "user-007"
}
          `
        },
        {
          name: 'Документы',
          description: 'Работа с документами: создание, подписание, получение статуса, поиск по параметрам.',
          method: 'GET/POST/PUT',
          path: '/api/v1/documents',
          sample: `
{
  "id": "doc-101112",
  "deal_id": "deal-789",
  "type": "contract",
  "status": "signed",
  "created_at": "2023-06-25T10:30:00Z",
  "signed_at": "2023-06-25T14:15:00Z",
  "url": "https://api.car-sale.com/documents/doc-101112.pdf"
}
          `
        }
      ]
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      items: [
        {
          question: 'Как получить доступ к API Car-Sale?',
          answer: 'Доступ к API предоставляется всем клиентам Car-Sale. Для начала работы необходимо получить API-ключ в разделе "Настройки" > "Интеграции" личного кабинета.'
        },
        {
          question: 'Требуется ли дополнительная оплата за использование интеграций?',
          answer: 'Базовые интеграции включены в стандартную подписку Car-Sale. Некоторые специализированные интеграции могут требовать дополнительной оплаты. Стоимость индивидуальных интеграций рассчитывается отдельно.'
        },
        {
          question: 'Как обеспечивается безопасность данных при интеграции?',
          answer: 'Car-Sale использует современные методы защиты: шифрование данных, аутентификацию OAuth 2.0, цифровые подписи запросов, HTTPS-соединения и регулярный аудит безопасности.'
        },
        {
          question: 'Сколько времени занимает настройка интеграции?',
          answer: 'Время настройки зависит от сложности интеграции. Готовые решения могут быть настроены за 1-2 дня. Индивидуальные интеграции требуют более длительного времени, обычно от 2 недель до 2 месяцев.'
        },
        {
          question: 'Можно ли интегрировать Car-Sale с нашей собственной системой?',
          answer: 'Да, Car-Sale предоставляет открытый API и возможность разработки индивидуальных интеграций. Наша команда готова создать решение, соответствующее вашим уникальным требованиям.'
        }
      ]
    },
    cta: {
      title: 'Готовы объединить ваш бизнес в единую экосистему?',
      description: 'Свяжитесь с нами, чтобы обсудить возможности интеграции Car-Sale с вашими системами и сервисами',
      button: 'Начать интеграцию',
      demoButton: 'Запросить демонстрацию'
    }
  },
  en: {
    // Английская локализация (аналогично русской)
  },
  uz: {
    // Узбекская локализация (аналогично русской)
  }
};

// Компонент документации API
const ApiEndpointCode = ({ endpoint }) => {
  return (
    <div className="bg-gray-900 text-gray-300 rounded-lg p-4 mb-4 overflow-x-auto font-mono text-sm">
      <div className="flex items-center mb-2">
        <span className="text-blue-400 mr-2">{endpoint.method}</span>
        <span className="text-green-400">{endpoint.path}</span>
      </div>
      <pre className="text-gray-300">
        <code>{endpoint.sample}</code>
      </pre>
    </div>
  );
};

// Компонент карточки интеграции
const IntegrationCard = ({ integration, onClick, isActive }) => {
  return (
    <motion.div
   className={`bg-white dark:bg-gray-800 rounded-xl p-6 border shadow-md transition-all cursor-pointer ${
        isActive
          ? 'border-primary dark:border-primary-light shadow-lg ring-2 ring-primary dark:ring-primary-light ring-opacity-50'
          : 'border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600'
      }`}
      onClick={() => onClick(integration.id)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start">
        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden mr-4 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <img
            src={integration.icon || integration.imagePlaceholder}
            alt={integration.name}
            className="w-full h-full object-contain p-2"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{integration.name}</h3>
          <div className="text-xs bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light px-2 py-0.5 inline-block rounded-full mb-2">
            {integration.category}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {integration.description}
          </p>
        </div>
      </div>
      
      {isActive && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Возможности</h4>
                <ul className="space-y-2">
                  {integration.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-primary dark:text-primary-light mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Преимущества</h4>
                <ul className="space-y-2">
                  {integration.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Внедрение</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{integration.implementation}</p>
            </div>
            
            <div className="mt-4 flex">
              <a 
                href={integration.docsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary dark:text-primary-light font-medium hover:underline flex items-center"
              >
                Документация
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Основной компонент страницы интеграций
export default function IntegrationsPage() {
  const { currentLocale } = useLanguageStore();
  const { hapticFeedback } = useTelegram();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('ready');
  const [activeIntegration, setActiveIntegration] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  // Получаем локализованные строки
  const t = localization[currentLocale || 'ru'] || localization.ru;
  
  // Для скроллинга к секциям
  const integrationsRef = useRef(null);
  const apiRef = useRef(null);
  const customRef = useRef(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Обработчик изменения категории
  const handleCategoryChange = (category) => {
    if (hapticFeedback) hapticFeedback('selection');
    setActiveCategory(category);
  };
  
  // Обработчик изменения вкладки
  const handleTabChange = (tab) => {
    if (hapticFeedback) hapticFeedback('impact');
    setActiveTab(tab);
    
    // Скроллим к соответствующей секции
    if (tab === 'ready') {
      integrationsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'custom') {
      customRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'api') {
      apiRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Обработчик выбора интеграции
  const handleIntegrationClick = (id) => {
    if (hapticFeedback) hapticFeedback('selection');
    setActiveIntegration(activeIntegration === id ? null : id);
  };
  
  // Получение отфильтрованных интеграций
  const filteredIntegrations = activeCategory === 'all' 
    ? t.integrations 
    : t.integrations.filter(integration => integration.category === activeCategory);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="relative overflow-hidden page-scrollable">
      {/* Фоновые градиенты */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-white to-accent/10 dark:from-primary-dark/20 dark:via-black dark:to-primary-dark/5 -z-10"></div>
      
      {/* Героическая секция */}
      <section className="pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t.hero.description}
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button 
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center shadow-lg shadow-primary/20"
                  onClick={() => integrationsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Изучить интеграции
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
                
                <button 
                  className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                  onClick={() => apiRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                  API для разработчиков
                  <CodeBracketIcon className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Иллюстрация интеграций */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 relative overflow-hidden">
                {/* Фоновая решетка для визуального эффекта */}
                <div className="absolute inset-0 integration-grid opacity-5"></div>
                
                {/* Центральный элемент - Car-Sale */}
                <div className="relative">
                  <div className="flex justify-center mb-8">
                    <motion.div
                      className="w-28 h-28 rounded-xl bg-primary flex items-center justify-center shadow-lg relative z-10"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div className="text-white text-center">
                        <div className="text-xl font-bold">Car-Sale</div>
                        <div className="text-xs mt-1">Платформа</div>
                      </div>
                      
                      {/* Пульсирующие круги */}
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-primary/30 z-0"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 0.2, 0.7]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      ></motion.div>
                      <motion.div
                        className="absolute inset-0 rounded-xl border border-primary/20 z-0"
                        animate={{ 
                          scale: [1.1, 1.4, 1.1],
                          opacity: [0.5, 0.1, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      ></motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Интеграционные связи */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Государственные сервисы */}
                    <div className="space-y-4">
                      <motion.div
                        className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <div className="flex justify-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-blue-800 dark:text-blue-300">Гос. сервисы</div>
                      </motion.div>
                      
                      <motion.div
                        className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <div className="flex justify-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-green-800 dark:text-green-300">Банки</div>
                      </motion.div>
                    </div>
                    
                    {/* Центральная колонка */}
                    <div className="flex flex-col justify-center items-center space-y-6">
                      {/* Анимированная стрелка вверх */}
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <svg className="w-6 h-6 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      </motion.div>
                      
                      {/* Анимированная стрелка вниз */}
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                      >
                        <svg className="w-6 h-6 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </motion.div>
                    </div>
                    
                    {/* Маркетплейсы и мессенджеры */}
                    <div className="space-y-4">
                      <motion.div
                        className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <div className="flex justify-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-purple-800 dark:text-purple-300">Маркетплейсы</div>
                      </motion.div>
                      
                      <motion.div
                        className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <div className="flex justify-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-600 dark:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-amber-800 dark:text-amber-300">Мессенджеры</div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* CRM и API */}
                  <div className="flex justify-between mt-4">
                    <motion.div
                      className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 text-center max-w-[45%]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <div className="flex justify-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
                          <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-indigo-800 dark:text-indigo-300">CRM-системы</div>
                    </motion.div>
                    
                    <motion.div
                      className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-3 text-center max-w-[45%]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <div className="flex justify-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-800 flex items-center justify-center">
                          <svg className="w-5 h-5 text-rose-600 dark:text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-rose-800 dark:text-rose-300">API</div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Индикатор общего количества интеграций */}
                <div className="absolute bottom-4 right-4 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200">
                  {t.integrations.length}+ интеграций
                </div>
              </div>
              
              {/* Декоративные элементы */}
              <motion.div 
                className="absolute -top-4 -right-4 h-16 w-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg -rotate-12 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ duration: 0.6, delay: 1.1, type: "spring" }}
              >
                <span className="text-xl">🔄</span>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 h-14 w-14 bg-white dark:bg-gray-800 rounded-2xl shadow-lg rotate-12 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0, rotate: 45 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
              >
                <span className="text-xl">🔌</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Основные вкладки */}
      <section className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            {Object.entries(t.tabs).map(([key, value]) => (
              <button
                key={key}
                className={`px-4 py-2 whitespace-nowrap font-medium transition-colors border-b-2 ${
                  activeTab === key
                    ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                onClick={() => handleTabChange(key)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Готовые интеграции */}
      <AnimatePresence mode="wait">
        {activeTab === 'ready' && (
          <motion.section
            ref={integrationsRef}
            className="py-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Готовые интеграции
                </h2>
                
                {/* Фильтры категорий */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {Object.entries(t.categories).map(([key, value]) => (
                    <button
                      key={key}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === key
                          ? 'bg-primary text-white shadow-md shadow-primary/20'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => handleCategoryChange(key)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Сетка интеграций */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredIntegrations.map((integration) => (
                    <IntegrationCard
                      key={integration.id}
                      integration={integration}
                      onClick={handleIntegrationClick}
                      isActive={activeIntegration === integration.id}
                    />
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Пустое состояние, если нет интеграций */}
              {filteredIntegrations.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Интеграции не найдены
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    По выбранной категории не найдено готовых интеграций. Попробуйте изменить фильтр или свяжитесь с нами для создания индивидуального решения.
                  </p>
                </div>
              )}
            </div>
          </motion.section>
        )}
        
        {/* Индивидуальные интеграции */}
        {activeTab === 'custom' && (
          <motion.section
            ref={customRef}
            className="py-12 px-4 bg-gray-50 dark:bg-gray-900/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    {t.custom.title}
                  </h2>
                  
           <p className="text-gray-600 dark:text-gray-400 mb-10 text-center">
                    {t.custom.description}
                  </p>
                  
                  {/* Типы индивидуальных интеграций */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {t.custom.types.map((type, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                            <img 
                              src={type.icon} 
                              alt={type.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{type.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Процесс разработки */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Процесс разработки индивидуальных интеграций
                  </h3>
                  
                  <div className="relative">
                    {/* Линия процесса */}
                    <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform md:-translate-x-1/2"></div>
                    
                    <div className="space-y-8">
                      {t.custom.process.map((step, index) => (
                        <motion.div
                          key={index}
                          className="relative flex flex-col md:flex-row items-start"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          {/* Маркер этапа */}
                          <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center transform md:-translate-x-1/2 z-10">
                            {index + 1}
                          </div>
                          
                          {/* Контент для десктопа (разные стороны) */}
                          <div className="hidden md:block md:w-1/2 md:pr-10 text-right self-center ml-auto">
                            {index % 2 === 0 ? (
                              <>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{step.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                              </>
                            ) : null}
                          </div>
                          
                          <div className="hidden md:block md:w-1/2 md:pl-10 self-center">
                            {index % 2 === 1 ? (
                              <>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{step.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                              </>
                            ) : null}
                          </div>
                          
                          {/* Контент для мобильных (всегда справа) */}
                          <div className="md:hidden pl-12">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{step.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Кнопка призыва к действию */}
                  <div className="mt-12 text-center">
                    <motion.button
                      className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-lg shadow-primary/20 inline-flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Заказать индивидуальную интеграцию
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
        
        {/* API для разработчиков */}
        {activeTab === 'api' && (
          <motion.section
            ref={apiRef}
            className="py-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto">
              <div className="mb-10 max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  {t.api.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
                  {t.api.description}
                </p>
                
                {/* Преимущества API */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {t.api.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-md"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 text-primary dark:text-primary-light">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Документация API */}
              <div className="bg-gray-900 dark:bg-black rounded-xl overflow-hidden shadow-xl mb-12">
                <div className="p-4 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 flex items-center">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-white font-mono text-sm">API Reference</div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-white text-lg font-bold mb-4">Available Endpoints</h3>
                    
                    <div className="space-y-8">
                      {t.api.endpoints.map((endpoint, index) => (
                        <motion.div
                          key={index}
                          className="border border-gray-700 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="bg-gray-800 p-4 border-b border-gray-700">
                            <div className="flex justify-between items-center">
                              <h4 className="text-white font-bold">{endpoint.name}</h4>
                              <div className="bg-primary/20 text-primary-light px-2 py-1 rounded text-xs font-mono">
                                {endpoint.method}
                              </div>
                            </div>
                            <div className="text-gray-400 text-sm mt-1">{endpoint.path}</div>
                          </div>
                          
                          <div className="p-4 text-sm">
                            <p className="text-gray-300 mb-4">{endpoint.description}</p>
                            <ApiEndpointCode endpoint={endpoint} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <a 
                      href="https://docs.example.com/api" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg inline-flex items-center"
                    >
                      Полная документация API
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* SDK и инструменты */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  SDK и инструменты для разработчиков
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'JavaScript SDK',
                      description: 'Официальная JavaScript библиотека для работы с API Car-Sale.',
                      icon: 'https://via.placeholder.com/60x60/F7DF1E/000000?text=JS',
                      link: 'https://github.com/example/car-sale-js-sdk'
                    },
                    {
                      title: 'Python SDK',
                      description: 'Python библиотека для интеграции с API Car-Sale.',
                      icon: 'https://via.placeholder.com/60x60/3776AB/FFFFFF?text=PY',
                      link: 'https://github.com/example/car-sale-python-sdk'
                    },
                    {
                      title: 'Postman Collection',
                      description: 'Готовая коллекция запросов для тестирования API в Postman.',
                      icon: 'https://via.placeholder.com/60x60/FF6C37/FFFFFF?text=PM',
                      link: 'https://documenter.getpostman.com/view/example/car-sale-api'
                    }
                  ].map((tool, index) => (
                    <motion.div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-md"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                          <img 
                            src={tool.icon} 
                            alt={tool.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{tool.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
                          <a 
                            href={tool.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary dark:text-primary-light font-medium hover:underline inline-flex items-center text-sm"
                          >
                            Подробнее
                            <ArrowRightIcon className="w-4 h-4 ml-1" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      
      {/* FAQ секция */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t.faq.title}
            </motion.h2>
            
            <div className="space-y-4">
              {t.faq.items.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-8">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 ml-2">
                        <svg 
                          className="w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform group-open:rotate-180" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
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
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  className="px-8 py-4 bg-white hover:bg-gray-100 text-primary font-medium rounded-lg transition-colors inline-flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.cta.button}
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white font-medium rounded-lg inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.cta.demoButton}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Стили для сетки интеграций */}
      <style jsx>{`
        .integration-grid {
          background-image: 
            linear-gradient(to right, rgba(209, 213, 219, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(209, 213, 219, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .dark .integration-grid {
          background-image: 
            linear-gradient(to right, rgba(75, 85, 99, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(75, 85, 99, 0.2) 1px, transparent 1px);
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}