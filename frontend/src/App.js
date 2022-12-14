
import './App.css';
import { useState } from 'react';

const giftList = ["dat","viet"]
function App() {
  const [gift, setGift] = useState()
  const takeGift = () => {
    const index = Math.floor(Math.random()*2)
    setGift(giftList[index])
  }
  return (
    <div className="App">
      <h1> {gift || "chua co thuong"}</h1>
      <button onClick={takeGift}>click</button>
    </div>
  );
}

export default App;
