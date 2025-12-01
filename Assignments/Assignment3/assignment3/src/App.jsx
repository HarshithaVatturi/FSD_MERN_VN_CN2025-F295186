import { useState } from 'react'

import './App.css'
import Q1 from './components/1Q'
import LoginMessage from "./components/2Q.jsx"; 
import ThreeQ from './components/3Q.jsx';
import FourQ from './components/4Q.jsx';
import FiveQ from './components/5Q.jsx';
import SixQ from './components/6.jsx';
import SevenQ from './components/7Q.jsx';
import EightQ from './components/8Q.jsx';
import NineQ from './components/9Q.jsx';
import TenQ from './components/Q10.jsx';
import ElevenQ from './components/Q11.jsx';
import TwelveQ from './components/Q12.jsx';
import ThirteenQ from './components/13Q.jsx';
import FourteenQ from './components/14Q.jsx';
import FifteenQ from './components/15Q.jsx';
import SixteenQ from './components/16Q.jsx';
import SeventeenQ from './components/17Q.jsx';
import EighteenQ from "./components/18Q.jsx";
import NineteenQ from './components/19Q.jsx';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
  <Q1 />
  <hr />
   <LoginMessage />
   <hr />
  <ThreeQ />
   <hr />
  <FourQ />
  <hr />
  <FiveQ />
  <hr />
  <SixQ />
  <hr />
  <SevenQ />
  <hr />
  <EightQ />
  <hr />
  <NineQ />
  <hr />
  <TenQ />
  <hr />
  <ElevenQ />
  <hr />
  <TwelveQ />
  <hr />
  <ThirteenQ />
  <hr />
  <FourteenQ />
  <hr />
  <FifteenQ />
  <hr />
  <SixteenQ />
  <hr />
  <SeventeenQ/>
  <hr />
  <EighteenQ />
  <hr />
  <NineteenQ />
 </>
  )
}

export default App
