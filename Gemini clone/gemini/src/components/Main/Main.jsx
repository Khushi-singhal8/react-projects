import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { UserButton } from '@clerk/clerk-react'  // ← add this

const Main = () => {

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <UserButton />  {/* ← replace the img tag with this */}
      </div>

      {/* rest of your code stays exactly the same */}
      <div className="main-container">
        {!showResult
          ? <>
              <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                <div className="card" onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip.")}>
                  <p>Suggest beautiful places to see on an upcoming road trip.</p>
                  <img src={assets.compass_icon} alt="Compass" />
                </div>
                <div className="card" onClick={() => onSent("Briefly summarize this concept: urban planning.")}>
                  <p>Briefly summarize this concept: urban planning.</p>
                  <img src={assets.bulb_icon} alt="Bulb" />
                </div>
                <div className="card" onClick={() => onSent("Brainstorm team bonding activities for our work retreat.")}>
                  <p>Brainstorm team bonding activities for our work retreat.</p>
                  <img src={assets.message_icon} alt="Message" />
                </div>
                <div className="card" onClick={() => onSent("Improve the readability of the following code.")}>
                  <p>Improve the readability of the following code.</p>
                  <img src={assets.code_icon} alt="Code" />
                </div>
              </div>
            </>
          : <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="User" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="Gemini" />
                {loading
                  ? <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                }
              </div>
            </div>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder='Enter a prompt here'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input && onSent(input)}
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Microphone" />
              {input ? <img onClick={() => onSent(input)} src={assets.send_icon} alt="Send" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main