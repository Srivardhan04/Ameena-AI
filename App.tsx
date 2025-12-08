import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { UploadedContentProvider } from './contexts/UploadedContentContext';
import HomePage from './pages/HomePage';
import StudyPage from './pages/StudyPage';
import QuizPage from './pages/QuizPage';
import DashboardPage from './pages/DashboardPage';
import ThemeToggleButton from './components/common/ThemeToggleButton';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AmeenaLogoIcon, HomeIcon, BookOpenIcon, ClipboardListIcon, BarChartIcon } from './components/icons/Icons';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/dashboard', label: 'Dashboard', icon: BarChartIcon },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <AmeenaLogoIcon style={{ width: 32, height: 32 }} />
        <h1 className="sidebar-title">Ameena AI</h1>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <Icon style={{ width: 20, height: 20 }} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <ThemeToggleButton />
      </div>
    </aside>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/study/:id" element={<StudyPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <HashRouter>
      <UploadedContentProvider>
        <AppContent />
      </UploadedContentProvider>
    </HashRouter>
  );
};

export default App;

