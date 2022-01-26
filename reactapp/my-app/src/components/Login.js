import React from 'react'
import '../App.css';

export default function Login(props) {

    return (
        <div className="formContainer">
            <h2 class="formHeader">Sign Up!</h2>
            <form onSubmit={props.handleAddUserSubmit}>
                <div className="formContentContainer">
                    <div className="group">
                        <label className="label">Username</label>
                        <input type="text" name="name" class="formInput" required="required" onChange={props.handleLoginFormChange} />
                    </div>
                    <div className="group">
                        <label className="label">Password</label>
                        <input type="password" class="formInput" required="required" name="password" data-type="password" onChange={props.handleLoginFormChange} />
                    </div>
                    <div className="group">
                        <label className="label">Email Address</label>
                        <input type="text" class="formInput" name="email" required="required" onChange={props.handleLoginFormChange} />
                    </div>
                    <div className='group'>
                        <label className="label">Admin</label>
                        <select name="admin" class="formInput" onChange={props.handleLoginFormChange}>
                            <option disabled selected value> -- select an option -- </option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <div className="group">
                        <input type="submit" onClick={props.handleAddUserSubmit} class="submitButton" value="Sign Up" />
                    </div>
                    <div className="hr"></div>
                    <div className="foot-lnk">
                        <label>Already Member?</label>
                    </div>
                </div>
            </form>
            <div>
                <h2 class="formHeader">Sign In!</h2>
                <form onSubmit={props.handleLoginFormSubmit}>
                    <div className="formContentContainer">
                        <div className="group">
                            <label className="label">Email Address</label>
                            <input type="text" class="formInput" name="email" required="required" onChange={props.handleLoginFormChange} />
                        </div>
                        <div className="group">
                            <label className="label">Password</label>
                            <input type="password" class="formInput" required="required" name="password" data-type="password" onChange={props.handleLoginFormChange} />
                        </div>


                        <div className="group">
                            <input type="submit" onClick={props.handleLoginFormSubmit} class="submitButton" value="Sign in" />
                        </div>
                        <div className="hr"></div>
                        <div className="foot-lnk">
                            <label>Already Member?</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
