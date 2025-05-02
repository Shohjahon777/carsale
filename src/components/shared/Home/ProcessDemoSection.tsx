'use client';

import { useRef, useState } from "react";
import {  motion } from 'framer-motion';

export const ProcessDemoSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef(null);
  
  const steps = [
    {
      title: "Импорт авто",
      description: "Мгновенное добавление автомобилей в систему с полной информацией",
      icon: "🚗"
    },
    {
      title: "Обработка лидов",
      description: "Автоматическое распределение и квалификация входящих запросов",
      icon: "👥"
    },
    {
      title: "Продажа",
      description: "Сопровождение клиента от первого контакта до подписания договора",
      icon: "🤝"
    },
    {
      title: "Документы",
      description: "Оформление всех необходимых документов онлайн",
      icon: "📝"
    }
  ];
  
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Как работает наша система
        </motion.h2>
        
        <div className="relative max-w-4xl mx-auto" ref={stepsRef}>
          {/* Линия прогресса */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-8 md:mx-16">
            <motion.div 
              className="h-full bg-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(activeStep + 1) * 100 / steps.length}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
          
          {/* Шаги процесса */}
          <div className="flex flex-col md:flex-row justify-between relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className={`relative px-6 md:px-2 py-4 flex flex-col items-center mb-8 md:mb-0 md:flex-1 cursor-pointer ${index === activeStep ? 'opacity-100' : 'opacity-70'}`}
                whileHover={{ scale: 1.03 }}
                onClick={() => setActiveStep(index)}
              >
                <motion.div 
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl mb-4 ${
                    index === activeStep 
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30' 
                      : 'bg-white dark:bg-gray-800 shadow-md text-primary dark:text-primary-light'
                  }`}
                  animate={index === activeStep ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, times: [0, 0.5, 1] }}
                >
                  {step.icon}
                </motion.div>
                
                <h3 className={`text-lg font-bold mb-1 text-center ${
                  index === activeStep ? 'text-primary dark:text-primary-light' : 'text-gray-800 dark:text-gray-200'
                }`}>
                  {step.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:max-w-[150px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Детальная информация по активному шагу */}
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-md">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-primary dark:text-primary-light mb-4">
                {steps[activeStep].title}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Возможности</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {activeStep === 0 && "Массовый импорт данных из Excel/CSV"}
                        {activeStep === 1 && "Автоматическая квалификация лидов"}
                        {activeStep === 2 && "Гибкие сценарии продаж"}
                        {activeStep === 3 && "Автоматическое заполнение полей"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {activeStep === 0 && "Интеграция с каталогами поставщиков"}
                        {activeStep === 1 && "Автораспределение по менеджерам"}
                        {activeStep === 2 && "История коммуникаций"}
                        {activeStep === 3 && "Электронная подпись"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {activeStep === 0 && "Автоматический расчет стоимости"}
                        {activeStep === 1 && "Напоминания о задачах"}
                        {activeStep === 2 && "Аналитика по сделкам"}
                        {activeStep === 3 && "Онлайн-согласование документов"}
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg h-[150px] flex items-center justify-center">
                  {/* Здесь можно добавить иллюстрацию/анимацию для каждого шага */}
                  <div className="text-6xl">
                    {steps[activeStep].icon}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};