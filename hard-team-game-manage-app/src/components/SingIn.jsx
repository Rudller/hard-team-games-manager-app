import Header from "./Header";

export default function SingIn () {
    const loginHandler = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((data) =>  data.json())
        .then((data) => {
            data.forEach(user => {
                if (user.username === e.target[0].value || user.email === e.target[0].value) {
                    if (user.password === e.target[1].value) {
                        localStorage.setItem("user", JSON.stringify(user))
                        alert("Zalogowano")
                    } else {
                        alert("Nieporawne hasło")
                    }
            } else {
                alert("Nie znaleziono użytkowsnika")
            }})}
        )
        .catch((error) => console.error("Error:", error))
    }

    return (
        <>
            <Header />
            <div className="text-white my-40">
                <form className="flex flex-col justify-center items-center" onSubmit={loginHandler}>
                    <div className="flex flex-col border border-orange-500 rounded-2xl px-4 mx-auto">
                        <h1 className="font-bold text-2xl mb-4">Logowanie instruktora</h1>
                        <label htmlFor="uname">Login instruktora</label>
                        <input className="px-4 py-2 mb-4 bg-transparent border border-orange-500 rounded" autoComplete="username" type="text" name="uname" placeholder="Wpisz login"/>
                        <label htmlFor="psw">Hasło</label>
                        <input className="px-4 py-2 mb-4 bg-transparent border border-orange-500 rounded" autoComplete="current-password" type="password" name="psw" placeholder="Wpisz hasło"/>    
                    </div>
                    <button className="w-4/5 px-8 py-2 my-8 mx-auto border border-orange-500 rounded bg-orange-500" type="submit">Zaloguj</button>
                </form>
            </div>
        </>
    )
}