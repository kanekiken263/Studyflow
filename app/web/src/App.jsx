import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import TimerPage from './pages/TimerPage.jsx';
import TodoPage from './pages/TodoPage.jsx';
import ChatbotPage from './pages/ChatbotPage.jsx';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;