import React, { useEffect, useReducer, useState } from "react";
import io from 'socket.io-client'
import styled from "styled-components";
import { GlobalProps } from "../utils/interfaces";

export default function WriteForm(props: GlobalProps) {
  const [state, setState] = useState({
    client: {
      title: "",
      desc: "",
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
  
  useEffect(() => {
    const Socket = io("http://localhost:3002/socket")
    
    Socket.emit('getQuest')
    
    const getCategory = setInterval(() => {
      Socket.emit('getCategory')
    }, 350);

    const getQuest = setInterval(() => {
      Socket.emit('getQuest')
    }, 60000);

    Socket.on('getCategory', async (res) => {
      setState(prevState => ({
        ...prevState,
        Category: res.category
      }));
    })

    Socket.on('getQuest', (res) => {
      setState(prevState => ({
        ...prevState,
        Quest: {
          increment: res.Quest.increment,
          quest: res.Quest.quest,
        }
      }));
    });
     

    return () => {
      clearInterval(getCategory);
      clearInterval(getQuest)
    };
  }, [])

  return (
    <Body>
      <TitleAndQ>
        <input maxLength={24} minLength={1} placeholder="제목 (최대 24자)" onChange={(e) => setState(prevState => ({ ...prevState, client: { ...prevState.client, title: e.target.value} }))}/>
        <input placeholder={state.Quest.quest} onChange={(e) => setState(prevState => ({ ...prevState, client: { ...prevState.client, answer: e.target.value }})) } />
      </TitleAndQ>
      <SelectBody>
        <SelectData onClick={() => setState(prevState => ({ ...prevState, client: { ...prevState.client, isOpen: !prevState.client.isOpen } }))}>
          <h1>{state.client.category}</h1>
        </SelectData>
        <SelectUl className={state.client.isOpen ? "on" : "off"}>
          {Object.values(state.Category).map((data, index) => (
            <>
              <li key={index} onClick={() => setState(prevState => ({ ...prevState, client: { ...prevState.client, category: data.name, isOpen: false} }))}>{data.name}</li>
            </>
          ))}
        </SelectUl>
      </SelectBody>
      <TextArea placeholder="타인을 향한 욕설 및 비방, 저격은 징계 대상 입니다." />
    </Body>
  )
}

const Body = styled.form`
  background-color: white;
  margin-bottom: 1rem;
  padding: 2rem;

  width: 100%;
  height: auto;

  border-radius: 8px;
`

const TitleAndQ = styled.div`
  display: flex;
  width: 100%;

  > input {
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
  }

  > input:last-child {
    margin: 0;
    margin-bottom: 6px;
  }

  > input:focus {
    box-shadow: 0 0 0 2px black;
  }
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
    box-shadow: 0 0 0 2px black;
    height: 15rem;
  }
`