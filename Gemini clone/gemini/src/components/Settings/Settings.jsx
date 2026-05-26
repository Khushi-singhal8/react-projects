import { useState } from 'react'
import './Settings.css'

const Settings = ({ onClose, user, signOut }) => {
  const [personalization, setPersonalization] = useState(true)
  const [saveActivity, setSaveActivity] = useState(false)

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Settings</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="panel-body">

        <p className="settings-label">Account</p>
        <div className="panel-item" style={{ gap: '12px' }}>
          <img
            src={user?.imageUrl}
            alt="avatar"
            style={{ width: 36, height: 36, borderRadius: '50%' }}
            referrerPolicy="no-referrer"
          />
          <div>
            <p style={{ fontSize: 13, fontWeight: 500 }}>{user?.fullName}</p>
            <p style={{ fontSize: 11, color: '#888' }}>
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        <p className="settings-label">Preferences</p>
        <div className="panel-item">
          <span>Personalization</span>
          <button
            className={`toggle ${personalization ? 'on' : ''}`}
            onClick={() => setPersonalization(p => !p)}
          />
        </div>
        <div className="panel-item">
          <span>Save activity</span>
          <button
            className={`toggle ${saveActivity ? 'on' : ''}`}
            onClick={() => setSaveActivity(p => !p)}
          />
        </div>

        <div style={{ padding: '16px 20px' }}>
          <button className="signout-btn" onClick={() => signOut()}>
            Sign out
          </button>
        </div>

      </div>
    </div>
  )
}

export default Settings