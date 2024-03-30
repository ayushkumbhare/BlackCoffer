import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <NavLink to="/">
            <h1>BlackCoffer</h1>
          </NavLink>
        </div>
        <div className="menu">
          <ul className="list">
            <li className="login">
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#294f70" : "",
                  color: isActive ? "white" : "",
                })}
              >
                Home
              </NavLink>
            </li>
            
            <li className="signup">
              <NavLink
                to="/news"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#294f70" : "",
                    color: isActive ? "white" : "",
                  };
                }}
              >
                News
              </NavLink>
            </li>

            <li className="chat">
              <NavLink
                to="/about"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#294f70" : "",
                    color: isActive ? "white" : "",
                  };
                }}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
