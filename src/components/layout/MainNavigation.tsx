// src/components/layout/MainNavigation.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeStore } from '../../store/theme';
import { useLanguageStore } from '../../store/language';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

type Route = {
  name: string;
  path: string;
  subRoutes?: Route[];
};

const routes: Route[] = [
  { name: 'Главная', path: '/' },
  { name: 'О компании', path: '/about' },
  { 
    name: 'Продукты', 
    path: '/products',
    subRoutes: [
      { name: 'Решение 1', path: '/products/solution-1' },
      { name: 'Решение 2', path: '/products/solution-2' },
      { name: 'Решение 3', path: '/products/solution-3' },
    ]
  },
  { name: 'Для кого', path: '/for-whom' },
  { name: 'Кейсы', path: '/cases' },
  { name: 'Интеграции', path: '/integrations' },
  { name: 'Демо', path: '/demo' },
  { name: 'Тарифы', path: '/pricing' },
  { name: 'Блог', path: '/blog' },
  { name: 'Контакты', path: '/contacts' },
  { name: 'Юр. информация', path: '/legal' },
];

// Группирование маршрутов для мобильной навигации
const mobileNavGroups = [
  { name: 'Главная', path: '/', icon: 'home' },
  { name: 'Продукты', path: '/products', icon: 'cube' },
  { name: 'Кейсы', path: '/cases', icon: 'briefcase' },
  { name: 'Блог', path: '/blog', icon: 'newspaper' },
  { name: 'Ещё', path: '#more', icon: 'dots-horizontal' },
];

export default function MainNavigation() {
  const pathname = usePathname();
  const { isDark, setMode } = useThemeStore();
  const { currentLocale, availableLocales, setLocale } = useLanguageStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  const handleLanguageChange = (locale: 'ru' | 'en' | 'uz') => {
    setLocale(locale);
    setShowLanguageSelector(false);
  };

  // Закрываем меню при переходе на мобильных устройствах
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Предотвращаем скролл когда меню открыто
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Десктопная навигация */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Логотип */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">Λ</span>
              </div>
              <span className="font-bold text-xl text-primary dark:text-primary-light">
                Лого
              </span>
            </Link>

            {/* Навигационные ссылки - видны только на десктопе */}
            <nav className="hidden md:flex space-x-6">
              {routes.slice(0, 6).map((route) => (
                <Link 
                  key={route.path}
                  href={route.path}
                  className={`text-sm font-medium hover:text-primary dark:hover:text-primary-light transition-colors ${
                    pathname === route.path 
                      ? 'text-primary dark:text-primary-light' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {route.name}
                </Link>
              ))}
              <div className="relative group">
                <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">
                  Еще
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform origin-top-right">
                  {routes.slice(6).map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      className={`block px-4 py-2 text-sm ${
                        pathname === route.path 
                          ? 'text-primary dark:text-primary-light bg-gray-100 dark:bg-gray-700' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {route.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Правая часть: переключатели языка и темы */}
            <div className="flex items-center space-x-4">
              {/* Переключатель языка */}
              <div className="relative">
                <button 
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Изменить язык"
                >
                  <div className="flex items-center">
                    <LanguageIcon className="h-5 w-5 mr-1" />
                    <span className="text-xs uppercase">{currentLocale}</span>
                  </div>
                </button>
                
                {/* Выпадающее меню языков */}
                {showLanguageSelector && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 overflow-hidden">
                    {Object.entries(availableLocales).map(([locale, label]) => (
                      <button
                        key={locale}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          currentLocale === locale 
                            ? 'bg-primary-light/20 text-primary dark:text-primary-light' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleLanguageChange(locale as 'ru' | 'en' | 'uz')}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Переключатель темы */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
              >
                {isDark ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>

              {/* Бургер-меню на мобильных */}
              <button 
                className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-black pt-16 md:hidden">
          <div className="container mx-auto px-4 py-4 h-full overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              {routes.map((route) => (
                <div key={route.path}>
                  <Link 
                    href={route.path}
                    className={`block py-3 px-4 text-lg font-medium rounded-lg ${
                      pathname === route.path 
                        ? 'bg-primary-light/10 text-primary dark:text-primary-light' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {route.name}
                  </Link>
                  
                  {route.subRoutes && (
                    <div className="pl-6 mt-2 space-y-2">
                      {route.subRoutes.map((subRoute) => (
                        <Link
                          key={subRoute.path}
                          href={subRoute.path}
                          className={`block py-2 px-4 text-base rounded-lg ${
                            pathname === subRoute.path 
                              ? 'bg-primary-light/10 text-primary dark:text-primary-light' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {subRoute.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Нижняя мобильная навигация */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 z-30">
        <div className="flex justify-between items-center px-4 py-2">
          {mobileNavGroups.map((item) => (
            <Link
              key={item.path}
              href={item.path === '#more' ? '#' : item.path}
              onClick={item.path === '#more' ? () => setIsMenuOpen(true) : undefined}
              className={`flex flex-col items-center py-2 px-3 ${
                pathname === item.path && item.path !== '#more'
                  ? 'text-primary dark:text-primary-light'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="text-xl">
                {item.icon === 'home' && <i className="fas fa-home"></i>}
                {item.icon === 'cube' && <i className="fas fa-cube"></i>}
                {item.icon === 'briefcase' && <i className="fas fa-briefcase"></i>}
                {item.icon === 'newspaper' && <i className="fas fa-newspaper"></i>}
                {item.icon === 'dots-horizontal' && <i className="fas fa-ellipsis-h"></i>}
              </span>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Отступ для основного контента, чтобы он не скрывался под фиксированной шапкой */}
      <div className="pt-16 pb-16 md:pb-0"></div>
    </>
  );
}