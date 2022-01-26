import React from "react";

export default function Newbug(props) {
    return (
        <div >
            <h2>New Bug form</h2>
            <form onSubmit={props.handleSubmit}>
                <input
                    type="text"
                    name="title"
                    required="required"
                    placeholder="Enter name"
                    // value={data.title} 
                    onChange={props.handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    // value={data.description} 
                    onChange={props.handleChange}
                />
                <select name="assignee" onChange={props.handleChange}>
                <option disabled selected value> -- select an option -- </option>
                    <option value="George">George</option>
                    <option value="Judah">Judah</option>
                    <option value="Albert">Albert</option>
                    <option value="Julie">Julie</option>
                    <option value="Peterson">Peterson</option>
                </select>
                <button type="submit" >Add Bug</button>
            </form>
        </div>
    )
}