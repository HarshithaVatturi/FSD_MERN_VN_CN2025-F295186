import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="hero">
        <h1>Welcome to My College</h1>
        <p>Where your dreams, ideas, and career come together.</p>
        <Link to="/departments">
          <button>Explore Departments</button>
        </Link>
      </section>

      <section>
        <h2>Why This College?</h2>
        <ul>
          <li>Top-ranked faculty with strong industry experience.</li>
          <li>Excellent placement record in core and IT companies.</li>
          <li>Modern labs, research centers, and a vibrant campus life.</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
