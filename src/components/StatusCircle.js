import React from 'react';
import styled from '@emotion/styled';

const Circle = styled.div`
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
  border-radius: 50%;
  background-color: ${({ active, color }) => (active ? color : 'transparent')};
  border: 2px solid ${({ active, color }) => (active ? color : '#6c757d')};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, border-color 0.3s;
`;

const CircleLabel = styled.p`
  font-size: 14px;
  text-align: center;
  color: #212529;
`;

// Add this styled component
const CircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatusCircle = ({ active, color, label }) => (
  <CircleWrapper>
    <Circle active={active} color={color} />
    <CircleLabel>{label}</CircleLabel>
  </CircleWrapper>
);

export default StatusCircle;
