import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Swipe = () => {
  const [matches, setMatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('/api/matches');
        setMatches(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMatches();
  }, []);

  const handleSwipe = async (direction) => {
    try {
      const response = await axios.post('/api/swipe', { direction });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Swipe</h1>
      {matches.length > 0 && (
        <div>
          <p>Match {currentIndex + 1} of {matches.length}</p>
          <button onClick={() => handleSwipe('left')}>Left</button>
          <button onClick={() => handleSwipe('right')}>Right</button>
        </div>
      )}
    </div>
  );
};

export default Swipe;