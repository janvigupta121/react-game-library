import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap'

const GameDetailPage = () => {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`
        )
        setGame(response.data)
      } catch (error) {
        console.error("Error fetching game details:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchGameDetails()
  }, [id])

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />

  return (
    <Container className="mt-4">
      {game && (
        <Card>
          <Row>
           
            <Col md={4}>
              <Card.Img 
                variant="top" 
                src={game.background_image} 
                alt={game.name}
              />
            </Col>

            {/* Game details */}
            <Col md={8}>
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: game.description }} />
                
                {/* Additional details */}
                <div className="mt-3">
                  <strong>Released:</strong> {game.released}<br />
                  <strong>Rating:</strong> {game.rating}/5<br />
                  <strong>Platforms:</strong> {game.platforms?.map(p => p.platform.name).join(', ')}
                </div>

                <Button 
  href="/" 
  style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' }} 
  className="mt-3"
>
  Back to Home
</Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  )
}

export default GameDetailPage