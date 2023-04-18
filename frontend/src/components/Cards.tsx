import { useEffect, useState } from "react"
import io from "socket.io-client"
import styled, { keyframes } from "styled-components"
import moment from "moment"
import emit from "@/utils/socket";
import axios from "axios";
import { GlobalProps } from "@/utils/interfaces";
import { hideModal } from "@/modules/ModalReducer";
import { useRouter } from "next/router";

interface cardsInterface {
  uuid: string,
  num: number,
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

export default function Cards(props: GlobalProps) {
  const router = useRouter()
  const [cards, setCards] = useState<cardsInterface[]>([{
    uuid: "",
    num: 0,
    title: "",
    desc: "",
    category: "",
    visible: false,
    createdAt: new Date()
  }])

  const [offset, setOffset] = useState<number>(0)

  async function deletePost(uuid: string) {
    const password = prompt("비밀번호를 입력해주세요.")
    await axios('http://bbapi.gbsw.hs.kr/delPost', {
      method: "POST",
      data: {
        uuid,
        password
      }
    })
    .then(() => {
      props.modal.update({
        type: "show",
        title: "Success",
        subTitle: "게시글 삭제에 성공 했습니다.",
        ways: [{
          name: "OK",
          function: () => {router.reload(); hideModal(props.modal.update)}
        }]
      })
    })
    .catch(() => {
      props.modal.update({
        type: "show",
        title: "Cancel",
        subTitle: "게시글 삭제에 실패 했습니다.",
        ways: [{
          name: "OK",
          function: () => { router.reload(); hideModal(props.modal.update) }
        }]
      })
    })
  }

  useEffect(() => {
    const Socket = io("http://bbapi.gbsw.hs.kr/socket")

    emit(Socket, "getPosts", { offset, limit: 6 })

    Socket.on('getPosts', (res) => {
      setCards([...cards, ...res.visiblePosts])
      setOffset(offset + 1);
    })

    window.addEventListener('scroll', async () => {
      const { documentElement, body } = document;
      const scrollHeight = Math.max(documentElement.scrollHeight, body.scrollHeight);
      const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
      const clientHeight = documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 0.5) {
        emit(Socket, "getPosts", { offset, limit: 6 })
      }
    })
  }, [])
  
  return (
    <Body>
      {Object.values(cards).map((data, index) => (
        <>
          {data.visible ?
            <Card>
              <h1>post. {data.num}</h1>
              <p>{moment(data.createdAt).format('YYYY. MM. DD. HH 시') + " " + timeText(Number(moment(data.createdAt).format('H')))}</p>
              <br/>
              <Title>{data.title}</Title>
              <Desc>{data.desc}</Desc>
              <span>
                <Tag>{data.category}</Tag>
                <Remove onClick={() => deletePost(data.uuid)}>삭제</Remove>
              </span>
            </Card>
          :
            <></>
          }
        </>
      ))}
      <Load>
        <div />
      </Load>      
    </Body>
  )
}

const Body = styled.div`
  width: 100%;
`

const rotate = keyframes`
  0% {
    transform: translateX(-50%) rotate(0deg);
  }

  100% {
    transform: translateX(-50%) rotate(360deg);
  }
`

const Load = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  margin-bottom: 40px;

  div {
    width: 80px;
    height: 80px;
    
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  
    background-image: url(/symbol-only.png);
    background-repeat: no-repeat;
    background-size: cover;

    animation: ${rotate} 30s infinite;
  }
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

const Remove = styled.div`
  display: inline-block;
  padding: 10px 20px;
  margin-right: 6px;
  margin-bottom: 6px;
  border: none;
  border-radius: 7px;
  outline: none;
  background-color: #F9D2D4;
  font-size: 14px;
  font-weight: 700;
  color: #ED1C24;
  cursor: pointer;
`