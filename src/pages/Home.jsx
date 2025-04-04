

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import GameCard from '../components/GameCard';
import './Home.css'; // Importing the CSS file for custom styles

const Home = ({ searchQuery }) => {
  const { isSignedIn } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState({ type: '', value: '' });

  const fetchGames = async () => {
    if (!isSignedIn) return;

    setLoading(true);

    try {
      const params = {
        key: import.meta.env.VITE_RAWG_API_KEY,
        ...(searchQuery && { search: searchQuery }),
        ...(activeFilter.type === 'year' && { dates: `${activeFilter.value}-01-01,${activeFilter.value}-12-31` }),
        ...(activeFilter.type === 'popularity' && { ordering: activeFilter.value === 'Top Rated' ? '-rating' : activeFilter.value === 'Trending' ? '-metacritic' : '-added' }),
        ...(activeFilter.type === 'category' && { genres: activeFilter.value.toLowerCase() }), 
        ...(activeFilter.type === 'tags' && { tags: tagToSlug(activeFilter.value) }), 
      };

      const { data } = await axios.get('https://api.rawg.io/api/games', { params });
      setGames(data.results || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const tagToSlug = (tag) => {
    const tagSlugs = {
      "Singleplayer": "singleplayer",
      "Multiplayer": "multiplayer",
      "Open World": "open-world",
      "Horror": "horror",
      "Sci-Fi": "sci-fi"
    };
    return tagSlugs[tag] || tag.toLowerCase().replace(/\s+/g, '-');
  };

  useEffect(() => {
    fetchGames();
  }, [isSignedIn, activeFilter, searchQuery]);

  return (
    <Container fluid className="d-flex justify-content-center align-items-center main-container">
      <Row className="w-100">
        <Col md={3} lg={2}>
          <Sidebar onFilter={setActiveFilter} activeFilter={activeFilter} />
        </Col>
        <Col md={9} lg={10}>
          {loading ? (
            <Spinner animation="border" className="d-block mx-auto my-5" />
          ) : games.length === 0 ? (
            <div className="alert alert-info text-center">No games found</div>
          ) : (
            <Row>
              {games.map(game => (
                <Col key={game.id} xs={12} sm={6} lg={4} xl={3} className="mb-4">
                  <GameCard game={game} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
