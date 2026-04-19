/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Home map background — open landscape.
 * Renders inside Map.tsx as the decorative layer behind the path & nodes.
 */

import React from 'react';
import {
  El, PineTree, OakTree, BirchTree, Bush, Flower, Rock,
  Mushroom, LogPile, House, Mountain, Cloud, Bird, Sunflower, Tent,
} from './NatureElements';

export default function MapBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Sky gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, #FFF3D6 0%, #FFEFC7 40%, #FAE8B8 100%)',
      }} />

      {/* Green banks with grass texture */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: '22%',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M5 20 L3 12 M10 20 L11 10 M15 20 L13 14' stroke='%234A7F21' stroke-width='0.8' opacity='0.4'/%3E%3C/svg%3E\"), linear-gradient(to right, #5A8F31 0%, #7AC142 70%, #86CC4F 100%)",
        backgroundSize: '20px 20px, 100%',
        borderRight: '4px solid #4A7F21',
      }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, width: '22%',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M5 20 L3 12 M10 20 L11 10 M15 20 L13 14' stroke='%234A7F21' stroke-width='0.8' opacity='0.4'/%3E%3C/svg%3E\"), linear-gradient(to left, #5A8F31 0%, #7AC142 70%, #86CC4F 100%)",
        backgroundSize: '20px 20px, 100%',
        borderLeft: '4px solid #4A7F21',
      }} />

      {/* LEFT bank scenery */}
      <El top="3%" left="-3%"><Mountain size={95} tone={2} /></El>
      <El top="8%" left="1%"><PineTree size={50} /></El>
      <El top="14%" left="10%"><OakTree size={54} /></El>
      <El top="22%" left="1%"><PineTree size={66} /></El>
      <El top="30%" left="10%"><Bush size={32} /></El>
      <El top="34%" left="1%"><House size={50} /></El>
      <El top="42%" left="11%"><PineTree size={46} tone={1} /></El>
      <El top="46%" left="1%"><BirchTree size={52} /></El>
      <El top="54%" left="10%"><OakTree size={50} tone={1} /></El>
      <El top="60%" left="1%"><Bush size={30} /></El>
      <El top="64%" left="10%"><Flower size={14} color="#E8A0BF" /></El>
      <El top="68%" left="1%"><PineTree size={56} /></El>
      <El top="74%" left="10%"><Sunflower size={20} /></El>
      <El top="78%" left="1%"><Rock size={26} /></El>
      <El top="82%" left="10%"><Flower size={14} color="#F5C518" /></El>
      <El top="86%" left="1%"><OakTree size={54} /></El>
      <El top="92%" left="10%"><Bush size={32} /></El>
      <El top="96%" left="2%"><Mushroom size={16} /></El>

      {/* RIGHT bank scenery */}
      <El top="4%" right="-3%"><Mountain size={90} tone={2} /></El>
      <El top="9%" right="10%"><PineTree size={46} /></El>
      <El top="14%" right="1%"><OakTree size={56} tone={1} /></El>
      <El top="22%" right="10%"><Bush size={30} /></El>
      <El top="26%" right="1%"><PineTree size={64} /></El>
      <El top="34%" right="10%"><Flower size={14} color="#E8A0BF" /></El>
      <El top="38%" right="1%"><BirchTree size={52} /></El>
      <El top="46%" right="10%"><Rock size={28} /></El>
      <El top="50%" right="1%"><OakTree size={48} /></El>
      <El top="58%" right="10%"><Tent size={32} /></El>
      <El top="62%" right="1%"><PineTree size={58} /></El>
      <El top="70%" right="10%"><Sunflower size={20} /></El>
      <El top="74%" right="1%"><Bush size={34} /></El>
      <El top="80%" right="10%"><Flower size={14} color="#FAF0C0" /></El>
      <El top="84%" right="1%"><OakTree size={52} /></El>
      <El top="90%" right="10%"><LogPile size={30} /></El>
      <El top="94%" right="1%"><PineTree size={52} /></El>

      {/* Sky elements */}
      <El top="4%" left="32%" opacity={0.85}><Cloud size={65} /></El>
      <El top="42%" right="32%" opacity={0.75}><Cloud size={55} /></El>
      <El top="78%" left="34%" opacity={0.8}><Cloud size={50} /></El>
      <El top="8%" right="36%" opacity={0.5}><Bird size={16} /></El>
      <El top="50%" left="32%" opacity={0.45}><Bird size={14} /></El>
    </div>
  );
}
