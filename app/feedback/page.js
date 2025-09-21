"use client"
import React, { useState } from 'react';
import Header from '../components/header/header';

function FeedbackForm() {
    const [formData, setFormData] = useState({
        feedbackType: '',
        feedbackText: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', formData);
        // TODO: Add submission logic (API call etc.)
    };

    return (
        <>
            <Header></Header>
            <section className="py-5 py-md-4 bg-light-gray">
                <div className="container">
                    <div className="row col-md-12">
                        <h3>Feedback Form</h3>
                        <p>We would love to hear your thoughts, suggestions, concerns, or problems with anything so we can improve!</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label d-block">Feedback Type</label>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="feedbackType" value="Comments"
                                        checked={formData.feedbackType === 'Comments'} onChange={handleChange} />
                                    <label className="form-check-label">Comments</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="feedbackType" value="Suggestions"
                                        checked={formData.feedbackType === 'Suggestions'} onChange={handleChange} />
                                    <label className="form-check-label">Suggestions</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="feedbackType" value="Questions"
                                        checked={formData.feedbackType === 'Questions'} onChange={handleChange} />
                                    <label className="form-check-label">Questions</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Describe Your Feedback</label>
                                <textarea className="form-control" name="feedbackText" rows="6"
                                    value={formData.feedbackText} onChange={handleChange}></textarea>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" name="firstName"
                                        value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" name="lastName"
                                        value={formData.lastName} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="email"
                                    value={formData.email} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FeedbackForm;
