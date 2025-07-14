"use client";
import React from "react";

interface Props {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export default function CustomCircularProgress({
  value,
  size = 150,
  strokeWidth = 10,
  color = "#10b981",
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (value / 10) * circumference;

  return (
    <svg width={size} height={size} className="transform">
      <circle
        stroke="#1f2937" // bg-neutral-800
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={progressOffset}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        className="transition-all duration-500 ease-in-out"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fill="#fff"
        fontSize="40px"
      >
        {value}
      </text>
    </svg>
  );
}
