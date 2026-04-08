import React, { useState } from 'react';
import { Home } from './components/Home';
import { AutorizarVisita } from './components/AutorizarVisita';
import { Amenidades } from './components/Amenidades';
import { Avisos } from './components/Avisos';

export type Screen = 'home' | 'visitas' | 'amenidades' | 'avisos';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={setCurrentScreen} />;
      case 'visitas':
        return <AutorizarVisita onBack={() => setCurrentScreen('home')} />;
      case 'amenidades':
        return <Amenidades onBack={() => setCurrentScreen('home')} />;
      case 'avisos':
        return <Avisos onBack={() => setCurrentScreen('home')} />;
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {renderScreen()}
    </div>
  );
}