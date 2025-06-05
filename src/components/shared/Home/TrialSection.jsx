// TrialSection.jsx
'use client';

import {useEffect, useRef, useState} from "react";
import {motion, useInView} from 'framer-motion';
import {useLanguageStore} from "@/src/store/language";
import {pageLocalization} from "@/src/components/shared/Home/localization";
import axios from "axios";

export const TrialSection = () => {

    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {currentLocale} = useLanguageStore();
    const t = pageLocalization[currentLocale] || pageLocalization.ru;

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {once: true, threshold: 0.1});

    const [formData, setFormData] = useState({
        full_name: "",
        company: "",
        email: "",
        phone: ""
    });

    // Form submission states
    const [formStatus, setFormStatus] = useState({
        isSubmitting: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
        successMessage: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const resetFormStatus = () => {
        setFormStatus({
            isSubmitting: false,
            isSuccess: false,
            isError: false,
            errorMessage: "",
            successMessage: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous status
        resetFormStatus();

        // Set loading state
        setFormStatus(prev => ({
            ...prev,
            isSubmitting: true
        }));

        try {
            const response = await axios.post("/api/get-main-lead", formData);

            // Success
            setFormStatus({
                isSubmitting: false,
                isSuccess: true,
                isError: false,
                errorMessage: "",
                successMessage: t.trialTestimonial?.form_success || "Спасибо! Мы свяжемся с вами в ближайшее время."
            });

            // Reset form data after successful submission
            setFormData({
                full_name: "",
                company: "",
                email: "",
                phone: ""
            });

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                setFormStatus(prev => ({
                    ...prev,
                    isSuccess: false,
                    successMessage: ""
                }));
            }, 5000);

        } catch (error) {
            console.error("Error submitting form:", error);

            let errorMessage = t.trialTestimonial?.form_error || "Произошла ошибка. Попробуйте еще раз.";

            // Handle specific error cases
            if (error.response?.status === 400) {
                errorMessage = t.trialTestimonial?.form_validation_error || "Проверьте правильность заполнения полей.";
            } else if (error.response?.status === 500) {
                errorMessage = t.trialTestimonial?.form_server_error || "Серверная ошибка. Попробуйте позже.";
            } else if (!error.response) {
                errorMessage = t.trialTestimonial?.form_network_error || "Проблема с соединением. Проверьте интернет.";
            }

            setFormStatus({
                isSubmitting: false,
                isSuccess: false,
                isError: true,
                errorMessage: errorMessage,
                successMessage: ""
            });

            // Auto-hide error message after 10 seconds
            setTimeout(() => {
                setFormStatus(prev => ({
                    ...prev,
                    isError: false,
                    errorMessage: ""
                }));
            }, 10000);
        }
    };

    const fetchTestimonials = async () => {
        try {
            const response = await axios.post('/api/get-trial-testimonials', {locale: currentLocale});
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials()
    }, [currentLocale]);

    const renderStars = (rating) => {
        return Array.from({length: 5}, (_, index) => {
            const starNumber = index + 1;
            const isFilled = starNumber <= rating;

            return (
                <svg
                    key={starNumber}
                    className={`inline-block w-5 h-5 ${
                        isFilled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
            )
        })
    }


if (loading) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 animate-pulse"
                >
                    <div className="mb-4 flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star} className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        ))}
                    </div>
                    <div className="space-y-3 mb-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                        </div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

if (error) {
    return (
        <div className="text-center py-8">
            <div
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 inline-block">
                <p className="text-red-600 dark:text-red-400">{error}</p>
                <button
                    onClick={fetchTestimonials}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                    {t.trialTestimonial.try_again}
                </button>
            </div>
        </div>
    );
}

if (testimonials.length === 0) {
    return (
        <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">{t.trialTestimonial.no_reviews_found}</p>
        </div>
    );
}

const trialFeatures = [
    {
        title: "Полный функционал",
        description: "Доступ ко всем возможностям системы без ограничений",
        icon: "✨"
    },
    {
        title: "Техническая поддержка",
        description: "Помощь экспертов на всех этапах тестирования",
        icon: "🛠️"
    },
    {
        title: "Интеграции",
        description: "Возможность протестировать все доступные интеграции",
        icon: "🔄"
    },
    {
        title: "Обучающие материалы",
        description: "Доступ к базе знаний и обучающим видео",
        icon: "📚"
    }
];

const steps = [
    {
        number: 1,
        title: "Оставьте заявку",
        description: "Заполните простую форму, и мы свяжемся с вами"
    },
    {
        number: 2,
        title: "Получите доступ",
        description: "Мы настроим тестовый аккаунт специально для вас"
    },
    {
        number: 3,
        title: "Тестируйте систему",
        description: "Изучите возможности платформы в течение 14 дней"
    }
];

return (
    <section
        className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800 relative overflow-hidden"
        ref={sectionRef}
    >
        {/* Декоративные элементы */}
        <div
            className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Левая колонка - информация */}
                <motion.div
                    // initial={{opacity: 0, x: -30}}
                    // animate={isInView ? {opacity: 1, x: 0} : {opacity: 0, x: -30}}
                    transition={{duration: 0.8}}
                >
                    <motion.span
                        // initial={{scale: 0}}
                        // animate={isInView ? {scale: 1} : {scale: 0}}
                        transition={{type: "spring", stiffness: 100, delay: 0.2}}
                        className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold mb-3"
                    >
                        {t.trialTestimonial.try_free}
                    </motion.span>

                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        {t.trialTestimonial.trial_14_days}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        {t.trialTestimonial.full_trial_text}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {trialFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                // initial={{opacity: 0, y: 20}}
                                // animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                                transition={{duration: 0.5, delay: index * 0.1 + 0.3}}
                                className="flex items-start"
                            >
                                <div
                                    className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                                    {feature.icon}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                            {t.trialTestimonial.start_trial}
                        </motion.button>

                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium rounded-full inline-flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                            </svg>
                            {t.trialTestimonial.view_demo}
                        </motion.button>
                    </div>
                </motion.div>

                {/* Правая колонка - форма и шаги */}
                <motion.div
                    // initial={{opacity: 0, x: 30}}
                    // animate={isInView ? {opacity: 1, x: 0} : {opacity: 0, x: 30}}
                    transition={{duration: 0.8, delay: 0.4}}
                >
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            {t.trialTestimonial.leave_request}
                        </h3>

                        {/* Success Message */}
                        {formStatus.isSuccess && (
                            <motion.div
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <p className="text-green-700 dark:text-green-400 font-medium">
                                        {formStatus.successMessage}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Error Message */}
                        {formStatus.isError && (
                            <motion.div
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <p className="text-red-700 dark:text-red-400 font-medium">
                                        {formStatus.errorMessage}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                            <div>
                                <label htmlFor="name"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t.trialTestimonial.your_name}
                                </label>
                                <input
                                    name="full_name"
                                    type="text"
                                    id="name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    required={true}
                                    disabled={formStatus.isSubmitting}
                                    placeholder="Иван Иванов"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label htmlFor="company"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t.trialTestimonial.company_name}
                                </label>
                                <input
                                    name="company"
                                    type="text"
                                    id="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required={true}
                                    disabled={formStatus.isSubmitting}
                                    placeholder="Авто-Престиж"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label htmlFor="email"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t.trialTestimonial.email}
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required={true}
                                    disabled={formStatus.isSubmitting}
                                    placeholder="ivanov@example.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone"
                                       className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t.trialTestimonial.phone}
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required={true}
                                    disabled={formStatus.isSubmitting}
                                    placeholder="+7 (999) 123-45-67"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="agreement"
                                    disabled={formStatus.isSubmitting}
                                    className="w-4 h-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
                                />
                                <label htmlFor="agreement"
                                       className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                    {t.trialTestimonial.agree_with}<a href="#"
                                                                      className="text-primary dark:text-primary-light hover:underline">{t.trialTestimonial.terms_of_use}</a> {t.trialTestimonial.and}
                                    <a href="#"
                                       className="text-primary dark:text-primary-light hover:underline">{t.trialTestimonial.privacy_policy}</a>
                                </label>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={formStatus.isSubmitting}
                                whileHover={!formStatus.isSubmitting ? {scale: 1.02} : {}}
                                whileTap={!formStatus.isSubmitting ? {scale: 0.98} : {}}
                                className="w-full py-3 mt-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary transition-all duration-200"
                            >
                                {formStatus.isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t.trialTestimonial?.sending || "Отправляем..."}
                                    </>
                                ) : (
                                    t.trialTestimonial.get_access
                                )}
                            </motion.button>
                        </form>

                        {/* Шаги процесса */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                {t.trialTestimonial.how_it_works}
                            </h4>

                            <div className="space-y-4">
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        // initial={{opacity: 0, y: 10}}
                                        // animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 10}}
                                        transition={{duration: 0.5, delay: index * 0.1 + 0.7}}
                                        className="flex items-start"
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                                            {step.number}
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-gray-900 dark:text-white">
                                                {step.title}
                                            </h5>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Дополнительная информация */}
                    <motion.div
                        // initial={{opacity: 0, y: 20}}
                        // animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                        transition={{duration: 0.5, delay: 1}}
                        className="mt-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-primary dark:text-primary-light mr-2" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t.trialTestimonial.no_card_required}
                </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Отзывы о тестовом периоде */}
            <motion.div
                className="mt-20"
                // initial={{opacity: 0, y: 30}}
                // animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                transition={{duration: 0.8, delay: 1.2}}
            >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    {t.trialTestimonial.testimonial_intro}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            // initial={{opacity: 0, y: 20}}
                            // animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                            transition={{duration: 0.5, delay: index * 0.1 + 1.3}}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                        >
                            <div className="mb-4">
                                {renderStars(testimonial.rating)}
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                                "{testimonial.quote}"
                            </p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">
                                        {testimonial.author}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {testimonial.company}
                                    </p>
                                </div>

                                <span className="text-primary dark:text-primary-light text-sm font-medium">
                    {t.trialTestimonial.client}
                  </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
)
}