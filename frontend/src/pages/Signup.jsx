import ErrorCard from "../components/ErrorCard"
import Logo from "../assets/images/logo.jpg"
import { useState } from "react"
import Axios from "axios"

import { useGlobal } from "../Global"

export default function Signup() {
    const cartItems = useGlobal(state => state.cartItems)
    const [errorMessages, setErrorMessages] = useState([])
    const [toggleError, setToggleError] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const setUserToken = useGlobal((state) => state.setUserToken)

    const handleSubmit = async (e) => {
        const caughtErrors = []
        e.preventDefault();

        if (firstName === "") caughtErrors.push("First Name field is empty."); setToggleError(true)
        if (lastName === "") caughtErrors.push("Last Name field is empty."); setToggleError(true)
        if (email === "") caughtErrors.push("Email field is empty."); setToggleError(true)
        if (password === "") caughtErrors.push("Password field is empty."); setToggleError(true)
        if (firstName !== "" && lastName !== "" && email !== "" && password !== "") { setToggleError(false);
            Axios.post("http://localhost:5000/api/import/user", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, data: { firstName, lastName, email, password }, withCredentials: true })
                .then((res) => {
                    setUserToken(res.data.token)
                    if ( cartItems.length > 0 ) window.location = "/checkout-page"
                    else window.location = "/"
                }) 
                .catch((err) => { caughtErrors.push(err.response.data); setToggleError(true) })
        }
        setErrorMessages(caughtErrors)
    }
    
    return (
        <>
            <div className="bg-gray-200 w-full h-screen min-h-full flex flex-col py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src={Logo}
                        alt="Workflow"
                    />
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Sign Up Form</h2>
                </div>

                <div className="mx-auto mt-4 w-max bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10">
                { toggleError ? <div className="mb-2"><ErrorCard header={"There are errors with your submission."} messages={errorMessages} /></div> : null }
                        <div className="block sm:flex">
                            <div className="mr-8 w-1/2">
                                <div>
                                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            onChange={i => setFirstName(i.target.value)}
                                            id="firstname"
                                            name="name.firstName"
                                            type="text"
                                            required
                                            className="appearance-none block w-max px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            onChange={i => setLastName(i.target.value)}
                                            id="lastname"
                                            name="name.lastName"
                                            type="text"
                                            required
                                            className="appearance-none block w-max px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            onChange={i => setEmail(i.target.value)}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="appearance-none block w-max px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            onChange={i => setPassword(i.target.value)}
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none block w-max px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>
                        </div>
                </div>
            </div>
        </>
    )
}
