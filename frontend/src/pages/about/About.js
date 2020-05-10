import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  min-height: 88vh;
`;

const About = () => {
  return (
    <StyledDiv>
      <h2><b>About Kiva</b></h2>
      <br />
      <h4>
        Founded in 2005, Kiva is a 501(c)3 Nonprofit and the pioneer in crowdfunded microfinance
      <br />
        with over $1.44 billion US dollars in loans made to over 3.6 Million Borrowers.
      <br />
        For more information or to lend through Kiva, visit: <a href="https://www.kiva.org/">https://www.kiva.org/</a>
      </h4>
      <br />
      <h2><b>About The Project</b></h2>
      <h4>A production grade website to explore the Kiva Loans and Lenders datasets,
      <br />
        complete with data visualization, sortable tables, analytics and full-text search.</h4>
      <br />
      <h4>Advanced Functionality:
      <br />
        <ul>
          <li>
            Loan Full Text Search
      </li>
          <li>
            Loan Statistics
      </li>
        </ul>
      </h4>
      <br />
      <h4>Advanced Techniques:
        <br />
        <ul>
          <li>Indexes</li>
          <li>Constraints</li>
          <li>SQL Views</li>
          <li>Stored Procedures</li>
          <li>Atomic Transactions</li>
        </ul></h4>
      <br />
      <h2><b>About Us</b></h2>
      <br />
      <h4> Presented in partial completion of the requirements of the Master&apos;s of Computer Science degree
    <br />
        at the University of Illinois at Urbana-Champaign by: Nitish Singla, Skylar Ripley, Trung Nguyen
    <br />
        and Thomas Kalnik.</h4>
    </StyledDiv>
  );
};

export default About;