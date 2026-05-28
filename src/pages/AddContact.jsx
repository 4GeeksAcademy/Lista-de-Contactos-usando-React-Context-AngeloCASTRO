import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AddContact = () => {
    const navigate = useNavigate();
    
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/angelo/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            navigate("/");
        } catch (error) {
            console.error("Error creating contact:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add a new contact</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Full Name"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter phone"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter address"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                    save
                </button>
            </form>

            <Link to="/">
                or get back to contacts
            </Link>
        </div>
    );
};