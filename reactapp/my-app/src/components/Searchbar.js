import React from 'react'

export default function Searchbar(props) {
    console.log(props.querybug)
    return (
        <div>
            <input placeholder="Enter assignee name"
                onChange={(event) => props.searchItems(event.target.value)} />
            <table>
                {/* <caption>search</caption> */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Assignee</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>{props.querybug.map((bug) => (
                    <tr>
                        <td>{bug.title}</td>
                        <td>{bug.description}</td>
                        <td>{bug.assignee}</td>
                        <td>{bug.date}</td>
                        <td>{bug.time}</td>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    )

}
