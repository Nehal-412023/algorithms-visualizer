import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './HuffmanTree.css';

export default function HuffmanTree({ tree }) {
  const svgRef = useRef();
  const containerRef = useRef();
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!tree) return setSteps([]);
    const history = [];
    const walk = (node) => {
      if (node.left && node.right) {
        history.push(JSON.parse(JSON.stringify(node)));
      }
      if (node.left) walk(node.left);
      if (node.right) walk(node.right);
    };
    walk(tree);
    history.push(tree); // Add final tree at the end
    setSteps(history);
    setStepIndex(0);
  }, [tree]);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setStepIndex((i) => {
        if (i < steps.length - 1) {
          return i + 1;
        } else {
          clearInterval(timer);
          setPlaying(false); // Stop playing after finish
          return i;
        }
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [playing, steps.length]);

  useEffect(() => {
    if (!steps[stepIndex]) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    const root = d3.hierarchy(steps[stepIndex], (d) => [d.left, d.right].filter(Boolean));

    const nodeRadius = 30;
    const depth = root.height + 1;
    const leafCount = root.leaves().length;

    const dynamicWidth = Math.max(containerWidth, nodeRadius * 4 * leafCount + margin.left + margin.right);
    const dynamicHeight = Math.max(containerHeight, nodeRadius * 6 * depth + margin.top + margin.bottom);

    const treeLayout = d3.tree()
      .size([dynamicWidth - margin.left - margin.right, dynamicHeight - margin.top - margin.bottom])
      .separation((a, b) => (a.parent === b.parent ? 1.5 : 2.5));

    treeLayout(root);

    const g = svg
      .attr('viewBox', `0 0 ${dynamicWidth} ${dynamicHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw links
    g.selectAll('path.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical().x(d => d.x).y(d => d.y))
      .attr('stroke', '#95a5a6')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .style('opacity', 0)
      .transition().duration(600)
      .style('opacity', 1);

    // Draw nodes
    const nodeGroup = g.selectAll('g.node')
      .data(root.descendants())
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    nodeGroup.append('circle')
      .attr('r', 0)
      .attr('fill', d => d.children ? '#ecf0f1' : '#6c5ce7')
      .attr('stroke', '#34495e')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))')
      .transition().duration(500)
      .attr('r', nodeRadius);

    nodeGroup.append('text')
      .attr('dy', 5)
      .attr('text-anchor', 'middle')
      .text(d => d.children ? `Σ${d.data.weight}` : `${d.data.char}(${d.data.weight})`)
      .attr('fill', '#2c3e50')
      .style('font-size', '1rem')
      .style('font-weight', '600')
      .style('opacity', 0)
      .transition().delay(200).duration(500)
      .style('opacity', 1);
  }, [steps, stepIndex]);

  return (
    <div className="tree-container" ref={containerRef}>
      <div className="tree-controls">
        <button onClick={() => setStepIndex(i => Math.max(i - 1, 0))} disabled={stepIndex === 0}>
          ◀ Prev
        </button>
        <button onClick={() => setPlaying(p => !p)} className={playing ? 'active' : ''}>
          {playing ? '❚❚ Pause' : '▶ Play'}
        </button>
        <button onClick={() => setStepIndex(i => Math.min(i + 1, steps.length - 1))} disabled={stepIndex === steps.length - 1}>
          Next ▶
        </button>
      </div>
      <svg ref={svgRef} className="huffman-tree-svg" />
    </div>
  );
}
