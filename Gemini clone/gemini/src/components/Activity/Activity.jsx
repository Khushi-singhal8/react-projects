import { useContext } from 'react'
import { Context } from '../../context/Context'
import './Activity.css'

const Activity = ({ onClose }) => {
  const { prevPrompts, onSent } = useContext(Context)

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Activity</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="panel-body">
        {!prevPrompts || prevPrompts.length === 0 ? (
          <p style={{ padding: '20px', color: '#888', fontSize: '14px' }}>
            No recent activity.
          </p>
        ) : (
          prevPrompts.map((prompt, i) => (
            <div
              className="panel-item"
              key={i}
              onClick={() => { onSent(prompt); onClose(); }}
            >
              <span className="panel-item-icon">💬</span>
              <span className="panel-item-text">{prompt}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Activity