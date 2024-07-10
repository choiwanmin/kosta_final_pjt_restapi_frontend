import React, { useState} from 'react';
import axios from 'axios';

export default function LoadChatRoomsBySearch() {
    const [list, setList] = useState([]);
    const token = sessionStorage.getItem('token');

    const searchName = (event) => {
        if (event.key === 'Enter') {
            const searchData = event.target.value.trim();
            loadChatRoomsBySearch(searchData);
        }
    };

    const loadChatRoomsBySearch = (searchData) => {
        axios.post(`${process.env.REACT_APP_SERVER}/auth/chat/chatrooms/loadrooms/search`, {}, { headers: { auth_token: token }, params: { userName: searchData} })
            .then(function (res) {
                if (res.status === 200) {
                    alert('채팅방 검색 완료');
                    setList(res.data.list); 
                } else {
                    alert('채팅방 불러오기 실패');
                }
            })
    }


    return (
        <div className="modal-content">
            <div className="chat-header">
                {/* 채팅방 검색 , 초대 모달 창 */}
                <div className="msg-search">
                    <input type="text" className="form-control" id="findGroupMember" placeholder="참여자이름으로 검색" aria-label="search" onKeyDown={searchName} />
                    <a className="add" href="#">
                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/add.svg" alt="add" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                    </a>
                </div>
            </div>
        </div>
    )
}