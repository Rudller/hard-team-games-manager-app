import newRealization from "../classes/newRealization";
import newTeam from "../classes/newTeam";
import { useState } from "react";

function NewRealization() { 
const [page, setPage] = useState(1);
const [form, setForm] = useState({});

const [numberofPeople, setNumberofPeople] = useState(0);
const [teamsNumber, setTeamsNumber] = useState(0);

const handlesubmit = (e) => {
    e.preventDefault();
    
    if (page == 1) {
        setForm(new newRealization(
            e.target[0].value, 
            e.target[1].value, 
            e.target[2].value, 
            e.target[3].value, 
            {teamsNumber: e.target[4].value, teams: []}
        ));
        setPage(2);
        return;
    } else if (page == 2) {
        let teams = [];
        for (let i = 0; i < form.teams.teamsNumber; i++) {
            teams.push(new newTeam(i+1, e.target[i].value, e.target[i+1].value, 0, []))
        }
        form.teams.teams = teams;
        setPage(3);
    } else if (page == 3) {
        fetch('http://localhost:5000/api/realizations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
        })
        //.then (res => res.json())
        .then(data => {
            console.log("Success:", data)
            alert("Realizacja została dodana")
        })
        .catch((error) => {
            console.error("Error:", error)
            alert("Wystąpił błąd")
        })
    }
}

    return (
        <div className=" text-white font-mono flex flex-col">
            {page == 1 && <form onSubmit={handlesubmit} className=" flex flex-col">
                <label className="felx flex-col mt-2 mx-auto text-lg">Nazwa Firmy:</label>
                <input className=" bg-transparent border border-orange-500 rounded mx-4 mb-2 p-2" type="text" />
                <label className="felx flex-col mt-2 mx-auto text-lg">Opis realizacji:</label>
                <textarea className=" bg-transparent border border-orange-500 rounded mx-4 mb-2 p-2" />    
                <label className="felx flex-col mt-2 mx-auto text-lg">Data realizacji:</label>
                <input className=" w-40 bg-orange-500 border border-orange-500 rounded mx-auto mb-2 p-2" type="date" />     
                <label className="felx flex-col mt-2 mx-auto text-lg">
                    Ilość osób:
                    <input className=" w-14 bg-transparent border border-orange-500 rounded mx-4 mb-2 p-2" type="text" value={numberofPeople} onChange={e => setNumberofPeople(e.target.value)} />
                </label>
                <label className="felx flex-col mt-2 mx-auto text-lg">
                    Ilość drużyn:
                    <input className=" w-14 bg-transparent border border-orange-500 rounded mx-4 mb-2 p-2" type="text" value={teamsNumber} onChange={e => setTeamsNumber(e.target.value)}/>
                </label>  
            <button className=" font-bold text-xl bg-orange-500 border-2 border-white rounded-xl px-4 py-2 mx-auto my-8" type="submit">Dalej</button>
            </form>}
            {page == 2 && <form onSubmit={handlesubmit} className=" flex flex-col">
                <button onClick={() => {setPage(3)}} className="bg-orange-500 mx-4 mt-4 py-2 border-2 border-orange-900 rounded-lg">Pominąć?</button>
                {Array.from({ length:form.teams.teamsNumber }).map((_, i) => {
                    return ( <div key={i} className="flex flex-col mt-5 mx-auto border border-orange-500 rounded-lg p-2">
                        <h1 className=" font-bold text-xl">Drużyna {i+1}</h1>
                        <label>
                            Nazwa drużyny:
                            <input placeholder="Opcjonalnie" type="text" className="bg-transparent border border-orange-500 rounded mx-4 mb-2 p-2" />
                        </label>
                        <label>
                            Kolor drużyny:
                            <input type="text" className="bg-transparent border border-orange-500 rounded mx-4 mb-2 p-2" />
                        </label>
                    </div>  
                    )
                })}
                <button className="bg-orange-500 mx-4 mt-4 py-2 border-2 border-orange-900 rounded-lg">Dalej</button>
            </form>}
            {page == 3 && <form onSubmit={handlesubmit} className=" flex flex-col">
                <h1 className="text-2xl mx-auto my-5">Podsumowanie:</h1>
                <div className="flex flex-col mt-5 mx-5 border border-orange-500 rounded-lg p-2">
                    <p>Nazwa Firmy: {form.companyName}</p>
                    <p>Opis realizacji: {form.description}</p>
                    <p>Data realizacji: {form.date}</p>
                    <p>Ilość osób: {form.numberOfPeople}</p>
                    <p>Ilość drużyn: {form.teams.teamsNumber}</p>
                </div>
                {form.teams.teams.map((team, i) => {
                    return (
                        <div key={i} className="flex flex-col mt-5 mx-5 border border-orange-500 rounded-lg p-2">
                            <p>Drużyna {team.id}</p>
                            <p>Nazwa drużyny: {team.name}</p>
                            <p>Kolor drużyny: {team.color}</p>
                        </div>
                    )
                })}
                <button onSubmit={handlesubmit} className="bg-orange-500 mx-4 mt-4 py-2 border-2 border-orange-900 rounded-lg">Dodaj realizację</button>
            </form>}
        </div>
    )
}

export default NewRealization;