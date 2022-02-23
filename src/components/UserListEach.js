import React from 'react';
import styled from 'styled-components';

const UserListEach = (props) => {
  
  
  return (
  <Container>
      {props.username} | {props.email}
  </Container>
  );
};

const Container = styled.div`
  
`;

export default UserListEach;
