import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Data from '../../src/artifacts/contracts/Data.sol/Data.json';
import Spinner from 'react-bootstrap/Spinner';

export default function Init({ setSet, setGet, setAddress, setContract, setIsConnect }) {
  const [bool, setBool] = useState();
  const [loader, setLoader] = useState();

  useEffect(() => {
    if (window.ethereum) {
      init()
      isConnected()
      network()
      setIsConnect(bool)
    //   disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bool]);

  //détecter les changements de réseau et MAJ des constantes
  function network() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    provider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork)
        init()
        network()
    });
  }

  //initialiser les constantes en fonction du réseau
  async function init() {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const network = await provider._networkPromise
    const id = network.chainId

    try {
      let address
      if (id === 5) {
        address = "0x3522F5E6a744C16dd019E9Ec314AD45868dccFc6"
      }
      else if (id === 11155111) {
        address = "0xfFedfCe0Fec7342D57E12dB5b120Fd506A0C6181"
      }
      else if (id === 80001) {
        address = "0x4Aec1F50164e9B09EcD966495993a47fb0B80467"
    }
      const getContract = new ethers.Contract(address, Data.abi, provider)
      const signer = provider.getSigner()
      const setTheContract = new ethers.Contract(address, Data.abi, signer)
      setSet(setTheContract)
      setGet(getContract)
      setContract(address)
      if (bool === true) {
        const signerAddress = await signer.getAddress()
        setAddress(signerAddress)
      }
    }

    catch {
      console.log("Erreur d'initialisation : le contrat n'est pas déployé sur ce réseau !")
    }
  }

  //connecter metamask à l'aplication 
  async function connectDapp() {
    setLoader(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      await provider.send("eth_requestAccounts", []);
      setBool(true)
    }
    catch {
      console.log("Erreur de connection à l'application")
    }
    finally {
      setLoader(false)
    }
  }

  //vérifier la connexion metamask et agir sur le bouton de connexion à l'application
  async function isConnected() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setBool(true)
      } else {
        setBool(false)
      }
    }
    catch {
      console.log("Erreur dans la vérification de connexion")
    }
  }

  //détecter la déconnexion 
  function disconnect() {
    // window.ethereum.on('disconnect', handler, function (error) { return void error})
    window.ethereum.on("accountsChanged", accounts => {
        if (accounts.length > 0)
          console.log(`Account connected: ${accounts[0]}`);
        else
          console.log("Account disconnected");
      });

  }

  return (
    <div>
      {!bool && window.ethereum &&
        <div>
          <button onClick={connectDapp}>Metamask{loader && <Spinner animation="border" role="status" size="sm" />}</button>
        </div>}

    </div>
  )
}