'use client';

import { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';

export const AnimatedCounter = ({ value, suffix = '', duration = 2000 }) => {
  const counterRef = useRef(null);
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
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible || !counterRef.current) return;
    
    const counter = counterRef.current;
    const countTo = parseFloat(value.toString());
    const decimals = countTo % 1 !== 0 ? 1 : 0;
    
    const interpolate = d3.interpolateNumber(0, countTo);
    
    d3.select(counter)
      .transition()
      .duration(duration)
      .tween("text", function() {
        return function(t) {
          if (this) {
            const formattedValue = d3.format(decimals ? ".1f" : "d")(interpolate(t));
            this.textContent = `${formattedValue}${suffix}`;
          }
        };
      });
  }, [isVisible, value, suffix, duration]);
  
  return <span ref={counterRef}>0{suffix}</span>;
};