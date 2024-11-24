import { Todo, TodoStats } from '../types';

export const getInitialTodos = (): Todo[] => [
  { id: 1, title: 'Wake up at 5am', completed: false },
  { id: 2, title: 'Morning Study', completed: false },
  { id: 3, title: 'Morning Exercise', completed: false },
  { id: 4, title: 'College', completed: false },
  { id: 5, title: 'Dev Cohort', completed: false },
  { id: 6, title: 'DSA', completed: false },
  { id: 7, title: 'Assignments', completed: false },
  { id: 8, title: 'Protein: 0g & KCals: 0', completed: false },
];

export const getStoredTodos = (): Todo[] => {
  const stored = localStorage.getItem('todos');
  return stored ? JSON.parse(stored) : getInitialTodos();
};

export const getStoredStats = (): TodoStats[] => {
  const stored = localStorage.getItem('todoStats');
  return stored ? JSON.parse(stored) : [];
};

export const storeTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const updateStats = (
  todos: Todo[],
  currentStats: TodoStats[],
  setStats: (stats: TodoStats[]) => void
) => {
  const today = new Date().toISOString().split('T')[0];
  const completionRate = todos.filter(t => t.completed).length / todos.length;
  
  const newStats = [...currentStats];
  const todayIndex = newStats.findIndex(s => s.date === today);
  
  if (todayIndex === -1) {
    newStats.push({ date: today, completionRate });
  } else {
    newStats[todayIndex].completionRate = completionRate;
  }
  
  // Keep only last 30 days
  const last30Days = newStats.slice(-30);
  
  localStorage.setItem('todoStats', JSON.stringify(last30Days));
  setStats(last30Days);
};