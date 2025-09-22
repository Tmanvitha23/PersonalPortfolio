import React, { useEffect, useState } from 'react';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [donatedPets, setDonatedPets] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        localStorage.setItem('username', parsedUser.username); // Store username in localStorage
      } catch (e) {
        console.error('Invalid user data in localStorage');
        window.location.href = '/login';
      }
    } else {
      window.location.href = '/login';
    }

    const pets = JSON.parse(localStorage.getItem('donatedPets')) || [];
    setDonatedPets(pets);
  }, []);

  if (!user) return <div>Loading...</div>;

  const userInfo = user?.data ?? user;
  const donatedCount = donatedPets.length;
  const adoptedCount = donatedPets.filter(pet => pet.donationStatus === 'Adopted').length;

  return (
    <div className="user-profile-container">
      <h2 className="profile-title">👤 User Profile</h2>

      <div className="profile-main">
        <div className="profile-left">
          <div className="profile-card">
            {userInfo.profilePhoto ? (
              <img
                className="profile-image-large"
                src={`http://localhost:8091/upload/${userInfo.profilePhoto}`}
                alt="Profile"
              />
            ) : (
              <div className="profile-photo-placeholder">No Image</div>
            )}
            <h3 className="username-display">@{userInfo.username}</h3>
          </div>

          <div className="user-details-card">
            <div>
              <strong>📧 Email:</strong>{' '}
              <span className="email-text">{userInfo.email ?? 'N/A'}</span>
            </div>
            <div>
              <strong>🔐 Role:</strong>{' '}
              <span className={`role-text ${userInfo.role?.toLowerCase()}`}>
                {userInfo.role ?? 'N/A'}
              </span>
            </div>
            <div>
              <strong>⚠️ Status:</strong>{' '}
              <span className={`status-text ${userInfo.status?.toLowerCase()}`}>
                {userInfo.status ?? 'N/A'}
              </span>
            </div>
            <div>
              <strong>📍 Zone:</strong>{' '}
              <span className="zone-text">{userInfo.zone ?? 'Not specified'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
