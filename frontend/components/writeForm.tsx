import React, { useEffect, useState } from "react";
import io from 'socket.io-client'
import styled from "styled-components";
import { GlobalProps } from "../utils/interfaces";

interface Category {
  uuid: string,
  name: string,
  desc?: string | undefined,
  status: boolean,
  post_count: number,
  createdAt: Date
}

interface Quest {
  increment: string,
  quest: string,
}

interface WriteFormState {
  client: {
    title: string,
    desc: string,
    category: string,
    quest: string
  },
  Quest: Quest,
  Category: Category[]
}

export default function WriteForm(props: GlobalProps) {
  const [state, setState] = useState<WriteFormState>({
    client: {
      title: "",
      desc: "",
      category: "",
      quest: ""
    },
    Quest: {
      increment: "",
      quest: "",
    },
    Category: [{
      uuid: "",
      name: "",
      desc: "",
      status: false,
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

    Socket.on('getCategory', (res) => {
      setState({
        ...state,
        Category: res.Category
      });
    })

    Socket.on('getQuest', (res) => {
      console.log(res);
      setState({
        ...state,
        Quest: {
          increment: res.increment,
          quest: res.quest,
        }
      });
    });
     

    return () => {
      clearInterval(getCategory);
      clearInterval(getQuest)
    };
    
  }, [])
  return (
    <Body>
      <TitleAndQ>
        <input style={{ width: "25%" }} maxLength={24} minLength={1} placeholder="제목 (최대 24자)" onChange={(e) => setState({...state, client: { ...state.client, title: e.target.value }})}/>
        <input style={{ width: "40%" }} placeholder={state.Quest.quest} onChange={(e) => setState({...state, client: { ...state.client, quest: e.target.value }})} />
        <SelectBody>
          <span></span>
        </SelectBody>
      </TitleAndQ>
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
    transition: all .2s;

    display: inline-block;
    
    flex: 3;
    font-size: 1rem;
    font-weight: 600;
    min-width: 250px;
    -webkit-appearance: none;
    background-color: rgb(217, 237, 255);

    margin-right: 6px;
    margin-bottom: 6px;
    padding: 10px;
    
    border: none;
    border-radius: 6px;
    
    outline: none;
  }

  > input:focus {
    box-shadow: 0 0 0 2px black;
  }
`

const SelectBody = styled.div`
  position: relative;
  width: 
`
