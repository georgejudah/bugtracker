import React, { Fragment } from "react";
import { Editablerow } from "./Editablerow";
import Readonlyrow from "./Readonlyrow";

export default function Bugstable(props) {
    // console.log(props.datato)
    return (
        <div>
        <form onSubmit={props.handleAddFormSubmit}>
            <table>
                <caption>Bugs List</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Assignee</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.datato.map((data) => (
                        <Fragment>
                            {props.dataid === data._id ?<Editablerow editFormData={props.editFormData} handleEditFormChange={props.handleEditFormChange} handleCancelClick= {props.handleCancelClick}/>:<Readonlyrow data={data} handleEditClick={props.handleEditClick} handleDeleteClick = {props.handleDeleteClick}/> }
                            {/* <Readonlyrow data={data} /> */}
                        </Fragment>
                        //cannot have 2 child so using Fragment
                    ))}
                </tbody>
            </table>
            </form>
        </div>
    )
}
