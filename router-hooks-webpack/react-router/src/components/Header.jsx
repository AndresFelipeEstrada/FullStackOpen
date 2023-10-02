import { Link } from "react-router-dom";

const Header = ({ user }) => {
  const padding = {
    padding: 5,
  };
  return (
    <>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/notes">
          Notes
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={{ padding: 5 }} to="/login">
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;
