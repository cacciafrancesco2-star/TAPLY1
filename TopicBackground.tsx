/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Topic drawer background — forest clearing (inner level).
 * Warmer golden sky, darker green banks, bigger overlapping canopy,
 * floating leaves. Visibly different from the Home map.
 */

import React from 'react';
import {
  El, PineTree, OakTree, BirchTree, Bush, Flower, Rock,
  Mushroom, LogPile, House, Sunflower, Tent,
} from './NatureElements';

export default function TopicBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Warmer golden sky — filtered forest light */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, #F5E6B8 0%, #F0D98F 50%, #E8C870 100%)',
      }} />

      {/* Dappled light pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Ccircle cx='30' cy='50' r='18' fill='%23FFF5C0' opacity='0.3'/%3E%3Ccircle cx='120' cy='80' r='24' fill='%23FFF5C0' opacity='0.25'/%3E%3Ccircle cx='70' cy='130' r='14' fill='%23FFF5C0' opacity='0.3'/%3E%3Ccircle cx='150' cy='150' r='20' fill='%23FFF5C0' opacity='0.2'/%3E%3C/svg%3E\")",
        backgroundSize: '180px 180px',
        filter: 'blur(8px)',
      }} />

      {/* Deeper green banks with inner shadow */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: '24%',
        background: 'linear-gradient(to right, #2F5F1A 0%, #4A8025 60%, #5F9C32 100%)',
        borderRight: '5px solid #1F4010',
        boxShadow: 'inset -8px 0 20px -5px rgba(0,0,0,0.25)',
      }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, width: '24%',
        background: 'linear-gradient(to left, #2F5F1A 0%, #4A8025 60%, #5F9C32 100%)',
        borderLeft: '5px solid #1F4010',
        boxShadow: 'inset 8px 0 20px -5px rgba(0,0,0,0.25)',
      }} />

      {/* LEFT bank — bigger overlapping canopy */}
      <El top="-2%" left="-2%" z={2}><OakTree size={85} /></El>
      <El top="5%" left="12%" z={2}><PineTree size={66} /></El>
      <El top="12%" left="2%"><OakTree size={72} /></El>
      <El top="20%" left="13%"><BirchTree size={66} /></El>
      <El top="28%" left="2%"><PineTree size={78} /></El>
      <El top="36%" left="13%"><OakTree size={62} /></El>
      <El top="42%" left="1%"><Bush size={40} /></El>
      <El top="46%" left="13%"><House size={55} /></El>
      <El top="54%" left="2%"><OakTree size={74} tone={1} /></El>
      <El top="62%" left="13%"><Sunflower size={26} /></El>
      <El top="66%" left="2%"><BirchTree size={66} /></El>
      <El top="74%" left="14%"><Rock size={32} /></El>
      <El top="78%" left="2%"><PineTree size={72} /></El>
      <El top="86%" left="13%"><Bush size={40} /></El>
      <El top="90%" left="2%"><OakTree size={68} /></El>
      <El top="96%" left="14%"><Mushroom size={20} /></El>

      {/* RIGHT bank */}
      <El top="-2%" right="-2%" z={2}><PineTree size={82} /></El>
      <El top="6%" right="13%" z={2}><OakTree size={66} tone={1} /></El>
      <El top="14%" right="2%"><BirchTree size={70} /></El>
      <El top="22%" right="13%"><Bush size={36} /></El>
      <El top="28%" right="1%"><OakTree size={78} /></El>
      <El top="36%" right="14%"><Flower size={16} color="#E8A0BF" /></El>
      <El top="40%" right="2%"><PineTree size={72} /></El>
      <El top="50%" right="14%"><Rock size={32} /></El>
      <El top="54%" right="2%"><OakTree size={62} /></El>
      <El top="62%" right="13%"><Tent size={42} /></El>
      <El top="66%" right="2%"><BirchTree size={68} /></El>
      <El top="74%" right="14%"><Sunflower size={26} /></El>
      <El top="78%" right="2%"><OakTree size={70} /></El>
      <El top="86%" right="13%"><Bush size={38} /></El>
      <El top="90%" right="2%"><PineTree size={72} /></El>
      <El top="96%" right="13%"><LogPile size={36} /></El>

      {/* Floating leaves */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }}
      >
        {[
          { x: 160, y: 120, r: 30, c: '#C4A545' },
          { x: 240, y: 260, r: -15, c: '#A67C2E' },
          { x: 140, y: 400, r: 60, c: '#C4A545' },
          { x: 260, y: 530, r: -40, c: '#8B6B2A' },
          { x: 170, y: 680, r: 20, c: '#A67C2E' },
        ].map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}>
            <path d="M 0 0 Q 6 -4 10 0 Q 6 4 0 0 Z" fill={l.c} />
            <path d="M 0 0 L 10 0" stroke={l.c} strokeWidth="0.5" />
          </g>
        ))}
      </svg>
    </div>
  );
}
