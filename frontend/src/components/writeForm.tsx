import React, { useEffect, useState } from "react";
import io from 'socket.io-client'
import styled, { keyframes } from "styled-components";
import { GlobalProps } from "../utils/interfaces";
import { getCookie } from "@/utils/cookies";
import emit from "@/utils/socket";
import { hideModal } from "@/modules/ModalReducer";
import axios from "axios";

export default function WriteForm(props: GlobalProps) {
  const [state, setState] = useState({
    client: {
      title: "",
      desc: "",
      password: "",
      category: "태그 선택",
      answer: "",
      isOpen: false
    },
    Quest: {
      increment: "",
      quest: "",
    },
    Category: [{
      uuid: "",
      name: "",
      desc: "",
      visible: false,
      post_count: 0,
      createdAt: new Date()
    }]
  })

  const [mouseOver, setMouseOver] = useState("normal");
  
  useEffect(() => {
    const Socket = io("http://bbapi.gbsw.hs.kr/socket")
    
    emit(Socket, 'getQuest')
    
    const getCategory = setInterval(() => {
      emit(Socket, 'getCategory')
    }, 350);

    const getQuest = setInterval(() => {
      emit(Socket, 'getQuest')
    }, 60000);

    Socket.on('getCategory', async (res) => {
      if (res.session == getCookie('session-id')) {
        setState(prevState => ({
          ...prevState,
          Category: res.category
        }));
      }
    })

    Socket.on('getQuest', (res) => {
      if (res.session == getCookie('session-id')) {
        setState(prevState => ({
          ...prevState,
          client: {
            ...prevState.client,
            answer: ""
          },
          Quest: {
            increment: res.Quest.increment,
            quest: res.Quest.quest,
          }
        }));
      }
    });

    return () => {
      clearInterval(getCategory);
      clearInterval(getQuest)
    };
  }, [])

  async function submit(e: any) {
    e.preventDefault();
    await axios('http://bbapi.gbsw.hs.kr/posts', {
      method: "POST",
      headers: {
        Authorization: "session " + getCookie('session-id')
      },
      data: {
        category: state.client.category, 
        password: state.client.password, 
        title: state.client.title, 
        desc: state.client.desc, 
        id: state.Quest.increment, 
        answer: state.client.answer
      }
    }).then((res) => {
      props.modal.update({
        type: "show",
        title: "Success",
        subTitle: "게시글이 정상적으로 등록 되었습니다.",
        ways: [{
          name: "OK",
          function: () => hideModal(props.modal.update)
        }]
      })
    })
    .catch((err) => {
      props.modal.update({
        type: "show",
        title: "Cancel",
        subTitle: "게시글 등록에 실패 했습니다.",
        ways: [{
          name: "OK",
          function: () => hideModal(props.modal.update)
        }]
      })
    })
  }

  return (
    <Body onSubmit={submit}>
      <TitleAndQ>
        <Input value={state.client.title} maxLength={24} minLength={1} placeholder="제목 (최대 24자)" onChange={(e) => setState(prevState => ({ ...prevState, client: { ...prevState.client, title: e.target.value} }))}/>
        <Input value={state.client.answer} placeholder={state.Quest.quest} onChange={(e) => setState(prevState => ({ ...prevState, client: { ...prevState.client, answer: e.target.value }})) } />
      </TitleAndQ>
      <Input type={"password"} value={state.client.password} placeholder={"게시물에 등록할 비밀번호를 적어주세요."} style={{ width: "100%" }} onChange={(e) => setState(prevState => ({ ...prevState, client: { ...prevState.client, password: e.target.value }})) } />
      <SelectBody>
        <SelectData onClick={() => setState(prevState => ({ ...prevState, client: { ...prevState.client, isOpen: !prevState.client.isOpen } }))}>
          <h1>{state.client.category}</h1>
        </SelectData>
        <SelectUl className={state.client.isOpen ? "on" : "off"}>
          {Object.values(state.Category).map((data, index) => (
            <li key={index} onClick={() => setState(prevState => ({ ...prevState, client: { ...prevState.client, category: data.name, isOpen: false} }))}>{data.name}</li>
          ))}
        </SelectUl>
      </SelectBody>
      <TextArea value={state.client.desc} placeholder="타인을 향한 욕설 및 비방, 저격은 징계 대상 입니다." onChange={(e) => setState(prevState => ({ ...prevState, client: { ...prevState.client, desc: e.target.value } }))} />
      <Button type="submit" value={"등록하기"} />
      <Policy onMouseOver={() => setMouseOver("on")} onMouseOut={() => setMouseOver("off")} href={"/policy"}>
        게시규정&nbsp;
        <div className={mouseOver}>&#62;</div>
      </Policy>
    </Body>
  )
}

const Body = styled.form`
  background-color: white;
  margin-bottom: 1rem;
  color: rgb(0, 78, 130);
  padding: 2rem;

  width: 100%;
  height: auto;

  border-radius: 8px;
`

const Input = styled.input`
  color: rgb(0, 78, 130);
  transition: all .1s;

  display: inline-block;
  width: 50%;
  
  flex: 3;
  font-size: 1rem;
  font-weight: 600;
  -webkit-appearance: none;
  background-color: rgb(217, 237, 255);

  margin-right: 6px;
  margin-bottom: 6px;
  padding: 10px;
  
  border: none;
  border-radius: 6px;
  
  outline: none;

  &:last-child {
    margin: 0;
    margin-bottom: 6px;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgb(0,78,130);
  }
`

const TitleAndQ = styled.div`
  display: flex;
  width: 100%;
`

const SelectBody = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  padding: 10px;
  background-color: rgb(217, 237, 255); 
  margin-bottom: 6px;
  border-radius: 6px;
  transition: all .1s;

  > div {
    font-weight: 600;
  }
`

const SelectData = styled.div`
  cursor: pointer;
`

const SelectUl = styled.ul`
  position: absolute;
  left: 0;
  overflow: scroll;
  background-color: rgb(217, 237, 255);

  &.on {
    width: 100%;
    height: auto;
  }

  &.off {
    display: none;
  }

  > li {
    transition: all .1s;
    width: 100%;
    height: 40px;
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid rgb(197, 217, 235);
  }

  > li:hover {
    background-color: rgb(197, 217, 235);
  }
`

const TextArea = styled.textarea`
  transition: all .1s;
  color: rgb(0, 78, 130);
  font-weight: 600;
  
  padding: 10px;
  margin-bottom: 6px;
  
  width: 100%;
  height: 5rem;

  font-size: 14px;
  transition: 0.25s ease-out;
  
  resize: none;
  outline: none;
  box-sizing: border-box;
  
  background-color: rgb(217,237,255);
  border: none;
  border-radius: 8px;

  &:focus {
    box-shadow: 0 0 0 2px rgb(0,78,130);
    height: 15rem;
  }
`

const Button = styled.input`
  padding: 10px 30px;
  margin-right: 6px;
  margin-bottom: 6px;
  border: none;
  border-radius: 7px;
  outline: none;
  background-color:rgb(217,237,255);
  font-weight: 700;
  color: rgb(0, 78, 130);
  cursor: pointer;
`

const mouseOn = keyframes`
  0% {
    opacity: 0;
    left: -10px;
  }

  100% {
    opacity: 1;
    left: 0px;
  }
`

const mouseOut = keyframes`
  0% {
    opacity: 1;
    left: 0px;
  }

  100% {
    opacity: 0;
    left: -10px;
  }
`

const Policy = styled.a`
  font-weight: 600;
  margin-left: 1rem;
  display: inline-flex;
  
  &:hover {
    text-decoration: underline;
  }
  > div {
    position: relative;
    opacity: 0;
  }

  > div.on {
    animation: ${mouseOn} .1s forwards;
  }

  > div.off {
    animation: ${mouseOut} .1s forwards;
  }
`