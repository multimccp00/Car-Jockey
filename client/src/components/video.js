import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Videos = ({ Modelo, Marca }) => {
  const [videos, setVideos] = useState([]);//array de videos

  // API key should be provided via environment variable (not committed to Git)
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // set in .env (see .env.example)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const searchQuery = `${Marca} ${Modelo} car review`; //boa pratica

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {//pedido da API
          params: {
            key: API_KEY,
            q: searchQuery,
            part: 'snippet',
            type: 'video',
            maxResults: 6,
            order: 'relevance'
          }
        });

        setVideos(response.data.items);
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
      }
    };

    fetchVideos();
  }, [Modelo, Marca]);

  return (
    <div className="video-container">
      <h3>Related Videos</h3>
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <a 
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src={video.snippet.thumbnails.medium.url} 
                alt={video.snippet.title}
                className="video-thumbnail"
              />
              <p className="video-title">{video.snippet.title}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;