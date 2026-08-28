import React from "react";
import { Helmet } from "react-helmet";
import {
  FaGithub,
  FaEnvelope,
  FaCode,
  FaReact,
  FaJs,
  FaDatabase,
  FaTerminal,
  FaUniversity,
} from "react-icons/fa"; // More icons
import { SiCplusplus, SiHtml5, SiCss3 } from "react-icons/si"; // Even more icons
import "./About.css";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - Algorithms Visualizer</title>
        <meta name="description" content="Learn about the developer and the purpose of Algorithms Visualizer." />
        <meta name="keywords" content="About, Developer, Algorithms Visualizer, Educational Tool" />
        <meta property="og:title" content="About - Algorithms Visualizer" />
        <meta property="og:description" content="Learn about the developer and the purpose of Algorithms Visualizer." />
        <meta property="og:image" content="/og-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About - Algorithms Visualizer" />
        <meta name="twitter:description" content="Learn about the developer and the purpose of Algorithms Visualizer." />
        <meta name="twitter:image" content="/twitter-thumbnail.jpg" />
      </Helmet>
      <div className="about-container">
        <header className="about-header">
          <h1>About This Project</h1>
          <p>
           An interactive educational workspace designed to demystify the mechanics of optimal prefix data compression.
          </p>
        </header>

        {/* Bio Section */}
        <section className="bio-section">
          <h2>
           🚀 Project Core Purpose
          </h2>
          <p>
            The Huffman Encoding Visualizer is a dynamic React-based platform built to help students, developers, and data science enthusiasts explore greedy optimization. By transforming theoretical algorithmic steps into crisp, visible animations, it bridges the gap between abstract computer science theory and real-world implementation.
          </p>
          <p>
            My academic journey at Green University has provided me with a solid
            foundation in computer science principles, and I'm always eager to
            apply that knowledge to real-world projects. I'm particularly fascinated
            by the intersection of theory and practice.
          </p>
        </section>

        {/* Education Section */}
        <section className="education-section">
          <h2>💻Built With</h2>
         <p>
          <strong>Framework Engine:</strong> React (Functional Components & Hooks)
          </p>
          <p>
            <strong>Interface Router:</strong> React Router DOM navigation context
            </p>
           <p>
            <strong>Style Layouts:</strong> Modular Vanilla CSS paired with vector icons
            </p>

        </section>

        {/* Skills Section */}
        <section className="skills-section">
          <h2>💡 Skills & Expertise</h2>
                  <div className="skills-grid">
          <div className="skill-card">
            <FaTerminal /> Tree Construction
          </div>
          <div className="skill-card">
            <FaCode /> Binary Prefix Coding
          </div>
          <div className="skill-card">
            <FaReact /> Interactive Animation
          </div>
          <div className="skill-card">
            <FaDatabase /> Data Compression
          </div>
        </div>

        </section>

        {/* Projects Section */}
        <section className="projects-section">
          <h2> 🛠️ Projects</h2>
          <p>
            Here is the core application visualizer bundled inside this platform:
          </p>
          <ul>
                      <li>
            <a href="/huffman-visualizer" className="project-link">
              <FaCode /> Huffman Encoder Visualizer
            </a>{" "}
            - An interactive environment to build custom tree weights and compress string assets step by step.
          </li>
            {/* Add more projects */}
          </ul>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <h2>📬 Get in Touch</h2>
          <p>
            Feel free to connect with me for **collaborations, projects, or just a
            chat!**
          </p>
          <div className="contact-links">
           <div className="contact-link">
           <FaEnvelope /> Email Me
          </div>
          <div className="contact-link">
          <FaGithub /> GitHub Profile
          </div>        
            {/* Add other social links */}
          </div>
        </section>
      </div>
    </>
  );
};

export default About;