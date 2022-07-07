import { useState } from "react"
import { useGlobal } from "../Global";
import Axios from "axios";
import { useEffect } from "react";

export default function Services({ user }) {
  const userToken = useGlobal(state => state.userToken)

  const [buttons, setButtons] = useState([
    { name: "firstName", status: false },
    { name: "lastName", status: false },
    { name: "email", status: false },
    { name: "photo", status: false },
    { name: "role", status: false }
  ])

  const [fields, setFields] = useState([
    { name: "firstName", input: "" },
    { name: "lastName", input: "" },
    { name: "email", input: "" },
    { name: "photo", input: "" },
    { name: "role", input: "" }
  ])

  // Checks if the buttons was clicked
  const handleButtons = (name, status) => { setButtons(prevButtons =>
      prevButtons.map((button) => button.name === name ? { ...button, status: status } : { ...button }));
  };

  // Handles inputs from the user
  const handleInputs = (name, i) => { setFields(prevFields =>
      prevFields.map((field) => field.name === name ? { ...field, input: i.target.value } : { ...field }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for ( let index = 0; index < buttons.length; index++ ) handleButtons( buttons[index].name , false)

    Axios.post("http://localhost:5000/api/users/profile/" + user?._id, {

      // To verify the token in the protect, of UserRoutes
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "application/json", "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },

      // This is the req.body.data
      data: {
        name: {
          firstName: fields[0].input,
          lastName: fields[1].input
        },
        email: fields[2].input,
        photo: fields[3].input,
        role: fields[4].input
      },
      withCredentials: true
    })
      .then((resObject) => { console.log("done") })
      .catch((err) => { console.log(err) })
  }

  useEffect(() => { console.log("called!") }, [buttons])

  console.log(fields)

  return (
    <div className="bg-white">
      <div className="max-w-xl mx-auto py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 id="products-heading" className="ml-8 mb-12 text-2xl"> Settings </h2>


        <span className="block flex-grow">

          <div className="flex justify-between">
            <label htmlFor="firstName">First Name: </label>
            {buttons[0].status ? (
            <input
              defaultValue={fields[0].input}
              onChange={i => handleInputs("firstName", i)}
              className="w-1/4 rounded-md shadow-lg border-2"
              ></input>) : (user?.name.firstName)}
            {buttons[0].status ? 
            (<button onClick={ handleSubmit }> Update </button>) : 
            (<button onClick={() => { handleButtons("firstName", !buttons[0].status) }}> Update </button>)}
            
          </div>

          <div className="flex justify-between">
            <label htmlFor="lastName">Last Name: </label>
            {buttons[1].status ? (
            <input 
              defaultValue={fields[1].input}
              onChange={i => handleInputs("lastName", i)}
              className="w-1/4 rounded-md shadow-lg border-2">
            </input>) : (user?.name.lastName)}
            <button onClick={() => { handleButtons("lastName", !buttons[1].status) }}> Update </button>
          </div>

          <div className="flex justify-between">
            <label htmlFor="email">Email: </label>
            {buttons[2].status ? (
            <input 
              defaultValue={fields[2].input}
              onChange={i => handleInputs("email", i)}
              className="w-1/4 rounded-md shadow-lg border-2">
            </input>) : (user?.email)}
            <button onClick={() => { handleButtons("email", !buttons[2].status) }}> Update </button>
          </div>

          <div className="flex justify-between">
            <label htmlFor="photo">Photo: </label>
            {buttons[3].status ? (
            <input 
              defaultValue={fields[3].input}
              onChange={i => handleInputs("photo", i)}
              className="w-1/4 rounded-md shadow-lg border-2">
            </input>) : (user?.photo)}
            <button onClick={() => { handleButtons("photo", !buttons[3].status) }}> Update </button>
          </div>

          <div className="flex justify-between">
            <label htmlFor="role">Role: </label>
            {buttons[4].status ? (
            <input 
              defaultValue={fields[4].input}
              onChange={i => handleInputs("role", i)}
              className="w-1/4 rounded-md shadow-lg border-2">
            </input>) : (user?.role)}
            <button onClick={() => { handleButtons("role", !buttons[4].status) }}> Update </button>
          </div>

        </span>

      </div>
    </div>
  )
}