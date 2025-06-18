import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useSelectedMode, type FocusModeType } from './SelectedModeProvider'

const FocusModes = () => {
    const [focusModes, setFocusModes] = useState([])

    const { selectedMode, setSelectedMode } = useSelectedMode()
    useEffect(() => {
        chrome.storage.local
            .get(['focusData'])
            .then((result) => {
                setFocusModes(JSON.parse(result['focusData']))
            })
            .catch((err) => console.log(err))
    }, [])

    const handleClickOnFocus = (focusMode: FocusModeType) => {
        setSelectedMode(focusMode)
        chrome.storage.local.set({
            'selected-mode': JSON.stringify(selectedMode),
        })
    }

    console.log(focusModes)

    return (
        <>
            <Navbar buttonMessage="Add Focus" />
            <div>
                {focusModes.map((focus: FocusModeType, index: number) => (
                    <div
                        key={index}
                        className={`p-5 bg-indigo-400 flex justify-center align-middle m-10 rounded hover:opacity-70 ${focus.id === selectedMode.id ? 'opacity-70 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                        onClick={() => handleClickOnFocus(focus)}
                    >
                        <h3>{focus.name}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FocusModes
