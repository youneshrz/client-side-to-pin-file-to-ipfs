import {  Routes, Route,  Link } from "react-router-dom";
 import Recharch from './Recharch'
 import Getall from './Getall'
import Home from './Home'
import { ConnectButton, Loading } from "@web3uikit/web3";


const App = () => {

  return (
    
    <>
    <div style={{display:'flex',justifyContent:'space-around'}} >

    <Link to="/">Home</Link>
    <Link to="/recharch">Recharch</Link>
    <Link to="/getall">Getall</Link>
    <ConnectButton moralisAuth={false} signingMessage="connected" />
    </div>
    <br/>

      <Routes >
          <Route  path="/" element={<Home />} />
          <Route  path="/recharch" element={<Recharch />} />
          <Route  path="/getall" element={<Getall />} />

      </Routes>
    
    </>
  )
}

export default App