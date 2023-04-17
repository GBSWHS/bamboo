import ModalReducer, { hideModal } from '@/modules/ModalReducer'
import type { AppProps } from 'next/app'
import { useEffect, useReducer, useState } from 'react'
import io from 'socket.io-client'
import GlobalStyle from '@/styles/globals'
import Modal from '@/components/Modal'
import Loading from '@/components/Loading'
import Head from '@/components/Head'
import { getCookie, setCookie } from '@/utils/cookies'
import getRandom from '@/utils/getRandom'

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [event, updateModalEvent] = useReducer(ModalReducer, {
    title: "Modal",
    subTitle: "SubTitle",
    ways: [{ 
      name: "HideModal", 
      function: () => hideModal(updateModalEvent)
    }],
    visible: false
  })

  useEffect(() => {
    const socket = io('http://localhost:3002/socket')
    const check = setInterval(() => {
      if (!socket.connected) {
        updateModalEvent({ 
          type: "show", 
          title: "서버와의 연결이 없습니다.",
          subTitle: "인터넷 연결을 확인해주세요.", 
          ways: [{ 
            name: "OK", 
            function: () => hideModal(updateModalEvent)  
          }]
        })
        return <></>
      } else {
        const session = getCookie('session-id')
        if (!session || session.length !== 32) {
          setCookie('session-id', getRandom('all', 32), { path: '/' })
        }
      }
    }, 350);
    
    return () => clearInterval(check);
  }, [])

  return (
    <>
      <GlobalStyle />
      <Head />
      <Loading isLoading={isLoading} />
      
      <Modal 
        title={event.title} 
        subTitle={event.subTitle} 
        ways={event.ways} 
        visible={event.visible} 
      />

      <Component 
        {...pageProps} 
        loading={{ event: isLoading, update: setLoading }} 
        modal={{ event, update: updateModalEvent }} 
      />
    </>
  )
}
