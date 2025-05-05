'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegram } from '@/src/hooks/useTelegram';
import { useLanguageStore } from '@/src/store/language';
import { SocialLinks } from '@/src/components/shared/Home/SocialLinks';

// Локализация для страницы контактов
const contactsLocalization = {
  ru: {
    hero: {
      title: 'Свяжитесь с нами',
      subtitle: 'Мы всегда рады общению с клиентами и партнерами'
    },
    contactInfo: {
      title: 'Наши контакты',
      address: 'ул. Автомобильная, 123, г. Москва, Россия, 123456',
      email: 'info@carsale.com',
      phone: '+7 (495) 123-45-67',
      schedule: {
        title: 'График работы:',
        weekdays: 'Понедельник - Пятница: 9:00 - 18:00',
        weekend: 'Суббота: 10:00 - 15:00',
        dayoff: 'Воскресенье: выходной'
      }
    },
    departments: {
      title: 'Наши отделы',
      list: [
        {
          name: 'Отдел продаж',
          phone: '+7 (495) 123-45-68',
          email: 'sales@carsale.com',
          icon: '🚗'
        },
        {
          name: 'Техническая поддержка',
          phone: '+7 (495) 123-45-69',
          email: 'support@carsale.com',
          icon: '🛠️'
        },
        {
          name: 'Бухгалтерия',
          phone: '+7 (495) 123-45-70',
          email: 'accounting@carsale.com',
          icon: '📊'
        },
        {
          name: 'Партнерская программа',
          phone: '+7 (495) 123-45-71',
          email: 'partners@carsale.com',
          icon: '🤝'
        }
      ]
    },
    form: {
      title: 'Отправить сообщение',
      name: 'Ваше имя',
      email: 'Email',
      subject: 'Тема сообщения',
      department: 'Выберите отдел',
      departments: [
        { value: 'sales', label: 'Отдел продаж' },
        { value: 'support', label: 'Техническая поддержка' },
        { value: 'accounting', label: 'Бухгалтерия' },
        { value: 'partners', label: 'Партнерская программа' },
        { value: 'other', label: 'Другое' }
      ],
      message: 'Сообщение',
      agreement: 'Я согласен с политикой конфиденциальности и даю согласие на обработку персональных данных',
      send: 'Отправить сообщение',
      successTitle: 'Сообщение отправлено!',
      successMessage: 'Спасибо за обращение! Мы свяжемся с вами в ближайшее время.',
      backToForm: 'Вернуться к форме'
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      items: [
        {
          question: 'Как быстро вы отвечаете на запросы?',
          answer: 'Мы стараемся отвечать на все запросы в течение 24 часов в рабочие дни. В выходные и праздничные дни время ответа может быть увеличено.'
        },
        {
          question: 'Можно ли заказать демонстрацию системы?',
          answer: 'Да, вы можете заказать демонстрацию, заполнив форму на странице "Демо" или связавшись с нашим отделом продаж по телефону или email.'
        },
        {
          question: 'Есть ли у вас техническая поддержка в выходные дни?',
          answer: 'Техническая поддержка в выходные дни работает в ограниченном режиме с 10:00 до 15:00 в субботу. В воскресенье техническая поддержка доступна только для критических запросов.'
        },
        {
          question: 'Как стать вашим партнером?',
          answer: 'Для получения информации о партнерской программе, пожалуйста, свяжитесь с нашим отделом по работе с партнерами по email partners@carsale.com или заполните форму на странице "Партнерская программа".'
        }
      ]
    },
    map: {
      title: 'Мы на карте',
      findUs: 'Как нас найти'
    },
    social: {
      title: 'Мы в социальных сетях',
      followUs: 'Подписывайтесь на нас, чтобы быть в курсе последних новостей и обновлений'
    }
  },
  en: {
    // English localization
  },
  uz: {
    // Uzbek localization
  }
};

export default function ContactsPage() {
  const { hapticFeedback } = useTelegram();
  const { currentLocale } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    department: '',
    message: '',
    agreement: false
  });
  const [errors, setErrors] = useState({});
  
  const mapRef = useRef(null);
  
  // Получаем локализацию
  const t = contactsLocalization[currentLocale || 'ru'] || contactsLocalization.ru;
  
  useEffect(() => {
    setMounted(true);
    
    // Имитация загрузки карты
    const loadMap = () => {
      if (mapRef.current) {
        // В реальном приложении здесь был бы код инициализации карты (Google Maps, Яндекс.Карты и т.д.)
        const mapContainer = mapRef.current;
        mapContainer.innerHTML = `
          <div class="bg-gray-200 dark:bg-gray-700 h-full w-full flex items-center justify-center">
            <div class="text-center">
              <div class="animate-ping inline-block w-3 h-3 bg-primary rounded-full mr-1"></div>
              <div class="animate-ping inline-block w-3 h-3 bg-primary rounded-full animation-delay-200 mr-1"></div>
              <div class="animate-ping inline-block w-3 h-3 bg-primary rounded-full animation-delay-500"></div>
              <p class="mt-4 text-gray-600 dark:text-gray-300">Загрузка карты...</p>
            </div>
          </div>
        `;
        
        // Имитация загрузки карты через 1.5 секунды
        setTimeout(() => {
          mapContainer.innerHTML = `
            <div class="relative h-full w-full bg-gray-100 dark:bg-gray-800">
              <img src="https://maps.googleapis.com/maps/api/staticmap?center=Moscow,Russia&zoom=15&size=600x400&key=YOUR_API_KEY" alt="Map" class="w-full h-full object-cover opacity-60 dark:opacity-30" />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div class="flex items-start">
                    <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">Car-Sale Headquarters</p>
                      <p class="text-xs text-gray-600 dark:text-gray-300">${t.contactInfo.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        }, 1500);
      }
    };
    
    loadMap();
  }, []);
  
  // Обработка изменений в форме
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Сбрасываем ошибку при изменении поля
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, введите ваш email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, введите корректный email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Пожалуйста, укажите тему сообщения';
    }
    
    if (!formData.department) {
      newErrors.department = 'Пожалуйста, выберите отдел';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Пожалуйста, введите сообщение';
    }
    
    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласие с политикой конфиденциальности';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Имитация отправки формы
      setTimeout(() => {
        setFormSubmitted(true);
        if (hapticFeedback) hapticFeedback('impact');
      }, 1000);
    } else {
      // Прокрутка к первой ошибке
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.getElementById(firstError);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      
      if (hapticFeedback) hapticFeedback('notification');
    }
  };
  
  // Сброс формы
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      department: '',
      message: '',
      agreement: false
    });
    setFormSubmitted(false);
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

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Заголовок */}
      <div className="relative bg-gradient-to-r from-primary/90 to-primary-dark dark:from-primary-dark/90 dark:to-primary-dark/70 text-white overflow-hidden">
        {/* Фоновый узор */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 py-20">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-center max-w-2xl mx-auto opacity-90"
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
            <path fill="currentColor" fillOpacity="1" d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Основное содержимое */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - информация о компании */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary to-primary-dark dark:from-primary dark:to-primary-dark p-6 text-white">
                <h2 className="text-xl font-bold">{t.contactInfo.title}</h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Адрес</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t.contactInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <a href={`mailto:${t.contactInfo.email}`} className="hover:text-primary dark:hover:text-primary-light">
                        {t.contactInfo.email}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Телефон</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <a href={`tel:${t.contactInfo.phone}`} className="hover:text-primary dark:hover:text-primary-light">
                        {t.contactInfo.phone}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{t.contactInfo.schedule.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t.contactInfo.schedule.weekdays}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t.contactInfo.schedule.weekend}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t.contactInfo.schedule.dayoff}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Карта */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 text-white">
                <h2 className="text-xl font-bold">{t.map.title}</h2>
              </div>
              
              <div className="h-[300px]" ref={mapRef}>
                {/* Карта будет загружена с помощью JavaScript */}
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">{t.map.findUs}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Мы находимся в центре города, в 5 минутах ходьбы от станции метро "Автомобильная". Вход со стороны главной улицы, 2 этаж бизнес-центра "Мотор".
                </p>
              </div>
            </motion.div>
            
            {/* Социальные сети */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                <h2 className="text-xl font-bold">{t.social.title}</h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t.social.followUs}</p>
                <div className="flex justify-center">
                  <SocialLinks />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Правая колонка - форма обратной связи и отделы */}
          <div className="lg:col-span-2">
            {/* Отделы */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
                <h2 className="text-xl font-bold">{t.departments.title}</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.departments.list.map((department, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
                      className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{department.icon}</span>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {department.name}
                        </h3>
                      </div>
                      <div className="space-y-2 ml-10">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-primary dark:text-primary-light mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${department.phone}`} className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light">
                            {department.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-primary dark:text-primary-light mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a href={`mailto:${department.email}`} className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light">
                            {department.email}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Форма обратной связи */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary to-primary-dark dark:from-primary dark:to-primary-dark p-6 text-white">
                <h2 className="text-xl font-bold">{t.form.title}</h2>
              </div>
              
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-12 text-center"
                    >
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {t.form.successTitle}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-8">
                        {t.form.successMessage}
                      </p>
                      <motion.button
                        onClick={resetForm}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow inline-flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t.form.backToForm}
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Имя */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t.form.name} <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.name 
                                ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/10' 
                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                            } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light`}
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                          )}
                        </div>
                        
                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t.form.email} <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.email 
                                ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/10' 
                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                            } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Тема */}
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t.form.subject} <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="subject" 
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.subject 
                                ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/10' 
                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                            } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light`}
                          />
                          {errors.subject && (
                            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                          )}
                        </div>
                        
                        {/* Отдел */}
                        <div>
                          <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t.form.department} <span className="text-red-500">*</span>
                          </label>
                          <select 
                            id="department" 
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.department 
                                ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/10' 
                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                            } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light`}
                          >
                            <option value="">Выберите отдел</option>
                            {t.form.departments.map((dept, index) => (
                              <option key={index} value={dept.value}>{dept.label}</option>
                            ))}
                          </select>
                          {errors.department && (
                            <p className="mt-1 text-sm text-red-500">{errors.department}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Сообщение */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t.form.message} <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                          id="message" 
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.message 
                              ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/10' 
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                          } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light`}
                        >
                        </textarea>
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                        )}
                      </div>
                      
                      {/* Согласие */}
                      <div>
                        <div className="flex items-start">
                          <input 
                            type="checkbox" 
                            id="agreement" 
                            name="agreement"
                            checked={formData.agreement}
                            onChange={handleInputChange}
                            className={`w-4 h-4 mt-1 rounded border ${
                              errors.agreement 
                                ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/10' 
                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                            } text-primary focus:ring-primary`}
                          />
                          <label htmlFor="agreement" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            {t.form.agreement}
                          </label>
                        </div>
                        {errors.agreement && (
                          <p className="mt-1 text-sm text-red-500">{errors.agreement}</p>
                        )}
                      </div>
                      
                      {/* Кнопка отправки */}
                      <div className="pt-4">
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center"
                        >
                          {t.form.send}
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* FAQ секция */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
                <h2 className="text-xl font-bold">{t.faq.title}</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {t.faq.items.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
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
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Призыв к действию внизу страницы */}
      <div className="bg-gray-50 dark:bg-gray-800/30 py-16 px-4 mt-16">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Нужна дополнительная информация?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Мы готовы ответить на любые ваши вопросы. Свяжитесь с нами удобным для вас способом или посетите нас лично.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Запросить демонстрацию
                </motion.a>
              </Link>
              <Link href="/partners">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium rounded-full inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  Стать партнером
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Стили для улучшения отображения */}
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
        
        /* Задержка для анимаций */
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}