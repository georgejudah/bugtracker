import React from 'react'

export const Editablerow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder='enter the name...'
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditFormChange}
                />


            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder='enter the description...'
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                />


            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder='enter the assignee...'
                    name="assignee"
                    value={editFormData.assignee}
                    onChange={handleEditFormChange}
                />

            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder='enter the date...'
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditFormChange}
                />

            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder='enter the time...'
                    name="time"
                    value={editFormData.time}
                    onChange={handleEditFormChange}
                />

            </td>
            <td>
                <button type='submit'>Save</button>
                <button type='button'onClick={handleCancelClick} >Cancel</button>
            </td>
        </tr>
    )
}
