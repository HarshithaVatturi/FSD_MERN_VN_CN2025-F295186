import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h3>Home Page</h3>;
}

function About() {
  return <h3>About Page – This is a simple React Router demo.</h3>;
}

function Electronics() {
  return (
    <div>
      <h4>Electronics Products</h4>
      <ul>
        <li>TV</li>
        <li>Laptop</li>
        <li>Mobile Phone</li>
      </ul>
    </div>
  );
}

function Fashion() {
  return (
    <div>
      <h4>Fashion Products</h4>
      <ul>
        <li>Shirt</li>
        <li>Jeans</li>
        <li>Shoes</li>
      </ul>
    </div>
  );
}

function ProductsLayout() {
  return (
    <div>
      <h3>Products Page</h3>

      {/* Q20: Nested links */}
      <nav style={{ marginBottom: "10px" }}>
        <Link to="electronics" style={{ marginRight: "10px" }}>
          Electronics
        </Link>
        <Link to="fashion">Fashion</Link>
      </nav>

      {/* Nested Routes */}
      <Routes>
        <Route path="electronics" element={<Electronics />} />
        <Route path="fashion" element={<Fashion />} />
      </Routes>
    </div>
  );
}

function NineteenQ() {
  return (
    <div>
      <h2>React Router with Nested Routes</h2>

      <BrowserRouter>
        <nav style={{ marginBottom: "10px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>
            Home
          </Link>
          <Link to="/about" style={{ marginRight: "10px" }}>
            About
          </Link>
          <Link to="/products">Products</Link>
        </nav>

        <Routes>
          {/* Q19: Top-level routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Q20: Products route with nested children */}
          <Route path="/products/*" element={<ProductsLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default NineteenQ;
