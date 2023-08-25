import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()


    const [errorList, setErrorList] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setErrorList(["Passwords do not match"]);
            return;
        }
        
        // Clear previous errors
        setErrorList([]);
        axios.post(`http://localhost:8000/api/register`, {firstName, lastName, email, password})
        .then(res => {
            navigate(`/login`)
        })
        .catch(err => {
            const errResponseData = err.response.data.errors
            const tempErrArr = []
            for(const eachKey in errResponseData) {
                tempErrArr.push(errResponseData[eachKey].message)
            }
            setErrorList(tempErrArr)
        })
    }

    return (
        <div>
            <div>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>First Name</label>
                        <input type='text' name='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label>Last Name</label>
                        <input type='text' name='lastName' value={lastName} onChange={e => setLastName(e.target.value)} className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input type='password' name='confirmPassword' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="form-control"/>
                    </div>
                    <button type='submit'>Register</button>
                    {
                    errorList.map((eachErr, idx) => {
                        return(
                            <p style={{color: "red"}} key={idx}> {eachErr}</p>
                        )
                    })
                }
                </form>
            </div>
        </div>
    )
}

export default Register