
'use client';

import { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';

export const CircularIndicator = ({ percentage }) => {
  const circleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (circleRef.current) {
      observer.observe(circleRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible || !circleRef.current) return;
    
    // Используем D3 для анимации кругового прогресса
    const svg = d3.select(circleRef.current);
    const circle = svg.select('circle:nth-child(2)');
    
    const circumference = 2 * Math.PI * 18; // r=18, окружность = 2πr
    
    // Устанавливаем начальное значение
    circle.attr('stroke-dasharray', circumference);
    circle.attr('stroke-dashoffset', circumference);
    
    // Анимируем до требуемого процента
    circle
      .transition()
      .duration(1500)
      .ease(d3.easeQuadOut)
      .attr('stroke-dashoffset', circumference - (percentage / 100) * circumference);
    
  }, [isVisible, percentage]);
  
  return (
    <div className="ml-2 flex items-center justify-center relative">
      <svg ref={circleRef} width="40" height="40" viewBox="0 0 40 40" className="transform -rotate-90">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle cx="20" cy="20" r="18" fill="none" stroke="#7B2CBF" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="absolute text-xs font-semibold text-gray-700 dark:text-gray-300">{percentage}%</span>
    </div>
  );
};