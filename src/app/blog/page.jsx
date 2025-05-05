'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTelegram } from '@/src/hooks/useTelegram';
import { useLanguageStore } from '@/src/store/language';
import { SocialLinks } from '@/src/components/shared/Home/SocialLinks';

// Локализация для блога
const blogLocalization = {
  ru: {
    hero: {
      title: 'Наш блог',
      subtitle: 'Актуальные статьи, новости и экспертные мнения в сфере автобизнеса',
      search: 'Поиск статей...',
      categories: 'Категории'
    },
    categories: [
      { id: 'all', name: 'Все статьи' },
      { id: 'news', name: 'Новости', icon: '📰', color: '#7B2CBF' },
      { id: 'research', name: 'Исследования', icon: '📊', color: '#0891B2' },
      { id: 'tips', name: 'Советы', icon: '💡', color: '#F59E0B' },
      { id: 'cases', name: 'Кейсы', icon: '📋', color: '#059669' },
      { id: 'tech', name: 'Технологии', icon: '🚗', color: '#DC2626' }
    ],
    featured: {
      title: 'Популярные статьи',
      viewAll: 'Все статьи'
    },
    latest: {
      title: 'Последние публикации',
      viewAll: 'Показать больше',
      readMore: 'Читать полностью'
    },
    newsletter: {
      title: 'Подпишитесь на нашу рассылку',
      subtitle: 'Получайте самые свежие новости и аналитику прямо на почту',
      placeholder: 'Ваш email',
      button: 'Подписаться',
      privacy: 'Мы уважаем вашу приватность и не рассылаем спам'
    },
    popular: {
      title: 'Популярные темы',
      viewAll: 'Все темы'
    }
  },
  en: {
    // English localization (аналогично русской версии)
  },
  uz: {
    // Uzbek localization (аналогично русской версии)
  }
};

// Имитация данных для блога
const dummyBlogData = {
  featuredPosts: [
    {
      id: 1,
      title: 'Тренды автомобильного рынка 2025: что ждет дилеров?',
      excerpt: 'Анализ ключевых тенденций автомобильного рынка и прогнозы для дилерских центров на предстоящий год.',
      category: 'research',
      date: '28 апр 2025',
      readTime: '8 мин',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&h=900&auto=format&fit=crop',
      author: {
        name: 'Алексей Петров',
        position: 'Аналитик рынка',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop'
      }
    },
    {
      id: 2,
      title: 'Как автоматизация помогает увеличить продажи автомобилей на 35%',
      excerpt: 'Результаты исследования показывают, что дилерские центры с полной автоматизацией процессов продаж демонстрируют значительный рост конверсии и выручки.',
      category: 'cases',
      date: '23 апр 2025',
      readTime: '6 мин',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1600&h=900&auto=format&fit=crop',
      author: {
        name: 'Елена Смирнова',
        position: 'Директор по маркетингу',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop'
      }
    }
  ],
  latestPosts: [
    {
      id: 3,
      title: 'Цифровизация контрактов: юридические аспекты и преимущества',
      excerpt: 'Как электронный документооборот упрощает процесс продажи автомобилей и какие юридические нюансы нужно учитывать.',
      category: 'tech',
      date: '20 апр 2025',
      readTime: '5 мин',
      image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?q=80&w=800&h=500&auto=format&fit=crop',
      author: {
        name: 'Мария Иванова',
        position: 'Юрист',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop'
      }
    },
    {
      id: 4,
      title: '10 способов улучшить клиентский опыт в автосалоне',
      excerpt: 'Практические советы для создания комфортной атмосферы и увеличения лояльности клиентов.',
      category: 'tips',
      date: '15 апр 2025',
      readTime: '7 мин',
      image: 'https://images.unsplash.com/photo-1560457079-9a6532ccb118?q=80&w=800&h=500&auto=format&fit=crop',
      author: {
        name: 'Дмитрий Соколов',
        position: 'Консультант',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100&h=100&auto=format&fit=crop'
      }
    },
    {
      id: 5,
      title: 'Новые экологические стандарты в автомобильной индустрии',
      excerpt: 'Как изменения в законодательстве повлияют на автомобильный рынок и что нужно знать дилерам.',
      category: 'news',
      date: '10 апр 2025',
      readTime: '4 мин',
      image: 'https://images.unsplash.com/photo-1593941707882-a56bfa7a3dd8?q=80&w=800&h=500&auto=format&fit=crop',
      author: {
        name: 'Ирина Козлова',
        position: 'Журналист',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop'
      }
    },
    {
      id: 6,
      title: 'Искусственный интеллект в автомобильных продажах: будущее уже здесь',
      excerpt: 'Обзор инновационных решений на базе ИИ, которые трансформируют процесс продажи автомобилей.',
      category: 'tech',
      date: '5 апр 2025',
      readTime: '9 мин',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&h=500&auto=format&fit=crop',
      author: {
        name: 'Андрей Васильев',
        position: 'IT-эксперт',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&h=100&auto=format&fit=crop'
      }
    }
  ],
  trendingTopics: [
    { name: 'Электромобили', count: 24, slug: 'electric-cars' },
    { name: 'Цифровизация', count: 18, slug: 'digitalization' },
    { name: 'Лизинг', count: 15, slug: 'leasing' },
    { name: 'Маркетинг', count: 12, slug: 'marketing' },
    { name: 'Автострахование', count: 10, slug: 'car-insurance' },
    { name: 'Автокредиты', count: 9, slug: 'car-loans' }
  ]
};

export default function BlogPage() {
  const { hapticFeedback } = useTelegram();
  const { currentLocale } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPost, setHoveredPost] = useState(null);
  
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, threshold: 0.2 });
  
  const t = blogLocalization[currentLocale || 'ru'] || blogLocalization.ru;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Находим категорию по id
  const getCategoryById = (id) => {
    return t.categories.find(cat => cat.id === id) || t.categories[0];
  };

  // Фильтрация статей по категории
  const getFilteredPosts = (posts) => {
    if (activeCategory === 'all') return posts;
    return posts.filter(post => post.category === activeCategory);
  };

  // Фильтрация статей по поисковому запросу
  const getSearchFilteredPosts = (posts) => {
    if (!searchQuery.trim()) return posts;
    const query = searchQuery.trim().toLowerCase();
    return posts.filter(
      post => post.title.toLowerCase().includes(query) || 
              post.excerpt.toLowerCase().includes(query) ||
              getCategoryById(post.category).name.toLowerCase().includes(query)
    );
  };

  // Получаем отфильтрованные статьи
  const filteredFeaturedPosts = getSearchFilteredPosts(getFilteredPosts(dummyBlogData.featuredPosts));
  const filteredLatestPosts = getSearchFilteredPosts(getFilteredPosts(dummyBlogData.latestPosts));

  // Обработчик клика по категории
  const handleCategoryClick = (categoryId) => {
    if (hapticFeedback) hapticFeedback('selection');
    setActiveCategory(categoryId);
  };

  // Обработчик подписки на рассылку
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (hapticFeedback) hapticFeedback('impact');
    // Здесь будет логика подписки на рассылку
    alert('Спасибо за подписку!');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative overflow-hidden page-scrollable">
      {/* Фоновые градиенты */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-white to-accent/10 dark:from-primary-dark/20 dark:via-black dark:to-primary-dark/5"></div>
      
      {/* Герой-секция */}
<section className="pt-20 pb-16 bg-gradient-to-b from-purple-50 via-white to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 relative">
  {/* Декоративные элементы */}
  <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/10 to-transparent dark:from-primary/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-accent/10 to-transparent dark:from-primary-dark/20 rounded-full blur-3xl"></div>
  
  <div className="container mx-auto px-4 relative">
    <div className="max-w-4xl mx-auto text-center">
      {/* Верхняя часть с заголовком */}
      <div className="mb-10">
        <span className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold mb-4">
          БЛОГ ОБ АВТОБИЗНЕСЕ
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary mb-6">
          Наш блог
        </h1>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Актуальные статьи, новости и экспертные мнения в сфере автобизнеса
        </p>
      </div>
      
      {/* Поле поиска */}
      <div className="relative mb-12 max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="Поиск статей..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-12 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {searchQuery && (
          <button 
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => setSearchQuery('')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Категории */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-5">
          Выберите категорию
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {/* Кнопка категории "Все статьи" */}
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeCategory === 'all' 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
            }`}
          >
            Все статьи
          </button>
          
          {/* Кнопка категории "Новости" */}
          <button
            onClick={() => handleCategoryClick('news')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
              activeCategory === 'news' 
                ? 'bg-[#7B2CBF] text-white shadow-md shadow-[#7B2CBF]/20' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <span className="mr-1.5">📰</span> Новости
          </button>
          
          {/* Кнопка категории "Исследования" */}
          <button
            onClick={() => handleCategoryClick('research')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
              activeCategory === 'research' 
                ? 'bg-[#0891B2] text-white shadow-md shadow-[#0891B2]/20' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <span className="mr-1.5">📊</span> Исследования
          </button>
          
          {/* Кнопка категории "Советы" */}
          <button
            onClick={() => handleCategoryClick('tips')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
              activeCategory === 'tips' 
                ? 'bg-[#F59E0B] text-white shadow-md shadow-[#F59E0B]/20' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <span className="mr-1.5">💡</span> Советы
          </button>
          
          {/* Кнопка категории "Кейсы" */}
          <button
            onClick={() => handleCategoryClick('cases')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
              activeCategory === 'cases' 
                ? 'bg-[#059669] text-white shadow-md shadow-[#059669]/20' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <span className="mr-1.5">📋</span> Кейсы
          </button>
          
          {/* Кнопка категории "Технологии" */}
          <button
            onClick={() => handleCategoryClick('tech')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
              activeCategory === 'tech' 
                ? 'bg-[#DC2626] text-white shadow-md shadow-[#DC2626]/20' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <span className="mr-1.5">🚗</span> Технологии
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
      
      {/* Избранные статьи - с горизонтальной прокруткой для мобильных устройств */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t.featured.title}
            </h2>
            <Link 
              href="/blog/all"
              className="text-primary dark:text-primary-light font-medium flex items-center hover:underline"
            >
              {t.featured.viewAll}
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {filteredFeaturedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredFeaturedPosts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 group hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <motion.img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      animate={{ scale: hoveredPost === post.id ? 1.05 : 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center mb-3">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: getCategoryById(post.category).color }}
                        >
                          {getCategoryById(post.category).name}
                        </span>
                        <span className="text-white/80 text-xs ml-3">{post.date}</span>
                        <span className="text-white/80 text-xs ml-3">{post.readTime}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <span className="block text-sm font-medium text-gray-900 dark:text-white">
                            {post.author.name}
                          </span>
                          <span className="block text-xs text-gray-500 dark:text-gray-400">
                            {post.author.position}
                          </span>
                        </div>
                      </div>
                      <Link 
                        href={`/blog/${post.id}`}
                        className="text-primary dark:text-primary-light font-medium group-hover:underline"
                      >
                        {t.latest.readMore}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                Нет статей по выбранным критериям
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Попробуйте изменить категорию или поисковый запрос
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-full inline-flex items-center"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Последние публикации - карточки с анимацией */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t.latest.title}
            </h2>
            {filteredLatestPosts.length > 0 && (
              <button 
                className="text-primary dark:text-primary-light font-medium flex items-center hover:underline"
              >
                {t.latest.viewAll}
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
          
          {filteredLatestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLatestPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span 
                        className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium"
                        style={{ color: getCategoryById(post.category).color }}
                      >
                        {getCategoryById(post.category).name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      <Link href={`/blog/${post.id}`} className="hover:text-primary dark:hover:text-primary-light transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full object-cover mr-2"
                        />
                        <div>
                          <span className="block text-sm font-medium text-gray-900 dark:text-white leading-tight">
                            {post.author.name}
                          </span>
                          <span className="block text-xs text-gray-500 dark:text-gray-400">
                            {post.author.position}
                          </span>
                        </div>
                      </div>
                      
                      <Link href={`/blog/${post.id}`}>
                        <motion.div
                          whileHover={{ x: 3 }}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                        >
                          <svg className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                Нет статей по выбранным критериям
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Попробуйте изменить категорию или поисковый запрос
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-full inline-flex items-center"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Секция с двумя колонками: популярные темы + подписка на рассылку */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Колонка 1: Популярные темы */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t.popular.title}
                  </h3>
                  <Link 
                    href="/blog/topics"
                    className="text-primary dark:text-primary-light text-sm font-medium hover:underline"
                  >
                    {t.popular.viewAll}
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {dummyBlogData.trendingTopics.map((topic, index) => (
                    <motion.div
                      key={index}
                      className="group"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/blog/topic/${topic.slug}`}
                        className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                          {topic.name}
                        </span>
                        <div className="flex items-center">
                          <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xs font-medium px-2 py-1 rounded-full">
                            {topic.count}
                          </span>
                          <svg className="w-4 h-4 ml-2 text-gray-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Колонка 2: Подписка на рассылку */}
            <div className="lg:col-span-2">
              <motion.div 
                className="bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-xl p-8 text-white overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Декоративные элементы */}
                <div className="absolute top-0 right-0 opacity-10">
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="100" fill="white" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
                
                <div className="relative">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    {t.newsletter.title}
                  </h3>
                  <p className="text-white/80 mb-6 max-w-lg">
                    {t.newsletter.subtitle}
                  </p>
                  
                  <form onSubmit={handleSubscribe}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        placeholder={t.newsletter.placeholder}
                        className="flex-grow px-5 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                        required
                      />
                      <motion.button
                        type="submit"
                        className="px-6 py-3 bg-white text-primary font-medium rounded-lg shadow-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t.newsletter.button}
                      </motion.button>
                    </div>
                    <p className="text-white/60 text-sm mt-3">
                      {t.newsletter.privacy}
                    </p>
                  </form>
                </div>
              </motion.div>
              
              {/* Дополнительный блок с подсказками о блоге */}
              <motion.div
                className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Как использовать наш блог эффективно
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Ищите по ключевым словам</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Используйте поиск для нахождения конкретной информации</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Фильтруйте по категориям</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Выбирайте интересующие вас темы для быстрого доступа</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Подпишитесь на обновления</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Получайте уведомления о новых статьях по интересным темам</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Делитесь контентом</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Делитесь полезными статьями с коллегами в социальных сетях</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Блок "Присоединяйтесь к обсуждению" */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto">
          <motion.div 
            className="bg-gradient-to-bl from-accent/30 to-primary/30 dark:from-primary/20 dark:to-primary-dark/30 rounded-2xl shadow-xl p-8 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Декоративные элементы */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 dark:bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 dark:bg-primary-dark/10 rounded-full blur-2xl"></div>
            
            <div className="relative max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Присоединяйтесь к обсуждению
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Задавайте вопросы, делитесь опытом и участвуйте в дискуссиях с экспертами и коллегами из автомобильной индустрии
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/blog/comments"
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Комментарии
                </motion.a>
                
                <motion.a
                  href="/blog/forum"
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium rounded-full inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  Форум экспертов
                </motion.a>
              </div>
              
              {/* Социальные сети */}
              <div className="mt-8">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Присоединяйтесь к нам в социальных сетях
                </p>
                <div className="flex justify-center">
                  <SocialLinks />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Секция "Станьте автором" */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Левая колонка - изображение */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1600&h=1200&auto=format&fit=crop" 
                  alt="Автор пишет статью"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Декоративные элементы */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-xl bg-white dark:bg-gray-800 shadow-lg p-6 z-10">
                <div className="flex flex-col h-full justify-center">
                  <p className="text-primary dark:text-primary-light font-bold text-4xl mb-1">150+</p>
                  <p className="text-gray-700 dark:text-gray-300">авторов уже с нами</p>
                </div>
              </div>
              
              <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg p-3">
                <svg className="w-8 h-8 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </motion.div>
            
            {/* Правая колонка - текст */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold mb-3">
                ДЕЛИТЕСЬ ЗНАНИЯМИ
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Станьте автором нашего блога
              </h2>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Если у вас есть экспертиза в автомобильной индустрии, поделитесь своими знаниями с тысячами профессионалов. Мы предлагаем платформу для публикации статей, кейсов и аналитических материалов.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary dark:text-primary-light mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Доступ к аудитории профессионалов автобизнеса</p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary dark:text-primary-light mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Профессиональное редактирование и оформление статей</p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary dark:text-primary-light mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Рост вашего персонального бренда и экспертности</p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary dark:text-primary-light mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Вознаграждение за качественные материалы</p>
                </div>
              </div>
              
              <motion.a
                href="/blog/become-author"
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Подать заявку
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}