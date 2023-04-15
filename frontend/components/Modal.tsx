import React from "react";
import { ModalState, ModalWays } from "../utils/interfaces";
import styled from "styled-components";

export default function Modal(props: ModalState) {
  return (
    <>
      {props.visible ? 
        <Body>
          <div>
            <Title>{props.title}</Title>
            {props.subTitle ?
              <SubTitle>{props.subTitle}</SubTitle>
            :
              <br />
            }
            <Buttons>
              {Object.values(props.ways).map((data: ModalWays, index: number) => (
                <Button key={index} onClick={() => data.function()}>{data.name}</Button>
              ))}  
            </Buttons>
          </div>
        </Body>
      :
        <>
        </>
      }
    </>
  )
}

const Body = styled.div`
  z-index: 2;
  text-align: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  
  width: 40%;
  height: 130px;

  border-radius: 3px;
  background-color: white;
  color: rgb(0, 78, 130);
  opacity: .9;

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  @media (max-width: 640px) {
    width: 70%;
  }
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 17px;
`

const SubTitle = styled.p`
  font-size: 12px;
  margin-top: 5px;
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`

const Button = styled.button`
  margin: auto;
  font-weight: 600;
  width: 100px;
  height: 30px;
  background-color: white;
  color: rgb(0,78,130);
  border: 2px solid rgb(0,78,130);
  border-radius: 4px;
  cursor: pointer;
`
