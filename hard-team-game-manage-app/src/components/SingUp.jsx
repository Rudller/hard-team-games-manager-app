export default function SingUp () {
    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.target[2].value !== e.target[3].value) {
            alert("Hasła nie są takie same")
            return
        } else {
            const newUserData = {
                username: e.target[0].value,
                email: e.target[1].value,
                password: e.target[2].value,
                role: "instructor",
                authorized: false
            }
            fetch("http://localhost:5000/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((data) =>  data.json())
            .then((data) => {
                data.forEach(user => {
                    if (user.username === newUserData.username || user.email === newUserData.email) {
                        alert("Użytkownik o takim loginie lub emailu już istnieje")
                        return
                    } else {
                        return fetch("http://localhost:5000/api/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newUserData)
                        })
                        .then((data) => {
                            console.log("Success:", data)
                            alert("Instruktor został zarejestrowany")
                        })
                        .catch((error) => {
                            console.error("Error:", error)
                            alert("Wystąpił błąd z dodawaniem użytkownika")
                    }
                )}
            })
            .catch((error) => {
                console.error("Error:", error)
                alert("Wystąpił błąd z pobraniem użytkowników")
            })
        })
        
    }
    }

    return (
        <div className="text-white">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col border border-orange-500 rounded-2xl px-4 mx-auto">
                    <h1 className="font-bold text-2xl mb-4">Rejestracja instruktora</h1>
                    <label htmlFor="uname">Login instruktora</label>
                    <input className="px-4 py-2 mb-4 bg-transparent border border-orange-500 rounded" autoComplete="username" type="text" name="uname" placeholder="Wpisz login"/>
                    <label htmlFor="email">Email</label>
                    <input className="px-4 py-2 mb-4 bg-transparent border border-orange-500 rounded" autoComplete="email" type="email" name="email" placeholder="Wpisz email"/>
                    <label htmlFor="psw">Hasło</label>
                    <input className="px-4 py-2 mb-4 bg-transparent border border-orange-500 rounded" autoComplete="new-password" type="password" name="psw" placeholder="Wpisz hasło"/>
                    <label htmlFor="psw2">Powtórz hasło</label>
                    <input className="px-4 py-2 mb-4 bg-transparent border border-orange-500 rounded" autoComplete="new-password" type="password" name="psw2" placeholder="Powtórz hasło"/>    
                </div>
                <button className="w-4/5 px-8 py-2 my-8 mx-auto border border-orange-500 rounded bg-orange-500" type="submit">Zarejestruj</button>
            </form>
        </div>
    )
}