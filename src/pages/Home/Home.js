// src/components/Home.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle, FaCode } from "react-icons/fa";
import {
  MdTimeline,
  MdQuestionAnswer,
  MdPlayArrow,
} from "react-icons/md";
import { Helmet } from "react-helmet";
import "./Home.css";



const huffmanFeatures = [
  {
    icon: <FaCode className="feature-icon" />,
    title: "Tree Construction",
    desc: "Build a Huffman tree from character frequencies.",
    backgroundColor: "#f06292", // Added backgroundColor
  },
  {
    icon: <MdTimeline className="feature-icon" />,
    title: "Edge Weights",
    desc: "Visualize 0/1 prefix assignments.",
    backgroundColor: "#4dd0e1", // Added backgroundColor
  },
  {
    icon: <MdQuestionAnswer className="feature-icon" />,
    title: "Step‑by‑Step",
    desc: "See each merge operation in action.",
    backgroundColor: "#a1887f", // Added backgroundColor
  },
  {
    icon: <MdPlayArrow className="feature-icon" />,
    title: "Live Demo",
    desc: "Encode & decode custom text interactively.",
    backgroundColor: "#9575cd", // Added backgroundColor
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Home - Algorithms Visualizer</title>
        <meta name="description" content="Explore Huffman encoding with interactive visualizations." />
        <meta name="keywords" content="Huffman Encoding, Algorithms, Data Structures, Educational Tool" />
        <meta property="og:title" content="Home - Algorithms Visualizer" />
        <meta property="og:description" content="Explore Huffman encoding with interactive visualizations." />
        <meta property="og:image" content="/og-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home - Algorithms Visualizer" />
        <meta name="twitter:description" content="Explore Huffman encoding with interactive visualizations." />
        <meta name="twitter:image" content="/twitter-thumbnail.jpg" />
      </Helmet>
      <div className="home-container">

        {/* Huffman Encoding Banner */}
        <header
          className="hero-section huffman-hero"
          style={{
            background: `linear-gradient(135deg, #8e44ad, #3498db)`,
          }}
        >
          <div className="hero-content">
            <h1 className="hero-title">Huffman Encoding</h1>
            <p className="hero-description">
              Build and traverse your own Huffman tree step by step.
            </p>
            <button className="explore-btn" onClick={() => navigate("/huffman-visualizer")}>
              <FaPlayCircle /> Start Visualizing
            </button>
          </div>
        </header>

        {/* About Section */}
        <section className="about-section">
          <h2 className="section-title">About This Project</h2>
          <p className="section-description">
           focusing on Huffman encoding–through interactive, step‐by‐step animations.
          </p>
        </section>


        {/* Huffman Features */}
        <section className="features-section">
          <h2 className="section-title">Huffman Encoding</h2>
          <div className="features-grid">
            {huffmanFeatures.map((f, i) => (
              <div key={i} className="feature-card" style={{ backgroundColor: f.backgroundColor }}>
                {f.icon}
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}