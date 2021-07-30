import React from 'react'
import '../Components/MapStyle.css'

const MapStyle = props => {
    return (
        <div className="radioContainer">
            <input checked={props.defaultStyle} onChange={props.changeStyle} type="radio" id={props.option} name={props.name} value={props.option} />
            <label className='styleLabel' htmlFor={props.option}>{props.option}</label>
        </div>
    )
}

export default MapStyle
