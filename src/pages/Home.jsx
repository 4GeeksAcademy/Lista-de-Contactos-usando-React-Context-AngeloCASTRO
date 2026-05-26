import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const contacts = store.contacts || [];

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("https://playground.4geeks.com/contact/agendas/tu_agenda/contacts");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                dispatch({
                    type: "load_contacts",
                    payload: data.contacts || data
                });
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                {/* The "to" attribute must match the route path exactly */}
                <Link to="/add-contact" className="btn btn-success">
                    Add new contact
                </Link>
            </div>

            <div className="border rounded bg-white">
                {contacts.length === 0 ? (
                    <div className="text-center p-5">
                        <p className="text-muted mb-0">No contacts available.</p>
                    </div>
                ) : (
                    contacts.map((contact) => (
                        <div key={contact.id} className="d-flex align-items-center justify-content-between p-4 border-bottom position-relative">
                            <div className="d-flex align-items-center gap-4">
                                <img 
                                    src="https://picsum.photos/200" 
                                    alt={contact.name} 
                                    className="rounded-circle object-cover"
                                    style={{ width: "120px", height: "120px" }}
                                />
                                <div className="d-flex flex-column gap-1 text-muted">
                                    <h4 className="mb-1 text-dark">{contact.name}</h4>
                                    <div>
                                        <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                                        {contact.address}
                                    </div>
                                    <div>
                                        <i className="fas fa-phone me-2 text-secondary"></i>
                                        {contact.phone}
                                    </div>
                                    <div>
                                        <i className="fas fa-envelope me-2 text-secondary"></i>
                                        {contact.email}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="d-flex gap-4 align-self-start pt-2 pe-3">
                                <button className="btn p-0 text-dark">
                                    <i className="fas fa-pencil-alt fs-5"></i>
                                </button>
                                <button className="btn p-0 text-dark">
                                    <i className="fas fa-trash-alt fs-5"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};