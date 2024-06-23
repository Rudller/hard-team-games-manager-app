import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";

export default function Home () {

const user = JSON.parse(localStorage.getItem("user"))
const navigate = useNavigate();

useEffect(() => {
    if (!user) {
        navigate("/singin")
    }
}, [user ,navigate]);



    return (
        <div className="text-white">
            <Header />
            <h1>Heyooo</h1>
        </div>
    )
}