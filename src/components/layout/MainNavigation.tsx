'use client';

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useThemeStore} from '../../store/theme';
import {useLanguageStore} from '../../store/language';
import {motion} from 'framer-motion';
import {LanguageIcon} from '@heroicons/react/24/outline';
import {
	SunIcon,
	MoonIcon,
	Bars3Icon,
	XMarkIcon,
	HomeIcon,
	CubeIcon,
	BriefcaseIcon,
	NewspaperIcon,
	EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

// Компонент для индикатора прогресса скролла
const ScrollProgress = () => {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const currentScroll = window.scrollY;
			if (totalScroll) {
				setScrollProgress((currentScroll / totalScroll) * 100);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-200 dark:bg-gray-700">
			<div
				className="h-full bg-primary dark:bg-primary-light transition-all duration-150 ease-out"
				style={{width: `${scrollProgress}%`}}
			/>
		</div>
	);
};

type Route = {
	name: string;
	path: string;
	icon?: React.ReactNode;
	subRoutes?: Route[];
};

// Более богатая структура маршрутов с иконками
const routes: Route[] = [
	{name: 'Главная', path: '/', icon: <HomeIcon className="w-5 h-5"/>},
	{
		name: 'О компании',
		path: '/about',
		icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
		           xmlns="http://www.w3.org/2000/svg">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
		</svg>
	},
	{
		name: 'Продукты',
		path: '/products',
		icon: <CubeIcon className="w-5 h-5"/>,
		subRoutes: [
			{
				name: 'Решение 1',
				path: '/products/solution-1',
				icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				           xmlns="http://www.w3.org/2000/svg">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
					      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
			},
			{
				name: 'Решение 2',
				path: '/products/solution-2',
				icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				           xmlns="http://www.w3.org/2000/svg">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
					      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
				</svg>
			},
			{
				name: 'Решение 3',
				path: '/products/solution-3',
				icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				           xmlns="http://www.w3.org/2000/svg">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
				</svg>
			},
		]
	},
	{
		name: 'Для кого',
		path: '/for-whom',
		icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
		           xmlns="http://www.w3.org/2000/svg">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
		</svg>
	},
	{name: 'Кейсы', path: '/cases', icon: <BriefcaseIcon className="w-5 h-5"/>},
	{
		name: 'Интеграции',
		path: '/integrations',
		icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
		           xmlns="http://www.w3.org/2000/svg">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
		</svg>
	},
	{
		name: 'Демо',
		path: '/demo',
		icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
		           xmlns="http://www.w3.org/2000/svg">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
		</svg>
	},
	{
		name: 'Тарифы',
		path: '/pricing',
		icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
		           xmlns="http://www.w3.org/2000/svg">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
		</svg>
	},
	{name: 'Блог', path: '/blog', icon: <NewspaperIcon className="w-5 h-5"/>},
	{
		name: 'Контакты',
		path: '/contacts',
		icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
		           xmlns="http://www.w3.org/2000/svg">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
		</svg>
	},
	{
		name: 'Юр. информация',
		path: '/legal',
		icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
		           xmlns="http://www.w3.org/2000/svg">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
			      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
		</svg>
	},
];

// Группирование маршрутов для мобильной навигации
const mobileNavGroups = [
	{name: 'Главная', path: '/', icon: <HomeIcon className="h-6 w-6"/>},
	{name: 'Продукты', path: '/products', icon: <CubeIcon className="h-6 w-6"/>},
	{name: 'Кейсы', path: '/cases', icon: <BriefcaseIcon className="h-6 w-6"/>},
	{name: 'Блог', path: '/blog', icon: <NewspaperIcon className="h-6 w-6"/>},
	{name: 'Ещё', path: '#more', icon: <EllipsisHorizontalIcon className="h-6 w-6"/>},
];

export default function MainNavigation() {
	const pathname = usePathname();
	const {isDark, toggleTheme} = useThemeStore();
	const {currentLocale, availableLocales, setLocale} = useLanguageStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// Исправлено: Типизируем activeSubmenu так, чтобы он мог быть строкой или null
	const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
	const [isHeaderVisible, setIsHeaderVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const headerRef = useRef<HTMLElement | null>(null);

	// Обработчик изменения языка - добавлена типизация
	const handleLanguageChange = (locale: any) => {
		setLocale(locale);
		setActiveSubmenu(null);
	};

	// Отслеживаем скролл для скрытия/показа навигации
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY <= 0) {
				setIsHeaderVisible(true);
				if (headerRef.current) {
					headerRef.current.style.boxShadow = "none";
				}
			} else if (currentScrollY < lastScrollY) {
				setIsHeaderVisible(true);
				if (headerRef.current) {
					headerRef.current.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
				}
			} else if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setIsHeaderVisible(false);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll, {passive: true});

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [lastScrollY]);

	// Закрываем меню при переходе на мобильных устройствах
	useEffect(() => {
		setIsMenuOpen(false);
		setActiveSubmenu(null);
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

	// Обработчик клика вне меню для его закрытия
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (activeSubmenu && !(e.target as Element).closest('.menu-dropdown')) {
				setActiveSubmenu(null);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [activeSubmenu]);

	// Находим активный раздел для подсветки в меню
	const getActiveSection = () => {
		// Проверяем наличие активного подраздела
		for (const route of routes) {
			if (route.subRoutes) {
				for (const subRoute of route.subRoutes) {
					if (pathname === subRoute.path) {
						return route.path;
					}
				}
			}
		}

		// Проверяем частичное совпадение пути для разделов блога и т.д.
		for (const route of routes) {
			// Пропускаем главную страницу при проверке частичного совпадения
			if (route.path !== '/' && pathname.startsWith(route.path)) {
				return route.path;
			}
		}

		// Возвращаем точное совпадение или null
		return pathname;
	};

	const activeSection = getActiveSection();

	// Анимационные варианты для компонентов
	const navbarVariants = {
		hidden: {y: -20, opacity: 0},
		visible: {y: 0, opacity: 1, transition: {duration: 0.3}}
	};

	return (
		<div className="navigation-wrapper">
			<ScrollProgress/>
			<motion.header
				ref={headerRef}
				className={`fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 transition-transform duration-300 ${
					isHeaderVisible ? 'transform-none' : '-translate-y-full'
				}`}
				initial="hidden"
				animate="visible"
				variants={navbarVariants}
			>
				<div className="container mx-auto px-4 sm:px-6">
					<div className="flex justify-between items-center h-16 sm:h-20">
						{/* Логотип с анимацией */}
						<Link href="/" className="flex items-center space-x-3 group relative">
							<div
								className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center relative overflow-hidden">
								<span className="text-white font-bold text-xl relative z-10">Λ</span>
								<div className="absolute inset-0 bg-black/10 opacity-20"></div>
								<div
									className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 opacity-50"></div>
							</div>
							<div className="flex flex-col">
								<span
									className="font-bold text-xl text-primary dark:text-primary-light tracking-tight">Лого</span>
								<span className="text-xs text-gray-500 dark:text-gray-400"></span>
							</div>
						</Link>

						{/* Навигационные ссылки - видны только на десктопе */}
						<nav className="hidden md:flex space-x-1 lg:space-x-2 items-center">
							{routes.slice(0, 7).map((route) => (
								<div key={route.path} className="relative group">
									<Link
										href={route.path}
										className={`text-sm lg:text-base font-medium hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-1.5 relative py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 ${
											activeSection === route.path
												? 'text-primary dark:text-primary-light bg-primary/5 dark:bg-primary/10'
												: 'text-gray-800 dark:text-gray-200'
										}`}
									>
										<div className="flex items-center">
											<span className="opacity-70 mr-1">{route.icon}</span>
											<span>{route.name}</span>
											{route.subRoutes && (
												<svg
													className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
													fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
													      d="M19 9l-7 7-7-7"/>
												</svg>
											)}
										</div>
									</Link>

									{/* Стильное выпадающее меню */}
									{route.subRoutes && (
										<div
											className="absolute left-0 mt-1 pt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50 menu-dropdown">
											<div
												className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
												<div
													className="bg-gradient-to-r from-primary/5 to-primary-light/5 dark:from-primary/10 dark:to-primary-light/10 px-4 py-2 border-b border-gray-100 dark:border-gray-700">
													<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{route.name}</h3>
												</div>
												<div className="p-2">
													{route.subRoutes.map((subRoute) => (
														<Link
															key={subRoute.path}
															href={subRoute.path}
															className={`flex items-center p-2 rounded-lg text-sm transition-colors ${
																pathname === subRoute.path
																	? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light'
																	: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
															}`}
														>
                            <span
	                            className="w-8 h-8 flex items-center justify-center rounded-lg mr-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light">
                              {subRoute.icon}
                            </span>
															<span>{subRoute.name}</span>
														</Link>
													))}
												</div>
											</div>
										</div>
									)}
								</div>
							))}

							<div className="relative menu-dropdown">
								<button
									className={`text-sm lg:text-base font-medium transition-colors flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 ${
										activeSubmenu === 'more'
											? 'text-primary dark:text-primary-light bg-primary/5 dark:bg-primary/10'
											: 'text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light'
									}`}
									onClick={(e) => {
										e.stopPropagation();
										setActiveSubmenu(activeSubmenu === 'more' ? null : 'more');
									}}
								>
                <span className="opacity-70 mr-1">
                  <EllipsisHorizontalIcon className="w-5 h-5"/>
                </span>
									<span>Ещё</span>
									<svg
										className={`w-4 h-4 ml-1 transition-transform duration-200 ${activeSubmenu === 'more' ? 'rotate-180' : ''}`}
										fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
										      d="M19 9l-7 7-7-7"/>
									</svg>
								</button>

								{/* Большое меню "Ещё" с колонками */}
								{activeSubmenu === 'more' && (
									<div
										className="absolute right-0 mt-1 w-[280px] sm:w-[520px] z-50"
										onClick={(e) => e.stopPropagation()}
									>
										<div
											className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
											<div
												className="bg-gradient-to-r from-primary/5 to-primary-light/5 dark:from-primary/10 dark:to-primary-light/10 px-6 py-3 border-b border-gray-100 dark:border-gray-700">
												<h3 className="text-base font-medium text-gray-800 dark:text-gray-200">Все
													разделы</h3>
											</div>
											<div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
												{routes.slice(7).map((route) => (
													<Link
														key={route.path}
														href={route.path}
														className={`flex items-center p-3 rounded-xl transition-colors ${
															pathname === route.path
																? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light'
																: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
														}`}
														onClick={() => setActiveSubmenu(null)}
													>
                          <span
	                          className="w-10 h-10 flex items-center justify-center rounded-xl mr-3 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light">
                            {route.icon}
                          </span>
														<div className="flex flex-col">
															<span className="font-medium">{route.name}</span>
															<span className="text-xs text-gray-500 dark:text-gray-400">
                              {route.path === '/blog' && 'Статьи и руководства'}
																{route.path === '/contacts' && 'Свяжитесь с нами'}
																{route.path === '/legal' && 'Официальные документы'}
                            </span>
														</div>
													</Link>
												))}
											</div>
										</div>
									</div>
								)}
							</div>
						</nav>

						{/* Правая часть: переключатели языка и темы */}
						<div className="flex items-center space-x-2 sm:space-x-3">
							{/* Переключатель языка - кастомная реализация */}
							<div className="relative menu-dropdown">
								<button
									onClick={(e) => {
										e.stopPropagation();
										setActiveSubmenu(activeSubmenu === 'language' ? null : 'language');
									}}
									className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
									aria-label="Изменить язык"
								>
									<div className="flex items-center">
										<LanguageIcon className="h-5 w-5 mr-1"/>
										<span className="text-xs uppercase hidden sm:inline">{currentLocale}</span>
									</div>
								</button>

								{/* Выпадающее меню языков */}
								{activeSubmenu === 'language' && (
									<div
										className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 overflow-hidden border border-gray-100 dark:border-gray-700"
										onClick={(e) => e.stopPropagation()}
									>
										<div className="p-2">
											{Object.entries(availableLocales).map(([locale, label]) => (
												<button
													key={locale}
													className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
														currentLocale === locale
															? 'bg-primary-light/20 text-primary dark:text-primary-light'
															: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
													}`}
													onClick={() => {
														handleLanguageChange(locale);
														setActiveSubmenu(null);
													}}
												>
													<div className="flex items-center">
														<div
															className="w-6 h-6 flex items-center justify-center rounded-full mr-2 bg-gray-100 dark:bg-gray-700">
															<span className="text-xs uppercase">{locale}</span>
														</div>
														<span>{label}</span>
													</div>
												</button>
											))}
										</div>
									</div>
								)}
							</div>

							{/* Переключатель темы - простая реализация */}
							<button
								onClick={toggleTheme}
								className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
								aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
							>
								{isDark ? (
									<SunIcon className="h-5 w-5"/>
								) : (
									<MoonIcon className="h-5 w-5"/>
								)}
							</button>

							{/* Кнопка демо */}
							<Link href="/demo" className="hidden md:block">
								<button
									className="ml-1 px-5 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow transition-all"
								>
									Демо
								</button>
							</Link>

							{/* Бургер-меню на мобильных */}
							<button
								className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
								onClick={(e) => {
									e.stopPropagation();
									setIsMenuOpen(!isMenuOpen);
								}}
								aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
							>
								{isMenuOpen ? (
									<XMarkIcon className="h-5 w-5"/>
								) : (
									<Bars3Icon className="h-5 w-5"/>
								)}
							</button>
						</div>
					</div>
				</div>
			</motion.header>

			{/* Мобильное меню без использования Animation.Presence для предотвращения перерендера */}
			<div
				className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
					isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => setIsMenuOpen(false)}
			/>

			<div
				className={`fixed inset-y-0 right-0 z-50 w-[280px] bg-white dark:bg-gray-900 md:hidden overflow-hidden transition-transform duration-300 transform ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				{/* Шапка мобильного меню */}
				<div
					className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-primary/5 to-primary-light/5 dark:from-primary/10 dark:to-primary-light/10">
					<div className="flex items-center justify-between">
						<Link href="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
							<div
								className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
								<span className="text-white font-bold text-xl">Λ</span>
							</div>
							<span className="font-bold text-xl text-primary dark:text-primary-light">Лого</span>
						</Link>
						<button
							className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300"
							onClick={() => setIsMenuOpen(false)}
						>
							<XMarkIcon className="h-5 w-5"/>
						</button>
					</div>
				</div>

				{/* Контент мобильного меню с улучшенным скроллом */}
				<div className="h-[calc(100%-64px)] overflow-y-auto overscroll-contain mobile-menu-content">
					<nav className="flex flex-col p-4">
						{routes.map((route) => (
							<div key={route.path} className="mb-2">
								{!route.subRoutes ? (
									<Link
										href={route.path}
										className={`flex items-center p-3 rounded-xl text-base ${
											pathname === route.path || (route.path !== '/' && pathname.startsWith(route.path))
												? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light'
												: 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
										}`}
									>
                  <span
	                  className="w-8 h-8 flex items-center justify-center rounded-lg mr-3 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light">
                    {route.icon}
                  </span>
										<span className="font-medium">{route.name}</span>
									</Link>
								) : (
									<div>
										<button
											className={`flex items-center p-3 rounded-xl text-base w-full ${
												activeSubmenu === route.path || pathname === route.path || (route.path !== '/' && pathname.startsWith(route.path))
													? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light'
													: 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
											}`}
											onClick={() => setActiveSubmenu(activeSubmenu === route.path ? null : route.path)}
										>
                    <span
	                    className="w-8 h-8 flex items-center justify-center rounded-lg mr-3 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light">
                      {route.icon}
                    </span>
											<span className="font-medium">{route.name}</span>
											<svg
												className={`w-5 h-5 ml-auto transition-transform ${activeSubmenu === route.path ? 'rotate-180' : ''}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
												      d="M19 9l-7 7-7-7"/>
											</svg>
										</button>

										<div
											className={`ml-8 my-2 pl-2 border-l-2 border-gray-100 dark:border-gray-700 space-y-1 overflow-hidden transition-all duration-300 ${
												activeSubmenu === route.path ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
											}`}
										>
											{route.subRoutes.map((subRoute) => (
												<Link
													key={subRoute.path}
													href={subRoute.path}
													className={`flex items-center p-2 rounded-lg text-sm ${
														pathname === subRoute.path
															? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light'
															: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
													}`}
												>
													<span className="mr-2">{subRoute.icon}</span>
													<span>{subRoute.name}</span>
												</Link>
											))}
										</div>
									</div>
								)}
							</div>
						))}
					</nav>

					{/* Дополнительные действия в мобильном меню */}
					<div className="px-4 mt-4 mb-4">
						<div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
							<div className="flex items-center justify-between mb-4">
								<span className="text-sm text-gray-700 dark:text-gray-300">Тема интерфейса</span>
								<button
									onClick={toggleTheme}
									className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
								>
									{isDark ? <SunIcon className="h-5 w-5"/> : <MoonIcon className="h-5 w-5"/>}
								</button>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-700 dark:text-gray-300">Язык</span>
								<div className="flex space-x-1">
									{Object.entries(availableLocales).map(([locale]) => (
										<button
											key={locale}
											onClick={() => handleLanguageChange(locale)}
											className={`px-2 py-1 rounded text-xs font-medium ${
												currentLocale === locale
													? 'bg-primary text-white'
													: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
											}`}
										>
											{locale.toUpperCase()}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* CTA в мобильном меню */}
					<div className="p-4 mt-4">
						<Link href="/demo" className="block">
							<button
								className="w-full px-5 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow transition-all"
							>
								Запросить демо
							</button>
						</Link>
						<p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
							Узнайте, как наше решение может улучшить ваш бизнес
						</p>
					</div>
				</div>
			</div>

			{/* Улучшенная нижняя мобильная навигация с повышенным z-index */}
			<div
				className={`md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-60 transition-all duration-300 ${
					isMenuOpen ? 'opacity-0 translate-y-full' : 'opacity-100 translate-y-0'
				}`}
				style={{zIndex: 999}} // Используем inline style для z-index
			>
				<div className="grid grid-cols-5 h-16">
					{mobileNavGroups.map((item) => (
						<Link
							key={item.path}
							href={item.path === '#more' ? '#' : item.path}
							onClick={(e) => {
								if (item.path === '#more') {
									e.preventDefault();
									setIsMenuOpen(true);
								}
							}}
							className={`flex flex-col items-center justify-center relative ${
								(item.path !== '#more' && item.path !== '/' && pathname.startsWith(item.path)) || pathname === item.path
									? 'text-primary dark:text-primary-light'
									: 'text-gray-600 dark:text-gray-400'
							}`}
						>
							<div className={`flex items-center justify-center w-full h-full`}>
								<div className={`flex flex-col items-center justify-center ${
									(item.path !== '#more' && item.path !== '/' && pathname.startsWith(item.path)) || pathname === item.path
										? 'scale-110'
										: ''
								}`}>
									{/* Индикатор активного пункта */}
									{((item.path !== '#more' && item.path !== '/' && pathname.startsWith(item.path)) || pathname === item.path) && (
										<div
											className="absolute -top-1.5 rounded-full w-8 h-1 bg-primary dark:bg-primary-light"></div>
									)}

									<div className={`w-10 h-10 flex items-center justify-center rounded-xl ${
										(item.path !== '#more' && item.path !== '/' && pathname.startsWith(item.path)) || pathname === item.path
											? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light'
											: 'text-gray-500 dark:text-gray-400'
									}`}>
										{item.icon}
									</div>
									<span className="text-xs mt-0.5 font-medium">{item.name}</span>
								</div>
							</div>
						</Link>
					))}
				</div>
				<div className="h-[env(safe-area-inset-bottom)] bg-white dark:bg-gray-900"></div>
			</div>

			{/* Отступ для основного контента с учетом фиксированной шапки */}
			<div className="pt-16 md:pb-0"></div>

			{/* Специальные стили для навигации */}
			<style jsx global>{`
                /* Улучшенная производительность для анимаций */
                .mobile-menu-content {
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior: contain;
                    scroll-behavior: smooth;
                }

                /* Плавный скролл и стилизация скроллбара */
                .mobile-menu-content::-webkit-scrollbar {
                    width: 3px;
                }

                .mobile-menu-content::-webkit-scrollbar-track {
                    background: transparent;
                }

                .mobile-menu-content::-webkit-scrollbar-thumb {
                    background-color: rgba(123, 44, 191, 0.2);
                    border-radius: 10px;
                }

                /* Стилизация для уменьшения эффекта мелькания при открытии/закрытии */
                .navigation-wrapper {
                    position: relative;
                    z-index: 1;
                }

                /* Добавляем дополнительный класс для z-index, доступный глобально */
                .z-60 {
                    z-index: 60;
                }
			`}</style>
		</div>
	);
}