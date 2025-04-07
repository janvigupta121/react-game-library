

import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../store/bookmarksSlice';
import './GameCard.css';

const GameCard = ({ game }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.bookmarks.games);
  const isBookmarked = bookmarks.some(b => b.id === game.id);

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<span key={`filled-${i}`} style={{ color: '#FFC107' }}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" style={{ color: '#FFC107' }}>✩</span>);
    }

    while (stars.length < totalStars) {
      stars.push(<span key={`empty-${stars.length}`} style={{ color: '#d3d3d3' }}>☆</span>);
    }

    return stars;
  };

  return (
    <Card className="mb-4 game-card">
      <div className="game-card-img-wrapper">
        <Card.Img
          variant="top"
          src={game.background_image || '/placeholder-game.jpg'}
          className="game-card-img"
        />
      </div>

      <Card.Body className="d-flex flex-column flex-grow-1 p-3">
        <Card.Title className="game-title">{game.name}</Card.Title>

        <div className="tags-container mb-2">
          {game.tags?.slice(0, 3).map(tag => (
            <Badge key={tag.id} className="me-1 custom-badge">
              {tag.name}
            </Badge>
          ))}
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>{renderStars(game.rating)}</div>
            <small className="text-muted">{game.released?.slice(0, 4) || 'N/A'}</small>
          </div>

          <div className="d-flex gap-2">
            <Button
              className="flex-grow-1 details-btn"
              href={`/game/${game.id}`}
            >
              Details
            </Button>
            <Button
              className={`flex-shrink-0 bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={() => isBookmarked
                ? dispatch(removeBookmark(game.id))
                : dispatch(addBookmark(game))
              }
            >
              {isBookmarked ? "❤️" : "♡"}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
