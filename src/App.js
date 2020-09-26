import React, { useEffect ,useState} from 'react';
// import React, { useEffect ,useState} from 'react-dom';
import './App.css';
import Chat from "./Chat";
import Sidebar from './SideBar'
import Pusher from 'pusher-js'
import axios from './axios'

function App() {
  const [messages,setMessages] = useState([])
  
  useEffect(()=>{
    axios.get('/messages/sync').then((response)=>{
      setMessages(response.data)

    })

  },[])

  useEffect(()=>{
    const pusher = new Pusher('10ae9e27ee70e824c3bc', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted',(newMessage)=> {
      setMessages([...messages,newMessage])
    });

    return()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }
  },[messages])

  console.log(messages);


  return (
    <div className="app">
      <div className='app__body'>
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
