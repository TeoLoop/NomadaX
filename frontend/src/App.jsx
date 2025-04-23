import { useState } from 'react'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <HomePage/>
    <Footer/>
    </>
  )
}

export default App
