// src/Header.jsx
import "./Header.css"; // Import the corresponding CSS file for styling

const Header = () => {
  return (
    <div id="header">
      <div className="container">
        <nav>
          <img src="media/new.png" className="logo" alt="Logo" />
          <ul id="sidemenu">
            <li>
              <a href="https://shaikharish.netlify.app/">Home</a>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
