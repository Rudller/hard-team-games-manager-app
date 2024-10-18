import logo from '../assets/logohover.png'
import burgerMenu from '../assets/burger-menu-svgrepo-com (1).svg'
import { useState } from 'react'

export default function Header() {
    const [showBurger, setShowBurger] = useState(false)

    const user = JSON.parse(localStorage.getItem("user"))

    const burgerHandler = (e) => {
        e.preventDefault()
        if (!showBurger) {
            setShowBurger(true)
        } else {
            setShowBurger(false)
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem("user")
        window.location.reload()
    }

    return (
        <header className="font-roboto flex justify-between items-center bg-orange-500 text-white border-solid border border-orange-500 p-4 h-16">
            <div className='flex justify-center items-center'>
                <img src={logo} alt='HardTeam' className='w-14'/>
                <h1 className="text-2xl font-bold"> - Realizator</h1>
            </div>
            {user && 
            <div className='relative'>
                <img src={burgerMenu} alt="Burgier" className='w-14' onClick={burgerHandler}/>
                {showBurger && 
                <div className='flex flex-col justify-between items-center w-screen top-16 right-0 absolute border border-red-500'>
                    <button onClick={logoutHandler} className="bg-red-700 border border-red-700 rounded-xl px-4 py-2 w-5/6 font-bold">Wyloguj</button>
                </div>
                }
            </div>}
        </header>
    )
}