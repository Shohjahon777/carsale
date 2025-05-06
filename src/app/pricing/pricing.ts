// src/localization/pricing.js
export const pricingLocalization = {
    ru: {
        hero: {
            title: 'Тарифы',
            description: 'Выберите тарифный план, который подходит именно для вашего бизнеса'
        },
        billing: {
            monthly: 'Ежемесячно',
            annual: 'Ежегодно',
            yearShort: 'год',
            monthShort: 'мес',
            switchToMonthly: 'Переключиться на ежемесячную оплату',
            switchToAnnual: 'Переключиться на ежегодную оплату'
        },
        card: {
            recommended: 'Рекомендуемый',
            included: 'Включено',
            notIncluded: 'Не включено'
        },
        plans: {
            start: {
                title: 'Старт',
                description: 'Идеально для небольших автосалонов и начала работы',
                price: 4900,
                button: 'Выбрать "Старт"',
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
            business: {
                title: 'Бизнес',
                description: 'Оптимальное решение для растущих компаний',
                price: 9900,
                button: 'Выбрать "Бизнес"',
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
            premium: {
                title: 'Премиум',
                description: 'Полный набор возможностей для крупных автодилеров',
                price: 19900,
                button: 'Выбрать "Премиум"',
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
        },
        services: {
            title: 'Дополнительные услуги',
            requestCustom: 'Запросить индивидуальное предложение',
            custom: {
                title: 'Индивидуальная настройка',
                description: 'Адаптация системы под специфические потребности вашего бизнеса',
                price: 'от 15 000 ₽'
            },
            integration: {
                title: 'Интеграция с внешними системами',
                description: 'Подключение к банкам, страховым компаниям, гос. сервисам',
                price: 'от 10 000 ₽'
            },
            training: {
                title: 'Обучение персонала',
                description: 'Комплексное обучение сотрудников работе с системой',
                price: 'от 8 000 ₽'
            },
            migration: {
                title: 'Миграция данных',
                description: 'Перенос существующих данных из других систем',
                price: 'от 12 000 ₽'
            }
        },
        comparison: {
            title: 'Сравнение тарифов',
            feature: 'Функциональность',
            prevPlan: 'Предыдущий тариф',
            nextPlan: 'Следующий тариф',
            unlimited: 'Не ограничено',
            categories: {
                basic: 'Базовые функции',
                crm: 'CRM и работа с клиентами',
                inventory: 'Управление складом',
                documents: 'Документооборот',
                finance: 'Финансы',
                analytics: 'Аналитика и отчетность'
            },
            features: {
                users: 'Количество пользователей',
                storage: 'Объем хранилища',
                cars: 'Количество автомобилей',
                support: 'Техническая поддержка',
                clients: 'База клиентов',
                sales: 'Воронка продаж',
                history: 'История взаимодействий',
                messenger: 'Интеграция с мессенджерами',
                email: 'Email-маркетинг',
                clientAnalytics: 'Аналитика по клиентам',
                carsManagement: 'Учет автомобилей',
                stockManagement: 'Управление запасами',
                marketplace: 'Выгрузка на маркетплейсы',
                stockAnalytics: 'Аналитика склада',
                autoOrder: 'Автоматический заказ',
                docGeneration: 'Генерация документов',
                docTemplates: 'Шаблоны документов',
                signature: 'Электронная подпись',
                docArchive: 'Архив документов',
                govServices: 'Интеграция с госсервисами',
                payments: 'Учет платежей',
                bankIntegration: 'Интеграция с банками',
                credit: 'Рассрочка и кредиты',
                onlinePayments: 'Онлайн-платежи',
                finReports: 'Финансовая отчетность',
                basicReports: 'Базовые отчеты',
                advancedAnalytics: 'Продвинутая аналитика',
                customDashboards: 'Настраиваемые дашборды',
                forecasting: 'Прогнозирование',
                dataExport: 'Экспорт данных'
            },
            values: {
                basic: 'Базовые',
                extended: 'Расширенные',
                full: 'Полный набор',
                emailOnly: 'По email',
                emailPhone: 'Email и телефон',
                priority: '24/7 приоритетная'
            }
        },
        faq: {
            title: 'Часто задаваемые вопросы',
            moreQuestions: 'Больше вопросов? Обратитесь в поддержку',
            changePlan: {
                question: 'Можно ли перейти на другой тариф в процессе использования?',
                answer: 'Да, вы можете изменить тарифный план в любое время. При переходе на более дорогой тариф вам будет начислена пропорциональная доплата за оставшийся период. При переходе на более дешевый тариф изменения вступят в силу со следующего платежного периода.'
            },
            trial: {
                question: 'Есть ли пробный период?',
                answer: 'Да, мы предоставляем 14-дневный бесплатный пробный период для всех тарифных планов. В течение этого времени вы можете протестировать все функции выбранного тарифа без каких-либо обязательств.'
            },
            payment: {
                question: 'Как происходит оплата?',
                answer: 'Оплата производится в начале каждого платежного периода (месяц или год в зависимости от выбранного варианта). Мы принимаем оплату банковскими картами, через электронные платежные системы и банковским переводом для юридических лиц.'
            },
            software: {
                question: 'Требуется ли установка дополнительного ПО?',
                answer: 'Нет, Car-Sale — это облачное SaaS-решение, которое работает в браузере. Вам не нужно устанавливать какое-либо дополнительное программное обеспечение. Система доступна на любом устройстве с подключением к интернету.'
            },
            integration: {
                question: 'Возможна ли интеграция с другими системами?',
                answer: 'Да, наша система поддерживает интеграцию с различными внешними сервисами, включая банки, страховые компании, государственные сервисы и маркетплейсы. Базовые интеграции включены в тарифы "Бизнес" и "Премиум", а для тарифа "Старт" они доступны как дополнительная услуга.'
            }
        },
        cta: {
            title: 'Готовы начать автоматизацию вашего бизнеса?',
            description: 'Выберите подходящий тариф и начните использовать Car-Sale уже сегодня',
            startTrial: 'Начать бесплатный период',
            contactSales: 'Связаться с отделом продаж'
        },
        nav: {
            back: 'Назад',
            plans: 'Тарифы',
            comparison: 'Сравнение',
            services: 'Доп. услуги',
            faq: 'Вопросы'
        },
        scrollToTop: 'Наверх'
    },
    en: {
        hero: {
            title: 'Pricing',
            description: 'Choose a pricing plan that fits your business needs'
        },
        billing: {
            monthly: 'Monthly',
            annual: 'Annually',
            yearShort: 'year',
            monthShort: 'mo',
            switchToMonthly: 'Switch to monthly billing',
            switchToAnnual: 'Switch to annual billing'
        },
        card: {
            recommended: 'Recommended',
            included: 'Included',
            notIncluded: 'Not included'
        },
        plans: {
            start: {
                title: 'Starter',
                description: 'Perfect for small dealerships and getting started',
                price: 4900,
                button: 'Select "Starter"',
                features: [
                    'Up to 2 users',
                    '50 cars in database',
                    'Basic CRM',
                    'Car inventory',
                    'Basic document templates',
                    'Email support'
                ],
                notIncluded: [
                    'Marketplace integration',
                    'Electronic signature',
                    'Bank integration',
                    'Advanced analytics',
                    'Mobile app'
                ]
            },
            business: {
                title: 'Business',
                description: 'Optimal solution for growing companies',
                price: 9900,
                button: 'Select "Business"',
                features: [
                    'Up to 5 users',
                    '500 cars in database',
                    'Full CRM with messenger integration',
                    'Car and inventory management',
                    'Extended document templates',
                    'Electronic signature',
                    'Marketplace integration',
                    'Bank integration',
                    'Installment and credit management',
                    'Email and phone support'
                ],
                notIncluded: [
                    'Customer analytics',
                    'Custom dashboards',
                    'Forecasting',
                    'Mobile app'
                ]
            },
            premium: {
                title: 'Premium',
                description: 'Full set of features for large car dealers',
                price: 19900,
                button: 'Select "Premium"',
                features: [
                    'Unlimited users',
                    'Unlimited cars',
                    'Full CRM with advanced analytics',
                    'Complete inventory management',
                    'Full set of document templates',
                    'Electronic signature',
                    'Integration with all marketplaces',
                    'Bank and payment system integration',
                    'Installment and credit management',
                    'Custom dashboards',
                    'Sales forecasting',
                    'Mobile app',
                    'Priority 24/7 support'
                ],
                notIncluded: []
            }
        },
        services: {
            title: 'Additional Services',
            requestCustom: 'Request custom offer',
            custom: {
                title: 'Custom configuration',
                description: 'Adapting the system to your specific business needs',
                price: 'from 15,000 ₽'
            },
            integration: {
                title: 'External systems integration',
                description: 'Connection to banks, insurance companies, government services',
                price: 'from 10,000 ₽'
            },
            training: {
                title: 'Staff training',
                description: 'Comprehensive training for your employees',
                price: 'from 8,000 ₽'
            },
            migration: {
                title: 'Data migration',
                description: 'Transfer of existing data from other systems',
                price: 'from 12,000 ₽'
            }
        },
        comparison: {
            title: 'Plan Comparison',
            feature: 'Feature',
            prevPlan: 'Previous plan',
            nextPlan: 'Next plan',
            unlimited: 'Unlimited',
            categories: {
                basic: 'Basic Features',
                crm: 'CRM & Customer Management',
                inventory: 'Inventory Management',
                documents: 'Document Management',
                finance: 'Finance',
                analytics: 'Analytics & Reporting'
            },
            features: {
                users: 'Number of users',
                storage: 'Storage capacity',
                cars: 'Number of cars',
                support: 'Technical support',
                clients: 'Customer database',
                sales: 'Sales funnel',
                history: 'Interaction history',
                messenger: 'Messenger integration',
                email: 'Email marketing',
                clientAnalytics: 'Customer analytics',
                carsManagement: 'Car inventory',
                stockManagement: 'Stock management',
                marketplace: 'Marketplace export',
                stockAnalytics: 'Inventory analytics',
                autoOrder: 'Automatic ordering',
                docGeneration: 'Document generation',
                docTemplates: 'Document templates',
                signature: 'Electronic signature',
                docArchive: 'Document archive',
                govServices: 'Government services integration',
                payments: 'Payment tracking',
                bankIntegration: 'Bank integration',
                credit: 'Installment and credit',
                onlinePayments: 'Online payments',
                finReports: 'Financial reporting',
                basicReports: 'Basic reports',
                advancedAnalytics: 'Advanced analytics',
                customDashboards: 'Custom dashboards',
                forecasting: 'Forecasting',
                dataExport: 'Data export'
            },
            values: {
                basic: 'Basic',
                extended: 'Extended',
                full: 'Full set',
                emailOnly: 'Email only',
                emailPhone: 'Email and phone',
                priority: '24/7 priority'
            }
        },
        faq: {
            title: 'Frequently Asked Questions',
            moreQuestions: 'More questions? Contact support',
            changePlan: {
                question: 'Can I change my plan during usage?',
                answer: 'Yes, you can change your pricing plan at any time. When upgrading to a more expensive plan, you will be charged a prorated amount for the remaining period. When downgrading to a cheaper plan, changes will take effect from the next billing period.'
            },
            trial: {
                question: 'Is there a trial period?',
                answer: 'Yes, we provide a 14-day free trial period for all pricing plans. During this time, you can test all the features of your chosen plan without any obligations.'
            },
            payment: {
                question: 'How does payment work?',
                answer: 'Payment is made at the beginning of each billing period (month or year depending on your chosen option). We accept payment by credit cards, through electronic payment systems, and by bank transfer for business entities.'
            },
            software: {
                question: 'Is additional software installation required?',
                answer: 'No, Car-Sale is a cloud-based SaaS solution that works in your browser. You don\'t need to install any additional software. The system is accessible on any device with internet connection.'
            },
            integration: {
                question: 'Is integration with other systems possible?',
                answer: 'Yes, our system supports integration with various external services, including banks, insurance companies, government services, and marketplaces. Basic integrations are included in the "Business" and "Premium" plans, and for the "Starter" plan they are available as an additional service.'
            }
        },
        cta: {
            title: 'Ready to start automating your business?',
            description: 'Choose a suitable plan and start using Car-Sale today',
            startTrial: 'Start free trial',
            contactSales: 'Contact sales team'
        },
        nav: {
            back: 'Back',
            plans: 'Plans',
            comparison: 'Comparison',
            services: 'Services',
            faq: 'FAQ'
        },
        scrollToTop: 'Back to top'
    },
    uz: {
        hero: {
            title: 'Tariflar',
            description: 'Aynan sizning biznesingiz uchun mos tarif rejasini tanlang'
        },
        billing: {
            monthly: 'Oylik',
            annual: 'Yillik',
            yearShort: 'yil',
            monthShort: 'oy',
            switchToMonthly: 'Oylik to\'lovga o\'tish',
            switchToAnnual: 'Yillik to\'lovga o\'tish'
        },
        card: {
            recommended: 'Tavsiya etilgan',
            included: 'Kiritilgan',
            notIncluded: 'Kiritilmagan'
        },
        plans: {
            start: {
                title: 'Boshlang\'ich',
                description: 'Kichik avtosalonlar va ish boshlash uchun ideal',
                price: 4900,
                button: '"Boshlang\'ich" tanlash',
                features: [
                    '2 tagacha foydalanuvchi',
                    '50 ta avtomobil bazada',
                    'Asosiy CRM',
                    'Avtomobil hisobi',
                    'Asosiy hujjat shablonlari',
                    'Email orqali yordam'
                ],
                notIncluded: [
                    'Marketpleys integratsiyasi',
                    'Elektron imzo',
                    'Bank integratsiyasi',
                    'Kengaytirilgan tahlil',
                    'Mobil ilova'
                ]
            },
            business: {
                title: 'Biznes',
                description: 'O\'sib borayotgan kompaniyalar uchun optimal yechim',
                price: 9900,
                button: '"Biznes" tanlash',
                features: [
                    '5 tagacha foydalanuvchi',
                    '500 ta avtomobil bazada',
                    'Messenjerlar bilan to\'liq CRM',
                    'Avtomobil va inventar boshqaruvi',
                    'Kengaytirilgan hujjat shablonlari',
                    'Elektron imzo',
                    'Marketpleys integratsiyasi',
                    'Bank integratsiyasi',
                    'Bo\'lib to\'lash va kredit boshqaruvi',
                    'Email va telefon orqali yordam'
                ],
                notIncluded: [
                    'Mijoz tahlillari',
                    'Shaxsiy dashboard\'lar',
                    'Prognozlash',
                    'Mobil ilova'
                ]
            },
            premium: {
                title: 'Premium',
                description: 'Yirik avtodilerlar uchun to\'liq funksionallik',
                price: 19900,
                button: '"Premium" tanlash',
                features: [
                    'Cheksiz foydalanuvchilar',
                    'Cheksiz avtomobillar',
                    'Kengaytirilgan tahlillar bilan to\'liq CRM',
                    'To\'liq inventar boshqaruvi',
                    'Hujjatlar shablonlarining to\'liq to\'plami',
                    'Elektron imzo',
                    'Barcha marketpleyslar bilan integratsiya',
                    'Bank va to\'lov tizimlari integratsiyasi',
                    'Bo\'lib to\'lash va kredit boshqaruvi',
                    'Shaxsiy dashboard\'lar',
                    'Sotish prognozlari',
                    'Mobil ilova',
                    'Ustun 24/7 yordam'
                ],
                notIncluded: []
            }
        },
        services: {
            title: 'Qo\'shimcha xizmatlar',
            requestCustom: 'Shaxsiy taklif so\'rash',
            custom: {
                title: 'Shaxsiy sozlamalar',
                description: 'Tizimni sizning biznesingiz ehtiyojlariga moslashtirish',
                price: '15,000 ₽ dan'
            },
            integration: {
                title: 'Tashqi tizimlar integratsiyasi',
                description: 'Banklar, sug\'urta kompaniyalari, davlat xizmatlari bilan ulanish',
                price: '10,000 ₽ dan'
            },
            training: {
                title: 'Xodimlarni o\'qitish',
                description: 'Xodimlaringiz uchun kompleks trening',
                price: '8,000 ₽ dan'
            },
            migration: {
                title: 'Ma\'lumotlar migratsiyasi',
                description: 'Boshqa tizimlardan mavjud ma\'lumotlarni ko\'chirish',
                price: '12,000 ₽ dan'
            }
        },
        comparison: {
            title: 'Tariflarni solishtirish',
            feature: 'Funksionallik',
            prevPlan: 'Oldingi tarif',
            nextPlan: 'Keyingi tarif',
            unlimited: 'Cheksiz',
            categories: {
                basic: 'Asosiy funksiyalar',
                crm: 'CRM va mijozlar bilan ishlash',
                inventory: 'Inventar boshqaruvi',
                documents: 'Hujjatlar aylanmasi',
                finance: 'Moliya',
                analytics: 'Tahlil va hisobotlar'
            },
            features: {
                users: 'Foydalanuvchilar soni',
                storage: 'Saqlash hajmi',
                cars: 'Avtomobillar soni',
                support: 'Texnik yordam',
                clients: 'Mijozlar bazasi',
                sales: 'Sotish voronkasi',
                history: 'O\'zaro aloqa tarixi',
                messenger: 'Messenjerlar integratsiyasi',
                email: 'Email-marketing',
                clientAnalytics: 'Mijozlar tahlili',
                carsManagement: 'Avtomobillar hisobi',
                stockManagement: 'Inventar boshqaruvi',
                marketplace: 'Marketpleysga eksport',
                stockAnalytics: 'Inventar tahlili',
                autoOrder: 'Avtomatik buyurtma',
                docGeneration: 'Hujjat yaratish',
                docTemplates: 'Hujjat shablonlari',
                signature: 'Elektron imzo',
                docArchive: 'Hujjatlar arxivi',
                govServices: 'Davlat xizmatlari integratsiyasi',
                payments: 'To\'lovlar hisobi',
                bankIntegration: 'Bank integratsiyasi',
                credit: 'Bo\'lib to\'lash va kreditlar',
                onlinePayments: 'Onlayn to\'lovlar',
                finReports: 'Moliyaviy hisobotlar',
                basicReports: 'Asosiy hisobotlar',
                advancedAnalytics: 'Kengaytirilgan tahlillar',
                customDashboards: 'Shaxsiy dashboard\'lar',
                forecasting: 'Prognozlash',
                dataExport: 'Ma\'lumotlar eksporti'
            },
            values: {
                basic: 'Asosiy',
                extended: 'Kengaytirilgan',
                full: 'To\'liq to\'plam',
                emailOnly: 'Faqat email',
                emailPhone: 'Email va telefon',
                priority: '24/7 ustuvor'
            }
        },
        faq: {
            title: 'Ko\'p so\'raladigan savollar',
            moreQuestions: 'Boshqa savollar? Yordam bilan bog\'laning',
            changePlan: {
                question: 'Foydalanish jarayonida tarif rejani o\'zgartirish mumkinmi?',
                answer: 'Ha, siz tarif rejangizni istalgan vaqtda o\'zgartirishingiz mumkin. Qimmatliroq tarifga o\'tish paytida qolgan davr uchun proporsional to\'lov hisoblanadi. Arzonroq tarifga o\'tishda o\'zgarishlar keyingi to\'lov davridan boshlab kuchga kiradi.'
            },
            trial: {
                question: 'Sinov davri bormi?',
                answer: 'Ha, biz barcha tarif rejalar uchun 14 kunlik bepul sinov davrini taqdim etamiz. Bu vaqt davomida siz tanlagan tarif rejaning barcha funksiyalarini hech qanday majburiyatlarsiz sinab ko\'rishingiz mumkin.'
            },
            payment: {
                question: 'To\'lov qanday amalga oshiriladi?',
                answer: 'To\'lov har bir to\'lov davrining boshida (tanlov variantiga qarab oy yoki yil) amalga oshiriladi. Biz bank kartalari, elektron to\'lov tizimlari va yuridik shaxslar uchun bank o\'tkazmasi orqali to\'lovlarni qabul qilamiz.'
            },
            software: {
                question: 'Qo\'shimcha dasturiy ta\'minot o\'rnatish kerakmi?',
                answer: 'Yo\'q, Car-Sale - bu brauzerda ishlaydigan bulutli SaaS-yechim. Siz hech qanday qo\'shimcha dasturiy ta\'minotni o\'rnatishingiz shart emas. Tizim internetga ulanish imkoniyati bo\'lgan har qanday qurilmada mavjud.'
            },
            integration: {
                question: 'Boshqa tizimlar bilan integratsiya mumkinmi?',
                answer: 'Ha, bizning tizimimiz banklar, sug\'urta kompaniyalari, davlat xizmatlari va marketpleyslar kabi turli tashqi xizmatlar bilan integratsiyani qo\'llab-quvvatlaydi. Asosiy integratsiyalar "Biznes" va "Premium" tariflarga kiritilgan, "Boshlang\'ich" tarif uchun esa ular qo\'shimcha xizmat sifatida mavjud.'
            }
        },
        cta: {
            title: 'Biznesingizni avtomatlashtirish uchun tayyormisiz?',
            description: 'Mos keluvchi tarifni tanlang va Car-Sale dan bugun foydalanishni boshlang',
            startTrial: 'Bepul sinovni boshlash',
            contactSales: 'Sotish bo\'limi bilan bog\'lanish'
        },
        nav: {
            back: 'Orqaga',
            plans: 'Tariflar',
            comparison: 'Solishtirish',
            services: 'Xizmatlar',
            faq: 'Savollar'
        },
        scrollToTop: 'Tepa'
    }
};