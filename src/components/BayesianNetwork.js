// src/components/BayesianNetwork.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function BayesianNetwork({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Lógica de renderização do gráfico D3.js

  }, [data]);

  return <svg ref={svgRef} width="400" height="300"></svg>;
}

export default BayesianNetwork;
