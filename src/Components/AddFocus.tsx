import { useState, type ChangeEvent, type FormEvent } from 'react'
import Navbar from './Navbar'

type InputType = {
    name: string
    sites: string
    notification: 'On' | 'Off'
}

const InitialInput: InputType = {
    name: '',
    sites: '',
    notification: 'On',
}

const AddFocus = () => {
    const [inputData, setInputData] = useState<InputType>(InitialInput)
    const handleFocusSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log('hello')
        const focusArray = chrome.storage.local.get(
            'focus-data',
            function (result) {
                if (chrome.runtime.lastError) {
                    console.error(
                        'Error retrieving data:',
                        chrome.runtime.lastError
                    )
                }
                return result.push(inputData)
            }
        )
        console.log(focusArray)

        // chrome.storage.local.set({ 'focus-data': JSON.stringify(focusArray) })
    }

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
        property: string
    ) => {
        setInputData({ ...inputData, [property]: event.target.value })
    }
    return (
        <div className="h-full">
            <Navbar buttonMessage="View Focus" />
            <div className="flex m-auto justify-center items-start h-full w-full">
                <form
                    className="flex flex-col gap-3 rounded bg-indigo-400 p-4 w-full m-5"
                    onSubmit={handleFocusSubmit}
                >
                    <p className="text-xl">Add Focus</p>
                    <div className="flex flex-col">
                        <label htmlFor="name">Name: </label>
                        <input
                            value={inputData.name}
                            onChange={(e) => handleChange(e, 'name')}
                            className="w-full rounded p-2"
                            placeholder="Study"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="sites">Sites: </label>
                        <textarea
                            className="w-full rounded p-2"
                            id="sites"
                            onChange={(e) => handleChange(e, 'sites')}
                            placeholder="https://instagram.com https://snapchat.com"
                            value={inputData.sites}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="notifications">
                            Browser Notifications:{' '}
                        </label>
                        <select
                            className="w-full rounded p-2"
                            id="notifications"
                            defaultValue={'On'}
                            value={inputData.notification}
                            onChange={(e) => handleChange(e, 'notifications')}
                        >
                            <option>On</option>
                            <option>Off</option>
                        </select>
                    </div>
                    <button
                        className="w-full bg-slate-800 text-white rounded h-6"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddFocus
