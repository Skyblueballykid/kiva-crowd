import React from 'react';
import styled from 'styled-components';
import Stat1 from '../../components/stat/Stat1';
import Stat2 from '../../components/stat/Stat2';
import Stat3 from '../../components/stat/Stat3';

const StyledDiv = styled.div`
  min-height: 88vh;
`;

const Statistic = () => {
  return (
    <StyledDiv>
      <h4>Statistics</h4>
      <Stat1 />
      <Stat2 />
      <Stat3 />

    </StyledDiv>
  );
};

export default Statistic;