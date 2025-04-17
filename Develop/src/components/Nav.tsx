import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>Candidate Search</h1>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Search
        </Link>
        <Link to="/saved" style={styles.link}>
          Saved Candidates
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#282c34",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Nav;
