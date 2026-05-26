import React, { useState, useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { useClerk, useUser } from '@clerk/clerk-react'
import Help from '../Help/Help'
import Activity from '../Activity/Activity'
import Settings from '../Settings/Settings'

const Sidebar = () => {

  const [extended, setExtended] = useState(false)
  const [activePanel, setActivePanel] = useState(null) // 'help' | 'activity' | 'settings'
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)
  const { signOut } = useClerk()
  const { user } = useUser()

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  const togglePanel = (panel) => {
    setActivePanel(prev => prev === panel ? null : panel)
  }

  return (
    <>
      <div className='sidebar'>
        <div className="top">
          <img
            onClick={() => setExtended(prev => !prev)}
            className='menu'
            src={assets.menu_icon}
            alt=""
          />
          <div onClick={() => newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended ? <p>New Chat</p> : null}
          </div>

          {extended
            ? <div className="recent">
                <p className="recent-title">Recent</p>
                {prevPrompts.map((item, index) => (
                  <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0, 18)}...</p>
                  </div>
                ))}
              </div>
            : null
          }
        </div>

        <div className="bottom">
          <div
            className={`bottom-item recent-entry ${activePanel === 'help' ? 'active-panel' : ''}`}
            onClick={() => togglePanel('help')}
          >
            <img src={assets.question_icon} alt="" />
            {extended ? <p>Help</p> : null}
          </div>

          <div
            className={`bottom-item recent-entry ${activePanel === 'activity' ? 'active-panel' : ''}`}
            onClick={() => togglePanel('activity')}
          >
            <img src={assets.history_icon} alt="" />
            {extended ? <p>Activity</p> : null}
          </div>

          <div
            className={`bottom-item recent-entry ${activePanel === 'settings' ? 'active-panel' : ''}`}
            onClick={() => togglePanel('settings')}
          >
            <img src={assets.setting_icon} alt="" />
            {extended ? <p>Settings</p> : null}
          </div>
        </div>
      </div>

      {/* Panels render outside sidebar div so they don't get clipped */}
      {activePanel === 'help'     && <Help     onClose={() => setActivePanel(null)} />}
      {activePanel === 'activity' && <Activity onClose={() => setActivePanel(null)} />}
      {activePanel === 'settings' && <Settings onClose={() => setActivePanel(null)} user={user} signOut={signOut} />}
    </>
  )
}

export default Sidebar