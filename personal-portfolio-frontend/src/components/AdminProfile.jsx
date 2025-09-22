import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProfile.css';

function AdminProfile() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const admin = JSON.parse(localStorage.getItem('user'));

  const [showAdmin, setShowAdmin] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await axios.get('http://localhost:8091/api/users/all');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Could not load user data');
    } finally {
      setLoadingUsers(false);
    }
  };

  // Function to handle user deletion
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8091/api/users/${userId}`);
      if (response.status === 200) {
        // Remove the deleted user from the UI without fetching the entire list again
        setUsers(users.filter(user => user.id !== userId));
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Could not delete user');
    }
  };

  useEffect(() => {
    if (showUsers && users.length === 0) {
      fetchUsers();
    }
  }, [showUsers]);

  if (!isAdmin) {
    return <p style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>Access Denied</p>;
  }

  return (
    <div className="admin-profile-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-subtitle">Welcome! Manage users and platform data here.</p>

      <div className="admin-actions">
        <button className="toggle-btn" onClick={() => setShowAdmin(prev => !prev)}>
          {showAdmin ? 'Hide Admin Details' : 'Show Admin Details'}
        </button>
        <button className="toggle-btn" onClick={() => setShowUsers(prev => !prev)}>
          {showUsers ? 'Hide User Logins' : 'Show Logged-In Users'}
        </button>
      </div>

      {showAdmin && (
        <div className="admin-card">
          <h2>Admin Info</h2>
          <p><strong>Name:</strong> {admin?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {admin?.email || 'N/A'}</p>
        </div>
      )}

      {showUsers && (
        <div className="user-logins">
          <h2>Registered Users</h2>
          {loadingUsers && <p>Loading users...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={index} className="user-card">
                <div className="user-profile">
                  {user.profilePhoto ? (
                    <img
                      src={`http://localhost:8091/upload/${user.profilePhoto}`}
                      alt={user.username}
                      className="user-avatar"
                    />
                  ) : (
                    <div className="user-avatar-placeholder">No Profile Photo</div>
                  )}
                </div>
                <div className="user-details">
                  <p><strong>Name:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Status:</strong> {user.status}</p>
                  <p><strong>Zone:</strong> {user.zone}</p>
                  <p><strong>Pets Donated:</strong> {user.petCount || 0}</p>
                </div>
                <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                  Delete User
                </button>
              </div>
            ))
          ) : !loadingUsers && (
            <p>No users found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
