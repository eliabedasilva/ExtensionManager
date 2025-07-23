import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import CardList from './components/CardList.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Header/>
      <CardList/>
    </div>
  )
}

export default App
