// import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import Navbar from './Navbar'

type focusModeType = {
    name: string
    sites: string
    notifiction: string
}

const FocusModes = () => {
    const [focusModes, setFocusModes] = useState([])
    useEffect(() => {
        chrome.storage.local
            .get(['focusData'])
            .then((result) => {
                setFocusModes(JSON.parse(result['focusData']))
            })
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <Navbar buttonMessage="Add Focus" />
            <div>
                {focusModes.map((focus: focusModeType) => (
                    <div>
                        <h3>{focus.name}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FocusModes
