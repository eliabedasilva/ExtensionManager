import { useState } from 'react';
import styles from '../components/Header.module.css';

export default function Header({ onFilterChange, onSearchInputChange }) {
  const [activeFilter, setActiveFilter] = useState('all');

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
      <div className={`${styles.search_container}`}>
        <img src='assets/images/logo-light.svg' alt="logo" />
        <input 
          type="text" 
          name="search" 
          id="search_input" 
          placeholser="Extensions"
          onChange={handleSearchInput}
        />
        <button className={`${styles.search_btn}`}>
          <img src='assets/images/icon-moon.svg' alt="icon_moon"/>
        </button>
      </div>
      
      <div className={`${styles.filters_container}`}>
        <h1>Extension List</h1>
        <div className={`${styles.filters}`}>
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'active' ? 'active' : ''}`}
            onClick={() => handleFilterClick('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'inactive' ? 'active' : ''}`}
            onClick={() => handleFilterClick('inactive')}
          >
            Inactive
          </button>
        </div>
      </div>
    </header>
  );
}