import React from 'react';
import { Helmet } from "react-helmet";
import HuffmanVisualizer from '../../components/HuffmanVisualizer/HuffmanVisualizer';
import './HuffmanVisualizerPage.css';

const HuffmanVisualizerPage = () => {
  return (
    <>
      <Helmet>
        <title>Huffman Visualizer - Algorithms Visualizer</title>
        <meta name="description" content="Visualize Huffman encoding with step-by-step animations." />
        <meta name="keywords" content="Huffman Visualizer, Huffman Encoding, Algorithms, Data Compression" />
        <meta property="og:title" content="Huffman Visualizer - Algorithms Visualizer" />
        <meta property="og:description" content="Visualize Huffman encoding with step-by-step animations." />
        <meta property="og:image" content="/og-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Huffman Visualizer - Algorithms Visualizer" />
        <meta name="twitter:description" content="Visualize Huffman encoding with step-by-step animations." />
        <meta name="twitter:image" content="/twitter-thumbnail.jpg" />
      </Helmet>
      <div className="huffman-visualizer-page">
        <header className="page-header">
          <h1>Huffman Encoding Visualizer</h1>
          <p>Visualize the process of Huffman Encoding with interactive animations and detailed explanations.</p>
        </header>
        <main>
          <HuffmanVisualizer />
        </main>
      </div>
    </>
  );
};

export default HuffmanVisualizerPage;