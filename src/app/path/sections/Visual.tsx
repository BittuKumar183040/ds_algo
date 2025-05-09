'use client'
import React, { useEffect } from 'react'

const Visual = () => {

  const constructAdj = (edges:number[][], V:number) => {
    const adj: [number, number][][] = Array.from({ length: V }, () => []);
    for (const edge of edges) {
        const [start, end, weight] = edge;
        adj[start].push([end, weight]);
        adj[end].push([start, weight]); 
    }
    return adj;
  }

  const dijkstra = (V:number, edges:number[][], src:number) => {
    const adj = constructAdj(edges, V)
    console.log(adj, " -><- ", src)
  }

  useEffect(()=>{
    const V = 5;
    const edges =  [[0, 1, 4], [0, 2, 8], [1, 4, 6], [2, 3, 2], [3, 4, 10]];
    const result = dijkstra(V, edges, 0)

    console.log("result", result)

  },[])

  return (
    <div>Visual</div>
  )
}

export default Visual