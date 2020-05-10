import React from 'react';
import styled from 'styled-components';
import TOP_5_COUNTRY_LOANS_BAR from './charts/TOP_5_COUNTRY_LOANS_BAR.svg';
import TOP_5_SECTOR_LOANS_BAR from './charts/TOP_5_SECTOR_LOANS_BAR.svg';
import TOP_5_COUNTRY_LOANS_DETAIL from './charts/TOP_5_COUNTRY_LOANS_DETAIL.svg';
import TOP_5_SECTOR_LOANS_DETAIL from './charts/TOP_5_SECTOR_LOANS_DETAIL.svg';

const StyledDiv = styled.div`
  min-height: 88vh;
`;

const Analysis = () => {
  return (
    <StyledDiv>
      <h4 class="center"><b>Analysis of Top Loans by Country and Sector</b></h4>

      <img src={ TOP_5_COUNTRY_LOANS_BAR } alt="TOP_5_COUNTRY" class="center"/>
      <img src= { TOP_5_SECTOR_LOANS_BAR } alt="TOP_5_SECTOR" class="center"/>
      
      <h4 class="center"><b>Detailed Analysis of Top 5 Countries and Sectors</b></h4>
      <img src= { TOP_5_COUNTRY_LOANS_DETAIL } alt="TOP_5_COUNTRY_DETAIL" class="center"/>
      <img src= { TOP_5_SECTOR_LOANS_DETAIL } alt="TOP_5_COUNTRY_DETAIL" class="center"/>
    </StyledDiv>
  );
};

export default Analysis;