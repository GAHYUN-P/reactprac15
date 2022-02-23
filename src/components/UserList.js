import React from 'react';

import styled from 'styled-components';

// elements
import { Input, Button } from '../elements';

// 방 생성 API
import chat, { chatActions } from '../redux/modules/chat';

// 유저 리스트 가져오기 API
import { userActions } from '../redux/modules/user';

// 유틸
import { utilActions } from '../redux/modules/util';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';

import Upload from '../components/Upload';

// select
import { Select } from '@class101/ui';

// component
import UserListEach from './UserListEach';

// 채팅방 생성 창
const UserList = (props) => {
  const { closePopup, visible } = props;
  const dispatch = useDispatch();
  // 전체 유저 정보 가져오기
  const AllUserinfo = useSelector((state) => state.user.allUserList);
  console.log(AllUserinfo);

  const popupInside = React.useRef();
  //  바깥 클릭시 팝업 끄기
  const clickOutside = ({ target }) => {
    if (!popupInside.current.contains(target)) {
      closePopup()
    }
  }

  React.useEffect(() => {
    window.addEventListener("click", clickOutside);
    dispatch(userActions.getAllUserList());
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, []);

  return (

    <PopupOverlay>
      <PopupInner ref={popupInside}>
        {AllUserinfo.map((info, idx) => {
        return (
          <UserListEach
            key={idx}
            username={info.name}
            email={info.email}
            />
        );
        })}
      </PopupInner>
    </PopupOverlay >
  )

}


const PopupOverlay = styled.div`
  ${(props) => props.theme.border_box};
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`

const PopupInner = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  width: 50%;
  height: 70%;
  background-color: whitesmoke;
  border-radius: 10px;
  top: 50%;
  margin: 0 auto;
  transform: translateY(-50%);
  @media ${(props) => props.theme.mobile} {
    width: 90%
  }

`

const PopupButtons = styled.div`
${(props) => props.theme.flex_row}
width: 80%;
margin: 0px 0px 20px 0px;
`

const InputWrap = styled.div`
${(props) => props.theme.flex_row}
justify-content: center;
  width: 80%;
  margin: 10px 0px 10px 0px;
`
const TagWrap = styled.div`
${(props) => props.theme.flex_row}
margin: 0px 5px;
  padding: 5px;
  font-size: 1rem;
  background-color: orange;
  border-radius: 10px;
  color: whitesmoke;
  & span{
    cursor: pointer;
    font-size: 10px;
    margin-left: 5px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: 0.7rem;
  }
`


export default UserList;