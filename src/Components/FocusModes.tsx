import { useEffect, useState } from 'react'
import Navbar from './Navbar'

type focusModeType = {
    name: string
    sites: string
    notifiction: string
}

const FocusModes = () => {
    const [focusModes, setFocusModes] = useState([])
    const [selectedMode, setSelectedMode] = useState<focusModeType>()
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
                {focusModes.map((focus: focusModeType, index: number) => (
                    <div
                        key={index}
                        className="p-5 bg-indigo-400 flex justify-center align-middle m-10 rounded hover:opacity-70"
                        onClick={() => setSelectedMode(focus)}
                    >
                        <h3>{focus.name}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FocusModes
