import React, { useState } from 'react';

/**
 * Dual-Phase SVG Form Illustration
 * Visualizes Starting Position vs Peak Execution with joint angles, bar path arrows, and #FF5A36 muscle highlights
 */
export default function ExerciseDiagram({ type = 'bench_press', muscleGroup = 'Chest', className = '' }) {
  const [phase, setPhase] = useState('start'); // 'start' | 'peak'

  const isPeak = phase === 'peak';

  // Render SVG based on exercise diagram type
  const renderSvgContent = () => {
    switch (type) {
      case 'bench_press':
      case 'incline_press':
        return (
          <svg viewBox="0 0 280 180" className="w-full h-full">
            <defs>
              <linearGradient id="coralGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF5A36" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FF8B66" stopOpacity="0.8" />
              </linearGradient>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#00E5A8" />
              </marker>
            </defs>
            {/* Gym Bench */}
            <rect x="40" y="115" width="200" height="14" rx="4" fill="#1C2536" stroke="#243147" strokeWidth="2" />
            <rect x="65" y="129" width="16" height="36" fill="#131A26" stroke="#243147" strokeWidth="2" />
            <rect x="195" y="129" width="16" height="36" fill="#131A26" stroke="#243147" strokeWidth="2" />

            {/* Torso lying on bench */}
            <path d="M 60 115 Q 90 105 130 108 L 190 112 L 190 115 Z" fill="#243147" />

            {/* Target Muscle: Pectoralis Major (Glowing Coral) */}
            <ellipse
              cx="135"
              cy="104"
              rx={isPeak ? "18" : "15"}
              ry={isPeak ? "14" : "10"}
              fill="url(#coralGlow)"
              className="transition-all duration-300"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 90, 54, 0.6))' }}
            />

            {/* Head */}
            <circle cx="70" cy="106" r="12" fill="#32425E" />

            {/* Arms & Barbell */}
            {isPeak ? (
              // Peak: Arms locked up over chest, bar high
              <g className="transition-all duration-300">
                {/* Upper arm & Forearm straight up */}
                <path d="M 125 106 L 125 55" stroke="#F1F5F9" strokeWidth="7" strokeLinecap="round" />
                <path d="M 145 106 L 145 55" stroke="#F1F5F9" strokeWidth="7" strokeLinecap="round" />
                {/* Barbell */}
                <line x1="80" y1="52" x2="190" y2="52" stroke="#00E5A8" strokeWidth="5" strokeLinecap="round" />
                <rect x="85" y="42" width="6" height="20" rx="2" fill="#00E5A8" />
                <rect x="180" y="42" width="6" height="20" rx="2" fill="#00E5A8" />
                {/* Angle cue */}
                <text x="140" y="38" fill="#00E5A8" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                  Peak Lockout (0° Scapular Extension)
                </text>
              </g>
            ) : (
              // Start: Bar lowered to lower sternum, elbows tucked 45°
              <g className="transition-all duration-300">
                {/* Upper arm angled down/tucked */}
                <path d="M 125 106 L 115 125 L 135 96" stroke="#F1F5F9" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                {/* Barbell resting at chest */}
                <line x1="80" y1="94" x2="190" y2="94" stroke="#00E5A8" strokeWidth="5" strokeLinecap="round" />
                <rect x="85" y="84" width="6" height="20" rx="2" fill="#00E5A8" />
                <rect x="180" y="84" width="6" height="20" rx="2" fill="#00E5A8" />
                {/* Joint Angle Indicator */}
                <path d="M 115 125 A 15 15 0 0 1 135 110" fill="none" stroke="#FF5A36" strokeWidth="2" strokeDasharray="3,3" />
                <text x="145" y="132" fill="#FF5A36" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  45° Elbow Tuck
                </text>
                {/* Bar path arc arrow */}
                <path d="M 135 90 Q 133 72 135 56" fill="none" stroke="#00E5A8" strokeWidth="2.5" markerEnd="url(#arrow)" />
              </g>
            )}

            {/* Legs & Floor */}
            <path d="M 190 115 L 215 135 L 225 165" stroke="#32425E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="30" y1="166" x2="250" y2="166" stroke="#243147" strokeWidth="2" strokeDasharray="4,4" />
          </svg>
        );

      case 'squat':
        return (
          <svg viewBox="0 0 280 180" className="w-full h-full">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#00E5A8" />
              </marker>
            </defs>
            {/* Ground */}
            <line x1="40" y1="166" x2="240" y2="166" stroke="#243147" strokeWidth="2" strokeDasharray="4,4" />

            {isPeak ? (
              // Peak Depth (90° parallel or below)
              <g className="transition-all duration-300">
                {/* Torso angled 45° with rigid spine */}
                <line x1="110" y1="110" x2="140" y2="60" stroke="#F1F5F9" strokeWidth="9" strokeLinecap="round" />
                {/* Head */}
                <circle cx="145" cy="50" r="11" fill="#32425E" />
                {/* Barbell on upper traps */}
                <circle cx="138" cy="58" r="7" fill="#00E5A8" />
                <line x1="80" y1="58" x2="195" y2="58" stroke="#00E5A8" strokeWidth="4" />
                {/* Quads (Femur) parallel to floor - Highlighted Coral */}
                <line
                  x1="110"
                  y1="110"
                  x2="165"
                  y2="112"
                  stroke="#FF5A36"
                  strokeWidth="11"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(255, 90, 54, 0.7))' }}
                />
                {/* Tibia / Shins */}
                <line x1="165" y1="112" x2="155" y2="165" stroke="#32425E" strokeWidth="9" strokeLinecap="round" />
                {/* Foot */}
                <path d="M 145 165 L 175 165" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />

                {/* 90° Knee Angle Callout */}
                <path d="M 150 111 A 18 18 0 0 1 160 128" fill="none" stroke="#00E5A8" strokeWidth="2" />
                <text x="180" y="105" fill="#00E5A8" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  90° Deep Hole
                </text>
                <text x="75" y="130" fill="#FF5A36" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  Glute & Quad Overload
                </text>
                {/* Drive Upward Arrow */}
                <line x1="110" y1="95" x2="110" y2="65" stroke="#00E5A8" strokeWidth="2.5" markerEnd="url(#arrow)" />
              </g>
            ) : (
              // Start: Standing locked out with bar on traps
              <g className="transition-all duration-300">
                {/* Standing Torso */}
                <line x1="140" y1="95" x2="140" y2="45" stroke="#F1F5F9" strokeWidth="9" strokeLinecap="round" />
                {/* Head */}
                <circle cx="140" cy="32" r="11" fill="#32425E" />
                {/* Barbell on traps */}
                <circle cx="140" cy="42" r="7" fill="#00E5A8" />
                <line x1="85" y1="42" x2="195" y2="42" stroke="#00E5A8" strokeWidth="4" />
                {/* Quads standing */}
                <line x1="140" y1="95" x2="140" y2="135" stroke="#FF5A36" strokeWidth="10" strokeLinecap="round" />
                {/* Shins */}
                <line x1="140" y1="135" x2="140" y2="165" stroke="#32425E" strokeWidth="9" strokeLinecap="round" />
                {/* Foot */}
                <path d="M 130 165 L 160 165" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                {/* Descent arrow */}
                <line x1="165" y1="70" x2="165" y2="105" stroke="#00E5A8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="175" y="90" fill="#00E5A8" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  Break Hips & Knees
                </text>
              </g>
            )}
          </svg>
        );

      case 'deadlift':
        return (
          <svg viewBox="0 0 280 180" className="w-full h-full">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#00E5A8" />
              </marker>
            </defs>
            <line x1="40" y1="166" x2="240" y2="166" stroke="#243147" strokeWidth="2" strokeDasharray="4,4" />

            {isPeak ? (
              // Peak: Full Hip Hinge Stretch (Hamstrings Lengthened)
              <g className="transition-all duration-300">
                {/* Hips pushed back at 95 */}
                <circle cx="95" cy="85" r="9" fill="#1C2536" />
                {/* Flat spine at 20° above horizontal */}
                <line x1="95" y1="85" x2="160" y2="72" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />
                <circle cx="170" cy="68" r="11" fill="#32425E" />
                {/* Arms straight down holding bar at shins */}
                <line x1="150" y1="75" x2="150" y2="135" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                <circle cx="150" cy="135" r="8" fill="#00E5A8" />
                {/* Hamstrings under deep lengthened tension in coral */}
                <line
                  x1="95"
                  y1="85"
                  x2="135"
                  y2="125"
                  stroke="#FF5A36"
                  strokeWidth="11"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(255, 90, 54, 0.8))' }}
                />
                <line x1="135" y1="125" x2="135" y2="165" stroke="#32425E" strokeWidth="8" strokeLinecap="round" />
                <path d="M 125 165 L 155 165" stroke="#F1F5F9" strokeWidth="5" strokeLinecap="round" />

                {/* Hip hinge arrow */}
                <line x1="120" y1="80" x2="80" y2="80" stroke="#00E5A8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="65" y="65" fill="#00E5A8" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  Hips Back To Wall
                </text>
                <text x="145" y="115" fill="#FF5A36" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  Max Hamstring Stretch
                </text>
              </g>
            ) : (
              // Start: Standing tall locked out
              <g className="transition-all duration-300">
                <line x1="140" y1="95" x2="140" y2="45" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />
                <circle cx="140" cy="35" r="11" fill="#32425E" />
                <line x1="140" y1="95" x2="140" y2="165" stroke="#32425E" strokeWidth="8" strokeLinecap="round" />
                <line x1="140" y1="55" x2="140" y2="105" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                <circle cx="140" cy="105" r="7" fill="#00E5A8" />
                <text x="155" y="75" fill="#00E5A8" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  Start: Locked Glutes & Spine
                </text>
              </g>
            )}
          </svg>
        );

      case 'lat_pulldown':
        return (
          <svg viewBox="0 0 280 180" className="w-full h-full">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#00E5A8" />
              </marker>
            </defs>
            {/* Cable Machine Top Frame & Pulley */}
            <line x1="140" y1="10" x2="140" y2="25" stroke="#00E5A8" strokeWidth="4" />
            <circle cx="140" cy="25" r="6" fill="#00E5A8" />
            {/* Seat & Thigh Pad */}
            <rect x="110" y="125" width="60" height="12" rx="3" fill="#1C2536" stroke="#243147" />
            <rect x="125" y="137" width="12" height="28" fill="#131A26" />
            <rect x="145" y="105" width="25" height="8" rx="2" fill="#243147" />

            {isPeak ? (
              // Peak: Bar pulled to upper chest, elbows driven down, Lats glowing Coral
              <g className="transition-all duration-300">
                {/* Cable line */}
                <line x1="140" y1="25" x2="140" y2="60" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3,3" />
                {/* Wide Pulldown Bar */}
                <path d="M 70 70 Q 140 60 210 70" stroke="#00E5A8" strokeWidth="5" fill="none" strokeLinecap="round" />
                {/* Seated lifter with slight 15° lean */}
                <line x1="135" y1="125" x2="145" y2="78" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />
                <circle cx="148" cy="65" r="10" fill="#32425E" />
                {/* Lats in Coral */}
                <path
                  d="M 136 90 Q 155 85 150 115 Z"
                  fill="#FF5A36"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(255, 90, 54, 0.7))' }}
                />
                {/* Elbows driving down to ribs */}
                <path d="M 145 78 L 165 95 L 185 68" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M 145 78 L 125 95 L 95 68" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" fill="none" />

                <text x="140" y="155" fill="#FF5A36" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                  Peak Lat Contraction (Elbows in Back Pockets)
                </text>
              </g>
            ) : (
              // Start: Arms fully extended overhead (Lengthened Lat Stretch)
              <g className="transition-all duration-300">
                <line x1="140" y1="25" x2="140" y2="35" stroke="#94A3B8" strokeWidth="2" />
                <path d="M 70 42 Q 140 35 210 42" stroke="#00E5A8" strokeWidth="5" fill="none" strokeLinecap="round" />
                <line x1="140" y1="125" x2="140" y2="85" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />
                <circle cx="140" cy="72" r="10" fill="#32425E" />
                {/* Arms straight up in V */}
                <line x1="140" y1="85" x2="105" y2="40" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                <line x1="140" y1="85" x2="175" y2="40" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                {/* Downward pull arrow */}
                <line x1="105" y1="48" x2="105" y2="78" stroke="#00E5A8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <line x1="175" y1="48" x2="175" y2="78" stroke="#00E5A8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="140" y="155" fill="#00E5A8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                  Full Overhead Lat Stretch
                </text>
              </g>
            )}
          </svg>
        );

      case 'overhead_press':
      case 'lateral_raise':
        return (
          <svg viewBox="0 0 280 180" className="w-full h-full">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#00E5A8" />
              </marker>
            </defs>
            <line x1="60" y1="166" x2="220" y2="166" stroke="#243147" strokeWidth="2" strokeDasharray="4,4" />

            {/* Standing Body */}
            <line x1="140" y1="105" x2="140" y2="60" stroke="#F1F5F9" strokeWidth="9" strokeLinecap="round" />
            <circle cx="140" cy="46" r="11" fill="#32425E" />
            <line x1="140" y1="105" x2="128" y2="165" stroke="#32425E" strokeWidth="8" strokeLinecap="round" />
            <line x1="140" y1="105" x2="152" y2="165" stroke="#32425E" strokeWidth="8" strokeLinecap="round" />

            {/* Target Deltoids in Coral */}
            <ellipse
              cx="124"
              cy="62"
              rx="7"
              ry="9"
              fill="#FF5A36"
              style={{ filter: 'drop-shadow(0 0 6px rgba(255, 90, 54, 0.8))' }}
            />
            <ellipse
              cx="156"
              cy="62"
              rx="7"
              ry="9"
              fill="#FF5A36"
              style={{ filter: 'drop-shadow(0 0 6px rgba(255, 90, 54, 0.8))' }}
            />

            {isPeak ? (
              // Peak: Arms elevated to 90° shoulder height
              <g className="transition-all duration-300">
                <line x1="124" y1="62" x2="68" y2="65" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                <line x1="156" y1="62" x2="212" y2="65" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                <circle cx="68" cy="65" r="7" fill="#00E5A8" />
                <circle cx="212" cy="65" r="7" fill="#00E5A8" />
                <text x="140" y="25" fill="#00E5A8" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                  90° Shoulder Plane (Side Delts Squeezed)
                </text>
              </g>
            ) : (
              // Start: Arms down by sides
              <g className="transition-all duration-300">
                <line x1="124" y1="62" x2="110" y2="110" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                <line x1="156" y1="62" x2="170" y2="110" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                <circle cx="110" cy="110" r="7" fill="#00E5A8" />
                <circle cx="170" cy="110" r="7" fill="#00E5A8" />
                {/* Upward arc arrows */}
                <path d="M 108 100 Q 85 85 75 72" fill="none" stroke="#00E5A8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <path d="M 172 100 Q 195 85 205 72" fill="none" stroke="#00E5A8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="140" y="145" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
                  Lead with elbows; soft knee bend
                </text>
              </g>
            )}
          </svg>
        );

      case 'bicep_curl':
      case 'incline_curl':
        return (
          <svg viewBox="0 0 280 180" className="w-full h-full">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#00E5A8" />
              </marker>
            </defs>
            {/* Seated / standing athlete side profile */}
            <circle cx="120" cy="45" r="11" fill="#32425E" />
            <line x1="120" y1="56" x2="120" y2="115" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />
            <line x1="120" y1="115" x2="120" y2="165" stroke="#32425E" strokeWidth="8" strokeLinecap="round" />
            <line x1="80" y1="166" x2="200" y2="166" stroke="#243147" strokeWidth="2" strokeDasharray="4,4" />

            {/* Upper arm pinned at side */}
            <line x1="120" y1="65" x2="125" y2="98" stroke="#32425E" strokeWidth="7" strokeLinecap="round" />

            {isPeak ? (
              // Peak: Forearm flexed up to 130°, bicep peaking in Coral
              <g className="transition-all duration-300">
                <ellipse
                  cx="127"
                  cy="80"
                  rx="10"
                  ry="12"
                  fill="#FF5A36"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(255, 90, 54, 0.9))' }}
                />
                <line x1="125" y1="98" x2="140" y2="65" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                <circle cx="140" cy="65" r="8" fill="#00E5A8" />
                <text x="155" y="60" fill="#FF5A36" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  Peak Supination Squeeze
                </text>
              </g>
            ) : (
              // Start: Arm extended down, long head lengthened
              <g className="transition-all duration-300">
                <ellipse cx="127" cy="82" rx="7" ry="11" fill="#FF5A36" opacity="0.8" />
                <line x1="125" y1="98" x2="130" y2="140" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                <circle cx="130" cy="140" r="8" fill="#00E5A8" />
                <path d="M 135 130 Q 152 105 142 75" fill="none" stroke="#00E5A8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="145" y="115" fill="#00E5A8" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  Lengthened Long Head
                </text>
              </g>
            )}
          </svg>
        );

      case 'tricep_pushdown':
      case 'tricep_overhead':
        return (
          <svg viewBox="0 0 280 180" className="w-full h-full">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#00E5A8" />
              </marker>
            </defs>
            {/* Cable Top */}
            <circle cx="140" cy="15" r="5" fill="#00E5A8" />
            <line x1="60" y1="166" x2="220" y2="166" stroke="#243147" strokeWidth="2" strokeDasharray="4,4" />

            {/* Standing lifter slightly leaning */}
            <circle cx="115" cy="50" r="10" fill="#32425E" />
            <line x1="115" y1="60" x2="110" y2="115" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />
            <line x1="110" y1="115" x2="105" y2="165" stroke="#32425E" strokeWidth="8" strokeLinecap="round" />

            {/* Upper arm pinned to ribs */}
            <line x1="115" y1="68" x2="120" y2="98" stroke="#32425E" strokeWidth="7" strokeLinecap="round" />

            {/* Triceps in Coral on posterior arm */}
            <path
              d="M 112 70 Q 106 82 118 95 Z"
              fill="#FF5A36"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 90, 54, 0.8))' }}
            />

            {isPeak ? (
              // Peak: Full elbow lockout straight down
              <g className="transition-all duration-300">
                <line x1="140" y1="15" x2="122" y2="140" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2,2" />
                <line x1="120" y1="98" x2="122" y2="140" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                <circle cx="122" cy="140" r="6" fill="#00E5A8" />
                <text x="135" y="140" fill="#FF5A36" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  Locked Out (Lateral Head Peak)
                </text>
              </g>
            ) : (
              // Start: Elbows bent 90°
              <g className="transition-all duration-300">
                <line x1="140" y1="15" x2="145" y2="95" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2,2" />
                <line x1="120" y1="98" x2="145" y2="95" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
                <circle cx="145" cy="95" r="6" fill="#00E5A8" />
                <path d="M 142 100 Q 140 120 125 135" fill="none" stroke="#00E5A8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="145" y="85" fill="#00E5A8" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  90° Elbow Flexion
                </text>
              </g>
            )}
          </svg>
        );

      default:
        // Universal athletic biomechanics vector
        return (
          <svg viewBox="0 0 280 180" className="w-full h-full">
            <line x1="40" y1="166" x2="240" y2="166" stroke="#243147" strokeWidth="2" strokeDasharray="4,4" />
            <circle cx="140" cy="50" r="12" fill="#32425E" />
            <line x1="140" y1="62" x2="140" y2="115" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />
            <line x1="140" y1="115" x2="125" y2="165" stroke="#32425E" strokeWidth="8" strokeLinecap="round" />
            <line x1="140" y1="115" x2="155" y2="165" stroke="#32425E" strokeWidth="8" strokeLinecap="round" />
            <circle
              cx="140"
              cy="80"
              r="14"
              fill="#FF5A36"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 90, 54, 0.8))' }}
            />
            <text x="140" y="30" fill="#00E5A8" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
              {isPeak ? 'Peak Execution Phase' : 'Lengthened Starting Phase'}
            </text>
            <text x="140" y="150" fill="#FF5A36" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
              {muscleGroup} Primary Activation Zone
            </text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative bg-[#0B0F17]/90 rounded-xl border border-apex-border p-3 flex flex-col items-center select-none ${className}`}>
      {/* Visual Header & Phase Switcher */}
      <div className="w-full flex items-center justify-between mb-1.5 z-10">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse"></span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Biomechanics SVG</span>
        </div>

        {/* Phase Toggle Pills */}
        <div className="flex items-center bg-[#131A26] p-0.5 rounded-lg border border-apex-border text-[11px] font-medium">
          <button
            onClick={() => setPhase('start')}
            className={`px-2.5 py-0.5 rounded-md transition-all ${
              !isPeak
                ? 'bg-[#00E5A8] text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Start / Stretch
          </button>
          <button
            onClick={() => setPhase('peak')}
            className={`px-2.5 py-0.5 rounded-md transition-all ${
              isPeak
                ? 'bg-[#FF5A36] text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Peak Contraction
          </button>
        </div>
      </div>

      {/* SVG Container */}
      <div className="w-full h-44 flex items-center justify-center relative overflow-hidden">
        {renderSvgContent()}
      </div>

      {/* Footer Legend */}
      <div className="w-full flex items-center justify-between pt-1 border-t border-[#1C2536] text-[10px] text-slate-400 font-mono">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF5A36]"></span>
          <span>Target Muscle (#FF5A36)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00E5A8]"></span>
          <span>Kinetic Bar/Joint Path</span>
        </div>
      </div>
    </div>
  );
}
