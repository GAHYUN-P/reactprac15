import React from 'react';

import styled from 'styled-components';

// elements
import Message from '../elements/Message';
import { Input, Button } from '../elements';

// 리덕스 접근
import { useSelector, useDispatch } from 'react-redux';

// components
import InvitePop from '../components/InvitePop';

// 방 나가기 API
import chat, { chatActions } from '../redux/modules/chat';

import { IoLogOutOutline } from 'react-icons/io5';


// 메시지 리스트 컴포넌트
const MessageList = (props) => {
  
  const messages = useSelector((state) => state.chat.messages);
  const roomId = useSelector((state) => state.chat.currentChat.roomId);

  const dispatch = useDispatch();

  // 스크롤 대상
  const messageEndRef = React.useRef(null);
  //  하단 스크롤 함수
  const scrollTomBottom = () => {
    // 모바일이면 실행하지 않기
    if (window.innerWidth <= 375) {
      return
    }
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // 렌더링시 이동
  React.useEffect(() => {
    scrollTomBottom();
  }, [messages]);

  // 팝업창 키기/종료
  //  false가 기본 상태
  const [popupOpen, setPopupOpen] = React.useState(false);

  // 팝업창 키기/끄기 함수
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  // 방 나가기
  const onClickOutRoom = () => {
    console.log('온클릭 함수' + roomId);
    dispatch(chatActions.outRoom(roomId));
    dispatch(chatActions.outRoomStat(true));
  }

  


  return (
    <Container className="scroll" id="messagelist">
      {messages.map((m, idx) => {
        return <Message key={idx} messageInfo={m} is_me={true} />;
      })}

      <div ref={messageEndRef}></div>

      <BtnContainer>
        <Button _onClick={openPopup} width="10%">초대하기</Button>
        {/* 초대하기 팝업 창 */}
        {popupOpen && <InvitePop visible={popupOpen} closePopup={closePopup} />}
        
        <Button _onClick={(e) => {
                onClickOutRoom();
                e.stopPropagation();
                }}
                width="10%"
                margin="0px 2px"
                >나가기</Button>
      </BtnContainer>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 30px 30px 60px 30px;
  overflow: auto;
  @media ${(props) => props.theme.mobile} {
    height: 90%;
    padding: 30px 10px 90px 10px;
  }
`;

const BtnContainer = styled.div`
  ${(props) => props.theme.border_box};
  display: flex;
  position: fixed;
  bottom: 92%;
  left: 79%;
  width: 100%;
  height: 50px;
  overflow: auto;
  @media ${(props) => props.theme.mobile} {
    height: 90%;
    padding: 30px 10px 90px 10px;
  }
`;

export default MessageList;
