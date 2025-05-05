'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegram } from '@/src/hooks/useTelegram';
import { useLanguageStore } from '@/src/store/language';

// Локализация для юридической информации
const legalLocalization = {
  ru: {
    hero: {
      title: 'Юридическая информация',
      subtitle: 'Прозрачность и соответствие законодательству — основы нашей работы'
    },
    tabs: [
      { id: 'privacy', title: 'Политика конфиденциальности' },
      { id: 'terms', title: 'Условия использования' },
      { id: 'cookies', title: 'Политика cookies' },
      { id: 'licenses', title: 'Лицензии' },
      { id: 'gdpr', title: 'Соответствие GDPR' }
    ],
    documents: {
      privacy: {
        title: 'Политика конфиденциальности',
        lastUpdated: 'Последнее обновление: 1 мая 2025 г.',
        sections: [
          {
            title: 'Общие положения',
            content: 'ООО "Car-Sale" (далее — "мы", "наша компания") уважает конфиденциальность пользователей нашего сайта и мобильного приложения. Настоящая Политика конфиденциальности объясняет, как мы собираем, используем, раскрываем, храним и защищаем вашу информацию.'
          },
          {
            title: 'Сбор информации',
            content: 'Мы собираем информацию, которую вы предоставляете нам напрямую, например, при создании учетной записи, заполнении форм или взаимодействии с нашими услугами. Это может включать ваше имя, контактную информацию, данные платежей и информацию о ваших предпочтениях.'
          },
          {
            title: 'Использование информации',
            content: 'Мы используем собранную информацию для предоставления, поддержки и улучшения наших услуг, а также для обеспечения их безопасности. Это включает обработку транзакций, отправку уведомлений, предотвращение мошенничества и предоставление персонализированного опыта.'
          },
          {
            title: 'Раскрытие информации',
            content: 'Мы можем раскрывать вашу информацию третьим сторонам, включая наших партнеров, поставщиков услуг и аффилированные компании, которые помогают нам предоставлять и улучшать наши услуги.'
          },
          {
            title: 'Хранение и защита информации',
            content: 'Мы принимаем разумные меры для защиты вашей информации от несанкционированного доступа, раскрытия, изменения или уничтожения. Однако ни один метод передачи через Интернет или метод электронного хранения не является полностью безопасным.'
          }
        ]
      },
      terms: {
        title: 'Условия использования',
        lastUpdated: 'Последнее обновление: 1 мая 2025 г.',
        sections: [
          {
            title: 'Принятие условий',
            content: 'Доступ к нашим услугам и их использование регулируются настоящими Условиями использования и соответствующими законами. Используя наши услуги, вы принимаете и соглашаетесь соблюдать настоящие Условия.'
          },
          {
            title: 'Изменения условий',
            content: 'Мы можем изменять настоящие Условия в любое время, публикуя обновленную версию на нашем сайте. Продолжая использовать наши услуги после таких изменений, вы принимаете обновленные Условия.'
          },
          {
            title: 'Учетные записи пользователей',
            content: 'Для доступа к определенным функциям наших услуг может потребоваться создание учетной записи. Вы несете ответственность за сохранение конфиденциальности своих учетных данных.'
          },
          {
            title: 'Интеллектуальная собственность',
            content: 'Наши услуги и связанный с ними контент, включая текст, графику, логотипы, изображения, программное обеспечение и другие материалы, защищены законами об интеллектуальной собственности.'
          },
          {
            title: 'Ограничение ответственности',
            content: 'В максимальной степени, разрешенной действующим законодательством, мы не несем ответственности за любые прямые, косвенные, случайные, особые, последующие или штрафные убытки.'
          }
        ]
      },
      cookies: {
        title: 'Политика использования файлов cookies',
        lastUpdated: 'Последнее обновление: 1 мая 2025 г.',
        sections: [
          {
            title: 'Что такое файлы cookies',
            content: 'Файлы cookies — это небольшие текстовые файлы, которые размещаются на вашем устройстве при посещении нашего сайта. Они используются для того, чтобы сайт мог запомнить ваши действия и предпочтения.'
          },
          {
            title: 'Какие типы файлов cookies мы используем',
            content: 'Мы используем несколько типов файлов cookies: необходимые файлы cookies, аналитические файлы cookies, функциональные файлы cookies и рекламные файлы cookies.'
          },
          {
            title: 'Как управлять файлами cookies',
            content: 'Большинство веб-браузеров позволяют управлять файлами cookies через настройки. Вы можете настроить свой браузер так, чтобы он отклонял все файлы cookies или уведомлял вас, когда отправляется файл cookie.'
          },
          {
            title: 'Сторонние файлы cookies',
            content: 'Наш сайт может использовать службы третьих сторон, которые также могут устанавливать файлы cookies на ваше устройство. Мы не контролируем использование файлов cookies третьими сторонами.'
          }
        ]
      },
      licenses: {
        title: 'Лицензии и соглашения',
        lastUpdated: 'Последнее обновление: 1 мая 2025 г.',
        sections: [
          {
            title: 'Лицензия на использование ПО',
            content: 'Мы предоставляем вам ограниченную, неисключительную, непередаваемую, отзывную лицензию на доступ и использование нашего программного обеспечения в соответствии с настоящими Условиями.'
          },
          {
            title: 'Лицензионные ограничения',
            content: 'Вы соглашаетесь не копировать, модифицировать, адаптировать, переводить, создавать производные работы, распространять, лицензировать, продавать или иным образом использовать наше программное обеспечение.'
          },
          {
            title: 'Сторонние лицензии',
            content: 'Наше программное обеспечение может включать компоненты с открытым исходным кодом или компоненты, лицензированные третьими сторонами.'
          },
          {
            title: 'Обновления программного обеспечения',
            content: 'Мы можем автоматически обновлять наше программное обеспечение для улучшения производительности, расширения функциональности, отражения изменений в операционной системе или устранения проблем безопасности.'
          }
        ]
      },
      gdpr: {
        title: 'Соответствие GDPR',
        lastUpdated: 'Последнее обновление: 1 мая 2025 г.',
        sections: [
          {
            title: 'Общие положения о защите данных',
            content: 'Мы соблюдаем Общий регламент по защите данных (GDPR) Европейского союза в отношении сбора, использования, передачи, хранения и других видов обработки персональных данных.'
          },
          {
            title: 'Законные основания для обработки',
            content: 'Мы обрабатываем персональные данные только при наличии законных оснований для такой обработки. Эти основания могут включать ваше согласие, необходимость выполнения договора и другие.'
          },
          {
            title: 'Ваши права по GDPR',
            content: 'Если GDPR применяется к обработке ваших персональных данных, вы имеете определенные права, включая право на доступ к данным, их исправление, удаление и ограничение обработки.'
          },
          {
            title: 'Передача данных',
            content: 'Если мы передаем персональные данные за пределы Европейской экономической зоны (ЕЭЗ), мы обеспечиваем соответствующие гарантии для защиты ваших данных.'
          }
        ]
      }
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      items: [
        {
          question: 'Как я могу запросить копию моих персональных данных?',
          answer: 'Вы можете запросить копию ваших персональных данных, отправив письменный запрос на email privacy@carsale.com. В запросе необходимо указать ваше полное имя, контактные данные и описание запрашиваемой информации.'
        },
        {
          question: 'Как долго вы храните мои данные?',
          answer: 'Мы храним ваши персональные данные до тех пор, пока у нас есть для этого законные основания, или пока вы не запросите их удаление. Точный срок хранения зависит от типа данных и целей их обработки.'
        },
        {
          question: 'Можно ли отказаться от маркетинговых сообщений?',
          answer: 'Да, вы можете отказаться от получения маркетинговых сообщений в любое время, нажав на ссылку "Отписаться" в нижней части наших маркетинговых писем или отправив запрос на marketing@carsale.com.'
        }
      ]
    },
    contact: {
      title: 'Остались вопросы?',
      subtitle: 'Наша команда юристов готова помочь вам',
      email: 'legal@carsale.com',
      phone: '+7 (495) 123-45-67',
      formTitle: 'Отправить запрос',
      nameLabel: 'Ваше имя',
      emailLabel: 'Email',
      messageLabel: 'Сообщение',
      buttonText: 'Отправить',
      successMessage: 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
    }
  },
  en: {
    // English localization
  },
  uz: {
    // Uzbek localization
  }
};

export default function LegalPage() {
  const { hapticFeedback } = useTelegram();
  const { currentLocale } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('privacy');
  const [expandedFaqs, setExpandedFaqs] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Получаем локализацию
  const t = legalLocalization[currentLocale || 'ru'] || legalLocalization.ru;
  const activeDocument = t.documents[activeTab];
  
  useEffect(() => {
    setMounted(true);
    
    // Проверяем URL на наличие хэша при загрузке страницы
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash && t.tabs.some(tab => tab.id === hash)) {
        setActiveTab(hash);
      }
    }
  }, []);

  // Переключение вкладок
  const handleTabClick = (tabId) => {
    if (hapticFeedback) hapticFeedback('selection');
    setActiveTab(tabId);
    
    // Обновляем URL с хэшем
    if (typeof window !== 'undefined') {
      window.history.pushState(null, null, `#${tabId}`);
    }
    
    // Сбрасываем состояние развернутых FAQ
    setExpandedFaqs([]);
  };
  
  // Переключение FAQ
  const toggleFaq = (index) => {
    if (expandedFaqs.includes(index)) {
      setExpandedFaqs(expandedFaqs.filter(i => i !== index));
    } else {
      setExpandedFaqs([...expandedFaqs, index]);
    }
    
    if (hapticFeedback) hapticFeedback('selection');
  };
  
  // Отправка формы
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Имитируем отправку
    setTimeout(() => {
      setFormSubmitted(true);
      if (hapticFeedback) hapticFeedback('impact');
      
      // Сбрасываем форму через 5 секунд
      setTimeout(() => {
        setFormSubmitted(false);
        e.target.reset();
      }, 5000);
    }, 1000);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Заголовок */}
      <div className="relative bg-gradient-to-r from-primary to-primary-dark dark:from-primary-dark dark:to-primary-dark/80 text-white overflow-hidden">
        {/* Фоновый паттерн */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 py-16 ">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            className="text-lg text-center max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.hero.subtitle}
          </motion.p>
        </div>
        
        {/* Волнистый разделитель */}
        <div className="absolute bottom-0 left-0 right-0 h-16 text-white dark:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full">
            <path fill="currentColor" fillOpacity="1" d="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,149.3C672,149,768,171,864,186.7C960,203,1056,213,1152,202.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Навигационные табы */}
      <div className="bg-white dark:bg-gray-900  border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar py-4 gap-2">
            {t.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Основное содержимое - документы */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Заголовок документа */}
              <div className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {activeDocument.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {activeDocument.lastUpdated}
                </p>
              </div>
              
              {/* Секции документа */}
              <div className="space-y-8 mb-12">
                {activeDocument.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="legal-section"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <span className="inline-block w-2 h-2 bg-primary dark:bg-primary-light rounded-sm mr-2"></span>
                      {section.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              {/* Кнопки действий */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-16 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      // Копируем URL с хэшем в буфер обмена
                      navigator.clipboard.writeText(window.location.href);
                      alert('Ссылка скопирована в буфер обмена');
                    }
                  }}
                  className="inline-flex items-center text-primary dark:text-primary-light hover:underline"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Поделиться
                </button>
                <button
                  className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Скачать PDF
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* FAQ секция */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t.faq.title}
            </h2>
            
            <div className="space-y-4">
              {t.faq.items.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left font-medium text-gray-900 dark:text-white flex justify-between items-center"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${expandedFaqs.includes(index) ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaqs.includes(index) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-4 text-gray-700 dark:text-gray-300">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Контактная форма */}
      <div className="bg-gray-50 dark:bg-gray-800/30 py-16 px-4 mt-10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t.contact.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t.contact.subtitle}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-10 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Спасибо за обращение!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t.contact.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {t.contact.formTitle}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t.contact.nameLabel}
                        </label>
                        <input 
                          type="text" 
                          id="name" 
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t.contact.emailLabel}
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t.contact.messageLabel}
                      </label>
                      <textarea 
                        id="message" 
                        rows="4"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
                    >
                      </textarea>
                    </div>
                    
                    <div className="flex items-start">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        required
                        className="w-4 h-4 mt-1 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
                      />
                      <label htmlFor="privacy" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Я согласен с <Link href="#privacy" onClick={(e) => { e.preventDefault(); handleTabClick('privacy'); }} className="text-primary dark:text-primary-light hover:underline">Политикой конфиденциальности</Link> и даю согласие на обработку моих персональных данных
                      </label>
                    </div>
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition-colors"
                    >
                      {t.contact.buttonText}
                      <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <svg className="w-6 h-6 text-primary dark:text-primary-light mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{t.contact.email}</span>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <svg className="w-6 h-6 text-primary dark:text-primary-light mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{t.contact.phone}</span>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Нижняя навигация */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {t.tabs.map((tab) => (
                <Link 
                  key={tab.id}
                  href={`#${tab.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick(tab.id);
                    // Скролл вверх
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light"
                >
                  {tab.title}
                </Link>
              ))}
            </div>
            
            <div className="mt-8 flex items-center justify-center">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Вернуться наверх
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Стили для скрытия полосы прокрутки в мобильной навигации */}
      <style jsx global>{`
        /* Скрываем полосу прокрутки для Chrome, Safari и Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Скрываем полосу прокрутки для IE, Edge и Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE и Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Улучшенные стили для FAQ-аккордеона */
        details summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </div>
  );
}