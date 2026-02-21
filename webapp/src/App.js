import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeProvider, useDarkMode } from './DarkModeContext';
import Signup from './Sign/Signup';
import Mainpage from './Mainpage';
import Signin from './Sign/Signin';
import Videowatch from './Videowatch/Videowatch';
import Addingvideo from './UserVideos/Addingvideo';
import Myvideos from './UserVideos/Myvideos';
import AppProvider from './contexts/AppProvider';
import ScrollingUp from "./ScrollingUp";


function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <ScrollingUp/>
        <AppProvider>
        <AppContent />
        </AppProvider>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

function AppContent() {
  
  const { darkMode } = useDarkMode();
  
  return (
    <Routes> {/* Defining routes */}
      <Route path='/' element={<Mainpage/>} /> {/* Route for the main page */}
      <Route path='/signup' element={<Signup/>} /> {/* Route for the signup page */}
      <Route path='/signin' element={<Signin/>} /> {/* Route for the signin page */}
      <Route path='/Addingvideo' element={<Addingvideo/>} /> {/* Route for adding a video */}
      <Route path="/videowatch/:id/:creator" element={<Videowatch  key="uniquevalue" />} /> {/* Route for watching a video */}
      <Route path='/Myvideos/:id' element={<Myvideos/>} /> {/* Route for my videos */}
    </Routes>
  );
}

export default App;

