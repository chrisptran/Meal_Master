import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const [errorList, setErrorList] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorList([])
        axios.post(`http://localhost:8000/api/login`, { email, password })
            .then(res => {
                if(res.data === "Success") {
                    navigate(`/`)
                }
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.errors) {
                    const errResponseData = err.response.data.errors;
                    const tempErrArr = [];
                    for (const eachKey in errResponseData) {
                        tempErrArr.push(errResponseData[eachKey].message);
                    }
                    setErrorList(tempErrArr);
                } else {
                    setErrorList(['An unexpected error occurred.']);
                }
            });
    }

    const hasErrors = errorList.length > 0

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"/>
                </div>
                <button type="submit" disabled={hasErrors}>
                    Login
                </button>
                {hasErrors && (
                    <div style={{ color: 'red' }}>
                        {errorList.map((eachErr, idx) => (
                            <p key={idx}>{eachErr}</p>
                        ))}
                    </div>
                )}
            </form>
        </div>
    )
}

export default Login