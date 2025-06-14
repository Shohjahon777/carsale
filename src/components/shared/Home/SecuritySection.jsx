// SecuritySection.jsx - без разноцветных точек

'use client';

import React, { useRef } from "react";
import { motion, useInView } from 'framer-motion';

export const SecuritySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  
  const securityFeatures = [
    {
      title: "Шифрование данных",
      description: "Все данные защищены алгоритмом AES-256 при хранении и передаче",
      icon: "🔒",
      color: "#7B2CBF"
    },
    {
      title: "Многоуровневая аутентификация",
      description: "Двухфакторная аутентификация и строгий контроль доступа",
      icon: "🔑",
      color: "#0891B2"
    },
    {
      title: "Резервное копирование",
      description: "Автоматическое создание резервных копий с быстрым восстановлением",
      icon: "🗄️",
      color: "#F59E0B"
    },
    {
      title: "Соответствие стандартам",
      description: "Полное соответствие международным стандартам безопасности",
      icon: "✅",
      color: "#059669"
    }
  ];
  
  const certifications = [
    { name: "ISO 27001", logo: "🏅" },
    { name: "PCI DSS", logo: "🏆" },
    { name: "GDPR Compliant", logo: "🔰" },
    { name: "152-ФЗ", logo: "📋" }
  ];
  
  return (
    <section 
      className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Фоновые элементы */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - информация */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="inline-block px-4 py-1 bg-primary/20 text-primary-light rounded-full text-sm font-semibold mb-3"
            >
              БЕЗОПАСНОСТЬ ПРЕВЫШЕ ВСЕГО
            </motion.span>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ваши данные под надежной защитой
            </h2>
            
            <p className="text-gray-300 mb-8">
              Безопасность данных — наш высший приоритет. Мы используем передовые технологии шифрования и строгие протоколы для защиты информации о клиентах, контрактах и транзакциях.
            </p>
            
            <div className="space-y-4 mb-8">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="flex items-start p-4 bg-gray-800/80 backdrop-blur rounded-lg shadow-lg border border-gray-700"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl mr-4 flex-shrink-0"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    {feature.icon}
                  </div>
                  
                  <div>
                    <h3 
                      className="text-lg font-semibold mb-1"
                      style={{ color: feature.color }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="text-gray-300 font-medium">Сертификаты:</span>
              
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.8 + index * 0.1 }}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm font-medium border border-gray-700 shadow-sm inline-flex items-center"
                >
                  <span className="mr-1">{cert.logo}</span>
                  {cert.name}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Правая колонка - визуализация безопасности данных */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-full"
          >
            <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-6 flex items-center justify-center">
              {/* Центрированная анимация безопасности данных */}
              <div className="relative w-full aspect-square mx-auto" style={{maxWidth: "400px", height: "400px"}}>
                {/* Центральный щит защиты */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                  <motion.div
                    className="w-48 h-48 rounded-full border-4 border-primary/30 flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(123, 44, 191, 0.2)",
                        "0 0 30px rgba(123, 44, 191, 0.4)",
                        "0 0 0px rgba(123, 44, 191, 0.2)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {/* Внутренний сервер с данными */}
                    <motion.div
                      className="w-28 h-28 bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg border-2 border-primary/30 z-10"
                      animate={{
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <div className="text-center">
                        <svg className="w-12 h-12 text-primary-light mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8M10 14h4" />
                        </svg>
                        <span className="text-xs font-medium text-gray-300 mt-1 block">
                          Защищенные данные
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Первый вращающийся слой защиты */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <motion.div
                    className="w-full h-full rounded-full relative"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {/* Элементы защиты на первом слое */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                      const radius = 40; // процент от контейнера
                      const x = 50 + radius * Math.sin(angle * Math.PI / 180);
                      const y = 50 - radius * Math.cos(angle * Math.PI / 180);
                      
                      return (
                        <motion.div
                          key={`p1-${i}`}
                          className="absolute w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shadow-md"
                          style={{
                            top: `${y}%`,
                            left: `${x}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          whileHover={{ scale: 1.2 }}
                        >
                          {i % 3 === 0 && (
                            <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          )}
                          {i % 3 === 1 && (
                            <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          )}
                          {i % 3 === 2 && (
                            <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
                
                {/* Второй вращающийся слой защиты */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <motion.div
                    className="w-full h-full rounded-full relative border border-dashed border-blue-400/40"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {/* Элементы защиты на втором слое */}
                    {[0, 72, 144, 216, 288].map((angle, i) => {
                      const radius = 32; // процент от контейнера
                      const x = 50 + radius * Math.sin(angle * Math.PI / 180);
                      const y = 50 - radius * Math.cos(angle * Math.PI / 180);
                      
                      return (
                        <motion.div
                          key={`p2-${i}`}
                          className="absolute w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center shadow-md"
                          style={{
                            top: `${y}%`,
                            left: `${x}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          animate={{
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              "0 4px 6px rgba(8, 145, 178, 0.1)",
                              "0 6px 10px rgba(8, 145, 178, 0.3)",
                              "0 4px 6px rgba(8, 145, 178, 0.1)"
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: i * 0.4
                          }}
                        >
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                          </svg>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
                
                {/* Анимированные лучи/линии защиты */}
                {[...Array(6)].map((_, i) => {
                  const angle = Math.random() * 360;
                  const distance = 35; // процент от контейнера
                  
                  // Рассчитываем конечные координаты
                  const endX = 50 + distance * Math.sin(angle * Math.PI / 180);
                  const endY = 50 - distance * Math.cos(angle * Math.PI / 180);
                  
                  return (
                    <motion.div
                      key={`line-${i}`}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.6, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 3 + 1,
                        delay: Math.random() * 2
                      }}
                    >
                      <svg className="w-full h-full" overflow="visible">
                        <line
                          x1="50%"
                          y1="50%"
                          x2={`${endX}%`}
                          y2={`${endY}%`}
                          stroke="#9D4EDD"
                          strokeWidth="1"
                          strokeDasharray="3 2"
                        />
                      </svg>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Пояснения к системе безопасности */}
            <div className="mt-6 bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                Многоуровневая система защиты
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-light mr-2 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-300">
                    <strong>Шифрование</strong> всех данных
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-2 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-300">
                    <strong>Мониторинг</strong> 24/7
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-2 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-300">
                    <strong>Резервное</strong> копирование
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mr-2 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-300">
                    <strong>Защита</strong> от атак
                  </div>
                </div>
              </div>
            </div>
            
            {/* Декоративные элементы */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-blue-500/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
        
        {/* CTA-секция */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">
            Хотите узнать больше о нашем подходе к безопасности?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Мы подготовили подробную документацию о наших протоколах безопасности и мерах защиты
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Политика безопасности
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gray-800 text-gray-300 border border-gray-700 font-medium rounded-full shadow-sm inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Связаться с экспертом
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};