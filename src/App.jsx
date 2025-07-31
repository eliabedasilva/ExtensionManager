import './App.css'
import { useState, useEffect } from "react";
import Header from './components/Header.jsx'
import CardList from './components/CardList.jsx'


function App() {
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtedExtensions, setFiltedExtensions] = useState([])

  const onSearchInputChange = (searchTerm) => {
    console.log(searchTerm)
    if (searchTerm === ''){
      setFiltedExtensions(extensions)
    } else {
        setFiltedExtensions(
          extensions.filter(extension => extension.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
        )
    }
  }

  const onFilterChange = (filter) => {
    if (filter === 'all') {
      setFiltedExtensions(extensions);
    } else if (filter === 'active') {
      setFiltedExtensions(
        extensions.filter(extension => extension.isActive)
      );
    } else if (filter === 'inactive') {
      setFiltedExtensions(
        extensions.filter(extension => !extension.isActive)
      );
    }
  };

  useEffect(() => {
      const fetchExtensions = async () => {
          try {
              setLoading(true);
              const response = await fetch('http://localhost:3001/extensions'); 
              
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              
              const data = await response.json();
              setExtensions(data);
              setFiltedExtensions(data)
          } catch (err) {
              setError(err.message);
              console.error('Erro ao buscar extensões:', err);
          } finally {
              setLoading(false);
          }
      };

      fetchExtensions();
  }, []);


  return (
    <div className="app">
      <Header
        onFilterChange={onFilterChange}
        onSearchInputChange={onSearchInputChange}
      />
      <CardList
        extensions={filtedExtensions}
        setExtensions={setExtensions}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default App
