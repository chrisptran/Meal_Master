import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const CreatePage = () => {

    const [date, setDate] = useState("")
    const [mealType, setMealType] = useState("")
    const [calories, setCalories] = useState(100)
    const [isFull, setIsFull] = useState(false)
    const [details, setDetails] = useState("")

    const navigate = useNavigate()

    const [errorList, setErrorList] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/meals`, {date, mealType, calories, isFull, details})
        .then(res => {
            const createdMeal = res.data
            navigate(`/meals/${createdMeal._id}`)
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
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label >Date: </label>
                    <input type='date' name='date' value={date} 
                    onChange={e => setDate(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label >Type of Meal: </label>
                    <input type='string' name='mealType' value={mealType} 
                    onChange={e => setMealType(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label >Total Calories: </label>
                    <input type='number' name='calories' value={calories} 
                    onChange={e => setCalories(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label >Full After? </label>
                    <input type='checkbox' name='isFull' value={isFull} 
                    onChange={e => setIsFull(e.target.checked)} />
                </div>
                <div className="mb-3">
                    <label>Details:</label>
                    <textarea name='details' value={details} 
                    onChange={e => setDetails(e.target.value)} className="form-control"/>
                </div>
                <button type='submit' className='btn btn-success'>Create Meal</button>|
                <Link to="/" className='btn btn-secondary'>Cancel</Link>
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

export default CreatePage