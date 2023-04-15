import React from 'react'
import styled, { keyframes } from 'styled-components';
import { LoadingProps } from '../utils/interfaces';

export default function Loading(props: LoadingProps) {
  return (
    <Body className={props.isLoading ? "true" : "false"}>
      <ImageBody>
        <Image />
      </ImageBody>
    </Body>
  )
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

const open = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const close = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; z-index: -999; }
`

const Body = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgb(217, 237, 255);
  z-index: 1;

  &.true {
    animation: ${open} .25s forwards;
  }

  &.false {
    animation: ${close} .25s forwards;
  }
`

const ImageBody = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px; 
`
  
const Image = styled.div`
  background-image: url(/symbol-only.png);
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  animation: ${rotate} 30s infinite;
  opacity: .9;
`
