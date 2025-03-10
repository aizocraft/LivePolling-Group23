import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">📊 Live Polls</Link>
      <Link to="/create">➕ Create Poll</Link>
    </nav>
  );
};

export default Navbar;
