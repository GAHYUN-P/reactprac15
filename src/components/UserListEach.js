import React from 'react';
import styled from 'styled-components';

const UserListEach = (props) => {
  
  
  return (
  <Container>
    <NameWrap>
      {props.username}
    </NameWrap>
    <EmailWrap>
      {props.email}
    </EmailWrap>
  </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0px;
`;

const NameWrap = styled.div`
  width: 30%;
  background-color: rgba(74, 21, 75, 0.2);
  border-radius: 10px;
  text-align: center;
`;

const EmailWrap = styled.div`
  width: 68%;
  background-color: rgba(74, 21, 75, 0.1);
  border-radius: 10px;
  padding: 3px 0px 0px 10px;
`;

export default UserListEach;
