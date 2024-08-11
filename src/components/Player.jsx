import React, { useState } from 'react'

function Player({name,symbol,isActive,onChangePlayerName}) {
    const [Name,setName] = useState(name)
    const [editing,setEditing] = useState(false)

    const handleClick = () => {
        setEditing(editing => !editing)
        if(editing) {
          onChangePlayerName(symbol,Name)
        }
      
    
    }

    const handleChnage = (e) => {
        setName(e.target.value)
     
    }

    const Caption = editing ? "Save" : "Edit";

  return (
    <li className={isActive ? 'active' : undefined}>
    <span className="player">
    {editing ? <input type="text" required value={Name}  onChange={handleChnage}/> : <span className="player-name">{Name}</span>}
    <span className="player-symbol">{symbol}</span>
    </span>
   <button onClick={handleClick}>{Caption}</button>

    </li>
  )
}

export default Player
