import { useEffect, useState } from "react"
import io from "socket.io-client"
import styled from "styled-components"
import moment from "moment"

interface cardsInterface {
  uuid: string,
  title: string,
  desc: string,
  category: string,
  visible: boolean,
  createdAt: Date
}

const timeText = (time: number) => {
  let text = ''
  if (time < 6) text = '새벽'
  else if (time < 11) text = '아침'
  else if (time < 14) text = '점심'
  else if (time < 15) text = '오후'
  else if (time < 20) text = '저녁'
  else if (time < 24) text = '밤'
  return text
}

export default function Cards() {
  const [cards, setCards] = useState<cardsInterface[] | undefined>(undefined)
  
  useEffect(() => {
    const socket = io("http://localhost:3002/socket")

    window.addEventListener('scroll', async () => {
      const { documentElement, body } = document;
      const scrollHeight = Math.max(documentElement.scrollHeight, body.scrollHeight);
      const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
      const clientHeight = documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 0.5) {
        
      }
    })
  }, [])
  
  return (
    <Body>
      <Card>
        <h1>post. 1</h1>
        <p>{moment(new Date()).format('YYYY. MM. DD. HH') + " " + timeText(Number(moment(new Date()).format('H')))}</p>
        <br/>
        <Title>경소고</Title>
        <Desc>대나무숲이 열렸어요~</Desc>
        <Tag>학교 생활</Tag>
      </Card>
    </Body>
  )
}

const Body = styled.div`
  width: 100%;
`

const Card = styled.div`
  width: 100%;
  background-color: white;
  margin: 1rem 0;
  padding: 2rem;
  border-radius: 8px;
  border: none;
  
  h1, p {
    font-family: 'Caveat', 'Nanum Pen Script', cursive;
  }

  h1 {
    font-size: 1.4rem;
    color: rgb(0, 78, 130);
    font-weight: 900;
  }

  p {
    color: rgb(0, 78, 130);
    font-weight: 900;
    font-size: 1.1rem;
  }
`

const Title = styled.p`
  color: rgb(0, 78, 130);
  font-weight: 900 !important;
  font-family: 'Nanum Myeongjo', serif !important;
  margin-bottom: 1rem;
`

const Desc = styled.div`
  color: rgb(0, 78, 130);
  font-weight: 600 !important;
  font-family: 'Nanum Myeongjo', serif !important;
  margin-bottom: 2rem;
`

const Tag = styled.div`
  display: inline-block;
  padding: 10px 20px;
  margin-right: 6px;
  margin-bottom: 6px;
  border: none;
  border-radius: 7px;
  outline: none;
  background-color: rgb(217, 237, 255);
  font-size: 14px;
  font-weight: 700;
  color: rgb(0,78,130);
`