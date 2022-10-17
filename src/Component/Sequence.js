import { sequence } from "0xsequence";
import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { ethers } from "ethers";
import Data from '../artifacts/contracts/Data.sol/Data.json';

export default function Sequence({ setSet, setGet, setIsConnect, isConnect }) {
    const [loader, setLoader] = useState()
    const [theButton, setButton] = useState();
    let wallet;

    useEffect(() => {
        init()
    }, [])

    function init() {
        // eslint-disable-next-line
        const wallet = sequence.initWallet('goerli')
    }
    // If your dapp runs on a different EVM-compatible blockchain, you can specify its name as the argument
    // const wallet = sequence.initWallet('polygon')

    async function connect() {

        try {
            setLoader(true)
            wallet = sequence.getWallet()
            const connectDetails = await wallet.connect({
                app: 'Your Dapp name',
                authorize: true,
                // And pass settings if you would like to customize further
                settings: {
                    theme: "light",
                    bannerUrl: "https://yoursite.com/banner-image.png",  // 3:1 aspect ratio, 1200x400 works best
                    includedPaymentProviders: ["moonpay", "ramp"],
                    defaultFundingCurrency: "ether",
                    lockFundingCurrencyToDefault: false,
                }
            })

            console.log('user accepted connect?', connectDetails.connected)
            console.log('users signed connect proof to valid their account address:', connectDetails.proof)
            if (connectDetails.connected) { setButton(true) }
            else setButton(false)
            initialisation()
        }
        catch {
            console.log("La connexion a échoué !")
        }
        finally {
            setLoader(false)
        }
    }


    function openSequence() {
        wallet = sequence.getWallet()
        wallet.openWallet();
    }

    function initialisation() {
        const wallet = sequence.getWallet()
        const provider = wallet.getProvider(80001)
        const signer = wallet.getSigner(80001)
        console.log(signer)
        const getContract = new ethers.Contract("0x4Aec1F50164e9B09EcD966495993a47fb0B80467", Data.abi, provider)
        const setContract = new ethers.Contract("0x4Aec1F50164e9B09EcD966495993a47fb0B80467", Data.abi, signer)
        setSet(setContract)
        setGet(getContract)
        setIsConnect(true)
    }

    return (
        <div>
            <h2>Sequence</h2>
            {!theButton && <button onClick={connect}>Connexion {loader && <Spinner animation="border" role="status" size="sm" />}</button>}
            <p></p>
            { <button onClick={openSequence}>Ouvrir Sequence</button>}
        </div>
    )




}