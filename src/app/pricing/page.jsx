'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTelegram } from '@/src/hooks/useTelegram';
import { useLanguageStore } from '@/src/store/language';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useThemeStore } from '@/src/store/theme';

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
  CogIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

// Импортируем локализацию
import { pricingLocalization } from './pricing';

// Компонент "Переключатель периода оплаты"
const BillingToggle = ({ annual, setAnnual }) => {
  const { t } = useTranslation(pricingLocalization);
  const { hapticFeedback } = useTelegram();
  
  const handleToggle = () => {
    setAnnual(!annual);
    hapticFeedback && hapticFeedback('selection');
  };
  
  return (
    <div className="flex items-center justify-center space-x-3 mb-8">
      <span className={`text-sm font-medium ${!annual ? 'text-primary dark:text-primary-light' : 'text-gray-500 dark:text-gray-400'}`}>
        {t('billing.monthly')}
      </span>
      
      <button
        onClick={handleToggle}
        className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
          annual ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
        }`}
        aria-label={annual ? t('billing.switchToMonthly') : t('billing.switchToAnnual')}
      >
        <motion.div
          className="w-5 h-5 rounded-full bg-white shadow-md"
          animate={{ x: annual ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
      
      <div className="flex items-center space-x-1">
        <span className={`text-sm font-medium ${annual ? 'text-primary dark:text-primary-light' : 'text-gray-500 dark:text-gray-400'}`}>
          {t('billing.annual')}
        </span>
        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-1.5 py-0.5 rounded">
          -20%
        </span>
      </div>
    </div>
  );
};

// Компонент анимированной иконки автомобиля для карточек тарифов
const CarIcon = ({ type, animate }) => {
  const variants = {
    sedan: "/assets/icons/sedan.svg",
    suv: "/assets/icons/suv.svg",
    premium: "/assets/icons/sport.svg"
  };

  return (
    <motion.div 
      className="absolute top-4 right-4 w-8 h-8 opacity-70"
      animate={animate ? { y: [0, -5, 0], rotate: [0, 1, 0] } : {}}
      transition={{ 
        y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" }
      }}
    >
      <Image 
        src={variants[type] || variants.sedan} 
        alt="Plan icon"
        width={32}
        height={32}
        className="w-full h-full"
      />
    </motion.div>
  );
};

// Компонент "Карточка тарифа"
const PricingCard = ({ plan, annual, featured, onSelect }) => {
  const { t } = useTranslation(pricingLocalization);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, threshold: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const { hapticFeedback } = useTelegram();
  const { isDark } = useThemeStore();
  
  // Расчет цены с учетом периода оплаты
  const price = annual ? Math.round(plan.price * 12 * 0.8) : plan.price;

  // Определяем тип иконки автомобиля в зависимости от тарифа
  const getCarType = () => {
    switch (plan.id) {
      case 'start': return 'sedan';
      case 'business': return 'suv';
      case 'premium': return 'premium';
      default: return 'sedan';
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: plan.index * 0.1 + 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative rounded-2xl overflow-hidden border ${
        featured 
          ? 'border-primary dark:border-primary-light shadow-xl' 
          : 'border-gray-200 dark:border-gray-700 shadow-lg'
      } bg-white dark:bg-gray-800 h-full flex flex-col`}
    >
      {featured && (
        <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center text-sm py-1.5 font-medium">
          {t('card.recommended')}
        </div>
      )}
      
      {/* Иконка автомобиля */}
      <CarIcon type={getCarType()} animate={isHovered} />
      
      <div className={`p-6 ${featured ? 'pt-12' : ''}`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 h-12">{plan.description}</p>
        
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">{price.toLocaleString()}</span>
          <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">₽</span>
          <span className="text-gray-500 dark:text-gray-400 ml-2">/ {annual ? t('billing.yearShort') : t('billing.monthShort')}</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            onSelect(plan);
            hapticFeedback && hapticFeedback('impact');
          }}
          className={`w-full py-3 rounded-lg flex items-center justify-center ${
            featured
              ? 'bg-primary hover:bg-primary-dark text-white'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
          } font-medium transition-colors`}
        >
          {plan.buttonText}
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </motion.button>
      </div>
      
      <div className="border-t border-gray-100 dark:border-gray-700 p-6 flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">{t('card.included')}:</h4>
        
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
            <h4 className="font-medium text-gray-900 dark:text-white mb-4 mt-6">{t('card.notIncluded')}:</h4>
            
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
      
      {/* Индикатор скидки при выборе годовой оплаты */}
      {annual && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          -20%
        </div>
      )}
    </motion.div>
  );
};

// Компонент "Дополнительные услуги"
const AdditionalServices = () => {
  const { t } = useTranslation(pricingLocalization);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const { hapticFeedback } = useTelegram();
  
  const services = [
    {
      title: t('services.custom.title'),
      description: t('services.custom.description'),
      price: t('services.custom.price'),
      icon: <CogIcon className="w-6 h-6 text-primary" />
    },
    {
      title: t('services.integration.title'),
      description: t('services.integration.description'),
      price: t('services.integration.price'),
      icon: <ServerIcon className="w-6 h-6 text-[#0891B2]" />
    },
    {
      title: t('services.training.title'),
      description: t('services.training.description'),
      price: t('services.training.price'),
      icon: <UserGroupIcon className="w-6 h-6 text-[#F59E0B]" />
    },
    {
      title: t('services.migration.title'),
      description: t('services.migration.description'),
      price: t('services.migration.price'),
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('services.title')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 flex cursor-pointer"
              onClick={() => hapticFeedback && hapticFeedback('selection')}
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
            onClick={() => hapticFeedback && hapticFeedback('impact')}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg inline-flex items-center"
          >
            {t('services.requestCustom')}
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Компонент "Сравнение тарифов" с улучшенной мобильной версией
const PlanComparison = ({ plans, annual }) => {
  const { t } = useTranslation(pricingLocalization);
  const tableRef = useRef(null);
  const isInView = useInView(tableRef, { once: true, threshold: 0.1 });
  const [openSection, setOpenSection] = useState('basic');
  const { hapticFeedback } = useTelegram();
  const [activePlan, setActivePlan] = useState(1); // для мобильного карусельного вида
  
  const featureCategories = [
    {
      id: 'basic',
      name: t('comparison.categories.basic'),
      features: [
        { name: t('comparison.features.users'), values: ['2', '5', t('comparison.unlimited')] },
        { name: t('comparison.features.storage'), values: ['5 ГБ', '25 ГБ', '100 ГБ'] },
        { name: t('comparison.features.cars'), values: ['50', '500', t('comparison.unlimited')] },
        { name: t('comparison.features.support'), values: [t('comparison.values.emailOnly'), t('comparison.values.emailPhone'), t('comparison.values.priority')] }
      ]
    },
    {
      id: 'crm',
      name: t('comparison.categories.crm'),
      features: [
        { name: t('comparison.features.clients'), values: [true, true, true] },
        { name: t('comparison.features.sales'), values: [true, true, true] },
        { name: t('comparison.features.history'), values: [true, true, true] },
        { name: t('comparison.features.messenger'), values: [false, true, true] },
        { name: t('comparison.features.email'), values: [false, true, true] },
        { name: t('comparison.features.clientAnalytics'), values: [false, false, true] }
      ]
    },
    {
      id: 'inventory',
      name: t('comparison.categories.inventory'),
      features: [
        { name: t('comparison.features.carsManagement'), values: [true, true, true] },
        { name: t('comparison.features.stockManagement'), values: [true, true, true] },
        { name: t('comparison.features.marketplace'), values: [false, true, true] },
        { name: t('comparison.features.stockAnalytics'), values: [false, true, true] },
        { name: t('comparison.features.autoOrder'), values: [false, false, true] }
      ]
    },
    {
      id: 'contracts',
      name: t('comparison.categories.documents'),
      features: [
        { name: t('comparison.features.docGeneration'), values: [true, true, true] },
        { name: t('comparison.features.docTemplates'), values: [t('comparison.values.basic'), t('comparison.values.extended'), t('comparison.values.full')] },
        { name: t('comparison.features.signature'), values: [false, true, true] },
        { name: t('comparison.features.docArchive'), values: [true, true, true] },
        { name: t('comparison.features.govServices'), values: [false, true, true] }
      ]
    },
    {
      id: 'finance',
      name: t('comparison.categories.finance'),
      features: [
        { name: t('comparison.features.payments'), values: [true, true, true] },
        { name: t('comparison.features.bankIntegration'), values: [false, true, true] },
        { name: t('comparison.features.credit'), values: [false, true, true] },
        { name: t('comparison.features.onlinePayments'), values: [false, true, true] },
        { name: t('comparison.features.finReports'), values: [false, false, true] }
      ]
    },
    {
      id: 'analytics',
      name: t('comparison.categories.analytics'),
      features: [
        { name: t('comparison.features.basicReports'), values: [true, true, true] },
        { name: t('comparison.features.advancedAnalytics'), values: [false, true, true] },
        { name: t('comparison.features.customDashboards'), values: [false, false, true] },
        { name: t('comparison.features.forecasting'), values: [false, false, true] },
        { name: t('comparison.features.dataExport'), values: [true, true, true] }
      ]
    }
  ];
  
  const toggleSection = (id) => {
    hapticFeedback && hapticFeedback('selection');
    setOpenSection(openSection === id ? null : id);
  };

  const nextPlan = () => {
    hapticFeedback && hapticFeedback('selection');
    setActivePlan((prev) => (prev === plans.length - 1 ? 0 : prev + 1));
  };

  const prevPlan = () => {
    hapticFeedback && hapticFeedback('selection');
    setActivePlan((prev) => (prev === 0 ? plans.length - 1 : prev - 1));
  };

  // Компонент для мобильной версии сравнения тарифов
  const MobileComparison = () => (
    <div className="md:hidden">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevPlan}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
          aria-label={t('comparison.prevPlan')}
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
          {plans[activePlan].title}
          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {annual ? Math.round(plans[activePlan].price * 12 * 0.8).toLocaleString() : plans[activePlan].price.toLocaleString()} ₽/{annual ? t('billing.yearShort') : t('billing.monthShort')}
          </div>
        </h4>
        
        <button 
          onClick={nextPlan}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
          aria-label={t('comparison.nextPlan')}
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      
      <div className="space-y-4">
        {featureCategories.map((category) => (
          <div key={category.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              className="w-full p-4 text-left flex items-center justify-between bg-gray-50 dark:bg-gray-700/50"
              onClick={() => toggleSection(category.id)}
            >
              <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                  openSection === category.id ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            <AnimatePresence>
              {openSection === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 space-y-3">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature.name}</span>
                        <div className="flex items-center">
                          {typeof feature.values[activePlan] === 'boolean' ? (
                            feature.values[activePlan] ? (
                              <CheckIcon className="w-5 h-5 text-green-500" />
                            ) : (
                              <XMarkIcon className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                            )
                          ) : (
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {feature.values[activePlan]}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      ref={tableRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-4 sm:p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('comparison.title')}</h3>
        
        {/* Мобильная версия сравнения */}
        <MobileComparison />
        
        {/* Десктопная версия сравнения */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-4 px-4 text-left text-gray-500 dark:text-gray-400 font-medium w-1/4">{t('comparison.feature')}</th>
                {plans.map((plan) => (
                  <th key={plan.id} className="py-4 px-4 text-center font-medium text-gray-900 dark:text-white">
                    {plan.title}
                    <div className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      {annual ? Math.round(plan.price * 12 * 0.8).toLocaleString() : plan.price.toLocaleString()} ₽/{annual ? t('billing.yearShort') : t('billing.monthShort')}
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
  const { t } = useTranslation(pricingLocalization);
  const faqRef = useRef(null);
  const isInView = useInView(faqRef, { once: true, threshold: 0.2 });
  const [openItem, setOpenItem] = useState(null);
  const { hapticFeedback } = useTelegram();
  
  const faqItems = [
    {
      question: t('faq.changePlan.question'),
      answer: t('faq.changePlan.answer')
    },
    {
      question: t('faq.trial.question'),
      answer: t('faq.trial.answer')
    },
    {
      question: t('faq.payment.question'),
      answer: t('faq.payment.answer')
    },
    {question: t('faq.payment.question'),
      answer: t('faq.payment.answer')
    },
    {
      question: t('faq.software.question'),
      answer: t('faq.software.answer')
    },
    {
      question: t('faq.integration.question'),
      answer: t('faq.integration.answer')
    }
  ];

  const toggleItem = (index) => {
    hapticFeedback && hapticFeedback('selection');
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('faq.title')}</h3>
        
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
                aria-expanded={openItem === index}
                aria-controls={`faq-answer-${index}`}
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
                    id={`faq-answer-${index}`}
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
        
        {/* Добавляем кнопку поддержки */}
        <div className="mt-8 text-center">
          <Link 
            href="/support"
            className="inline-flex items-center text-primary dark:text-primary-light hover:underline"
            onClick={() => hapticFeedback && hapticFeedback('selection')}
          >
            <QuestionMarkCircleIcon className="w-5 h-5 mr-1" />
            {t('faq.moreQuestions')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Компонент "Призыв к действию" с улучшениями для баннера
const PricingCTA = () => {
  const { t } = useTranslation(pricingLocalization);
  const ctaRef = useRef(null);
  const isInView = useInView(ctaRef, { once: true, threshold: 0.2 });
  const { hapticFeedback, isTelegram } = useTelegram();
  
  return (
    <motion.div
      ref={ctaRef}
      className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl overflow-hidden shadow-xl text-white relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Улучшенные декоративные элементы */}
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Добавляем элементы автомобильной тематики */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path d="M19,10c-0.5-4-3.5-6-7-6S5.5,6,5,10H3c-0.6,0-1,0.4-1,1v3c0,0.6,0.4,1,1,1h1v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h10v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h1c0.6,0,1-0.4,1-1v-3c0-0.6-0.4-1-1-1H19z" fill="currentColor"/>
          <circle cx="7.5" cy="13.5" r="1.5" fill="currentColor"/>
          <circle cx="16.5" cy="13.5" r="1.5" fill="currentColor"/>
        </svg>
      </div>
      
      <div className="relative p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('cta.title')}
          </motion.h2>
          
          <motion.p 
            className="text-xl opacity-90 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('cta.description')}
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
              onClick={() => {
                hapticFeedback && hapticFeedback('impact');
                window.location.href = '/trial';
              }}
              className="px-8 py-4 bg-white text-primary hover:bg-gray-100 font-medium rounded-full shadow-lg flex items-center justify-center"
            >
              {t('cta.startTrial')}
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                hapticFeedback && hapticFeedback('selection');
                window.location.href = '/contact';
              }}
              className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white font-medium rounded-full flex items-center justify-center"
            >
              {t('cta.contactSales')}
            </motion.button>
          </motion.div>
          
          {/* Добавляем иконку с автомобилем для Telegram версии */}
          {isTelegram && (
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.7 }}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary">
                  <path d="M19,10c-0.5-4-3.5-6-7-6S5.5,6,5,10H3c-0.6,0-1,0.4-1,1v3c0,0.6,0.4,1,1,1h1v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h10v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h1c0.6,0,1-0.4,1-1v-3c0-0.6-0.4-1-1-1H19z" fill="currentColor"/>
                  <circle cx="7.5" cy="13.5" r="1.5" fill="currentColor"/>
                  <circle cx="16.5" cy="13.5" r="1.5" fill="currentColor"/>
                </svg>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Компонент навигации по тарифам - новое дополнение
const PricingNav = () => {
  const { t } = useTranslation(pricingLocalization);
  const { hapticFeedback } = useTelegram();
  
  const navItems = [
    { id: 'plans', label: t('nav.plans') },
    { id: 'comparison', label: t('nav.comparison') },
    { id: 'services', label: t('nav.services') },
    { id: 'faq', label: t('nav.faq') }
  ];
  
  const scrollToSection = (id) => {
    hapticFeedback && hapticFeedback('selection');
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-3 px-4 border-b border-gray-200 dark:border-gray-700 mb-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link 
            href="/"
            className="text-gray-800 dark:text-white font-medium flex items-center"
            onClick={() => hapticFeedback && hapticFeedback('selection')}
          >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            {t('nav.back')}
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="md:hidden">
            <button
              className="text-gray-700 dark:text-gray-300 p-2 rounded-md bg-gray-100 dark:bg-gray-800"
              onClick={() => {
                hapticFeedback && hapticFeedback('selection');
                // Логика для показа мобильного меню
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Основной компонент страницы с улучшениями
export default function PricingPage() {
  const { hapticFeedback, isTelegram } = useTelegram();
  const { currentLocale } = useLanguageStore();
  const { t } = useTranslation(pricingLocalization);
  const { isDark } = useThemeStore();
  
  const [mounted, setMounted] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Ссылка на верхнюю часть страницы для анимации при скролле
  const topRef = useRef(null);
  const plansRef = useRef(null);
  const servicesRef = useRef(null);
  const comparisonRef = useRef(null);
  const faqRef = useRef(null);
  
  const isTopInView = useInView(topRef, { once: true });
  
  useEffect(() => {
    setMounted(true);
    
    // Добавляем обработчик прокрутки для кнопки "Наверх"
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Прокрутка страницы наверх
  const scrollToTop = () => {
    hapticFeedback && hapticFeedback('selection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pricingPlans = [
    {
      id: 'start',
      index: 0,
      title: t('plans.start.title'),
      description: t('plans.start.description'),
      price: 4900,
      buttonText: t('plans.start.button'),
      features: t('plans.start.features', { returnObjects: true }),
      notIncluded: t('plans.start.notIncluded', { returnObjects: true })
    },
    {
      id: 'business',
      index: 1,
      title: t('plans.business.title'),
      description: t('plans.business.description'),
      price: 9900,
      buttonText: t('plans.business.button'),
      features: t('plans.business.features', { returnObjects: true }),
      notIncluded: t('plans.business.notIncluded', { returnObjects: true })
    },
    {
      id: 'premium',
      index: 2,
      title: t('plans.premium.title'),
      description: t('plans.premium.description'),
      price: 19900,
      buttonText: t('plans.premium.button'),
      features: t('plans.premium.features', { returnObjects: true }),
      notIncluded: t('plans.premium.notIncluded', { returnObjects: true })
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    hapticFeedback && hapticFeedback('impact');
    
    // Открываем модальное окно для оформления заказа
    // В реальном приложении здесь бы использовался компонент модального окна
    console.log(`Selected plan: ${plan.title}`);
    
    // Улучшенное взаимодействие через Telegram
    if (isTelegram) {
      // Отправка данных в Telegram WebApp
      const data = {
        action: 'select_plan',
        plan_id: plan.id,
        plan_title: plan.title,
        price: annual ? Math.round(plan.price * 12 * 0.8) : plan.price,
        billing_period: annual ? 'annual' : 'monthly'
      };
      
      try {
        // Используем Telegram WebApp API для отправки данных
        window.Telegram?.WebApp?.sendData(JSON.stringify(data));
      } catch (error) {
        console.error('Error sending data to Telegram:', error);
        alert(`Вы выбрали тариф "${plan.title}". Сейчас вы будете перенаправлены на страницу оформления заказа.`);
      }
    } else {
      // Стандартное поведение для веб-версии
      alert(`Вы выбрали тариф "${plan.title}". Сейчас вы будете перенаправлены на страницу оформления заказа.`);
      // window.location.href = `/order?plan=${plan.id}&billing=${annual ? 'annual' : 'monthly'}`;
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative overflow-hidden page-scrollable">
      {/* Улучшенные фоновые градиенты с анимацией */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-light/15 via-white to-accent/15 dark:from-primary-dark/30 dark:via-black dark:to-primary-dark/20 -z-10 pointer-events-none"></div>
      
      <motion.div 
        className="fixed top-[10%] right-[5%] w-96 h-96 bg-primary/30 dark:bg-primary/20 rounded-full blur-3xl opacity-70 -z-10 pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="fixed bottom-[10%] left-[5%] w-96 h-96 bg-accent/30 dark:bg-primary-dark/20 rounded-full blur-3xl opacity-70 -z-10 pointer-events-none"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      {/* Добавляем навигацию страницы */}
      {/* <PricingNav /> */}
      
      {/* Герой-секция */}
      <section ref={topRef} id="hero" className="pt-8 sm:pt-16 pb-16 sm:pb-24 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={isTopInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              {t('hero.title')} <span className="text-primary dark:text-primary-light">Car-Sale</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={isTopInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('hero.description')}
            </motion.p>
            
            {/* Индикатор скролла */}
            <motion.div 
              className="mt-10 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isTopInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-1"
                animate={{ y: [0, 10, 0] }}
                transition={{ 
                  y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
              >
                <motion.div 
                  className="w-1.5 h-1.5 bg-primary dark:bg-primary-light rounded-full"
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                    opacity: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Переключатель периода оплаты */}
          <div id="plans" ref={plansRef}>
            <BillingToggle annual={annual} setAnnual={setAnnual} />
          </div>
          
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
          <div id="services" ref={servicesRef} className="mb-16">
            <AdditionalServices />
          </div>
          
          {/* Сравнение тарифов */}
          <div id="comparison" ref={comparisonRef} className="mb-16">
            <PlanComparison plans={pricingPlans} annual={annual} />
          </div>
          
          {/* FAQ */}
          <div id="faq" ref={faqRef} className="mb-16">
            <PricingFAQ />
          </div>
          
          {/* CTA */}
          <PricingCTA />
          
          {/* Кнопка "Наверх" */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                className="fixed bottom-6 right-6 w-12 h-12 bg-primary dark:bg-primary-light rounded-full shadow-lg flex items-center justify-center z-50 text-white"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                onClick={scrollToTop}
                aria-label={t('scrollToTop')}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}