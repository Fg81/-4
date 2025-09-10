import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Hook specifically for saving calculation results
export function useCalculationHistory() {
  const [history, setHistory] = useLocalStorage('30hertz-calculations', []);

  const saveCalculation = (calculatorType: string, inputs: any, results: any) => {
    const calculation = {
      id: Date.now().toString(),
      type: calculatorType,
      inputs,
      results,
      timestamp: new Date().toISOString(),
      title: getCalculationTitle(calculatorType, inputs)
    };

    setHistory((prev: any[]) => [calculation, ...prev.slice(0, 49)]); // Keep last 50 calculations
  };

  const deleteCalculation = (id: string) => {
    setHistory((prev: any[]) => prev.filter((calc: any) => calc.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    saveCalculation,
    deleteCalculation,
    clearHistory
  };
}

function getCalculationTitle(type: string, inputs: any): string {
  switch (type) {
    case 'box':
      return `Короб для ${inputs.speakerSize || 'динамика'}`;
    case 'cable':
      return `Кабель ${inputs.power || 0}Вт, ${inputs.length || 0}м`;
    case 'wiring':
      return `Коммутация ${inputs.speakers || 0} динамиков`;
    case 'port':
      return `Порт для ${inputs.volume || 0}л короба`;
    case 'fuse':
      return `Предохранитель на ${inputs.power || 0}Вт`;
    case 'sine':
      return `Синус ${inputs.frequency || 0}Гц`;
    default:
      return `Расчет ${type}`;
  }
}