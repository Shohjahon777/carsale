'use client';

import { useState } from "react";
import {  motion } from 'framer-motion';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      question: "Как быстро можно внедрить систему?",
      answer: "Базовое внедрение занимает от 2 до 4 недель, в зависимости от размера компании и необходимых интеграций. Мы предоставляем полное сопровождение на всех этапах внедрения, включая обучение персонала."
    },
    {
      question: "Какая техническая поддержка предоставляется?",
      answer: "Мы обеспечиваем круглосуточную техническую поддержку 24/7 по всем каналам связи: телефон, email, чат. Время реакции на критические инциденты составляет не более 15 минут. Также доступны регулярные обновления и расширения функционала."
    },
    {
      question: "Можно ли интегрировать систему с нашим текущим ПО?",
      answer: "Да, наша система поддерживает интеграцию с большинством популярных бизнес-приложений через API. Мы также можем разработать индивидуальные коннекторы для специфических решений, используемых в вашей компании."
    },
    {
      question: "Как обеспечивается безопасность данных?",
      answer: "Мы используем шифрование на всех уровнях, многофакторную аутентификацию, регулярные аудиты безопасности и соответствуем требованиям законодательства о защите персональных данных. Все данные хранятся в защищенных дата-центрах с резервным копированием."
    },
    {
      question: "Какие варианты лицензирования доступны?",
      answer: "Мы предлагаем гибкую модель лицензирования: подписка (ежемесячная или годовая) с разными тарифными планами в зависимости от функционала и количества пользователей, а также возможность приобретения постоянной лицензии с последующей технической поддержкой."
    }
  ];
  
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ответы на вопросы, которые чаще всего задают наши клиенты
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary dark:text-primary-light ml-4 flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Не нашли ответ? */}
        <motion.div 
          className="bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-xl p-6 mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Не нашли ответ на свой вопрос?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-colors inline-flex items-center gap-2"
          >
            Связаться с нами
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};