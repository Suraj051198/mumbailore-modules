import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <img 
            src="https://i.pinimg.com/736x/64/02/60/6402609096a6df1de4d42017b30b341a.jpg" 
            alt="MumbaiLore Logo" 
            className="logo" 
          />
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/stories" className="nav-link">Stories</Link>
          <Link to="/submit" className="nav-link">Submit</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header