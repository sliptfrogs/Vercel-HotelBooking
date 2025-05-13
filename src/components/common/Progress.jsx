import { Box, Button } from '@mui/material';
import { ChevronUp } from 'lucide-react';
import React from 'react';

const ProgressButton = ({ progress = 0, onClick }) => {
  const size = 55;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, progress)) / 100 * circumference)

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        width: size,
        height: size,
        zIndex: 1000,
      }}
    >
      {/* Progress ring background */}
      <Box
        component="svg"
        width={size}
        height={size}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(49 196 141 / 0.2)"
          strokeWidth={strokeWidth}
        />
      </Box>

      {/* Animated progress ring */}
      <Box
        component="svg"
        width={size}
        height={size}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'rotate(-90deg)',
          transition: 'stroke-dashoffset 0.3s ease-out',
        }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(49 196 141)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Box>

      {/* Button with icon */}
      <Button
        onClick={onClick}  // Fixed: directly pass the onClick prop
        sx={{
          minWidth: 0,
          width: size,
          height: size,
          padding: 0,
          borderRadius: '50%',
          backgroundColor: 'rgb(49 196 141 / 0.1)',
          '&:hover': {
            backgroundColor: 'rgb(49 196 141 / 0.3)',
          },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <ChevronUp className="text-green-500 " size={25} />
      </Button>
    </Box>
  );
};

export default ProgressButton;