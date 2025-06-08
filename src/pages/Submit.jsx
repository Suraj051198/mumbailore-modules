import { useState } from 'react';
import './Submit.css';

const Submit = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    body: ''
  });

  // Error state
  const [errors, setErrors] = useState({});
  
  // Success state
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation - only letters and spaces allowed
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should only contain letters and spaces';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Title validation - must contain at least some letters, not just numbers/special chars
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 80) {
      newErrors.title = 'Title must be less than 80 characters';
    } else if (!/[A-Za-z]/.test(formData.title)) {
      newErrors.title = 'Title must contain at least some letters';
    }
    
    // Body validation
    if (!formData.body.trim()) {
      newErrors.body = 'Story content is required';
    } else if (formData.body.length < 50) {
      newErrors.body = 'Story must be at least 50 characters';
    } else if (formData.body.length > 1000) {
      newErrors.body = 'Story must be less than 1000 characters';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      const response = { success: true };
      
      if (response.success) {
        setIsSubmitted(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          title: '',
          body: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit your story. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Character count display
  const getCharacterCount = (field, value, min, max) => {
    const count = value.length;
    if (count === 0) return '';
    
    if (count < min) {
      return `${count}/${min} characters minimum`;
    }
    return `${count}/${max} characters maximum`;
  };

  return (
    <div className="submit-container">
      <h1>Submit Your Story</h1>
      <p className="submit-intro">Share your Mumbai experience with our community. Selected stories will be featured on our platform.</p>
      
      {isSubmitted ? (
        <div className="success-message">
          <h2>Thank you—your story is under review.</h2>
          <p>We appreciate your contribution to MumbaiLore. Our editorial team will review your submission and get in touch if it's selected for publication.</p>
          <button 
            className="submit-again-btn"
            onClick={() => setIsSubmitted(false)}
          >
            Submit Another Story
          </button>
        </div>
      ) : (
        <form className="submit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={errors.name ? 'error-input' : ''}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="title">Story Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Give your story a compelling title"
              maxLength={80}
              className={errors.title ? 'error-input' : ''}
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
            <div className="character-count">
              {getCharacterCount('title', formData.title, 1, 80)}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="body">Story Content *</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Share your Mumbai story (minimum 50 characters, maximum 1000)"
              rows={8}
              className={errors.body ? 'error-input' : ''}
            ></textarea>
            {errors.body && <div className="error-message">{errors.body}</div>}
            <div className="character-count">
              {getCharacterCount('body', formData.body, 50, 1000)}
            </div>
          </div>
          
          {errors.submit && <div className="error-banner">{errors.submit}</div>}
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Your Story'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Submit