import React from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Agenda from './pages/Agenda';
import Patients from './pages/Patients';
import Settings from './pages/Settings';
import LoginForm from './components/LoginForm';
import { useAuthStore } from './store/authStore';

function App() {
  const [currentPage, setCurrentPage] = React.useState(window.location.hash || '#dashboard');
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash || '#dashboard');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    if (currentPage.startsWith('#settings')) {
      return <Settings />;
    }

    switch (currentPage) {
      case '#agenda':
        return <Agenda />;
      case '#patients':
        return <Patients />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;