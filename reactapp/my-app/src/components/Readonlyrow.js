import React from 'react'

const Readonlyrow = ({ data, handleEditClick, handleDeleteClick }) => {
    let time= data.date.slice(8,10)
    let today = new Date().toISOString().slice(8,10)
    console.log(today)
    return (
        <tr>
            <td>{data.title}</td>
            <td>{data.description}</td>
            <td>{data.assignee}</td>
            <td>{data.date}</td>
            <td>{data.time}</td>
            <td>
                <button type='button' onClick={(event) => handleEditClick(event, data)}>Edit</button>
                <button type='button' onClick={(event) => handleDeleteClick(event, data._id)}>Delete</button>
            </td>
            {time-today>=3 ? <td>🔴</td> : <td>🟢</td> }
        </tr>
    )
}

export default Readonlyrow
