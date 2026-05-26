import './Help.css'

const Help = ({ onClose }) => {
  const items = [
    { icon: '📖', label: 'Getting started guide' },
    { icon: '⌨️', label: 'Keyboard shortcuts' },
    { icon: '🔒', label: 'Privacy & data usage' },
    { icon: '💬', label: 'Send feedback' },
    { icon: '🌐', label: 'Visit help center' },
    { icon: 'ℹ️', label: 'About Gemini' },
  ]

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Help</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="panel-body">
        {items.map((item, i) => (
          <div className="panel-item" key={i}>
            <span className="panel-item-icon">{item.icon}</span>
            <span>{item.label}</span>
            <span className="panel-item-arrow">›</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Help