import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function Dapp({ get, set, isConnect }) {
    const [theData, setTheData] = useState();
    const [theNewData, setTheNewData] = useState();
    const [loader, setLoader] = useState();
    const [theButton, setButton] = useState();

    useEffect(() => {
        if (isConnect) {
            setButton()
            data()
        }
        else { setButton("disable") }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnect])

    //récupérer la valeur de data (big number)
    async function data() {
        const adata = await get.data()
        setTheData(adata)
    }

    //changer la valeur de data
    async function newData() {
        setLoader(true)
        try {
            // await window.ethereum.request({ method: 'eth_requestAccounts' })
            const transaction = await set.setData(theNewData)
            await transaction.wait()
            data()
        }
        catch {
            console.log("La transaction a échoué !")
        }
        finally {
            setLoader(false)
        }
    }

    //récupérer la valeur dans l'input
    function inputValue(e) {
        setTheNewData(e.target.value)
    }

    return (
        <div>
            <h1>Data</h1>
            <div >
                <div>
                    <p>Data : {theData}</p>
                </div>
                <div>
                    <Button variant="primary" onClick={newData} disabled={theButton}>
                        Envoyer une nouvelle valeur {loader && <Spinner animation="border" role="status" size="sm" />}
                    </Button>
                    <p><input placeholder='Nouvelle valeur' onChange={inputValue}></input></p>
                </div>
            </div>
        </div>
    )
}