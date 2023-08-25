import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const DetailsPage = () => {

    const [meal, setMeal] = useState("")
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/meals/${id}`)
            .then(res => setMeal(res.data))
            .catch(err => console.log(err))
    }, [id])

    const formattedDate = meal.date ? new Date(meal.date).toLocaleDateString() : '';

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/meals/${id}`)
            .then(res => navigate(`/`))
            .catch(err => console.log(err))
    }

    return (
        <div className="center-container">
            <Link to={"/"}> Home</Link>
            <div className="center-content">
                <p><span style={{fontWeight: "bold"}}>Date:</span> {formattedDate}</p>
                <p><span style={{fontWeight: "bold"}}>Type of Meal:</span> {meal.mealType}</p>
                <p><span style={{fontWeight: "bold"}}>Calories:</span> {meal.calories}</p>
                <p><span style={{fontWeight: "bold"}}>Full After?</span> {meal.isFull ? "Yes" : "No"}</p>
                <p><span style={{fontWeight: "bold"}}>Details:</span> {meal.details}</p>
                <Link to={`/meals/edit/${id}`} className='btn btn-secondary'>Edit</Link>| 
                
                <button type='button' className='btn btn-danger' onClick={handleDelete}> Delete</button>
            </div>
        </div>
    )
}

export default DetailsPage