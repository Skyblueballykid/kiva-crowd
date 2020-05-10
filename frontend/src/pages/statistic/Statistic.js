import React from 'react';
import styled from 'styled-components';
import Stat2 from '../../components/stat/Stat2';
import Stat3 from '../../components/stat/Stat3';

const StyledDiv = styled.div`
  min-height: 88vh;
`;

const Statistic = () => {
  return (
    <StyledDiv>

      <h2>Statistics</h2>

      <h2>Statistic View</h2>

      <Stat2 />

      <Stat3 />
      
    </StyledDiv>
  );
};

export default Statistic;