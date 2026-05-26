import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const AddContact = () => {
    const [data, setData] = useState([]); 

    
    useEffect(() => {
        const API_URL = 'https://playground.4geeks.com/contact/agendas/angelo'; 

        fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Err HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((resData) => {
  
            setData(resData.contacts || resData); 
        })
        .catch((error) => {
            console.error("Error cargando contactos:", error);
        });
    }, []);

    return (
        <div className="container mt-4">
            <h1>Contact List</h1>

            <div className="list-group">
                {data.length === 0 ? (
                    <p>No hay contactos o cargando...</p>
                ) : (
                    data.map((contact) => (
                        <div key={contact.id} className="list-group-item">
                            <h5>{contact.name || contact.full_name}</h5>
                            <p className="mb-1"> {contact.email}</p>
                            <p className="mb-1">{contact.phone}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};