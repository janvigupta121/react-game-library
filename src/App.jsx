

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import Home from './pages/Home';
import Library from './pages/Library';
import GameDetailPage from './pages/GameDetailPage';
import Header from './components/Header';
import './PreSignIn.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType) => {
    setActiveFilter(filterType);
  };

  const WelcomeScreen = () => (
    <div className="pre-signin-screen">
      <h1>Welcome to Game Library</h1>
      <div className="signin-container">
        <button 
          onClick={() => window.location.href = '/sign-in'}
          className="signin-button"
        >
          Sign In
        </button>
      </div>
    </div>
  );

  const SignInScreen = () => (
    <div className="signin-form-container">
      <SignIn 
        routing="path"
        path="/sign-in"
        appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'shadow-none bg-transparent',
            headerTitle: 'hidden',
            headerSubtitle: 'hidden',
            formFieldInput: 'border-purple-500',
            formButtonPrimary: 'bg-purple-600 hover:bg-purple-700',
            footerActionText: 'text-gray-400',
            footerActionLink: 'text-purple-400 hover:text-purple-300'
          }
        }}
      />
    </div>
  );

  return (
    <>
      
      <Header onSearch={handleSearch} />

      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <SignedIn>
                <Home 
                  searchQuery={searchQuery} 
                  activeFilter={activeFilter} 
                  onFilterChange={handleFilterChange} 
                />
              </SignedIn>
              <SignedOut>
                <WelcomeScreen />
              </SignedOut>
            </>
          } 
        />

        <Route path="/sign-in" element={<SignInScreen />} />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
        
        <Route 
          path="/library" 
          element={
            <>
              <SignedIn><Library /></SignedIn>
              <SignedOut><SignInScreen /></SignedOut>
            </>
          } 
        />

        <Route path="/game/:id" element={<GameDetailPage />} />
      </Routes>
    </>
  );
};

export default App;
