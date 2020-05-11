import React from 'react';
import styled from 'styled-components';

import { Typography } from 'antd';
// const { Title as BaseTitle, Text as BaseText } = Typography;

const Title = styled(Typography.Title)`
  font-size: 16px;
`;

const Text = styled(Typography.Text)`
  font-size: 16px;
`;

const StyledDiv = styled.div`
  min-height: 88vh;
`;

const About = () => {
  return (
    <StyledDiv>
      <Title level={4}>
        <b>About Kiva</b>
      </Title>

      <Text>
        Founded in 2005, Kiva is a 501(c)3 Nonprofit and the pioneer in
        crowdfunded microfinance
        <br />
        with over $1.44 billion US dollars in loans made to over 3.6 Million
        Borrowers.
        <br />
        For more information or to lend through Kiva, visit:{' '}
        <a href="https://www.kiva.org/">https://www.kiva.org/</a>
      </Text>
      <br />
      <br />
      <Title level={4}>
        <b>About The Project</b>
      </Title>
      <Text>
        A production grade website to explore the Kiva Loans and Lenders
        datasets,
        <br />
        complete with data visualization, sortable tables, analytics and
        full-text search.
        <br />
        <br />
        Advanced Functionality:
        <br />
        <ul>
          <li>Loan Full Text Search</li>
          <li>Loan Statistics</li>
        </ul>

      <br />
        Advanced Techniques:
        <br />
        <ul>
          <li>Indexes</li>
          <li>Constraints</li>
          <li>SQL Views</li>
          <li>Stored Procedures</li>
          <li>Atomic Transactions</li>
        </ul>
        To view our public GitHub repo, visit:
        <a href="https://github.com/Skyblueballykid/kiva-crowd">Kiva-Crowd</a> 
        <br/>
        To view our REST API Swagger specification, visit:
        <a href="http://kiva-cs411.info:5000/swagger/">Swagger</a>
      </Text>

      <Title level={4}>
        <b>About Us</b>
      </Title>
      <Text>
        {' '}
        Presented in partial completion of the requirements of the Master&apos;s
        of Computer Science degree
        <br />
        at the University of Illinois at Urbana-Champaign by: Nitish Singla,
        Skylar Ripley, Trung Nguyen
        <br />
        and Thomas Kalnik.
      </Text>
    </StyledDiv>
  );
};

export default About;
