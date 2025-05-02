'use client';

import { useEffect, useState, useRef } from 'react';


export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState('sedan');
  const [isActive, setIsActive] = useState(true);
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef({ x: 0, y: 0, time: 0 });
  
  // Проверка на мобильное устройство
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      setIsActive(false);
    } else {
      // Загружаем настройки из localStorage
      const savedCursorActive = localStorage.getItem('customCursorEnabled');
      if (savedCursorActive === 'false') {
        setIsActive(false);
      }
      
      const savedVariant = localStorage.getItem('customCursorVariant') ;
      if (savedVariant && ['sedan', 'suv', 'sport'].includes(savedVariant)) {
        setVariant(savedVariant);
      }
    }
  }, []);
  
  // Обработчик движения мыши
  useEffect(() => {
    if (!isActive) return;
    
    const handleMouseMove = (e) => {
      // Вычисляем скорость движения
      const currentTime = Date.now();
      const deltaTime = currentTime - lastPositionRef.current.time;
      
      if (deltaTime > 0) { // Избегаем деления на ноль
        const deltaX = e.clientX - lastPositionRef.current.x;
        const deltaY = e.clientY - lastPositionRef.current.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const calculatedSpeed = distance / deltaTime * 10; // Масштабируем
        
        setSpeed(calculatedSpeed);
        
        // Вычисляем угол наклона при движении
        if (distance > 5) { // Только при значительном перемещении
          const newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
          setAngle(newAngle);
        }
      }
      
      // Обновляем последние координаты и время
      lastPositionRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: currentTime
      };
      
      // Обновляем позицию курсора
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Проверяем, находится ли курсор над кликабельным элементом
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      if (elementUnderCursor) {
        const clickable = elementUnderCursor.closest('a, button, input, select, [role="button"], .clickable');
        setIsHovering(Boolean(clickable));
        
        // Специальная обработка для текстовых полей и карточек автомобилей
        // Здесь можно добавить дополнительные проверки
      }
    };
    
    // Обработка кликов
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Обработка перетаскивания
    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => setIsDragging(false);
    
    // Отслеживаем состояние загрузки через fetch
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      setIsLoading(true);
      return originalFetch.apply(this, args)
        .then(response => {
          setIsLoading(false);
          return response;
        })
        .catch(err => {
          setIsLoading(false);
          throw err;
        });
    };
    
    // Навешиваем слушатели событий
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragend', handleDragEnd);
    
    // Скрываем стандартный курсор на странице
    if (isActive) {
      document.documentElement.classList.add('hide-default-cursor');
    }
    
    return () => {
      // Удаляем обработчики при размонтировании
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('dragend', handleDragEnd);
      
      // Восстанавливаем стандартный курсор
      document.documentElement.classList.remove('hide-default-cursor');
      
      // Восстанавливаем оригинальный fetch
      window.fetch = originalFetch;
    };
  }, [isActive]);
  
  // Функция переключения состояния курсора
  const toggleCursor = () => {
    const newState = !isActive;
    setIsActive(newState);
    localStorage.setItem('customCursorEnabled', newState ? 'true' : 'false');
    
    if (newState) {
      document.documentElement.classList.add('hide-default-cursor');
    } else {
      document.documentElement.classList.remove('hide-default-cursor');
    }
  };
  
  const changeVariant = (newVariant) => {
    setVariant(newVariant);
    localStorage.setItem('customCursorVariant', newVariant);
  };
  
  // Экспортируем функции управления курсором глобально
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.carCursor = {
        enable: () => {
          setIsActive(true);
          localStorage.setItem('customCursorEnabled', 'true');
          document.documentElement.classList.add('hide-default-cursor');
        },
        disable: () => {
          setIsActive(false);
          localStorage.setItem('customCursorEnabled', 'false');
          document.documentElement.classList.remove('hide-default-cursor');
        },
        toggle: toggleCursor,
        setCar: changeVariant
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        delete window.carCursor;
      }
    };
  }, []);
  
  // Применяем эффект шлейфа при быстром движении
  useEffect(() => {
    if (!isActive || speed <= 1.5) return;
    
    const createTrail = () => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${position.x}px`;
      trail.style.top = `${position.y}px`;
      document.body.appendChild(trail);
      
      // Удаляем элемент после анимации
      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      }, 500);
    };
    
    createTrail();
  }, [position, speed, isActive]);
  
  // Не рендерим курсор на мобильных устройствах
  if (!isActive) return null;
  
  // Получаем SVG в зависимости от выбранного варианта
  const getSvgForVariant = () => {
    switch (variant) {
      case 'suv':
        return (
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path className="car-body" d="M19,9c-0.5-3-3-5-7-5S5.5,6,5,9H3v5h1v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h10v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h1v-5H19z"/>
            <circle className="car-wheel" cx="7.5" cy="14" r="2"/>
            <circle className="car-wheel" cx="16.5" cy="14" r="2"/>
            <rect className="car-roof" x="7" y="5" width="10" height="3" fill="#333"/>
          </svg>
        );
      case 'sport':
        return (
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path className="car-body" d="M20,11c-1-5-4-7-8-7S5,6,4,11H2v3h1v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h12v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h1v-3H20z"/>
            <circle className="car-wheel" cx="7" cy="13" r="1.5"/>
            <circle className="car-wheel" cx="17" cy="13" r="1.5"/>
            <path className="car-detail" d="M4,11l3-3h10l3,3" fill="none" stroke="#333" strokeWidth="0.5"/>
          </svg>
        );
      default: // sedan
        return (
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path className="car-body" d="M19,10c-0.5-4-3.5-6-7-6S5.5,6,5,10H3c-0.6,0-1,0.4-1,1v3c0,0.6,0.4,1,1,1h1v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h10v1c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h1c0.6,0,1-0.4,1-1v-3c0-0.6-0.4-1-1-1H19z"/>
            <circle className="car-wheel" cx="7.5" cy="13.5" r="1.5"/>
            <circle className="car-wheel" cx="16.5" cy="13.5" r="1.5"/>
          </svg>
        );
    }
  };
  
  const wheelAnimation = isDragging || isLoading 
    ? 'animate-spin' 
    : '';
  
  // Стили для курсора в зависимости от состояния
  const cursorStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`
  };
  
  const cursorClasses = [
    'custom-cursor-wrapper',
    isHovering ? 'cursor-hover' : '',
    isClicking ? 'cursor-active' : '',
    isDragging ? 'cursor-dragging' : '',
    isLoading ? 'cursor-loading' : ''
  ].filter(Boolean).join(' ');
  
  const carStyle = {
    transform: speed > 0.5 ? `rotate(${angle}deg)` : 'rotate(0deg)'
  };
  
  return (
    <>
      <div className={cursorClasses} style={cursorStyle} ref={cursorRef}>
        <div className="custom-cursor">
          <div className="cursor-car" style={carStyle}>
            {getSvgForVariant()}
            <div className={`exhaust-effect ${isClicking ? 'active' : ''}`}></div>
          </div>
        </div>
      </div>
      
      {/* Добавляем глобальные стили для курсора */}
      <style jsx global>{`
        /* Скрываем стандартный курсор */
        .hide-default-cursor,
        .hide-default-cursor * {
          cursor: none !important;
        }
        
        /* Контейнер для курсора */
        .custom-cursor-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          pointer-events: none;
          z-index: 9999;
          transition: opacity 0.3s ease;
          will-change: transform;
        }
        
        .custom-cursor {
          position: absolute;
          top: -16px; /* Половина высоты */
          left: -16px; /* Половина ширины */
          width: 32px;
          height: 32px;
          transition: transform 0.1s ease, opacity 0.2s ease;
        }
        
        .cursor-car {
          width: 100%;
          height: 100%;
          transition: transform 0.2s ease;
        }
        
        /* Стили для SVG элементов машины */
        .car-body {
          fill: var(--primary, #7B2CBF);
          transition: fill 0.2s ease;
        }
        
        .car-wheel {
          fill: #333;
          transform-origin: center;
        }
        
        .car-roof {
          fill: #333;
        }
        
        .car-detail {
          fill: none;
          stroke: #333;
          stroke-width: 0.5;
        }
        
        /* Выхлопной эффект при клике */
        .exhaust-effect {
          position: absolute;
          width: 0;
          height: 0;
          bottom: 0;
          left: 2px;
          background: rgba(200, 200, 200, 0.6);
          border-radius: 50%;
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .exhaust-effect.active {
          width: 10px;
          height: 10px;
          opacity: 0.8;
          transform: translate(-12px, 0);
        }
        
        /* Состояния курсора */
        .cursor-hover .custom-cursor {
          transform: scale(1.2);
        }
        
        .cursor-active .custom-cursor {
          transform: scale(0.9);
        }
        
        .cursor-hover .car-body {
          fill: var(--accent, #E0AAFF);
        }
        
        /* Анимация колес при перетаскивании */
        .cursor-dragging .car-wheel,
        .cursor-loading .car-wheel {
          animation: wheelRotation 0.5s linear infinite;
        }
        
        @keyframes wheelRotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Эффект шлейфа при быстром движении */
        .cursor-trail {
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--primary, #7B2CBF);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          opacity: 0.4;
          animation: trailFade 0.5s forwards;
        }
        
        @keyframes trailFade {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(0); opacity: 0; }
        }
        
        /* Адаптивность для мобильных устройств */
        @media (max-width: 768px) {
          .custom-cursor-wrapper,
          .cursor-trail {
            display: none !important;
          }
          
          .hide-default-cursor,
          .hide-default-cursor * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}