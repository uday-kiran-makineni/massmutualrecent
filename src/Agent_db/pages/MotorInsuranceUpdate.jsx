import React, { useState } from "react";
import axios from "axios";

const MotorInsuranceUpdate = () => {
    const [formData, setFormData] = useState({
        policyNumber: "",
        agentId: "",
        agentEmail: "",
        userId: "",
        userEmail: "",
        mobileNumber: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleRegistrationNumber: "",
        startDate: "",
        endDate: "",
        premiumAmount: "",
        coverageAmount: "",
        paymentFrequency: "",
        policyStatus: "Inactive",
        beneficiaryDetails: ""
    });
    const [error, setError] = useState("");
    const [fetchError, setFetchError] = useState("");
    const { policyNumber } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFetchPolicy = async () => {
        setFetchError("");
        if (!policyNumber) {
            setFetchError("Please enter a valid policy number.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8081/api/motorinsurances/${policyNumber}`, {
                auth: {
                    username: 'user',
                    password: 'user'
                }
            });
            console.log("Policy data fetched successfully:", response.data);
            setFormData(response.data); // Populates form fields with the fetched policy details
        } catch (error) {
            if (error.response) {
                console.error("Error fetching data:", error.response.data);
                setFetchError("No policy found with the entered number.");
            } else if (error.request) {
                console.error("No response from server:", error.request);
                setFetchError("Failed to connect to the server.");
            } else {
                console.error("Error:", error.message);
                setFetchError("Error fetching policy data.");
            }
        }
    };

    const validateForm = () => {
        if (!policyNumber) {
            setError("Policy number is required.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                console.log(`Sending update request to: http://localhost:8081/api/motorinsurances/update/${policyNumber}`);
                console.log("Form Data:", formData);

                const response = await axios.put(`http://localhost:8081/api/motorinsurances/update/${policyNumber}`, formData, {
                    auth: {
                        username: 'user',
                        password: 'user'
                    }
                });

                console.log("Policy updated successfully:", response.data);
                alert("Policy updated successfully!");

                // Reset form after successful update
                setFormData({
                    policyNumber: "",
                    agentId: "",
                    agentEmail: "",
                    userId: "",
                    userEmail: "",
                    mobileNumber: "",
                    vehicleMake: "",
                    vehicleModel: "",
                    vehicleRegistrationNumber: "",
                    startDate: "",
                    endDate: "",
                    premiumAmount: "",
                    coverageAmount: "",
                    paymentFrequency: "",
                    policyStatus: "Inactive",
                    beneficiaryDetails: ""
                });
            } catch (error) {
                console.error("Error updating policy:", error);
                alert("There was an error updating the policy. Please try again.");
            }
        }
    };

    return (
        <div className="container">
            <h2>Update Motor Insurance Policy</h2>
            <div className="form-group">
                <label htmlFor="policyNumber">Enter Policy Number to Fetch Details</label>
                <input
                    type="text"
                    id="policyNumber"
                    name="policyNumber"
                    className="form-control"
                    value={formData.policyNumber}
                    onChange={handleChange}
                />
                <button className="btn btn-primary mt-2" onClick={handleFetchPolicy}>
                    Fetch Policy
                </button>
                {fetchError && <p className="text-danger mt-2">{fetchError}</p>}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="agentId">Agent ID</label>
                    <input
                        type="text"
                        id="agentId"
                        name="agentId"
                        className="form-control"
                        value={formData.agentId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="agentEmail">Agent Email</label>
                    <input
                        type="email"
                        id="agentEmail"
                        name="agentEmail"
                        className="form-control"
                        value={formData.agentEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userId">User ID</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        className="form-control"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userEmail">User Email</label>
                    <input
                        type="email"
                        id="userEmail"
                        name="userEmail"
                        className="form-control"
                        value={formData.userEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        className="form-control"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="vehicleMake">Vehicle Make</label>
                    <input
                        type="text"
                        id="vehicleMake"
                        name="vehicleMake"
                        className="form-control"
                        value={formData.vehicleMake}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="vehicleModel">Vehicle Model</label>
                    <input
                        type="text"
                        id="vehicleModel"
                        name="vehicleModel"
                        className="form-control"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="vehicleRegistrationNumber">Vehicle Registration Number</label>
                    <input
                        type="text"
                        id="vehicleRegistrationNumber"
                        name="vehicleRegistrationNumber"
                        className="form-control"
                        value={formData.vehicleRegistrationNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="premiumAmount">Premium Amount</label>
                    <input
                        type="number"
                        id="premiumAmount"
                        name="premiumAmount"
                        className="form-control"
                        value={formData.premiumAmount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="coverageAmount">Coverage Amount</label>
                    <input
                        type="number"
                        id="coverageAmount"
                        name="coverageAmount"
                        className="form-control"
                        value={formData.coverageAmount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paymentFrequency">Payment Frequency</label>
                    <input
                        type="text"
                        id="paymentFrequency"
                        name="paymentFrequency"
                        className="form-control"
                        value={formData.paymentFrequency}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="policyStatus">Policy Status</label>
                    <select
                        id="policyStatus"
                        name="policyStatus"
                        className="form-control"
                        value={formData.policyStatus}
                        onChange={handleChange}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="beneficiaryDetails">Beneficiary Details</label>
                    <textarea
                        id="beneficiaryDetails"
                        name="beneficiaryDetails"
                        className="form-control"
                        value={formData.beneficiaryDetails}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <p className="text-danger">{error}</p>}

                <button type="submit" className="btn btn-success mt-3">
                    Update Policy
                </button>
            </form>
        </div>
    );
};

export default MotorInsuranceUpdate;
