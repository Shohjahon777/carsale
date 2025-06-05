// ComparisonSection.jsx
'use client';

import React, {useEffect, useRef, useState} from "react";
import { motion, useInView } from 'framer-motion';
import axios from "axios";
import {useLanguageStore} from "@/src/store/language";
import {pageLocalization} from "@/src/components/shared/Home/localization";

export const ComparisonSection = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const [comparisonFeatures, setComparisonFeatures] = useState([]);
  const [ourAdvantages, setOurAdvantages] = useState([]);
  const [otherCompetitors, setOtherCompetitors] = useState([]);

  const { currentLocale } = useLanguageStore();

  const t = pageLocalization[currentLocale] || pageLocalization.ru;

    useEffect(() => {
        axios
            .post('/api/get-main-comparison', { locale: currentLocale })
            .then((response) => {
                setComparisonFeatures(response.data);
            })
            .catch((error) => {
                console.error('Error fetching stats:', error);
            });



    }, [currentLocale]);

  useEffect(() => {
    axios
        .post('/api/get-main-com-adv', { locale: currentLocale })
        .then((response) => {
          console.log('adv', response.data);

          const data = response.data;

          const ourAdv = data.filter(item => item.sort === 'W');
          const competitors = data.filter(item => item.sort !== 'W');

          setOurAdvantages(ourAdv);
          setOtherCompetitors(competitors);
        })
        .catch((error) => {
          console.error('Error fetching:', error);
        });
  }, [currentLocale]);



  return (
    <section 
      className="py-20 px-4 bg-white dark:bg-gray-900 relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10"></div>
      
      <div className="container mx-auto relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-semibold mb-3"
          >
            {t.comparison.title}
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.comparison.why_choose_us}
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "80px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-primary mx-auto rounded-full mb-6"
          />
          
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t.comparison.comparison_intro}
          </motion.p>
        </motion.div>
        
        {/* Сравнительная таблица */}
        <motion.div
          // initial={{ opacity: 0, y: 30 }}
          // animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
                    {t.comparison.feature}
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light">
                      {t.comparison.our_system}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
                    {t.comparison.competitor_1}
                  </th>
                  {/*<th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">*/}
                  {/*  Конкурент 2*/}
                  {/*</th>*/}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {comparisonFeatures.map((feature, index) => (
                  <React.Fragment key={index}>
                    <motion.tr 
                      // initial={{ opacity: 0, x: -20 }}
                      // animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.9 }}
                      className={expandedFeature === index ? 'bg-gray-50 dark:bg-gray-700/30' : ''}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                          className="flex items-center text-sm font-medium text-gray-900 dark:text-white group"
                        >
                          {feature.name}
                          <svg 
                            className={`ml-2 w-4 h-4 text-gray-400 group-hover:text-primary transition-transform duration-300 ${expandedFeature === index ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {feature.oursystem.available ? (
                          <span className="inline-flex items-center p-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
                            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center p-1.5 rounded-full bg-red-100 dark:bg-red-900/30">
                            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {feature.competitor1.available ? (
                          <span className="inline-flex items-center p-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
                            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center p-1.5 rounded-full bg-red-100 dark:bg-red-900/30">
                            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                      </td>
                      {/*<td className="px-6 py-4 whitespace-nowrap text-center">*/}
                      {/*  {feature.competitor2.available ? (*/}
                      {/*    <span className="inline-flex items-center p-1.5 rounded-full bg-green-100 dark:bg-green-900/30">*/}
                      {/*      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                      {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />*/}
                      {/*      </svg>*/}
                      {/*    </span>*/}
                      {/*  ) : (*/}
                      {/*    <span className="inline-flex items-center p-1.5 rounded-full bg-red-100 dark:bg-red-900/30">*/}
                      {/*      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                      {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />*/}
                      {/*      </svg>*/}
                      {/*    </span>*/}
                      {/*  )}*/}
                      {/*</td>*/}
                    </motion.tr>
                    
                    {/* Раскрывающаяся секция с деталями */}
                    {expandedFeature === index && (
                      <motion.tr
                        // initial={{ opacity: 0, height: 0 }}
                        // animate={{ opacity: 1, height: 'auto' }}
                        // exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50 dark:bg-gray-700/30"
                      >
                        <td colSpan="4" className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <div className="text-xs font-medium text-primary dark:text-primary-light mb-1">{t.comparison.our_system_colon}</div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{feature.oursystem.details}</p>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{t.comparison.competitor_1_colon}</div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{feature.competitor1.details}</p>
                            </div>
                            {/*<div>*/}
                            {/*  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Конкурент 2:</div>*/}
                            {/*  <p className="text-sm text-gray-700 dark:text-gray-300">{feature.competitor2.details}</p>*/}
                            {/*</div>*/}
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* Общее сравнение */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          // initial={{ opacity: 0, y: 30 }}
          // animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {/* Первая карточка - Преимущества */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 dark:text-green-400 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {t.comparison.our_advantages}
            </h3>
            
            <ul className="space-y-3">
              {ourAdvantages.map((item, index) => (
                <motion.li
                  key={index}
                  // initial={{ opacity: 0, x: -10 }}
                  // animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 1.3 }}
                  className="flex items-start"
                >
                  <svg className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Вторая карточка - Ограничения конкурентов */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 dark:text-red-400 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {t.comparison.competitor_limitations}
            </h3>
            
            <ul className="space-y-3">
              {otherCompetitors.map((item, index) => (
                <motion.li
                  key={index}
                  // initial={{ opacity: 0, x: -10 }}
                  // animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 1.3 }}
                  className="flex items-start"
                >
                  <svg className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Третья карточка - Отзыв клиента */}
          <div className="bg-gradient-to-br from-primary/90 to-primary-dark rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full"></div>
            
            <div className="relative">
              <svg className="w-10 h-10 text-white/60 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.23.315-.606.814-1.083 1.492-1.425l.398-.226c.12-.06.218-.16.3-.33.079-.17.118-.35.118-.532 0-.432-.11-.812-.34-1.14-.23-.33-.5-.48-.88-.48-.152 0-.34.04-.51.116-.17.079-.34.198-.52.357-.18.159-.41.434-.74.825-.327.392-.67.786-1.02 1.184-.35.398-.73.825-1.13 1.273-.41.45-.83.933-1.26 1.452-.43.52-.85 1.054-1.25 1.602L2.6 15.695c-.668.85-1.192 1.704-1.6 2.56-.41.856-.61 1.747-.61 2.674 0 .72.09 1.434.28 2.136.19.704.47 1.332.85 1.89.38.55.84.988 1.4 1.31.56.321 1.19.481 1.89.481.87 0 1.63-.229 2.28-.686.65-.457 1.18-1.07 1.59-1.838.41-.77.71-1.643.9-2.618.19-.977.29-1.977.29-2.997zm11.21 0c0-.88-.23-1.618-.7-2.217-.32-.412-.77-.683-1.32-.812-.55-.128-1.07-.137-1.55-.028-.16-.95.1-1.626.41-2.23.31-.606.81-1.083 1.49-1.425l.4-.226c.12-.06.22-.16.3-.33.08-.17.11-.35.11-.532 0-.432-.11-.812-.33-1.14-.22-.33-.5-.48-.88-.48-.16 0-.34.04-.52.116-.18.079-.35.198-.53.357-.18.159-.41.434-.74.825-.33.392-.67.786-1.02 1.184-.35.398-.73.825-1.13 1.273-.41.45-.83.933-1.25 1.452-.43.52-.85 1.054-1.26 1.602l-.65 2.229c-.67.85-1.19 1.704-1.6 2.56-.4.856-.61 1.747-.61 2.674 0 .72.09 1.434.28 2.136.19.704.48 1.332.85 1.89.37.55.84.988 1.4 1.31.56.321 1.19.481 1.89.481.87 0 1.62-.229 2.27-.686.65-.457 1.18-1.07 1.59-1.838.41-.77.72-1.643.9-2.618.18-.977.28-1.977.28-2.997z" />
              </svg>
              
              <p className="text-white/90 text-lg font-medium italic mb-6">
                {t.comparison.testimonial_text}
              </p>
              
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?q=80&w=50&h=50&auto=format&fit=crop" 
                  alt="Отзыв клиента" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30 mr-3"
                />
                <div>
                  <h4 className="font-medium text-white">{t.comparison.testimonial_author}</h4>
                  <p className="text-white/70 text-sm">{t.comparison.testimonial_position}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA-секция */}
        <motion.div 
          className="mt-16 text-center"
          // initial={{ opacity: 0, y: 30 }}
          // animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {t.comparison.see_difference_cta}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t.comparison.demo_request_text}
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full shadow-lg inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {t.comparison.demo_button}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};