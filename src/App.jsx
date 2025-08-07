import './App.css'
import { useState, useEffect } from "react";
import Header from './components/Header.jsx'
import CardList from './components/CardList.jsx'
import { useTheme } from './components/ThemeContext.jsx';

function App() {
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredExtensions, setFilteredExtensions] = useState([]);

  const { theme } = useTheme()

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/extensions');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setExtensions(data);
        setFilteredExtensions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExtensions();
  }, []);

  const onSearchInputChange = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const result = extensions.filter(ext => ext.name.toLowerCase().startsWith(term));
    setFilteredExtensions(result);
  };

  const onFilterChange = (filter) => {
    if (filter === 'all') {
      setFilteredExtensions(extensions);
    } else {
      const filtered = extensions.filter(ext =>
        filter === 'active' ? ext.isActive : !ext.isActive
      );
      setFilteredExtensions(filtered);
    }
  };

  const handleRemove = (id) => {
    setExtensions(prev => prev.filter(ext => ext.id !== id));
    setFilteredExtensions(prev => prev.filter(ext => ext.id !== id));
  };

  const handleToggleActive = (id, newValue) => {
    const updateList = list =>
      list.map(ext => (ext.id === id ? { ...ext, isActive: newValue } : ext));

    setExtensions(prev => updateList(prev));
    setFilteredExtensions(prev => updateList(prev));
  };

  return (
    <div className={`appcontainer ${theme}`}>
      <div className="app">
        <Header
          onFilterChange={onFilterChange}
          onSearchInputChange={onSearchInputChange}
        />
        <CardList
          extensions={filteredExtensions}
          loading={loading}
          error={error}
          onRemove={handleRemove}
          onToggleActive={handleToggleActive}
        />
      </div>
    </div>
  );
}

export default App;
