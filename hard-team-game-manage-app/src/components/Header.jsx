export default function Header() {
    const user = JSON.parse(localStorage.getItem("user"))


    return (
        <header className="flex justify-between items-center bg-orange-500 text-white border-solid border border-transparent p-4 h-16">
            <h1 className="text-2xl font-bold">Super nazwa</h1>
            {!user && <nav>
                <a href="/singin" className="inline-block mx-2 px-3 border-x-2 border-orange-700">Zaloguj</a>
                <a href="/singup" className="inline-block mx-2 px-3 border-x-2 border-orange-700">Zarejestruj</a>
                </nav>}
            {user && <div>
                <p className="inline-block mx-2 px-3 border-x-2 border-orange-700">Zalogowano jako: {user.username}</p>
                <a href="/" className="inline-block mx-2 px-3 border-x-2 border-orange-700">Wyloguj</a>
            </div>}
        </header>
    )
}