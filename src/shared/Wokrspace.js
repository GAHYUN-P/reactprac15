
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

import { Link, Redirect, Route, Switch } from 'react-router-dom';
import gravatar from 'gravatar';

import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './WsStyles';

const Workspace = () => {
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);


  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);


  return (
    <div>
      <Header> 헤더
          <RightMenu>
            <span onClick={onClickUserProfile}>
              <ProfileImg/>
            </span>
                <ProfileModal>
                 프로필 모달
                </ProfileModal>
                <LogOutButton>로그아웃</LogOutButton>
          </RightMenu>
      </Header>

      <WorkspaceWrapper>
        <Workspaces>
          
          <WorkspaceButton>워크스페이스버튼</WorkspaceButton>
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>
            워크스페이스 이름
          </WorkspaceName>
          <MenuScroll>
              <WorkspaceModal>
                <h2>유저네임</h2>
                <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button>로그아웃</button>
              </WorkspaceModal>
          </MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            {/* <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
            <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} /> */}
          </Switch>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;