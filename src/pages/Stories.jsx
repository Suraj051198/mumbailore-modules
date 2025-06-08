import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import storiesData from '../data/stories';
import './Stories.css';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate API fetch with a timeout
    const fetchStories = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simulate successful data fetch (in a real app, this would be an API call)
        setStories(storiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return <div className="loading">Loading stories...</div>;
  }

  if (error) {
    return (
      <div className="error-banner">
        Unable to load stories. Please try again later.
      </div>
    );
  }

  return (
    <div className="stories-container">
      <h1>Mumbai Stories</h1>
      <div className="stories-grid">
        {stories.map(story => (
          <div className="story-card" key={story.id}>
            <div className="story-image-container">
              <img 
                src={story.imageUrl} 
                alt={story.title} 
                className="story-image" 
              />
              <div className="story-overlay">
                <Link to={`/stories/${story.id}`} className="read-more-link">
                  Read More
                </Link>
              </div>
            </div>
            <div className="story-content">
              <h2 className="story-title">{story.title}</h2>
              <p className="story-snippet">{story.snippet}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;