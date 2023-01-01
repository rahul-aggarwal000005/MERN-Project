import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import CreateScreen from './screens/SingleNote/CreateScreen'
import LandingPage from './screens/LandingPage/LandingPage'
import LoginPage from './screens/LoginScreen/LoginScreen'
import MyNotes from './screens/MyNotes/MyNotes'
import RegisterPage from './screens/RegisterScreen/RegisterScreen'
import SingleNote from './screens/SingleNote/SingleNote'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'

const App: React.FC = () => {
  const [search, setSearch] = useState('')
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/createNote" element={<CreateScreen />} />
          <Route path="/notes/:id" element={<SingleNote />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
