import React from 'react';
import { TodoStats } from '../types';

interface StatsProps {
  stats: TodoStats[];
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">{currentMonth} Progress</h2>
      <div className="grid grid-cols-7 gap-2">
        {stats.map((day, index) => {
          const date = new Date(day.date);
          const dayOfMonth = date.getDate();
          
          return (
            <div
              key={index}
              className="aspect-square rounded-sm cursor-help"
              style={{
                backgroundColor: `rgb(22, 163, 74, ${day.completionRate * 0.9})`,
              }}
              title={`${dayOfMonth}: ${Math.round(day.completionRate * 100)}% completed`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Stats;