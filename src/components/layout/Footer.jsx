// src/components/layout/Footer.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SocialLinks } from '@/src/components/shared/Home/SocialLinks';
import { useLanguageStore } from '@/src/store/language';

// Локализация для футера
const footerLocalization = {
  ru: {
    slogan: 'Автоматизируем продажи автомобилей — от склада до контракта',
    productsTitle: 'Продукты',
    productsItems: [
      { name: 'CRM для автодилеров', path: '/products/crm' },
      { name: 'Учет склада', path: '/products/inventory' },
      { name: 'Электронные контракты', path: '/products/contracts' },
      { name: 'Аналитика и отчеты', path: '/products/analytics' }
    ],
    companyTitle: 'Компания',
    companyItems: [
      { name: 'О нас', path: '/about' },
      { name: 'Блог', path: '/blog' },
      { name: 'Карьера', path: '/careers' },
      { name: 'Контакты', path: '/contact' }
    ],
    supportTitle: 'Поддержка',
    supportItems: [
      { name: 'Центр поддержки', path: '/support' },
      { name: 'Документация', path: '/docs' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Запросить демо', path: '/demo' }
    ],
    legal: [
      { name: 'Политика конфиденциальности', path: '/privacy' },
      { name: 'Условия использования', path: '/terms' },
      { name: 'Политика cookies', path: '/cookies' }
    ],
    copyright: '© 2025 Car-Sale. Все права защищены.'
  },
  en: {
    slogan: 'Automating car sales — from inventory to contract',
    productsTitle: 'Products',
    productsItems: [
      { name: 'CRM for Car Dealers', path: '/products/crm' },
      { name: 'Inventory Management', path: '/products/inventory' },
      { name: 'Electronic Contracts', path: '/products/contracts' },
      { name: 'Analytics & Reports', path: '/products/analytics' }
    ],
    companyTitle: 'Company',
    companyItems: [
      { name: 'About Us', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' }
    ],
    supportTitle: 'Support',
    supportItems: [
      { name: 'Support Center', path: '/support' },
      { name: 'Documentation', path: '/docs' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Request a Demo', path: '/demo' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Use', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' }
    ],
    copyright: '© 2025 Car-Sale. All rights reserved.'
  },
  uz: {
    slogan: 'Avtomobil savdosini avtomatlashtirish — ombordan shartnomaga',
    productsTitle: 'Mahsulotlar',
    productsItems: [
      { name: 'Avtomobil dilerlar uchun CRM', path: '/products/crm' },
      { name: 'Inventarni boshqarish', path: '/products/inventory' },
      { name: 'Elektron shartnomalar', path: '/products/contracts' },
      { name: 'Tahlil va hisobotlar', path: '/products/analytics' }
    ],
    companyTitle: 'Kompaniya',
    companyItems: [
      { name: 'Biz haqimizda', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Karyera', path: '/careers' },
      { name: 'Aloqa', path: '/contact' }
    ],
    supportTitle: 'Qo\'llab-quvvatlash',
    supportItems: [
      { name: 'Qo\'llab-quvvatlash markazi', path: '/support' },
      { name: 'Hujjatlar', path: '/docs' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Demo so\'rash', path: '/demo' }
    ],
    legal: [
      { name: 'Maxfiylik siyosati', path: '/privacy' },
      { name: 'Foydalanish shartlari', path: '/terms' },
      { name: 'Cookie siyosati', path: '/cookies' }
    ],
    copyright: '© 2025 Car-Sale. Barcha huquqlar himoyalangan.'
  }
};

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  // Напрямую используем хук языка вместо useTranslation
  const { currentLocale } = useLanguageStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  // Выбираем локализацию напрямую
  const t = footerLocalization[currentLocale] || footerLocalization.ru;

  return (
    <footer className="bg-white dark:bg-gray-900 pt-16 pb-8 px-4 relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-xl font-bold text-primary dark:text-primary-light">Car-Sale</h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t.slogan}
            </p>
            
            <SocialLinks />
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t.productsTitle}
            </h4>
            <ul className="space-y-2">
              {t.productsItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.path} 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t.companyTitle}
            </h4>
            <ul className="space-y-2">
              {t.companyItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.path} 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t.supportTitle}
            </h4>
            <ul className="space-y-2">
              {t.supportItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.path} 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            {t.copyright}
          </div>
          
          <div className="flex flex-wrap gap-4">
            {t.legal.map((item, index) => (
              <Link 
                key={index} 
                href={item.path} 
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Кнопка скролла наверх */}
        <motion.button
          className="fixed right-6 bottom-6 w-10 h-10 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}