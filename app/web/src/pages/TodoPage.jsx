import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('studyflow-todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('studyflow-todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      }]);
      setInput('');
    }
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>To-Do List - StudyFlow</title>
        <meta name="description" content="Manage your study tasks and track your progress." />
      </Helmet>

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Study tasks</h1>
              <p className="text-muted-foreground">
                {completedCount} of {todos.length} completed
              </p>
            </div>

            <form onSubmit={handleAdd} className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new study task..."
                className="flex-1"
              />
              <Button type="submit" className="transition-all duration-200 active:scale-95">
                <Plus className="h-5 w-5 mr-2" />
                Add
              </Button>
            </form>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {todos.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    <p>No tasks yet. Add your first study task above!</p>
                  </motion.div>
                ) : (
                  todos.map((todo) => (
                    <motion.div
                      key={todo.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.2 }}
                      className="bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => handleToggle(todo.id)}
                          className="transition-all duration-200"
                        />
                        <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {todo.text}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(todo.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}