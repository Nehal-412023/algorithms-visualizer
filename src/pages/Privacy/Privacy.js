import React from "react";
import { Helmet } from "react-helmet";
import "./Privacy.css"; // Corrected import path

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Algorithms Visualizer</title>
        <meta name="description" content="Read the privacy policy for Algorithms Visualizer." />
        <meta name="keywords" content="Privacy Policy, Data Protection, Algorithms Visualizer" />
        <meta property="og:title" content="Privacy Policy - Algorithms Visualizer" />
        <meta property="og:description" content="Read the privacy policy for Algorithms Visualizer." />
        <meta property="og:image" content="/og-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy - Algorithms Visualizer" />
        <meta name="twitter:description" content="Read the privacy policy for Algorithms Visualizer." />
        <meta name="twitter:image" content="/twitter-thumbnail.jpg" />
      </Helmet>
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-date">Last Updated: August 21, 2026</p>

        <section className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
           Welcome to our Huffman Encoding Visualizer project. Your privacy is important to us, and we are committed to protecting any data you provide.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Information We Collect</h2>
          <p>
           This application does not collect personal data. Any usage data (e.g., interaction with the Huffman tree visualizer framework) is stored locally on your device and not shared with third parties.
          </p>
        </section>

        <section className="privacy-section">
          <h2>3. Cookies</h2>
          <p>
            Our website utilizes local storage to save your custom string inputs and character frequency weights for the Huffman tree simulation, ensuring a seamless user experience without storing data on a remote server.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. Third-Party Services</h2>
         <p>
           If any third-party asset libraries are utilized to render the interactive binary tree graphics, no personal string text or compressed binary bitstreams are transmitted to their servers.
         </p>

        </section>

        <section className="privacy-section">
          <h2>5. Changes to This Policy</h2>
         <p>
           We reserve the right to update this Privacy Policy as new Huffman tree capabilities or data compression analytics tools are integrated into the application interface.
          </p>

        </section>

        <section className="privacy-section">
          <h2>6. Contact</h2>
         <p>
           If you have any questions regarding this Privacy Policy, please contact us.
         </p>

        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;