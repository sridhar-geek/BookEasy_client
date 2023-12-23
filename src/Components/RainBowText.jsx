import React from "react";
import {styled, Typography, keyframes} from "@mui/material";

// key frames
const colorShift = keyframes`
  0% { color: #030101; }
  28% { color: #089c15; }
  57% { color: blue; }
  80% { color: violet; }
  100% { color: #e3cb0f; }
`;

// color animation
const RainbowLetter = styled('span')`
  animation: ${colorShift} 7s infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const RainbowText = ({ text }) => {
  return (
    <Typography variant="h6" fontFamily="cursive" marginBottom="20px" textTransform='capitalize' fontWeight='bolder'>
      {text.split("").map((letter, i) => (
        <RainbowLetter key={i} delay={i / text.length}>
          {letter}
        </RainbowLetter>
      ))}
    </Typography>
  );
};

export default RainbowText;
