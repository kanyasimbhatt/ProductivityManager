import { useContext, useState, createContext, useEffect } from 'react'

export type FocusModeType = {
    id: string
    name: string
    sites: string
    notification: string
}

type ContextType = {
    selectedMode: FocusModeType
    setSelectedMode: React.Dispatch<React.SetStateAction<FocusModeType>>
}

const SelectedModeContext = createContext<ContextType>({
    selectedMode: {
        id: '',
        name: '',
        sites: '',
        notification: '',
    },
    setSelectedMode: () => {},
})

const SelectedModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedMode, setSelectedMode] = useState<FocusModeType>({
        id: '',
        name: '',
        sites: '',
        notification: '',
    })

    useEffect(() => {
        chrome.storage.local
            .get(['selected-mode'])
            .then((result) => {
                const value = JSON.parse(result['selected-mode'] as string) || {
                    id: '',
                    name: '',
                    sites: '',
                    notification: '',
                }
                setSelectedMode(value)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <SelectedModeContext.Provider value={{ selectedMode, setSelectedMode }}>
            {children}
        </SelectedModeContext.Provider>
    )
}

export const useSelectedMode = () => {
    const context = useContext(SelectedModeContext)
    if (!context)
        throw new Error(
            'Properties can only be used where within components where Provider is wrapped'
        )
    return context
}

export default SelectedModeProvider
