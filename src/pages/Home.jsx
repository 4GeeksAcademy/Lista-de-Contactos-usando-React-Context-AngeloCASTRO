import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const contacts = store.contacts || [];
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        
        const fetchContacts = async () => {
            try {
                const response = await fetch("https://playground.4geeks.com/contact/agendas/angelo");
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                const contactsArray = data && Array.isArray(data.contacts) ? data.contacts : [];
                dispatch({ type: "load_contacts", payload: contactsArray });
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };
        fetchContacts();
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/angelo/contacts/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Delete failed");
            const updatedContacts = contacts.filter(contact => contact.id !== id);
            dispatch({ type: "load_contacts", payload: updatedContacts });
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/add-contact" className="btn btn-success">Add new contact</Link>
            </div>
            <div className="border rounded bg-white">
                {contacts.length === 0 ? (
                    <div className="text-center p-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted mt-2 mb-0">Loading contacts...</p>
                    </div>
                ) : (
                    contacts.map((contact) => (
                        <div key={contact.id} className="d-flex align-items-center justify-content-between p-4 border-bottom position-relative">
                            <div className="d-flex align-items-center gap-4">
                                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-secondary border" style={{ width: "120px", height: "120px", minWidth: "120px" }}>
                                    <FontAwesomeIcon icon={faUser} style={{ fontSize: "60px" }} />
                                </div>
                                <div className="d-flex flex-column gap-1 text-muted">
                                    <h4 className="mb-1 text-dark">{contact.name}</h4>
                                    <div><i className="fas fa-map-marker-alt me-2 text-secondary"></i>{contact.address}</div>
                                    <div><i className="fas fa-phone me-2 text-secondary"></i>{contact.phone}</div>
                                    <div><i className="fas fa-envelope me-2 text-secondary"></i>{contact.email}</div>
                                </div>
                            </div>
                            <div className="d-flex gap-4 align-self-start pt-2 pe-3">
                                <Link to={`/edit-contact/${contact.id}`} className="btn p-0 text-dark">
                                    <i className="fas fa-pencil-alt fs-5"></i>
                                </Link>
                                <button className="btn p-0 text-dark" onClick={() => handleDelete(contact.id)}>
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