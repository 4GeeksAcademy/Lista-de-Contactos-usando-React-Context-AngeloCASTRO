import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const EditContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams();
    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSingleContact = async () => {
            if (store.contacts && store.contacts.length > 0) {
                const currentContact = store.contacts.find(c => Number(c.id) === Number(id));
                if (currentContact) {
                    setContact(currentContact);
                    setLoading(false);
                    return;
                }
            }
            try {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/angelo/contacts/${id}`);
                if (!response.ok) throw new Error("Contact not found");
                const data = await response.json();
                setContact({ name: data.name || "", email: data.email || "", phone: data.phone || "", address: data.address || "" });
            } catch (error) {
                console.error(error);
                alert("Contact not found");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        fetchSingleContact();
    }, [id, store.contacts, navigate]);

    const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/angelo/contacts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contact)
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const updatedContact = await response.json();
            const updatedList = store.contacts.map(c => Number(c.id) === Number(id) ? { ...c, ...updatedContact } : c);
            dispatch({ type: "load_contacts", payload: updatedList });
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Update failed. Try again.");
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-center mb-4">Edit Contact</h1>
                    <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow-sm">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Full Name" value={contact.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={contact.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="phone" name="phone" placeholder="Enter phone" value={contact.phone} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" name="address" placeholder="Enter address" value={contact.address} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3">Save Changes</button>
                        <Link to="/" className="d-block text-center">or get back to contacts</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};