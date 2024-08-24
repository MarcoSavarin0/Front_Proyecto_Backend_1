/* eslint-disable react/prop-types */
import React, { useState } from 'react';
export const Alert = ({ type, message, duration = 5000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    const baseClasses = "flex items-center justify-between px-4 py-3 rounded-md shadow-lg text-sm font-medium transition-opacity ease-in-out duration-300";
    let typeClasses = "";
  
    switch (type) {
      case 'success':
        typeClasses = "bg-green-100 text-green-800";
        break;
      case 'error':
        typeClasses = "bg-red-100 text-red-800";
        break;
      case 'warning':
        typeClasses = "bg-yellow-100 text-yellow-800";
        break;
      case 'info':
        typeClasses = "bg-blue-100 text-blue-800";
        break;
      default:
        typeClasses = "bg-gray-100 text-gray-800";
    }
  
    // Automatically hide notification after the duration
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
  
      return () => clearTimeout(timer);
    }, [duration]);
  
    if (!isVisible) return null;
  
    return (
      <div className={`${baseClasses} ${typeClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <span>{message}</span>
        <button onClick={() => setIsVisible(false)} className="ml-4 text-xl font-bold leading-none focus:outline-none">
          &times;
        </button>
      </div>
    );
  }; 
