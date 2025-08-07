import { useState } from 'react';
import styles from '../components/Header.module.css';
import { useTheme } from './ThemeContext';

export default function Header({ onFilterChange, onSearchInputChange }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const { theme, toggleTheme } = useTheme()

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  const handleSearchInput = (event) => {
      if (onSearchInputChange){
        onSearchInputChange(event.target.value.toLowerCase())
      }
  }

  return (
    <header>
      <div className={`${styles.search_container} ${styles[theme]}`}>
        {theme === 'light'? 
          <img src='assets/images/logo-light.svg' alt="logo" />:
          <img src="assets/images/logo-dark.svg" alt="logo" />
        }
        <input 
          type="text" 
          name="search" 
          id="search_input" 
          placeholser="Extensions"
          onChange={handleSearchInput}
        />
        <button onClick={toggleTheme} className={`${styles.search_btn} ${styles[theme]}`}>
          <img src={theme === 'light'? 'assets/images/icon-moon.svg': 'assets/images/icon-sun.svg'} alt="icon_moon"/>
        </button>
      </div>
      
      <div className={`${styles.filters_container} ${styles[theme]}`}>
        <h1 className={`${styles[theme]}`}>Extension List</h1>
        <div className={`${styles.filters}`}>
          <button 
            className={`${activeFilter === 'all' ? 'active' : ''} ${styles[theme]}`}
            onClick={() => handleFilterClick('all')}
          >
            All
          </button>
          <button 
            className={`${activeFilter === 'active' ? 'active' : ''} ${styles[theme]}`}
            onClick={() => handleFilterClick('active')}
          >
            Active
          </button>
          <button 
            className={`${activeFilter === 'inactive' ? 'active' : ''} ${styles[theme]}`}
            onClick={() => handleFilterClick('inactive')}
          >
            Inactive
          </button>
        </div>
      </div>
    </header>
  );
}