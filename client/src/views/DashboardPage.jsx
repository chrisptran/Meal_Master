import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const DashboardPage = () => {


    const [mealList, setMealList] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:8000/api/meals/`)
            .then(res => {
                setMealList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:8000/api/meals/${deleteId}`)
        .then(res => {
            const updatedList = mealList.filter((eachMeal) => eachMeal._id !== deleteId)
            setMealList(updatedList)
        })
        .catch(err => console.log(err))
    }


    return (
        <div>
            <p><Link to="/meals/new">Create a New Meal</Link></p>


            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type of Meal</th>
                        <th>Total Calories</th>
                        <th>Full After?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mealList
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((eachMeal, idx) => {
                            const formattedDate = new Date(eachMeal.date).toLocaleDateString()
                            return (
                                <tr key={idx}>
                                    <td>{formattedDate}</td>
                                    <td><Link to={`/meals/${eachMeal._id}`}>{eachMeal.mealType}</Link></td>
                                    <td>{eachMeal.calories}</td>
                                    <td>{eachMeal.isFull ? "Yes" : "No"}</td>
                                    <td>
                                        <Link to={`/meals/edit/${eachMeal._id}`} className='btn btn-primary'>Edit</Link>|
                                        <button className='btn btn-danger' onClick={() => handleDelete(eachMeal._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DashboardPage