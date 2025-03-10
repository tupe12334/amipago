import React, { FC, useState } from 'react';

type Props =React.PropsWithChildren

const FloatingActionButton:FC<Props> = ({children}) => {
  const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    setIsActive(!isActive);
    // You can add your action logic here
    console.log('FAB clicked');
  };
  
  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={handleClick}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105"
        aria-label="Add Item"
      >
       {children}
      </button>
      
      {isActive && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 w-48 transition-all duration-300">
          <ul className="space-y-2">
            <li className="p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors">Add Task</li>
            <li className="p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors">Add Note</li>
            <li className="p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors">Add Reminder</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;