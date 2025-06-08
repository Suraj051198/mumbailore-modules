import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Reset states
    setError('')
    
    // Validate email
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    // Submit form
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Success
      setSubscribed(true)
      setEmail('')
    } catch (err) {
      setError('Failed to subscribe. Please try again.')
      console.error('Newsletter subscription error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTryAgain = () => {
    setSubscribed(false)
    setError('')
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About MumbaiLore</h3>
          <p>Discover the rich cultural heritage and untold stories of Mumbai through our community-driven storytelling platform.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/stories" className="footer-link">Stories</Link></li>
            <li><Link to="/submit" className="footer-link">Submit</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li><Link to="/faq" className="footer-link">FAQ</Link></li>
            <li><Link to="/privacy" className="footer-link">Privacy</Link></li>
            <li><Link to="/terms" className="footer-link">Terms</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Newsletter</h3>
          {subscribed ? (
            <div className="newsletter-success">
              <p>Thank you for subscribing to our newsletter!</p>
              <button 
                onClick={handleTryAgain} 
                className="newsletter-button newsletter-again-btn"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <>
              <p className="newsletter-description">Stay updated with local stories and culture.</p>
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="newsletter-input-group">
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your email address" 
                    className={`newsletter-input ${error ? 'newsletter-input-error' : ''}`}
                    disabled={isSubmitting}
                  />
                  {error && <div className="newsletter-error">{error}</div>}
                </div>
                <button 
                  type="submit" 
                  className="newsletter-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer