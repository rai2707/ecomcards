import React, { useEffect, useState } from "react";

export default function Body (){

    const [card, setCard] = useState([])
    const fetchData = async () =>{
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()
        setCard(data)
        console.log(data)
    }
    useEffect(() =>{
        fetchData()
    }, [])
    return (
        <div>
            {card.map((ele)=>(
                <div>
                    <h1>{ele.category}</h1>
                    <h1>{ele.price}</h1>
                </div>
            ))}
        </div>
    )
}