import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dapp from './Component/Dapp';
import Init from './Component/Init';
import { useState } from 'react';
import Sequence from './Component/Sequence';

function App() {
  const [get, setGet] = useState()
  const [set, setSet] = useState()
  const [isConnect, setIsConnect] = useState()
  const [addr, setAddress] = useState()
  const [contract, setContract] = useState()


  return (
    <div className="App">
      <Init setSet={setSet} setGet={setGet} setAddress={setAddress} setContract={setContract} setIsConnect={setIsConnect} />
    <Sequence setSet={setSet}  setGet={setGet} setIsConnect={setIsConnect}/>
          <Dapp get={get} set={set} isConnect={isConnect}></Dapp>
          <p>Adresse du contrat: {contract}</p>
          <p>Adresse connectée: {addr}</p>
    </div>
  );
}

export default App;
