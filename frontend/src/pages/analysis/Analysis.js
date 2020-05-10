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
      <h4><b>Analysis of Top Loans by Country and Sector</b></h4>

      <img src={ TOP_5_COUNTRY_LOANS_BAR } alt="TOP_5_COUNTRY" />
      <img src= { TOP_5_SECTOR_LOANS_BAR } alt="TOP_5_SECTOR" />
      <br />

      <h4><b>Detailed Analysis of Top 5 Countries and Sectors</b></h4>
      <img src= { TOP_5_COUNTRY_LOANS_DETAIL } alt="TOP_5_COUNTRY_DETAIL" />
      <img src= { TOP_5_SECTOR_LOANS_DETAIL } alt="TOP_5_COUNTRY_DETAIL" />
    </StyledDiv>
  );
};

export default Analysis;