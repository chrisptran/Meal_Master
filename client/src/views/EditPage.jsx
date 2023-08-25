import React, {useEffect, useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from'axios'

const EditPage = () => {

    const [date, setDate] = useState("")
    const [mealType, setMealType] = useState("")
    const [calories, setCalories] = useState(100)
    const [isFull, setIsFull] = useState(false)
    const [details, setDetails] = useState("")
    const navigate = useNavigate()

    const {id} = useParams()

    const [errorList, setErrorList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/meals/${id}`)
        .then(res =>{
            const meal = res.data
            const mealDate = new Date(meal.date)
            const year = mealDate.getFullYear();
            const month = (mealDate.getMonth() + 1).toString().padStart(2,'0')
            const day = mealDate.getDate().toString().padStart(2,'0')
            setDate(`${year}-${month}-${day}`)
            setMealType(meal.mealType)
            setCalories(meal.calories)
            setIsFull(meal.isFull)
            setDetails(meal.details)
        })
        .catch(err => console.log(err))
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/meals/${id}`, {date, mealType, calories, isFull, details})
        .then(res => {
            navigate(`/meals/${id}`)
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

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/meals/${id}`)
        .then(res => navigate(`/`))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Date: </label>
                    <input type='date' name='date' value={date} 
                    onChange={e => setDate(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label>Type of Meal: </label>
                    <input type='string' name='mealType' value={mealType} 
                    onChange={e => setMealType(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label>Total Calories: </label>
                    <input type='number' name='calories' value={calories} 
                    onChange={e => setCalories(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label>Full After? </label>
                    <input type='checkbox' name='isFull' value={isFull} 
                    onChange={e => setIsFull(e.target.checked)} />
                </div>
                <div className="mb-3">
                    <label>Details:</label>
                    <textarea name='details' value={details} 
                    onChange={e => setDetails(e.target.value)} className="form-control"/>
                </div>
                <button type='submit' className='btn btn-success'>Update Meal</button>|
                <Link to="/" className='btn btn-secondary'>Cancel</Link>|
                <button type='button' className='btn btn-danger' onClick={handleDelete}>Delete</button>
                {
                    errorList.map((eachErr, idx) => {
                        return(
                            <p style={{color: "red"}} key={idx}> {eachErr}</p>
                        )
                    })
                }
            </form>
        </div>
    )
}

export default EditPage