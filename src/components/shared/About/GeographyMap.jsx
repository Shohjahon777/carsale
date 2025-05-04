import { motion } from 'framer-motion';

export const GeographyMap = ({ countries, activeCountry, setActiveCountry }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden p-5 shadow-lg border border-gray-100 dark:border-gray-700 h-[400px] relative">
      <div className="absolute inset-0 p-5">
        <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-700/50 overflow-hidden relative">
          {/* Фон карты мира (иллюстративно) */}
          <div className="w-full h-full absolute left-0 top-0 bg-gradient-to-br from-blue-50 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            {/* Здесь можно будет добавить реальный SVG карты мира */}
            <svg className="w-full h-full opacity-10 dark:opacity-5" viewBox="0 0 800 500">
              <path d="M219.3,141.9c1.4,0.1,0.8-1.1,1.5-1.5s0.8,0.6,1.5,0.5s0.1-1,0.9-1.3c0.8-0.3,1.1-0.7,0.9-1.6s-0.9-0.7-0.9-1.4 s0.8-1.1,1.4-1.1s0.6-0.7,0.9-1.1c0.3-0.4,0.4-1.2,1.1-1c0.8,0.2,1.5-0.1,1.1-1s0.4-1.4,1-1.3c0.6,0.1,1.5-0.3,1.5-1 c0-0.7-0.9-1-0.9-1.4c0-0.5,0.6-0.7,1.1-0.7c0.5,0,0.1-0.9,0.6-0.9c0.5,0,0.8,0.3,1-0.2c0.2-0.5,0.1-0.8,0.9-0.8s0.8,0,1.4-0.1 c0.6-0.1,0.9-0.5,1.5-0.5c0.6,0,1.2,0.2,1.6-0.2s0.4-1.1,1-1.5c0.6-0.4,0.4-1.6,1.3-1.6s0.7-0.5,1.5-0.3c0.8,0.2,1-0.6,1.5-0.8 c0.5-0.2,0.8-0.5,1.4-0.5c0.6,0,1.2,0,1.7-0.2c0.6-0.3,0.1-1.3,0.6-1.3c0.5,0,1.4,0.1,1.4-0.5s0.5-0.6,1-0.8c0.5-0.2,0.7-0.6,1.4-0.6 s0.9-0.1,1.5-0.1s1.1-0.5,1.6-0.5s0.6-0.5,1.1-0.5c0.5,0,0.5-0.6,1-0.6s0.9,0,1.1-0.4c0.2-0.4,0.4-0.2,0.9-0.6 c0.6-0.4,0.8-0.6,1.3-0.6c0.5,0,0.9-0.1,1.2-0.5" fill="none" stroke="#888" strokeWidth="0.5"/>
            </svg>
          </div>
          
          {/* Маркеры на карте для стран */}
          {countries.map((country, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: activeCountry === i ? 1.2 : 1, 
                opacity: 1,
                boxShadow: activeCountry === i ? '0 0 15px rgba(255,255,255,0.5)' : 'none'
              }}
              transition={{ duration: 0.3 }}
              className="absolute cursor-pointer"
              style={{ 
                backgroundColor: country.color,
                top: `${15 + i * 12}%`, 
                left: `${20 + i * 10}%`,
                width: activeCountry === i ? '30px' : '20px',
                height: activeCountry === i ? '30px' : '20px',
                borderRadius: '50%',
                zIndex: activeCountry === i ? 10 : 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white'
              }}
              onClick={() => setActiveCountry(i)}
            >
              <div className={`absolute -top-1 -left-1 w-full h-full rounded-full animate-ping opacity-30`} 
                   style={{ backgroundColor: country.color, animationDuration: `${1 + i*0.2}s` }}></div>
              
              {activeCountry === i && (
                <div className="text-white text-xs font-bold">{country.dealers}</div>
              )}
            </motion.div>
          ))}
          
          {/* Информация о выбранной стране */}
          {activeCountry !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: countries[activeCountry].color }}></div>
                <span className="font-medium">{countries[activeCountry].name}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Количество дилеров: <span className="font-semibold text-primary dark:text-primary-light">{countries[activeCountry].dealers}</span>
                </span>
                <div className="flex items-center text-xs">
                  <MapPinIcon className="w-4 h-4 mr-1 text-primary dark:text-primary-light" />
                  <span className="text-gray-500 dark:text-gray-400">
                    {countries[activeCountry].coordinates.lat.toFixed(2)}, {countries[activeCountry].coordinates.lng.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};