import React from 'react';
import { Check } from 'lucide-react';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  protein: number;
  calories: number;
  onNutritionChange: (type: 'protein' | 'calories', value: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  protein,
  calories,
  onNutritionChange,
}) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <button
            onClick={() => onToggle(todo.id)}
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
              todo.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-400 hover:border-green-500'
            }`}
          >
            {todo.completed && <Check size={16} className="text-white" />}
          </button>
          
          {todo.id === 8 ? (
            <div className="flex-1 flex items-center gap-4">
              <span className="text-gray-300">Protein:</span>
              <input
                type="number"
                value={protein}
                onChange={(e) => onNutritionChange('protein', Number(e.target.value))}
                className="w-20 px-2 py-1 bg-gray-800 rounded border border-gray-600 focus:outline-none focus:border-green-500"
                min="0"
              />
              <span className="text-gray-300">g</span>
              
              <span className="text-gray-300 ml-4">KCals:</span>
              <input
                type="number"
                value={calories}
                onChange={(e) => onNutritionChange('calories', Number(e.target.value))}
                className="w-20 px-2 py-1 bg-gray-800 rounded border border-gray-600 focus:outline-none focus:border-green-500"
                min="0"
              />
            </div>
          ) : (
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.title}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;