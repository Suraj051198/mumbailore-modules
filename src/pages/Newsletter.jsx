import { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState({
    stories: true,
    events: false,
    heritage: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error
    setError('');
    
    // Validate inputs
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Check if at least one preference is selected
    if (!preferences.stories && !preferences.events && !preferences.heritage) {
      setError('Please select at least one newsletter preference');
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log subscription data
      console.log('Newsletter subscription:', {
        name,
        email,
        preferences
      });
      
      // Success
      setSubscribed(true);
      setName('');
      setEmail('');
      setPreferences({
        stories: true,
        events: false,
        heritage: false
      });
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
      console.error('Newsletter subscription error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewSubscription = () => {
    setSubscribed(false);
  };

  return (
    <div className="newsletter-page">
      <div className="newsletter-container">
        <h1>Subscribe to MumbaiLore Newsletter</h1>
        <p className="newsletter-intro">
          Stay updated with the latest stories, events, and heritage information about Mumbai.
          Our newsletter is sent weekly and you can unsubscribe at any time.
        </p>
        
        {subscribed ? (
          <div className="subscription-success">
            <div className="success-icon">✓</div>
            <h2>Thank You for Subscribing!</h2>
            <p>
              You've successfully subscribed to the MumbaiLore newsletter.
              Check your inbox soon for stories and updates about Mumbai's rich cultural heritage.
            </p>
            <button 
              onClick={handleNewSubscription}
              className="new-subscription-btn"
            >
              Subscribe Another Email
            </button>
          </div>
        ) : (
          <form className="newsletter-signup-form" onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label>Newsletter Preferences</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="stories"
                    checked={preferences.stories}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting}
                  />
                  Mumbai Stories
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="events"
                    checked={preferences.events}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting}
                  />
                  Local Events
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="heritage"
                    checked={preferences.heritage}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting}
                  />
                  Heritage & History
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="subscribe-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
            </button>
            
            <p className="privacy-note">
              By subscribing, you agree to our <a href="/privacy">Privacy Policy</a>.
              We respect your privacy and will never share your information.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter;