import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages";
import Loading from "./components/Loading";
import { useEffect, useReducer } from "react";
import io from 'socket.io-client';
import ModalReducer, { hideModal } from "./modules/ModalReducer";
import Modal from "./components/Modal";

function App() {
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
        
      }
    }, 350);
    
    return () => clearInterval(check);
  }, [])
  
  return (
    <>
      <Loading isLoading={false} />
      <Modal 
        title={event.title} 
        subTitle={event.subTitle} 
        ways={event.ways} 
        visible={event.visible} 
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
