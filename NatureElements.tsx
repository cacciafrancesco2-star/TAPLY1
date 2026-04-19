/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Realistic nature SVG primitives used by the map backgrounds.
 * No emojis, no faces — these render the same illustrations used
 * in the accepted hi-fi design.
 */

import React from 'react';

interface SizedProps {
  size?: number;
  tone?: 0 | 1 | 2;
}

export function PineTree({ size = 60, tone = 0 }: SizedProps) {
  const c1 = ['#2D6B3F', '#3D7A4E', '#4F8B5C'][tone] || '#2D6B3F';
  const c2 = ['#1F4D2E', '#2A5A3A', '#3A6A48'][tone] || '#1F4D2E';
  const trunk = ['#5A3B20', '#6B4A2A', '#7C5A35'][tone] || '#5A3B20';
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84" style={{ display: 'block' }}>
      <rect x="26" y="68" width="8" height="14" fill={trunk} rx="1" />
      <path d="M30 6 L14 32 L20 32 L8 52 L16 52 L4 74 L56 74 L44 52 L52 52 L40 32 L46 32 Z" fill={c1} />
      <path d="M30 6 L14 32 L20 32 L8 52 L30 52 L30 6 Z" fill={c2} opacity="0.35" />
    </svg>
  );
}

export function OakTree({ size = 70, tone = 0 }: SizedProps) {
  const leaf = ['#3E8A4B', '#4F9B5C', '#62AB6E'][tone] || '#3E8A4B';
  const leafDark = ['#2A6A35', '#3A7A45', '#4A8A55'][tone] || '#2A6A35';
  const trunk = ['#5A3B20', '#6B4A2A', '#7C5A35'][tone] || '#5A3B20';
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" style={{ display: 'block' }}>
      <rect x="31" y="44" width="8" height="24" fill={trunk} rx="1.5" />
      <circle cx="20" cy="36" r="14" fill={leafDark} />
      <circle cx="48" cy="34" r="15" fill={leafDark} />
      <circle cx="35" cy="22" r="16" fill={leaf} />
      <circle cx="22" cy="28" r="12" fill={leaf} />
      <circle cx="47" cy="28" r="13" fill={leaf} />
      <circle cx="35" cy="36" r="14" fill={leaf} />
    </svg>
  );
}

export function BirchTree({ size = 60, tone = 0 }: SizedProps) {
  const leaf = ['#7BB563', '#8BC573', '#9BD283'][tone] || '#7BB563';
  const leafDark = ['#5F9A47', '#6FAA57', '#7FBA67'][tone] || '#5F9A47';
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 60 90" style={{ display: 'block' }}>
      <rect x="27" y="40" width="6" height="48" fill="#E8E2D0" rx="1" />
      <rect x="27" y="48" width="6" height="2" fill="#3A3A3A" />
      <rect x="27" y="58" width="6" height="2" fill="#3A3A3A" />
      <rect x="27" y="70" width="6" height="2" fill="#3A3A3A" />
      <ellipse cx="30" cy="24" rx="22" ry="20" fill={leafDark} />
      <ellipse cx="30" cy="20" rx="18" ry="16" fill={leaf} />
    </svg>
  );
}

export function Bush({ size = 40, tone = 0 }: SizedProps) {
  const leaf = ['#4F9B5C', '#5FAB6C', '#6FBB7C'][tone] || '#4F9B5C';
  const leafDark = ['#3A7A45', '#4A8A55', '#5A9A65'][tone] || '#3A7A45';
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 40 28" style={{ display: 'block' }}>
      <ellipse cx="10" cy="20" rx="10" ry="7" fill={leafDark} />
      <ellipse cx="30" cy="20" rx="10" ry="7" fill={leafDark} />
      <ellipse cx="20" cy="16" rx="14" ry="10" fill={leaf} />
    </svg>
  );
}

export function Flower({ size = 18, color = '#E8A0BF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" style={{ display: 'block' }}>
      <circle cx="9" cy="4" r="3.2" fill={color} />
      <circle cx="14" cy="9" r="3.2" fill={color} />
      <circle cx="9" cy="14" r="3.2" fill={color} />
      <circle cx="4" cy="9" r="3.2" fill={color} />
      <circle cx="9" cy="9" r="2.5" fill="#FFD966" />
    </svg>
  );
}

export function Rock({ size = 30, tone = 0 }: SizedProps) {
  const light = ['#B8AEA0', '#C8BEA6', '#D2C9B3'][tone] || '#B8AEA0';
  const dark = ['#8A8070', '#989080', '#A8A090'][tone] || '#8A8070';
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 30 21" style={{ display: 'block' }}>
      <path d="M3 18 Q2 12 8 10 Q10 4 16 5 Q23 3 26 10 Q28 14 25 18 Z" fill={light} />
      <path d="M3 18 Q2 12 8 10 Q10 4 16 5 L 16 18 Z" fill={dark} opacity="0.4" />
    </svg>
  );
}

export function Mushroom({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ display: 'block' }}>
      <rect x="8" y="10" width="4" height="8" fill="#F0E8D4" />
      <ellipse cx="10" cy="9" rx="8" ry="6" fill="#C44536" />
      <circle cx="6" cy="8" r="1.2" fill="#F0E8D4" />
      <circle cx="12" cy="6" r="1" fill="#F0E8D4" />
      <circle cx="14" cy="9" r="1" fill="#F0E8D4" />
    </svg>
  );
}

export function LogPile({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 40 20" style={{ display: 'block' }}>
      <ellipse cx="10" cy="15" rx="7" ry="4" fill="#7C5A35" />
      <ellipse cx="10" cy="14" rx="5" ry="3" fill="#A67C4E" />
      <circle cx="10" cy="14" r="2" fill="#7C5A35" />
      <ellipse cx="26" cy="15" rx="7" ry="4" fill="#7C5A35" />
      <ellipse cx="26" cy="14" rx="5" ry="3" fill="#A67C4E" />
      <circle cx="26" cy="14" r="2" fill="#7C5A35" />
      <ellipse cx="18" cy="8" rx="7" ry="4" fill="#5A3B20" />
      <ellipse cx="18" cy="7" rx="5" ry="3" fill="#8C6A3E" />
      <circle cx="18" cy="7" r="2" fill="#5A3B20" />
    </svg>
  );
}

export function House({ size = 55 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 55 50" style={{ display: 'block' }}>
      <path d="M4 22 L27 4 L50 22 Z" fill="#8B3A2A" />
      <path d="M4 22 L27 4 L27 22 Z" fill="#6B2A1A" />
      <rect x="9" y="22" width="36" height="22" fill="#E8DCC0" />
      <rect x="9" y="22" width="36" height="22" fill="none" stroke="#C4B089" strokeWidth="0.5" />
      <rect x="23" y="30" width="8" height="14" fill="#5A3B20" />
      <circle cx="29" cy="37" r="0.6" fill="#D4AF37" />
      <rect x="13" y="27" width="7" height="7" fill="#7EC4E8" stroke="#5A3B20" strokeWidth="1" />
      <rect x="35" y="27" width="7" height="7" fill="#7EC4E8" stroke="#5A3B20" strokeWidth="1" />
      <rect x="38" y="8" width="5" height="10" fill="#8B3A2A" />
    </svg>
  );
}

export function Mountain({ size = 140, tone = 0 }: SizedProps) {
  const front = ['#6B7A8F', '#8390A3', '#9CA7B7'][tone] || '#6B7A8F';
  const back = ['#8590A5', '#9DA7B7', '#B5BDC9'][tone] || '#8590A5';
  const snow = '#FAF8F2';
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 140 84" style={{ display: 'block' }}>
      <path d="M0 84 L40 20 L70 50 L95 10 L140 84 Z" fill={back} />
      <path d="M95 10 L88 24 L92 28 L95 24 L100 30 L104 24 Z" fill={snow} />
      <path d="M0 84 L30 40 L55 65 L75 45 L100 84 Z" fill={front} />
      <path d="M30 40 L26 50 L30 53 L34 50 Z" fill={snow} />
    </svg>
  );
}

export function Cloud({ size = 80, opacity = 0.9 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size * 0.45} viewBox="0 0 80 36" style={{ display: 'block', opacity }}>
      <ellipse cx="20" cy="24" rx="16" ry="10" fill="#FFFFFF" />
      <ellipse cx="38" cy="18" rx="18" ry="12" fill="#FFFFFF" />
      <ellipse cx="58" cy="22" rx="17" ry="11" fill="#FFFFFF" />
    </svg>
  );
}

export function Bird({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 20 8" style={{ display: 'block' }}>
      <path d="M1 6 Q5 0 10 4 Q15 0 19 6" fill="none" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Tent({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 40 32" style={{ display: 'block' }}>
      <path d="M4 30 L20 4 L36 30 Z" fill="#C44536" />
      <path d="M20 4 L20 30 L12 30 Z" fill="#8B2A1F" />
      <path d="M18 30 L20 18 L22 30 Z" fill="#2A2A2A" />
    </svg>
  );
}

export function Sunflower({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 28 42" style={{ display: 'block' }}>
      <rect x="13" y="16" width="2" height="24" fill="#4A7A35" />
      <path d="M15 28 Q20 26 22 32" stroke="#4A7A35" strokeWidth="1.5" fill="none" />
      <path d="M13 32 Q8 30 6 36" stroke="#4A7A35" strokeWidth="1.5" fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse key={a} cx="14" cy="4" rx="3" ry="6"
          transform={`rotate(${a} 14 14)`} fill="#F5C518" />
      ))}
      <circle cx="14" cy="14" r="5" fill="#6B3A1F" />
      <circle cx="14" cy="14" r="3" fill="#3A1F0F" />
    </svg>
  );
}

interface ElProps {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  rotate?: number;
  opacity?: number;
  z?: number;
  children: React.ReactNode;
}

export function El({ top, left, right, bottom, rotate = 0, opacity = 1, z = 1, children }: ElProps) {
  return (
    <div style={{
      position: 'absolute', top, left, right, bottom,
      transform: `rotate(${rotate}deg)`, opacity, zIndex: z,
      pointerEvents: 'none',
    }}>{children}</div>
  );
}
