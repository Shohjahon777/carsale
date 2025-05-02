'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useTelegram } from '../hooks/useTelegram';
import { useLanguageStore } from '../store/language';
import {  motion } from 'framer-motion';
import { TestimonialsSection } from '../components/shared/Home/TestimonialsSection';
import { FaqSection } from '../components/shared/Home/FaqSection';
import { pageLocalization } from '../components/shared/Home/localization';
import { CtaSection } from '../components/shared/Home/CtaSection';
import { BenefitsSection } from '../components/shared/Home/BenefitsSection';
import { FeaturesSection } from '../components/shared/Home/FeaturesSection';
import { ProcessDemoSection } from '../components/shared/Home/ProcessDemoSection';


const IntegrationsSection = () => {
  const integrations = [
    { name: "1C", icon: "💼", category: "Учет" },
    { name: "Битрикс24", icon: "🔄", category: "CRM" },
    { name: "SAP", icon: "🏢", category: "ERP" },
    { name: "AmoCRM", icon: "📊", category: "CRM" },
    { name: "МойСклад", icon: "📦", category: "Склад" },
    { name: "СБИС", icon: "📝", category: "Документы" },
    { name: "Telegram", icon: "📱", category: "Мессенджеры" },
    { name: "WhatsApp", icon: "💬", category: "Мессенджеры" },
  ];
  
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(integrations.map(i => i.category))];
  
  const filteredIntegrations = filter === 'all' 
    ? integrations 
    : integrations.filter(i => i.category === filter);
  
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Интеграции
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Наша система легко интегрируется с популярными бизнес-приложениями и сервисами
          </p>
        </motion.div>
        
        {/* Фильтры */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category === 'all' ? 'Все' : category}
            </button>
          ))}
        </div>
        
        {/* Сетка интеграций */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          layout
        >
          {filteredIntegrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center h-40"
            >
              <div className="text-4xl mb-3">{integration.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{integration.name}</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {integration.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Не нашли нужную интеграцию? Мы можем разработать её специально для вас
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-colors shadow-md"
          >
            Запросить интеграцию
          </motion.button>
        </div>
      </div>
    </section>
  );
};


export default function Home() {
  const { hapticFeedback } = useTelegram();
  const { currentLocale } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  
  const t = pageLocalization[currentLocale as keyof typeof pageLocalization] || pageLocalization.ru;

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
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-white to-accent/10 dark:from-primary-dark/20 dark:via-black dark:to-primary-dark/5 -z-10"></div>
      
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-20 left-[5%] w-72 h-72 bg-accent/20 dark:bg-primary-dark/10 rounded-full blur-3xl opacity-70"></div>
      
      {/* Герой-секция */}
      <section className="pt-8 sm:pt-16 pb-16 sm:pb-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-primary dark:text-primary-light">{t.slogan}</span>
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t.description}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/demo" 
                    className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-colors inline-flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-primary/30"
                    onClick={() => hapticFeedback && hapticFeedback('impact')}
                  >
                    {t.cta}
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/products" 
                    className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-medium rounded-full transition-colors inline-flex items-center justify-center gap-2"
                    onClick={() => hapticFeedback && hapticFeedback('selection')}
                  >
                    {t.learnMore}
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Dashboard Mockup */}
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <div className="relative aspect-[16/10] w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
                    <div className="p-4">
                      {/* Header mockup */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-6 w-32 bg-primary/20 dark:bg-primary/40 rounded-md"></div>
                        <div className="flex gap-2">
                          <div className="h-8 w-8 bg-primary/20 dark:bg-primary/40 rounded-full"></div>
                          <div className="h-8 w-8 bg-primary/20 dark:bg-primary/40 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Content mockup */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="col-span-2">
                          <div className="h-32 bg-white dark:bg-gray-800 rounded-xl shadow-md"></div>
                        </div>
                        <div>
                          <div className="h-32 bg-white dark:bg-gray-800 rounded-xl shadow-md"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <div className="h-24 bg-white dark:bg-gray-800 rounded-xl shadow-md"></div>
                        <div className="h-24 bg-white dark:bg-gray-800 rounded-xl shadow-md"></div>
                        <div className="h-24 bg-white dark:bg-gray-800 rounded-xl shadow-md"></div>
                        <div className="h-24 bg-white dark:bg-gray-800 rounded-xl shadow-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Кнопка Play для видео-обзора */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <motion.button 
                    className="group"
                    onClick={() => hapticFeedback && hapticFeedback('impact')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-full shadow-xl flex items-center justify-center transition-transform">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <PlayIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="absolute mt-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {t.howItWorks}
                    </span>
                  </motion.button>
                </motion.div>
              </div>

              {/* Floating badges */}
              <motion.div 
                className="absolute -bottom-6 -right-6 h-16 w-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg rotate-12 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0, rotate: 45 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
              >
                <span className="text-2xl">🏆</span>
              </motion.div>
              
              <motion.div 
                className="absolute -top-4 -left-4 h-14 w-14 bg-white dark:bg-gray-800 rounded-2xl shadow-lg -rotate-12 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ duration: 0.6, delay: 1.1, type: "spring" }}
              >
                <span className="text-xl">⭐</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Секция возможностей с анимацией */}
      <FeaturesSection
        features={t.features.list} 
        title={t.features.title}
      />
      
      {/* Секция преимуществ с D3 графиками */}
      <BenefitsSection benefits={t.benefits} />
      
      <CtaSection
        ctaSection={t.ctaSection} 
        onCtaClick={handleCtaClick}
      />

      <ProcessDemoSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <FaqSection/>
    </div>
  );
}