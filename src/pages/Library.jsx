
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '@clerk/clerk-react';
import { Container, Button } from 'react-bootstrap';
import GameCard from '../components/GameCard';
import './Library.css';

const Library = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const bookmarks = useSelector(state => state.bookmarks.games);

  if (!isLoaded) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading your games...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="signin-prompt">
        <div className="signin-card">
          <h3>Sign In Required</h3>
          <p>Please sign in to view your game library</p>
          <div className="button-group">
            <Button href="/sign-in" variant="primary">Sign In</Button>
            <Button href="/sign-up" variant="outline-secondary">Create Account</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Container className="library-container">
      <h2 className="library-title">Your Game Library</h2>
      
      {bookmarks.length === 0 ? (
        <div className="empty-library">
          <p>No games saved yet</p>
          <Button href="/" variant="primary">Browse Games</Button>
        </div>
      ) : (
        <div className="game-grid">
          {bookmarks.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Library;