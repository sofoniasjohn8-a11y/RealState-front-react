import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE, buildAuthHeaders } from '../utils/api';

function ChangeLicenseNum() {
    const { user } = useAuth();
    const [oldLicenseNum, setOldLicenseNum] = useState('');
    const [newLicenseNum, setNewLicenseNum] = useState('');
    const [confirmNewLicenseNum, setConfirmNewLicenseNum] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!oldLicenseNum || !newLicenseNum || !confirmNewLicenseNum) {
            setError('Please enter your current license and the new license twice.');
            return;
        }

        if (newLicenseNum !== confirmNewLicenseNum) {
            setError('New license numbers do not match.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/admin/change-license`, {
                method: 'POST',
                headers: buildAuthHeaders(user?.token),
                body: JSON.stringify({
                    oldLicense: oldLicenseNum,
                    newLicense: newLicenseNum
                })
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(result?.message || 'Unable to update license number');
            }

            setSuccess('License number updated successfully!');
            setOldLicenseNum('');
            setNewLicenseNum('');
            setConfirmNewLicenseNum('');
        } catch (err) {
            setError(err.message || 'License update failed.');
            console.error('Update license error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5>Change Agent License Number</h5>
            </div>
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Current License Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={oldLicenseNum}
                            onChange={(e) => setOldLicenseNum(e.target.value)}
                            placeholder="Enter current license number"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New License Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={newLicenseNum}
                            onChange={(e) => setNewLicenseNum(e.target.value)}
                            placeholder="Enter new license number"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm New License Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={confirmNewLicenseNum}
                            onChange={(e) => setConfirmNewLicenseNum(e.target.value)}
                            placeholder="Confirm new license number"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Updating...' : 'Update License Number'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangeLicenseNum;