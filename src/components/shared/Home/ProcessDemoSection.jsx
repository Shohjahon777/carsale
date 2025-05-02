/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from 'framer-motion';
import * as d3 from 'd3';

export const ProcessDemoSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isD3Ready, setIsD3Ready] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Более интересные и детализированные шаги
  const steps = [
    {
      title: "Импорт автомобилей",
      description: "Автоматическое добавление автомобилей из различных источников с полной технической информацией",
      icon: "🚘",
      features: [
        "Массовый импорт из Excel/CSV",
        "Интеграция с API дилерских центров",
        "Автоматическое обогащение данных из каталогов"
      ],
      benefits: [
        "Экономия 85% времени на заполнении каталога",
        "Автоматический расчет стоимости",
        "Мгновенная публикация на всех площадках"
      ],
      visualization: "import"
    },
    {
      title: "Квалификация лидов",
      description: "Интеллектуальное распределение запросов с автоматической оценкой потенциала",
      icon: "👥",
      features: [
        "ИИ-классификация лидов по приоритету",
        "Автораспределение по опыту менеджеров",
        "Омниканальный сбор контактов"
      ],
      benefits: [
        "Увеличение конверсии в продажу на 37%",
        "Сокращение времени первого контакта на 76%",
        "Персонализированные сценарии для каждого клиента"
      ],
      visualization: "leads"
    },
    {
      title: "Ведение сделки",
      description: "Цифровой процесс ведения клиента с предиктивной аналитикой на каждом этапе",
      icon: "🤝",
      features: [
        "Гибкие воронки продаж с автоматизацией",
        "Предиктивная аналитика успешности сделки",
        "Цифровой помощник менеджера"
      ],
      benefits: [
        "Увеличение среднего чека на 15%",
        "Сокращение цикла сделки на 40%",
        "Полная прозрачность процесса для клиента"
      ],
      visualization: "deal"
    },
    {
      title: "Цифровое оформление",
      description: "Полностью цифровой процесс документооборота с электронной подписью",
      icon: "📝",
      features: [
        "Электронная подпись документов",
        "Автозаполнение по данным клиента",
        "Интеграция с банками и страховыми"
      ],
      benefits: [
        "Сокращение времени оформления на 90%",
        "Повышение точности документации на 100%",
        "Мгновенная отправка всех копий клиенту"
      ],
      visualization: "docs"
    }
  ];
  
  // Эффект для автоматического переключения шагов при бездействии
  useEffect(() => {
    if (isPlaying && isInView) {
      intervalRef.current = setInterval(() => {
        setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
      }, 8000); // Увеличено для более комфортного просмотра
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isInView, steps.length]);
  
  // Запускаем автоматическое переключение, когда компонент попадает в область видимости
  useEffect(() => {
    if (isInView) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isInView]);
  
  // Функция для визуализации этапа с использованием D3
  useEffect(() => {
    if (!isInView || typeof window === 'undefined') return;
    
    // Очищаем предыдущие визуализации
    const visualization = document.getElementById('process-visualization');
    if (!visualization) return;
    
    try {
      d3.select(visualization).selectAll("*").remove();
      
      const width = visualization.clientWidth;
      const height = visualization.clientHeight;
      
      // Создаем SVG с правильными размерами
      const svg = d3.select(visualization)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("style", "max-width: 100%; height: auto;");
      
      // Устанавливаем флаг готовности D3
      setIsD3Ready(true);
      
      // Общие стили для всех визуализаций
      const defs = svg.append("defs");
      
      // Градиент для всех визуализаций
      const mainGradient = defs.append("linearGradient")
        .attr("id", "mainGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");
        
      mainGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#7B2CBF");
        
      mainGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#9D4EDD");
      
      // Определяем текущую визуализацию
      const currentVisualization = steps[activeStep].visualization;
      
      // Группа для текущей визуализации
      const mainGroup = svg.append("g")
        .attr("opacity", 0)
        .attr("transform", `translate(${width/2}, ${height/2})`);
      
      // Плавное появление визуализации
      mainGroup.transition()
        .duration(800)
        .attr("opacity", 1);
      
      if (currentVisualization === "import") {
        renderImportVisualization(mainGroup, width, height, defs);
      } else if (currentVisualization === "leads") {
        renderLeadsVisualization(mainGroup, width, height, defs);
      } else if (currentVisualization === "deal") {
        renderDealVisualization(mainGroup, width, height, defs);
      } else if (currentVisualization === "docs") {
        renderDocsVisualization(mainGroup, width, height, defs);
      }
    } catch (error) {
      console.error("Ошибка визуализации:", error);
      setIsD3Ready(false);
    }
    
    // Очистка при размонтировании
    return () => {
      if (visualization) {
        d3.select(visualization).selectAll("*").remove();
      }
    };
  }, [activeStep, isInView, steps]);
  
  // Функции для отдельных визуализаций
  const renderImportVisualization = (group, width, height, defs) => {
    // Центрирование группы
    group.attr("transform", `translate(${width/2}, ${height/2})`);
    
    // Создаем фоновую "доску"
    group.append("rect")
      .attr("x", -width/2 + 20)
      .attr("y", -height/2 + 20)
      .attr("width", width - 40)
      .attr("height", height - 40)
      .attr("rx", 10)
      .attr("fill", "#f9f9f9")
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1);
    
    // Создаем градиент для автомобилей
    const carGradient = defs.append("linearGradient")
      .attr("id", "carGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
      
    carGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#7B2CBF");
      
    carGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#9D4EDD");
    
    // Силуэт автомобиля
    const carSilhouette = "M10,40 L70,40 C75,40 75,35 75,35 L75,25 C75,25 75,20 70,20 L55,20 L50,10 L30,10 L25,20 L10,20 C5,20 5,25 5,25 L5,35 C5,35 5,40 10,40 Z";
    
    // Создаем несколько машин
    for (let i = 0; i < 4; i++) {
      const car = group.append("g")
        .attr("transform", `translate(${-width/2 - 100}, ${-height/4 + i * 30})`)
        .attr("opacity", 0);
      
      // Кузов автомобиля
      car.append("path")
        .attr("d", carSilhouette)
        .attr("fill", "url(#carGradient)")
        .attr("stroke", "#5A189A")
        .attr("stroke-width", 1);
      
      // Колеса
      car.append("circle")
        .attr("cx", 20)
        .attr("cy", 40)
        .attr("r", 8)
        .attr("fill", "#333");
        
      car.append("circle")
        .attr("cx", 60)
        .attr("cy", 40)
        .attr("r", 8)
        .attr("fill", "#333");
      
      // Окна
      car.append("rect")
        .attr("x", 30)
        .attr("y", 15)
        .attr("width", 20)
        .attr("height", 10)
        .attr("fill", "#B8C5F7");
      
      // Анимация движения с увеличенными тайм-аутами
      car.transition()
        .delay(i * 800)
        .duration(500)
        .attr("opacity", 1)
        .transition()
        .duration(2500)
        .attr("transform", `translate(${width/2}, ${-height/4 + i * 30})`)
        .transition()
        .delay(200)
        .duration(300)
        .attr("opacity", 0);
    }
    
    // Добавляем базу данных или систему справа
    const database = group.append("g")
      .attr("transform", `translate(${width/3}, 0)`)
      .attr("opacity", 0);
    
    // Корпус базы данных
    database.append("path")
      .attr("d", `M-30,-40 L30,-40 L30,20 L-30,20 Z`)
      .attr("fill", "#f0f0f0")
      .attr("stroke", "#7B2CBF")
      .attr("stroke-width", 2);
    
    // Верхняя часть базы данных
    database.append("ellipse")
      .attr("cx", 0)
      .attr("cy", -40)
      .attr("rx", 30)
      .attr("ry", 10)
      .attr("fill", "#f0f0f0")
      .attr("stroke", "#7B2CBF")
      .attr("stroke-width", 2);
    
    // Нижняя часть базы данных
    database.append("ellipse")
      .attr("cx", 0)
      .attr("cy", 20)
      .attr("rx", 30)
      .attr("ry", 10)
      .attr("fill", "#f0f0f0")
      .attr("stroke", "#7B2CBF")
      .attr("stroke-width", 2);
      
    // Линии данных
    database.append("line")
      .attr("x1", -20)
      .attr("y1", -20)
      .attr("x2", 20)
      .attr("y2", -20)
      .attr("stroke", "#7B2CBF")
      .attr("stroke-width", 2);
      
    database.append("line")
      .attr("x1", -15)
      .attr("y1", -5)
      .attr("x2", 15)
      .attr("y2", -5)
      .attr("stroke", "#7B2CBF")
      .attr("stroke-width", 2);
      
    database.append("line")
      .attr("x1", -20)
      .attr("y1", 10)
      .attr("x2", 20)
      .attr("y2", 10)
      .attr("stroke", "#7B2CBF")
      .attr("stroke-width", 2);
    
    // Анимация появления базы данных
    database.transition()
      .delay(1000)
      .duration(800)
      .attr("opacity", 1);
    
    // Добавляем файл Excel слева
    const excelFile = group.append("g")
      .attr("transform", `translate(${-width/3}, 0)`)
      .attr("opacity", 0);
    
    // Иконка Excel
    excelFile.append("rect")
      .attr("x", -25)
      .attr("y", -30)
      .attr("width", 50)
      .attr("height", 60)
      .attr("rx", 3)
      .attr("fill", "#E2F0D9")
      .attr("stroke", "#217346")
      .attr("stroke-width", 2);
    
    // Логотип Excel
    excelFile.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "24px")
      .attr("font-family", "Arial")
      .attr("font-weight", "bold")
      .attr("fill", "#217346")
      .text("X");
    
    // Анимация появления файла
    excelFile.transition()
      .delay(500)
      .duration(800)
      .attr("opacity", 1)
      .transition()
      .duration(1000)
      .attr("transform", `translate(${-width/3}, -10)`)
      .transition()
      .duration(1000)
      .attr("transform", `translate(${-width/3}, 0)`)
      .on("end", function repeat() {
        d3.select(this)
          .transition()
          .duration(1000)
          .attr("transform", `translate(${-width/3}, -10)`)
          .transition()
          .duration(1000)
          .attr("transform", `translate(${-width/3}, 0)`)
          .on("end", repeat);
      });
  };
  
  const renderLeadsVisualization = (group, width, height, defs) => {
    // Центрирование группы
    group.attr("transform", `translate(${width/2}, ${height/2})`);
    
    // Создаем фоновую "доску"
    group.append("rect")
      .attr("x", -width/2 + 20)
      .attr("y", -height/2 + 20)
      .attr("width", width - 40)
      .attr("height", height - 40)
      .attr("rx", 10)
      .attr("fill", "#f9f9f9")
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1);
    
    // Создаем градиент для воронки
    const funnelGradient = defs.append("linearGradient")
      .attr("id", "funnelGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
      
    funnelGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#7B2CBF");
      
    funnelGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#9D4EDD");
    
    // Рисуем воронку
    const funnelGroup = group.append("g")
      .attr("transform", `translate(${-75}, ${-height/4})`);
      
    funnelGroup.append("path")
      .attr("d", `M0,0 L150,0 L125,${height/2} L25,${height/2} Z`)
      .attr("fill", "url(#funnelGradient)")
      .attr("opacity", 0.7)
      .attr("stroke", "#5A189A")
      .attr("stroke-width", 2);
      
    // Добавляем горизонтальные разделители в воронке
    for (let i = 1; i <= 3; i++) {
      const y = (height/2) * (i/4);
      funnelGroup.append("line")
        .attr("x1", 0 + (150 - 125) * (i/4))
        .attr("y1", y)
        .attr("x2", 150 - (150 - 125) * (i/4))
        .attr("y2", y)
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3");
        
      const labels = ["Новые контакты", "Квалифицированные", "Горячие лиды", "Продажи"];
      
      funnelGroup.append("text")
        .attr("x", -10)
        .attr("y", y - 10)
        .attr("text-anchor", "end")
        .attr("fill", "#666")
        .attr("font-size", "12px")
        .text(labels[i-1]);
        
      if (i === 3) {
        funnelGroup.append("text")
          .attr("x", -10)
          .attr("y", (height/2) + 15)
          .attr("text-anchor", "end")
          .attr("fill", "#666")
          .attr("font-size", "12px")
          .text(labels[3]);
      }
    }
    
    // Анимация движения точек через воронку
    const circleColors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3"];
    
    // Создаем точки с увеличенными тайм-аутами
    for (let i = 0; i < 10; i++) {
      const startDelay = Math.random() * 3000;
      const circleRadius = 5 + Math.random() * 3;
      
      const circle = funnelGroup.append("circle")
        .attr("cx", 75 + (Math.random() * 70 - 35))
        .attr("cy", -20)
        .attr("r", circleRadius)
        .attr("fill", circleColors[Math.floor(Math.random() * circleColors.length)])
        .attr("opacity", 0);
        
      // Движение через воронку с задержкой (увеличены тайм-ауты)
      circle.transition()
        .delay(startDelay)
        .duration(600)
        .attr("opacity", 0.8)
        .transition()
        .duration(4000)
        .attr("cx", 75 + (Math.random() * 30 - 15))
        .attr("cy", height/2 + 10)
        .transition()
        .duration(400)
        .attr("opacity", 0);
    }
    
    // Добавляем индикатор конверсии справа
    const conversionIndicator = group.append("g")
      .attr("transform", `translate(${width/4}, 0)`)
      .attr("opacity", 0);
    
    // Круговой индикатор
    conversionIndicator.append("circle")
      .attr("r", 40)
      .attr("fill", "none")
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 5);
    
    // Процент конверсии (дуга)
    const arc = d3.arc()
      .innerRadius(35)
      .outerRadius(45)
      .startAngle(0)
      .endAngle(Math.PI * 2 * 0.42); // 42% конверсия
    
    conversionIndicator.append("path")
      .attr("d", arc)
      .attr("fill", "#7B2CBF");
    
    // Текст конверсии
    conversionIndicator.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .attr("fill", "#666")
      .text("42%");
    
    conversionIndicator.append("text")
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#666")
      .text("Конверсия");
    
    // Анимация появления индикатора
    conversionIndicator.transition()
      .delay(1500)
      .duration(1000)
      .attr("opacity", 1);
  };
  
  const renderDealVisualization = (group, width, height, defs) => {
    // Центрирование группы
    group.attr("transform", `translate(${width/2}, ${height/2})`);
    
    // Создаем фоновую "доску"
    group.append("rect")
      .attr("x", -width/2 + 20)
      .attr("y", -height/2 + 20)
      .attr("width", width - 40)
      .attr("height", height - 40)
      .attr("rx", 10)
      .attr("fill", "#f9f9f9")
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1);
    
    // Градиент для пути
    const pathGradient = defs.append("linearGradient")
      .attr("id", "pathGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
      
    pathGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#7B2CBF");
      
    pathGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#9D4EDD");
    
    // Создаем путь клиента
    const journeyGroup = group.append("g")
      .attr("transform", `translate(${-width/2.5}, 0)`);
    
    // Добавляем линию пути
    const journeyWidth = width * 0.7;
    const pathData = `M0,0 C${journeyWidth * 0.2},${-height * 0.15} ${journeyWidth * 0.4},${height * 0.15} ${journeyWidth * 0.6},${-height * 0.1} S${journeyWidth * 0.8},${height * 0.1} ${journeyWidth},0`;
    
    const path = journeyGroup.append("path")
      .attr("d", pathData)
      .attr("fill", "none")
      .attr("stroke", "url(#pathGradient)")
      .attr("stroke-width", 5)
      .attr("opacity", 0.7)
      .attr("stroke-dasharray", `${journeyWidth * 2}`)
      .attr("stroke-dashoffset", `${journeyWidth * 2}`);
      
    // Анимация рисования пути
    path.transition()
      .duration(3000)
      .attr("stroke-dashoffset", 0);
      
    // Определяем точки на пути для размещения шагов
    const pathNode = path.node();
    const pathLength = pathNode ? pathNode.getTotalLength() : journeyWidth * 1.5;
    
    const journeySteps = [
      { label: "Первый контакт", icon: "👋", position: 0 },
      { label: "Подбор авто", icon: "🔍", position: 0.25 },
      { label: "Тест-драйв", icon: "🚗", position: 0.5 },
      { label: "Согласование", icon: "✅", position: 0.75 },
      { label: "Завершение", icon: "🎉", position: 1 }
    ];
    
    // Добавляем точки на путь с увеличенными задержками
    journeySteps.forEach((step, i) => {
      const pos = pathNode ? pathNode.getPointAtLength(pathLength * step.position) : { x: journeyWidth * step.position, y: 0 };
      
      // Увеличенная задержка для каждой точки
      const delay = 3500 / journeySteps.length * i + 3000;
      
      // Добавляем круг с иконкой
      const stepGroup = journeyGroup.append("g")
        .attr("transform", `translate(${pos.x}, ${pos.y})`)
        .attr("opacity", 0);
        
      stepGroup.append("circle")
        .attr("r", 18)
        .attr("fill", "white")
        .attr("stroke", "#7B2CBF")
        .attr("stroke-width", 2);
        
      stepGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-size", "16px")
        .text(step.icon);
        
      stepGroup.append("text")
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#666")
        .text(step.label);
        
      // Анимация появления с увеличенными тайм-аутами
      stepGroup.transition()
        .delay(delay)
        .duration(600)
        .attr("opacity", 1)
        .transition()
        .duration(600)
        .attr("transform", `translate(${pos.x}, ${pos.y - 5})`)
        .transition()
        .duration(600)
        .attr("transform", `translate(${pos.x}, ${pos.y})`);
    });
    
    // Движущийся автомобиль по пути
    const car = journeyGroup.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-size", "20px")
      .text("🚗")
      .attr("opacity", 0);
      
    // Анимация движения автомобиля по пути с увеличенными тайм-аутами
    car.transition()
      .delay(3500) // Увеличено
      .duration(600)
      .attr("opacity", 1)
      .transition()
      .duration(5000) // Увеличено
      .attrTween("transform", function() {
        return function(t) {
          const p = pathNode ? pathNode.getPointAtLength(pathLength * t) : { x: journeyWidth * t, y: 0 };
          // Вычисляем угол для поворота автомобиля в направлении движения
          let angle = 0;
          if (pathNode && t < 0.99) {
            const p2 = pathNode.getPointAtLength(pathLength * (t + 0.01));
            angle = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;
          }
          return `translate(${p.x}, ${p.y}) rotate(${angle})`;
        };
      });
  };
  
  const renderDocsVisualization = (group, width, height, defs) => {
    // Центрирование группы
    group.attr("transform", `translate(${width/2}, ${height/2})`);
    
    // Создаем фоновую "доску"
    group.append("rect")
      .attr("x", -width/2 + 20)
      .attr("y", -height/2 + 20)
      .attr("width", width - 40)
      .attr("height", height - 40)
      .attr("rx", 10)
      .attr("fill", "#f9f9f9")
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1);
    
    // Создаем стопку документов в центре
    const docsGroup = group.append("g")
      .attr("transform", `translate(${-60}, ${-70})`);
      
    // Создаем стопку документов с увеличенными задержками
    for (let i = 0; i < 5; i++) {
      const delay = i * 800; // Увеличенная задержка
      const doc = docsGroup.append("g")
        .attr("transform", `translate(${i * 5}, ${i * 7})`)
        .attr("opacity", 0);
        
   doc.append("rect")
        .attr("width", 90)
        .attr("height", 110)
        .attr("rx", 3)
        .attr("fill", "white")
        .attr("stroke", "#7B2CBF")
        .attr("stroke-width", 1.5);
        
      // Линии текста на документе
      for (let j = 0; j < 5; j++) {
        doc.append("line")
          .attr("x1", 10)
          .attr("y1", 20 + j * 15)
          .attr("x2", 80)
          .attr("y2", 20 + j * 15)
          .attr("stroke", "#ccc")
          .attr("stroke-width", 2);
      }
      
      // Заголовок документа
      doc.append("rect")
        .attr("x", 10)
        .attr("y", 5)
        .attr("width", 50)
        .attr("height", 8)
        .attr("fill", "#7B2CBF")
        .attr("opacity", 0.7);
        
      // Анимация появления документа с увеличенными тайм-аутами
      doc.transition()
        .delay(delay)
        .duration(800)
        .attr("opacity", 1)
        .attr("transform", `translate(${i * 5}, ${i * 7 - 10})`)
        .transition()
        .duration(400)
        .attr("transform", `translate(${i * 5}, ${i * 7})`);
    }
    
    // Добавляем штамп "Подписано"
    const stamp = docsGroup.append("g")
      .attr("transform", `translate(15, 40)`)
      .attr("opacity", 0);
      
    stamp.append("circle")
      .attr("r", 25)
      .attr("fill", "none")
      .attr("stroke", "#7B2CBF")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,3");
      
    stamp.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-size", "10px")
      .attr("fill", "#7B2CBF")
      .attr("font-weight", "bold")
      .attr("transform", "rotate(-25)")
      .text("ПОДПИСАНО");
      
    // Анимация появления и вращения штампа с увеличенными тайм-аутами
    stamp.transition()
      .delay(4000) // Увеличено
      .duration(1200)
      .attr("opacity", 1)
      .attr("transform", "translate(45, 40) rotate(0)")
      .transition()
      .duration(800)
      .attr("transform", "translate(45, 40) rotate(-25)");
      
    // Анимация подписи
    const signature = docsGroup.append("g")
      .attr("transform", `translate(25, 80)`)
      .attr("opacity", 0);
      
    // Создаем путь подписи
    const signaturePath = signature.append("path")
      .attr("d", "M0,0 C5,-5 10,5 15,0 S25,-5 30,0 S40,5 45,0")
      .attr("fill", "none")
      .attr("stroke", "#7B2CBF")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "100")
      .attr("stroke-dashoffset", "100");
      
    // Анимация рисования подписи с увеличенными тайм-аутами
    signature.transition()
      .delay(4500) // Увеличено
      .duration(800)
      .attr("opacity", 1);
      
    signaturePath.transition()
      .delay(4500) // Увеличено
      .duration(2000) // Увеличено
      .attr("stroke-dashoffset", "0");
    
    // Добавляем персону справа (электронная подпись)
    const person = group.append("g")
      .attr("transform", `translate(${width/4}, 0)`)
      .attr("opacity", 0);
    
    // Силуэт персоны
    person.append("circle")
      .attr("r", 20)
      .attr("fill", "#7B2CBF")
      .attr("opacity", 0.7);
      
    person.append("circle")
      .attr("cy", -40)
      .attr("r", 15)
      .attr("fill", "#7B2CBF")
      .attr("opacity", 0.7);
      
    // Устройство для подписи
    person.append("rect")
      .attr("x", -35)
      .attr("y", -10)
      .attr("width", 25)
      .attr("height", 15)
      .attr("rx", 2)
      .attr("fill", "#ddd")
      .attr("stroke", "#999")
      .attr("stroke-width", 1);
    
    // Экран устройства
    person.append("rect")
      .attr("x", -32)
      .attr("y", -7)
      .attr("width", 19)
      .attr("height", 9)
      .attr("fill", "#7B2CBF")
      .attr("opacity", 0.3);
    
    // Текст "E-Sign"
    person.append("text")
      .attr("x", -22)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#666")
      .text("E-Sign");
    
    // Анимация появления персоны
    person.transition()
      .delay(3000) // Увеличено
      .duration(1200)
      .attr("opacity", 1);
    
    // Анимация "отправки" документа от персоны к стопке
    const envelope = group.append("text")
      .attr("x", width/4 - 20)
      .attr("y", 0)
      .attr("font-size", "20px")
      .text("✉️")
      .attr("opacity", 0);
      
    // Анимация движения конверта
    envelope.transition()
      .delay(5500) // Увеличено
      .duration(500)
      .attr("opacity", 1)
      .transition()
      .duration(2000) // Увеличено
      .attr("x", -30)
      .attr("y", -30)
      .transition()
      .duration(500)
      .attr("opacity", 0);
  };
  
  const handleStepClick = (index) => {
    setActiveStep(index);
    // Останавливаем автоматическое переключение на более длительное время
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 20000); // Увеличено с 10000 до 20000
  };
  
  return (
    <section 
      className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Как работает наша система
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Полностью автоматизированный процесс от импорта автомобилей до завершения сделки
          </p>
        </motion.div>
        
        <div className="relative mx-auto">
          {/* Плавающие частицы для фона */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-10 w-16 h-16 bg-primary/10 rounded-full animate-float"></div>
            <div className="absolute bottom-20 right-20 w-20 h-20 bg-primary/5 rounded-full animate-float-delay"></div>
            <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-accent/10 rounded-full animate-float-slow"></div>
          </div>
          
          {/* Степпер с горизонтальной линией и индикатором прогресса */}
          <div className="relative mb-12">
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full -translate-y-1/2">
              <motion.div 
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(activeStep + 1) * 100 / steps.length}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {steps.map((step, index) => (
                <motion.button
                  key={index}
                  className={`flex flex-col items-center pt-8 pb-4 px-2 relative`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleStepClick(index)}
                >
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3 shadow-lg ${
                      index === activeStep 
                        ? 'bg-gradient-to-br from-primary to-primary-dark text-white'
                        : 'bg-white dark:bg-gray-800 text-primary dark:text-primary-light border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <motion.div 
                      className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold"
                      animate={{ 
                        scale: index === activeStep ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: index === activeStep ? Infinity : 0,
                        repeatDelay: 1
                      }}
                    >
                      {index + 1}
                    </motion.div>
                  </div>
                  
                  <h3 className={`text-base font-semibold text-center ${
                    index === activeStep 
                      ? 'text-primary dark:text-primary-light' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {step.title}
                  </h3>
                  
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center line-clamp-2 mt-1">
                    {step.description}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Детальная информация о шаге с анимацией */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Левая колонка - информация */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary-light/20 dark:bg-primary-dark/30 flex items-center justify-center text-2xl">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Этап {activeStep + 1} из {steps.length}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {steps[activeStep].description}
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-primary-light/20 dark:bg-primary-dark/30 flex items-center justify-center text-primary text-sm mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Ключевые возможности
                    </h4>
                    
                    <ul className="space-y-2">
                      {steps[activeStep].features.map((feature, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="text-primary dark:text-primary-light mr-2 mt-0.5">✓</span>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-primary-light/20 dark:bg-primary-dark/30 flex items-center justify-center text-primary text-sm mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Результаты для бизнеса
                    </h4>
                    
                    <ul className="space-y-2">
                      {steps[activeStep].benefits.map((benefit, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 + 0.3 }}
                          className="flex items-start"
                        >
                          <span className="text-green-500 dark:text-green-400 mr-2 mt-0.5">➤</span>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeStep === 0 
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-white dark:bg-gray-700 text-primary border border-primary hover:bg-primary/5'
                    }`}
                    onClick={() => activeStep > 0 && handleStepClick(activeStep - 1)}
                    disabled={activeStep === 0}
                  >
                    ← Предыдущий
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeStep === steps.length - 1 
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                    onClick={() => activeStep < steps.length - 1 && handleStepClick(activeStep + 1)}
                    disabled={activeStep === steps.length - 1}
                  >
                    Следующий →
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Правая колонка - улучшенная интерактивная визуализация */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden h-[400px] relative">
              {/* Заголовок визуализации */}
              <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 p-3 border-b border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  Визуализация процесса
                </h4>
              </div>
              
              {/* Контейнер для D3 визуализации */}
              <div id="process-visualization" className="w-full h-[350px] p-4"></div>
              
              {/* Фолбек/плейсхолдер, если D3 не загрузился правильно */}
              <AnimatePresence>
                {!isD3Ready && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white dark:bg-gray-800 flex flex-col items-center justify-center p-6 z-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary-light/20 flex items-center justify-center text-2xl mb-4">
                      {steps[activeStep].icon}
                    </div>
                    <div className="text-center max-w-xs">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        {steps[activeStep].title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {steps[activeStep].description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Индикаторы для мобильной версии */}
          <div className="flex justify-center mt-8 md:hidden">
            {steps.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 mx-1 rounded-full ${
                  idx === activeStep ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => handleStepClick(idx)}
              />
            ))}
          </div>
          
          {/* Дополнительная CTA секция */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Готовы автоматизировать продажи в вашем автосалоне?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Более 200 автодилеров уже используют нашу систему и увеличили продажи в среднем на 35%.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-colors shadow-lg"
              >
                Запросить демонстрацию
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white dark:bg-gray-800 text-primary dark:text-primary-light border border-primary dark:border-primary-light hover:bg-primary/5 dark:hover:bg-primary-dark/10 font-medium rounded-full transition-colors"
              >
                Узнать цены
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* CSS необходимый для анимаций */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 5s ease-in-out 1s infinite;
        }
        
        .animate-float-slow {
          animation: float 6s ease-in-out 2s infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};