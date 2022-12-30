import './App.css';
import io from 'socket.io-client'
import ChatRoom from './Components/ChatRoom/ChatRoom';

const socket = io.connect('http://localhost:3001')    // server domain/url of server

function App() {
  return (
    <div className="App">
      <ChatRoom socket={ socket }/>
    </div>
  );
}

export default App;
