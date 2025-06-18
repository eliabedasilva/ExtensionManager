import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import ExtensionCard from './components/ExtensionCard.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Header/>
      <ExtensionCard/>
    </div>
  )
}

export default App
