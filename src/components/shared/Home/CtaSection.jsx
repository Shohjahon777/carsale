'use client';

import { useEffect, useRef } from "react";
import {  motion } from 'framer-motion';
import * as d3 from 'd3';

export const CtaSection = ({ ctaSection, onCtaClick }) => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Создаем анимированный фон с частицами
    const container = sectionRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Удаляем предыдущий SVG если есть
    d3.select(container).select("svg.cta-bg").remove();
    
    const svg = d3.select(container)
      .append("svg")
      .attr("class", "cta-bg")
      .attr("width", width)
      .attr("height", height)
      .style("position", "absolute")
      .style("top", 0)
      .style("left", 0)
      .style("pointer-events", "none")
      .style("z-index", 0);
    
    // Создаем градиентный фон
    const defs = svg.append("defs");
    
    const gradient = defs.append("linearGradient")
      .attr("id", "bg-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#7B2CBF");
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#5A189A");
    
    // Добавляем фон
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#bg-gradient)");
    
    // Создаем случайные частицы
    const numParticles = Math.floor(width / 30);
    const particles = [];
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    const particleGroup = svg.append("g");
    
    particles.forEach((p, i) => {
      const particle = particleGroup.append("circle")
        .attr("cx", p.x)
        .attr("cy", p.y)
        .attr("r", p.radius)
        .attr("fill", "white")
        .attr("opacity", p.opacity);
      
      function animateParticle() {
        particle
          .transition()
          .duration(2000 + Math.random() * 2000)
          .attr("cy", p.y - 20 - Math.random() * 20)
          .attr("opacity", p.opacity + 0.1)
          .transition()
          .duration(2000 + Math.random() * 2000)
          .attr("cy", p.y)
          .attr("opacity", p.opacity)
          .on("end", animateParticle);
      }
      
      animateParticle();
    });
    
    // Очистка
    return () => {
      d3.select(container).select("svg.cta-bg").remove();
    };
  }, []);
  
  return (
    <section className="py-16 px-4 mb-16 relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto relative">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl overflow-hidden shadow-xl relative">
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {ctaSection.title}
              </motion.h2>
              
             <motion.p 
                className="text-white/80 mb-8 max-w-lg mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {ctaSection.subtitle}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={onCtaClick}
                  className="px-8 py-3 bg-white hover:bg-gray-100 text-primary font-medium rounded-full transition-colors inline-flex items-center justify-center shadow-lg"
                >
                  {ctaSection.button}
                </button>
              </motion.div>
            </motion.div>
            
            {/* Декоративные элементы */}
            <motion.div 
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            ></motion.div>
            
            <motion.div 
              className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/5"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};