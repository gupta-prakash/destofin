import React from 'react'
import '../Components/Input.css'

const Input = props => {
    return (
        <div>
            <select onChange={props.categoryVal} className="selectInput">
                {props.data.map((item) => <option key={item.id} value={item.id}>{item.categories}</option>)}
            </select>
        </div>
    )
}

export default Input
