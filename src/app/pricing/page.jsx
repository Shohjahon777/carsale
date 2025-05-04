'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTelegram } from '@/src/hooks/useTelegram';
import { useLanguageStore } from '@/src/store/language';

// Импортируем иконки
import {
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
  ChevronDownIcon,
  CreditCardIcon,
  CubeIcon,
  UserGroupIcon,
  ServerIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  CogIcon
} from '@heroicons/react/24/outline';

// Компонент "Переключатель периода оплаты"
const BillingToggle = ({ annual, setAnnual }) => {
  return (
    <div className="flex items-center justify-center space-x-3 mb-8">
      <span className={`text-sm font-medium ${!annual ? 'text-primary dark:text-primary-light' : 'text-gray-500 dark:text-gray-400'}`}>
        Ежемесячно
      </span>
      
      <button
        onClick={() => setAnnual(!annual)}
        className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
          annual ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <motion.div
          className="w-5 h-5 rounded-full bg-white shadow-md"
          animate={{ x: annual ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
      
      <div className="flex items-center space-x-1">
        <span className={`text-sm font-medium ${annual ? 'text-primary dark:text-primary-light' : 'text-gray-500 dark:text-gray-400'}`}>
          Ежегодно
        </span>
        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-1.5 py-0.5 rounded">
          -20%
        </span>
      </div>
    </div>
  );
};

// Компонент "Карточка тарифа"
const PricingCard = ({ plan, annual, featured, onSelect }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, threshold: 0.3 });
  
  // Расчет цены с учетом периода оплаты
  const price = annual ? Math.round(plan.price * 12 * 0.8) : plan.price;
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: plan.index * 0.1 + 0.3 }}
      className={`relative rounded-2xl overflow-hidden border ${
        featured 
          ? 'border-primary dark:border-primary-light shadow-xl' 
          : 'border-gray-200 dark:border-gray-700 shadow-lg'
      } bg-white dark:bg-gray-800 h-full flex flex-col`}
    >
      {featured && (
        <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center text-sm py-1.5 font-medium">
          Рекомендуемый
        </div>
      )}
      
      <div className={`p-6 ${featured ? 'pt-12' : ''}`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 h-12">{plan.description}</p>
        
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">{price.toLocaleString()}</span>
          <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">₽</span>
          <span className="text-gray-500 dark:text-gray-400 ml-2">/ {annual ? 'год' : 'месяц'}</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(plan)}
          className={`w-full py-3 rounded-lg ${
            featured
              ? 'bg-primary hover:bg-primary-dark text-white'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
          } font-medium transition-colors`}
        >
          {plan.buttonText}
        </motion.button>
      </div>
      
      <div className="border-t border-gray-100 dark:border-gray-700 p-6 flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Включено:</h4>
        
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        {plan.notIncluded && plan.notIncluded.length > 0 && (
          <>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4 mt-6">Не включено:</h4>
            
            <ul className="space-y-3">
              {plan.notIncluded.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <XMarkIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-500 dark:text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </motion.div>
  );
};

// Компонент "Дополнительные услуги"
const AdditionalServices = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  
  const services = [
    {
      title: 'Индивидуальная настройка',
      description: 'Адаптация системы под специфические потребности вашего бизнеса',
      price: 'от 15 000 ₽',
      icon: <CogIcon className="w-6 h-6 text-primary" />
    },
    {
      title: 'Интеграция с внешними системами',
      description: 'Подключение к банкам, страховым компаниям, гос. сервисам',
      price: 'от 10 000 ₽',
      icon: <ServerIcon className="w-6 h-6 text-[#0891B2]" />
    },
    {
      title: 'Обучение персонала',
      description: 'Комплексное обучение сотрудников работе с системой',
      price: 'от 8 000 ₽',
      icon: <UserGroupIcon className="w-6 h-6 text-[#F59E0B]" />
    },
    {
      title: 'Миграция данных',
      description: 'Перенос существующих данных из других систем',
      price: 'от 12 000 ₽',
      icon: <CubeIcon className="w-6 h-6 text-[#059669]" />
    }
  ];

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Дополнительные услуги</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 flex"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-600 flex items-center justify-center shadow-sm">
                  {service.icon}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{service.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{service.description}</p>
                <div className="text-primary dark:text-primary-light font-medium">{service.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg inline-flex items-center"
          >
            Запросить индивидуальное предложение
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Компонент "Сравнение тарифов"
const PlanComparison = ({ plans, annual }) => {
  const tableRef = useRef(null);
  const isInView = useInView(tableRef, { once: true, threshold: 0.1 });
  const [openSection, setOpenSection] = useState('basic');
  
  const featureCategories = [
    {
      id: 'basic',
      name: 'Базовые функции',
      features: [
        { name: 'Количество пользователей', values: ['2', '5', 'Не ограничено'] },
        { name: 'Объем хранилища', values: ['5 ГБ', '25 ГБ', '100 ГБ'] },
        { name: 'Количество автомобилей', values: ['50', '500', 'Не ограничено'] },
        { name: 'Техническая поддержка', values: ['По email', 'Email и телефон', '24/7 приоритетная'] }
      ]
    },
    {
      id: 'crm',
      name: 'CRM и работа с клиентами',
      features: [
        { name: 'База клиентов', values: [true, true, true] },
        { name: 'Воронка продаж', values: [true, true, true] },
        { name: 'История взаимодействий', values: [true, true, true] },
        { name: 'Интеграция с мессенджерами', values: [false, true, true] },
        { name: 'Email-маркетинг', values: [false, true, true] },
        { name: 'Аналитика по клиентам', values: [false, false, true] }
      ]
    },
    {
      id: 'inventory',
      name: 'Управление складом',
      features: [
        { name: 'Учет автомобилей', values: [true, true, true] },
        { name: 'Управление запасами', values: [true, true, true] },
        { name: 'Выгрузка на маркетплейсы', values: [false, true, true] },
        { name: 'Аналитика склада', values: [false, true, true] },
        { name: 'Автоматический заказ', values: [false, false, true] }
      ]
    },
    {
      id: 'contracts',
      name: 'Документооборот',
      features: [
        { name: 'Генерация документов', values: [true, true, true] },
        { name: 'Шаблоны документов', values: ['Базовые', 'Расширенные', 'Полный набор'] },
        { name: 'Электронная подпись', values: [false, true, true] },
        { name: 'Архив документов', values: [true, true, true] },
        { name: 'Интеграция с госсервисами', values: [false, true, true] }
      ]
    },
    {
      id: 'finance',
      name: 'Финансы',
      features: [
        { name: 'Учет платежей', values: [true, true, true] },
        { name: 'Интеграция с банками', values: [false, true, true] },
        { name: 'Рассрочка и кредиты', values: [false, true, true] },
        { name: 'Онлайн-платежи', values: [false, true, true] },
        { name: 'Финансовая отчетность', values: [false, false, true] }
      ]
    },
    {
      id: 'analytics',
      name: 'Аналитика и отчетность',
      features: [
        { name: 'Базовые отчеты', values: [true, true, true] },
        { name: 'Продвинутая аналитика', values: [false, true, true] },
        { name: 'Настраиваемые дашборды', values: [false, false, true] },
        { name: 'Прогнозирование', values: [false, false, true] },
        { name: 'Экспорт данных', values: [true, true, true] }
      ]
    }
  ];
  
  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <motion.div
      ref={tableRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-4 sm:p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Сравнение тарифов</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-4 px-4 text-left text-gray-500 dark:text-gray-400 font-medium w-1/4">Функциональность</th>
                {plans.map((plan) => (
                  <th key={plan.id} className="py-4 px-4 text-center font-medium text-gray-900 dark:text-white">
                    {plan.title}
                    <div className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      {annual ? Math.round(plan.price * 12 * 0.8).toLocaleString() : plan.price.toLocaleString()} ₽/{annual ? 'год' : 'мес'}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureCategories.map((category) => (
                <React.Fragment key={category.id}>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <td colSpan={4} className="py-4 px-4">
                      <button 
                        className="w-full text-left flex items-center justify-between font-medium text-gray-900 dark:text-white focus:outline-none"
                        onClick={() => toggleSection(category.id)}
                      >
                        {category.name}
                        <ChevronDownIcon 
                          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                            openSection === category.id ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                    </td>
                  </tr>
                  
                  {/* Строки с функциями */}
                  <AnimatePresence>
                    {openSection === category.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td colSpan={4} className="py-0 px-0">
                          <table className="w-full">
                            <tbody>
                              {category.features.map((feature, idx) => (
                                <tr 
                                  key={idx} 
                                  className={`border-b border-gray-100 dark:border-gray-700 ${
                                    idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/30'
                                  }`}
                                >
                                  <td className="py-3 px-4 text-left w-1/4 text-gray-600 dark:text-gray-300">{feature.name}</td>
                                  
                                  {feature.values.map((value, index) => (
                                    <td key={index} className="py-3 px-4 text-center">
                                      {typeof value === 'boolean' ? (
                                        value ? (
                                          <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                                        ) : (
                                          <XMarkIcon className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                                        )
                                      ) : (
                                        <span className="text-gray-700 dark:text-gray-300">{value}</span>
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

// Компонент "Часто задаваемые вопросы"
const PricingFAQ = () => {
  const faqRef = useRef(null);
  const isInView = useInView(faqRef, { once: true, threshold: 0.2 });
  const [openItem, setOpenItem] = useState(null);
  
  const faqItems = [
    {
      question: 'Можно ли перейти на другой тариф в процессе использования?',
      answer: 'Да, вы можете изменить тарифный план в любое время. При переходе на более дорогой тариф вам будет начислена пропорциональная доплата за оставшийся период. При переходе на более дешевый тариф изменения вступят в силу со следующего платежного периода.'
    },
    {
      question: 'Есть ли пробный период?',
      answer: 'Да, мы предоставляем 14-дневный бесплатный пробный период для всех тарифных планов. В течение этого времени вы можете протестировать все функции выбранного тарифа без каких-либо обязательств.'
    },
    {
      question: 'Как происходит оплата?',
      answer: 'Оплата производится в начале каждого платежного периода (месяц или год в зависимости от выбранного варианта). Мы принимаем оплату банковскими картами, через электронные платежные системы и банковским переводом для юридических лиц.'
    },
    {
      question: 'Требуется ли установка дополнительного ПО?',
      answer: 'Нет, Car-Sale — это облачное SaaS-решение, которое работает в браузере. Вам не нужно устанавливать какое-либо дополнительное программное обеспечение. Система доступна на любом устройстве с подключением к интернету.'
    },
    {
      question: 'Возможна ли интеграция с другими системами?',
      answer: 'Да, наша система поддерживает интеграцию с различными внешними сервисами, включая банки, страховые компании, государственные сервисы и маркетплейсы. Базовые интеграции включены в тарифы "Бизнес" и "Премиум", а для тарифа "Старт" они доступны как дополнительная услуга.'
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Часто задаваемые вопросы</h3>
        
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

// Компонент "Призыв к действию"
const PricingCTA = () => {
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
            Готовы начать автоматизацию вашего бизнеса?
          </motion.h2>
          
          <motion.p 
            className="text-xl opacity-90 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Выберите подходящий тариф и начните использовать Car-Sale уже сегодня
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
              Начать бесплатный период
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white font-medium rounded-full"
            >
              Связаться с отделом продаж
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Основной компонент страницы
export default function PricingPage() {
  const { hapticFeedback } = useTelegram();
  const { currentLocale } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Ссылка на верхнюю часть страницы для анимации при скролле
  const topRef = useRef(null);
  const isTopInView = useInView(topRef, { once: true });
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const pricingPlans = [
    {
      id: 'start',
      index: 0,
      title: 'Старт',
      description: 'Идеально для небольших автосалонов и начала работы',
      price: 4900,
      buttonText: 'Выбрать "Старт"',
      features: [
        'До 2 пользователей',
        '50 автомобилей в базе',
        'Базовая CRM',
        'Учет автомобилей',
        'Базовые шаблоны документов',
        'Техподдержка по email'
      ],
      notIncluded: [
        'Интеграция с маркетплейсами',
        'Электронная подпись',
        'Интеграция с банками',
        'Продвинутая аналитика',
        'Мобильное приложение'
      ]
    },
    {
      id: 'business',
      index: 1,
      title: 'Бизнес',
      description: 'Оптимальное решение для растущих компаний',
      price: 9900,
      buttonText: 'Выбрать "Бизнес"',
      features: [
        'До 5 пользователей',
        '500 автомобилей в базе',
        'Полная CRM с интеграцией мессенджеров',
        'Учет автомобилей и запасов',
        'Расширенные шаблоны документов',
        'Электронная подпись',
        'Интеграция с маркетплейсами',
        'Интеграция с банками',
        'Управление рассрочкой и кредитами',
        'Техподдержка по email и телефону'
      ],
      notIncluded: [
        'Аналитика по клиентам',
        'Настраиваемые дашборды',
        'Прогнозирование',
        'Мобильное приложение'
      ]
    },
    {
      id: 'premium',
      index: 2,
      title: 'Премиум',
      description: 'Полный набор возможностей для крупных автодилеров',
      price: 19900,
      buttonText: 'Выбрать "Премиум"',
      features: [
        'Неограниченное количество пользователей',
        'Неограниченное количество автомобилей',
        'Полная CRM с расширенной аналитикой',
        'Полное управление складом и запасами',
        'Полный набор шаблонов документов',
        'Электронная подпись',
        'Интеграция со всеми маркетплейсами',
        'Интеграция с банками и платежными системами',
        'Управление рассрочкой и кредитами',
        'Настраиваемые дашборды',
        'Прогнозирование продаж',
        'Мобильное приложение',
        'Приоритетная техподдержка 24/7'
      ],
      notIncluded: []
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    hapticFeedback && hapticFeedback('impact');
    
    // В реальном приложении здесь был бы переход к форме заказа или открытие модального окна
    console.log(`Selected plan: ${plan.title}`);
    alert(`Вы выбрали тариф "${plan.title}". Сейчас вы будете перенаправлены на страницу оформления заказа.`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative overflow-hidden page-scrollable">
      {/* Улучшенные фоновые градиенты */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-light/15 via-white to-accent/15 dark:from-primary-dark/30 dark:via-black dark:to-primary-dark/20 -z-10 pointer-events-none"></div>
      <div className="fixed top-[10%] right-[5%] w-96 h-96 bg-primary/30 dark:bg-primary/20 rounded-full blur-3xl opacity-70 -z-10 animate-pulse-slow pointer-events-none"></div>
      <div className="fixed bottom-[10%] left-[5%] w-96 h-96 bg-accent/30 dark:bg-primary-dark/20 rounded-full blur-3xl opacity-70 -z-10 animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>
      
      {/* Герой-секция */}
      <section ref={topRef} className="pt-8 sm:pt-16 pb-16 sm:pb-24 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={isTopInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              Тарифы <span className="text-primary dark:text-primary-light">Car-Sale</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={isTopInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Выберите тарифный план, который подходит именно для вашего бизнеса
            </motion.p>
          </div>
          
          {/* Переключатель периода оплаты */}
          <BillingToggle annual={annual} setAnnual={setAnnual} />
          
          {/* Тарифные планы */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                annual={annual}
                featured={plan.id === 'business'}
                onSelect={handleSelectPlan}
              />
            ))}
          </div>
          
          {/* Дополнительные услуги */}
          <div className="mb-16">
            <AdditionalServices />
          </div>
          
          {/* Сравнение тарифов */}
          <div className="mb-16">
            <PlanComparison plans={pricingPlans} annual={annual} />
          </div>
          
          {/* FAQ */}
          <div className="mb-16">
            <PricingFAQ />
          </div>
          
          {/* CTA */}
          <PricingCTA />
        </div>
      </section>
    </div>
  );
}