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

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.feedbackText.trim()) newErrors.feedbackText = 'Feedback is required.';
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            console.log('Submitted:', formData);
            // TODO: Add submission logic (API call etc.)
        }
    };

    return (
        <>
            <Header />
            <section className="py-5 py-md-4 bg-light-gray">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-9">
                            <h3 className="mb-3">Feedback Form</h3>
                            <p className="">We would love to hear your thoughts, suggestions, concerns, or problems with anything so we can improve!</p>
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
                                    <textarea
                                        className={`form-control ${errors.feedbackText ? 'is-invalid' : ''}`}
                                        name="feedbackText"
                                        rows="10" 
                                        style={{ height: '140px' }}
                                        value={formData.feedbackText}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.feedbackText && <div className="invalid-feedback">{errors.feedbackText}</div>}
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-success px-4">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FeedbackForm;
