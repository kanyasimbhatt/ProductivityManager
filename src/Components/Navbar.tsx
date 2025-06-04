import { Link } from 'react-router-dom'

type ChildrenType = {
    buttonMessage: string
}

const Navbar = ({ buttonMessage }: ChildrenType) => {
    return (
        <nav className="h-15 bg-slate-800 min-w-full flex justify-between items-center p-3">
            <p className="text-xl text-white">Productivity Manager</p>
            <Link to={buttonMessage === 'Add Focus' ? '/add-focus' : '/'}>
                <button className="w-20 h-8 bg-indigo-900 rounded text-white hover:opacity-55">
                    {buttonMessage}
                </button>
            </Link>
        </nav>
    )
}

export default Navbar
