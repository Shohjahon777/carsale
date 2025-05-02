'use client';

import { useEffect, useRef, useState } from "react";
import {  motion } from 'framer-motion';
import * as d3 from 'd3';
import { AnimatedCounter } from "./AnimatedCounter";

export const BenefitsSection = ({ benefits }) => {
  const graphRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Отслеживаем размер экрана для адаптивности
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Отслеживаем видимость секции
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (graphRef.current) {
      observer.observe(graphRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Создаем и анимируем график при видимости
  useEffect(() => {
    if (!isVisible || !graphRef.current) return;
    
    // Очищаем предыдущий график
    d3.select(graphRef.current).selectAll("*").remove();
    
    // Определяем размеры графика в зависимости от ширины экрана
    const isMobile = windowWidth < 768;
    const container = graphRef.current;
    const width = container.clientWidth;
    const height = isMobile ? 250 : 320;
    const margin = { top: 40, right: isMobile ? 20 : 40, bottom: 60, left: isMobile ? 40 : 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Создаем SVG
    const svg = d3.select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Извлекаем числовые значения из данных
    const data = benefits.items.map(item => ({
      label: item.label,
      value: parseInt(item.value, 10) || 0
    }));
    
    // Создаем шкалы
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, chartWidth])
      .padding(0.3);
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) + 10])
      .range([chartHeight, 0]);
    
    // Создаем градиенты для столбцов
    const defs = svg.append("defs");
    
    data.forEach((d, i) => {
      const gradientId = `barGradient-${i}`;
      const gradient = defs.append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#7B2CBF");
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#9D4EDD");
    });
    
    // Создаем сетку для лучшей читаемости
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale).tickSize(0).tickFormat(''));
    
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale)
        .tickSize(-chartWidth)
        .tickFormat('')
        .ticks(5))
      .attr("stroke", "#e5e7eb")
      .attr("stroke-opacity", "0.5")
      .attr("shape-rendering", "crispEdges");
    
    // Добавляем оси
    svg.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", isMobile ? "translate(-10,10)rotate(-45)" : "translate(0,10)")
      .style("text-anchor", isMobile ? "end" : "middle")
      .style("font-size", isMobile ? "10px" : "12px")
      .style("fill", "#666")
      .style("font-weight", "500");
    
    svg.append("g")
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${d}%`))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#666");
    
    // Создаем группу для столбцов
    const barGroup = svg.append("g");
    
    // Рисуем столбцы с анимацией
    barGroup.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.label))
      .attr("y", chartHeight)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("rx", 4)
      .attr("fill", (d, i) => `url(#barGradient-${i})`)
      .attr("stroke", "#fff")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1)
      .on("mouseenter", function(event, d) {
        d3.select(this)
          .transition()
          .duration(300)
          .attr("filter", "brightness(1.1)")
          .attr("stroke-width", 2);
        
        // Показываем подробную информацию при наведении
        const index = data.findIndex(item => item.label === d.label);
        setActiveIndex(index);
      })
      .on("mouseleave", function() {
        d3.select(this)
          .transition()
          .duration(300)
          .attr("filter", null)
          .attr("stroke-width", 1);
        
        setActiveIndex(null);
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 200)
      .attr("y", d => yScale(d.value))
      .attr("height", d => chartHeight - yScale(d.value));
    
    // Добавляем значения над столбцами
    barGroup.selectAll(".bar-value")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "bar-value")
      .attr("x", d => xScale(d.label) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.value) - 10)
      .attr("text-anchor", "middle")
      .style("font-weight", "bold")
      .style("font-size", "14px")
      .style("fill", "#7B2CBF")
      .text(d => `${d.value}%`)
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 200 + 500)
      .style("opacity", 1);
    
  }, [isVisible, benefits.items, windowWidth]);
  
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/80">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {benefits.title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Наши решения существенно улучшают эффективность и результативность бизнеса
          </p>
        </motion.div>
        
        {/* Интерактивный график */}
        <div className="relative mb-12">
          <div 
            ref={graphRef} 
            className="w-full h-[250px] md:h-[320px] overflow-hidden bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-2 md:p-4"
          ></div>
          
          {/* Всплывающая подсказка при наведении */}
          {activeIndex !== null && (
            <motion.div 
              className="absolute bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10 border border-gray-100 dark:border-gray-700"
              style={{
                top: '10%',
                left: windowWidth >= 768 
                  ? `${10 + (activeIndex * (100 / benefits.items.length))}%` 
                  : '50%',
                transform: windowWidth >= 768 
                  ? 'translateX(-50%)' 
                  : 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="font-bold text-primary dark:text-primary-light text-lg mb-1">
                {benefits.items[activeIndex].value}
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {benefits.items[activeIndex].label}
              </p>
              <div className="absolute w-3 h-3 bg-white dark:bg-gray-800 rotate-45 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 border-r border-b border-gray-100 dark:border-gray-700"></div>
            </motion.div>
          )}
        </div>
        
        {/* Адаптивные карточки преимуществ */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {benefits.items.map((item, index) => (
            <motion.div 
              key={index}
              className="relative overflow-hidden bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 group"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 12px 25px -5px rgba(123, 44, 191, 0.15)",
                borderColor: "rgba(123, 44, 191, 0.3)"
              }}
            >
              {/* Фоновый декоративный элемент */}
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 dark:bg-primary/10 rounded-full transition-all duration-300 group-hover:scale-150"></div>
              
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-light mb-2 flex items-baseline">
                  <AnimatedCounter value={parseInt(item.value, 10) || 0} suffix="%" duration={1200} />
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {item.label}
                </div>
                
                {/* Прогресс-бар */}
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-3">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-primary-light"
                    initial={{ width: 0 }}
                    whileInView={{ width: item.value }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 + index * 0.1 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
