import './App.css';
import axios from 'axios';
import React from 'react';
import Bugstable from './components/Bugstable';
import Newbug from './components/Newbug';
import Searchbar from './components/Searchbar';
import Login from './components/Login';
const baseURL = "http://localhost:3000/bugs"
const queryURL = "http://localhost:3000/bug";
const userURL = "http://localhost:3000/users";
const loginURL = "http://localhost:3000/login";


function App() {
  // let login = false
  const [login, setLogin] = React.useState(false)
  console.log(login)
  const [post, setPost] = React.useState([]);
  const [querybug, setQueryBug] = React.useState([])
  const [addFormData, setAddFormData] = React.useState({
    title: '',
    description: '',
    assignee: '',
    date: '',
    time: '',
  })
  const [editContactid, setEditContactid] = React.useState(null)
  const [editFormData, setEditFormData] = React.useState({
    title: '',
    description: '',
    assignee: '',
    date: '',
    time: '',
  })
  const [addLoginData, setaddLoginData] = React.useState({
    name: '',
    password: '',
    email: '',
    admin: '',
  })

  //get request
  React.useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        setPost(response.data);
        // console.log(response.data)
      })
  }, []);


  const searchItems = (event) => {
    console.log(event)
    axios.get(`${queryURL}?assignee=${event}`)
      .then((res) => {
        setQueryBug(res.data)
        console.log(res.data)
      })
  }
  //add bug handler
  const handleAddFormChange = (event) => {
    event.preventDefault();
    let fieldname = event.target.getAttribute("name");
    let fieldvalue = event.target.value;
    // console.log(fieldname)
    // console.log(fieldvalue)

    const newFormData = { ...addFormData };
    newFormData[fieldname] = fieldvalue
    console.log(`Updating new contact data: ${fieldname} : ${fieldvalue}`)
    setAddFormData(newFormData)
    console.log(addFormData.title)
    console.log(addFormData.description)
    console.log(addFormData.assignee)
  }
  let today = new Date().toISOString().slice(0, 10)
  let time = new Date().toLocaleTimeString();
  //post request
  const handleAddFormSubmit = (event) => {
    // event.preventDefault();
    console.log("clicked submit")
    console.log(addFormData)
    axios
      .post(baseURL, {
        title: addFormData.title,
        description: addFormData.description,
        assignee: addFormData.assignee,
        date: today,
        time: time
      })
      .then((response) => {
        setPost(response.data);
      });
  }
  const handleEditClick = (event, post) => {
    event.preventDefault();
    setEditContactid(post._id);

    const formValues = {
      title: post.title,
      description: post.description,
      assignee: post.assignee,
      date: post.date,
      time: post.time,
    }
    setEditFormData(formValues);
  }
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldname = event.target.getAttribute("name")
    const fieldvalue = event.target.value
    const newFormData = { ...editFormData }
    newFormData[fieldname] = fieldvalue
    console.log(`Updating new contact data: ${fieldname} : ${fieldvalue}`)
    setEditFormData(newFormData)
  }
  const handleEditFormSubmit = (event) => {
    // event.preventDefault();
    console.log(editFormData)
    axios
      .put(`${baseURL}/${editContactid}`, {
        title: editFormData.title,
        description: editFormData.description,
        assignee: editFormData.assignee,
        date: editFormData.date,
        time: editFormData.time,
      })
      .then((response) => {
        setPost(response.data);
      });
  }
  const handleCancelClick = () => {
    setEditContactid(null)
  }
  const handleDeleteClick = (event, dataId) => {
    event.preventDefault()
    console.log(dataId)
    axios
      .delete(`${baseURL}/${dataId}`)
      .then((response) => {
        setPost(response.data)
      });
  }
  //user adduser handler
  const handleLoginFormChange = (event) => {
    event.preventDefault();
    let fieldname = event.target.getAttribute("name");
    let fieldvalue = event.target.value;
    // console.log(fieldname)
    // console.log(fieldvalue)

    const newLoginData = { ...addLoginData };
    newLoginData[fieldname] = fieldvalue
    console.log(`Updating new contact data: ${fieldname} : ${fieldvalue}`)
    setaddLoginData(newLoginData)
    // console.log(addLoginData.name)
    // console.log(addLoginData.password)
    // console.log(addLoginData.email)
  }
  const handleAddUserSubmit = (event) => {
    event.preventDefault();
    console.log("clicked submit")
    console.log(addLoginData)
    login = true
    console.log("trigger1")
    axios
      .post(userURL, {
        name: addLoginData.name,
        password: addLoginData.password,
        email: addLoginData.email,
        admin: addLoginData.admin,
      })
      .then((response) => {
        console.log(response.data);
        login = false
      });
  }
  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    console.log("clicked submit")
    console.log(addLoginData)
    axios
      .post(loginURL, {
        username: addLoginData.email,
        pass: addLoginData.password,
      })
      .then((response) => {
        console.log(response.data);
        setLogin(false)
      });
  }
  if (!post) return null;
  if (login === false) {
    return (
      <div className="d-flex flex-row">
        <h1 className='App'>Bug Tracker</h1>
        <Searchbar querybug={querybug}
          searchItems={searchItems}
        />
        <Bugstable datato={post}
          dataid={editContactid}
          handleEditClick={handleEditClick}
          editFormData={editFormData}
          handleEditFormChange={handleEditFormChange}
          handleAddFormSubmit={handleEditFormSubmit}
          handleCancelClick={handleCancelClick}
          handleDeleteClick={handleDeleteClick}
        />
        <Newbug

          handleChange={handleAddFormChange}
          handleSubmit={handleAddFormSubmit}
        // data={addFormData}

        />
      </div>
    );
  }
  else {
    return (
      <div>
        <Login handleLoginFormChange={handleLoginFormChange} handleAddUserSubmit={handleAddUserSubmit} 
        handleLoginFormSubmit={handleLoginFormSubmit} />
        <Newbug

          handleChange={handleAddFormChange}
          handleSubmit={handleAddFormSubmit}
        // data={addFormData}

        />
      </div>)
  }
}
export default App;
// {post.map(post => <div>{post.title},{post.description}, {post.assignee}, {post.date}, {post.time}</div>)}