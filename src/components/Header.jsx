import { useState } from 'react';
import  Logo from "../assets/images/logo-light.svg?react";
import IconSun from "../assets/images/icon-sun.svg?react";
import IconMoon from "../assets/images/icon-moon.svg?react";
import styles from '../components/Header.module.css';

export default function Header({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    console.log(filter)
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <header>
      <div className={`${styles.search_container}`}>
        <Logo />
        <input type="text" name="search" id="search_input" placeholser="Extensions"/>
        <button className={`${styles.search_btn}`}>
          <IconMoon/>
        </button>
      </div>
      
      <div className={`${styles.filters_container}`}>
        <h1>Extension List</h1>
        <div className="filters">
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