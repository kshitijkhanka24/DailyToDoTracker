import React, { useEffect, useState } from 'react';
import { Twitter } from 'lucide-react';
import TodoList from './components/TodoList';
import Stats from './components/Stats';
import { Todo, TodoStats } from './types';
import { getInitialTodos, getStoredTodos, storeTodos, updateStats, getStoredStats } from './utils/todoStorage';

function App() {
  const [todos, setTodos] = useState<Todo[]>(getStoredTodos());
  const [stats, setStats] = useState<TodoStats[]>(getStoredStats());
  const [protein, setProtein] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);

  useEffect(() => {
    const checkAndResetTodos = () => {
      const lastResetDate = localStorage.getItem('lastResetDate');
      const now = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' });
      
      if (lastResetDate !== now) {
        const resetTodos = getInitialTodos();
        setTodos(resetTodos);
        storeTodos(resetTodos);
        localStorage.setItem('lastResetDate', now);
        updateStats(resetTodos, stats, setStats);
      }
    };

    checkAndResetTodos();
    const interval = setInterval(checkAndResetTodos, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [stats]);

  const handleTodoToggle = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    storeTodos(updatedTodos);
    updateStats(updatedTodos, stats, setStats);
  };

  const handleNutritionChange = (type: 'protein' | 'calories', value: number) => {
    if (type === 'protein') setProtein(value);
    else setCalories(value);
    
    const updatedTodos = todos.map(todo => {
      if (todo.id === 8) {
        return {
          ...todo,
          title: `Protein: ${protein}g & KCals: ${calories}`,
          completed: protein > 0 && calories > 0
        };
      }
      return todo;
    });
    
    setTodos(updatedTodos);
    storeTodos(updatedTodos);
  };

  const handleTweet = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short'
    });
    
    const tweetText = todos
      .map(todo => `${todo.completed ? '🟢' : '⭕'} ${todo.title}`)
      .join('\n');
    
    const fullTweetText = `📅 ${formattedDate}\n\n${tweetText}\n\n#beingconsistent`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullTweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Daily Tasks</h1>
            <button
              onClick={handleTweet}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Twitter size={20} />
              Tweet Progress
            </button>
          </div>
          
          <TodoList
            todos={todos}
            onToggle={handleTodoToggle}
            protein={protein}
            calories={calories}
            onNutritionChange={handleNutritionChange}
          />
          
          <Stats stats={stats} />
        </div>
      </div>
    </div>
  );
}

export default App;