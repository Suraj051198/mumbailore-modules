import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import storiesData from '../data/stories';
import './StoryDetail.css';

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find the story with the matching ID
        const foundStory = storiesData.find(s => s.id === parseInt(id));
        
        if (foundStory) {
          setStory(foundStory);
        } else {
          setError(true);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching story:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading story...</div>;
  }

  if (error || !story) {
    return (
      <div className="error-container">
        <div className="error-banner">Story not found or unable to load.</div>
        <Link to="/stories" className="back-link">Back to Stories</Link>
      </div>
    );
  }

  return (
    <div className="story-detail-container">
      <div className="story-header">
        <h1>{story.title}</h1>
        <div className="story-meta">
          <span>Mumbai Heritage</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </div>
      
      <div className="story-hero-image">
        <img src={story.imageUrl} alt={story.title} />
      </div>
      
      <div className="story-body">
        <p className="story-intro">{story.snippet}</p>
        
        <p>This is a placeholder for the full story content. In a real application, this would contain the complete story text fetched from a database or API.</p>
        
        <p>The story would continue here with more paragraphs, possibly including quotes, historical references, and personal anecdotes that bring Mumbai's rich cultural heritage to life.</p>
        
        <p>Additional content would be displayed here, potentially with more images, maps, or other media that enhance the storytelling experience.</p>
      </div>
      
      <div className="story-navigation">
        <Link to="/stories" className="back-to-stories">Back to All Stories</Link>
      </div>
    </div>
  );
};

export default StoryDetail;