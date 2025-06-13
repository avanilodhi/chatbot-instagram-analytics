import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IdeaForm from './components/IdeaForm';
import './styles.css';

function App() {
  return (
    <div className="app">
      <h1>Content Idea Assistant 📱</h1>
      <IdeaForm />
    </div>
  );
}

export default App;

