import { useNavigate } from "react-router-dom"

import Header from "../components/Header";

export default function SingIn () {
    const navigate = useNavigate()

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
            let incorrectPassword = false
            const user = data.find(user => {
                if (user.username === e.target[0].value || user.email === e.target[0].value) {
                    if (user.password === e.target[1].value) {
                        return true;
                    } else {
                        incorrectPassword = true
                        return false;
                    }
                }
                return false;
            });

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                alert("Zalogowano");
                navigate("/");
            } else if (incorrectPassword) {
                alert("Błędne hasło");
            } else {
                alert("Nie znaleziono użytkownika");
            }
        }
        )
        .catch((error) => console.error("Error:", error))
    }

    return (
        <>
            <Header />
            <div className="text-white my-40 font-roboto">
                <form className="flex flex-col justify-center items-center" onSubmit={loginHandler}>
                    <div className="flex flex-col border border-orange-500 rounded-2xl px-4 mx-auto w-3/4">
                        <h1 className="font-bold text-2xl m-4">Logowanie instruktora</h1>
                        <label htmlFor="uname">Login instruktora</label>
                        <input className="px-4 py-2 mb-4 bg-transparent border border-orange-500 rounded" autoComplete="username" type="text" name="uname" placeholder="Wpisz login"/>
                        <label htmlFor="psw">Hasło</label>
                        <input className="px-4 py-2 mb-4 bg-transparent border border-orange-500 rounded" autoComplete="current-password" type="password" name="psw" placeholder="Wpisz hasło"/>    
                    </div>
                    <button className="w-3/5 px-8 py-2 my-8 mx-auto border border-orange-500 rounded bg-orange-500 font-bold" type="submit">Zaloguj</button>
                    <p className="mx-auto">Nie masz konta? <u onClick={() => navigate("/singup")} className="cursor-pointer">Kliknij tutaj</u></p>
                </form>
            </div>
        </>
    )
}