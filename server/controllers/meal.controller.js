const {Meal} = require("../models/meal.model")

module.exports.allMeals = (req, res) => {

    Meal.find()
    .then(mealList => res.json(mealList))
    .catch(err => res.status(400).json(err))
}

module.exports.oneMeal = (req, res) => {
    Meal.findOne({_id: req.params.id})
    .then(aMeal => res.json(aMeal))
    .catch(err => res.status(400).json(err))
}

module.exports.addMeal = (req, res) => {
    Meal.create(req.body)
    .then(createdMeal => res.json(createdMeal))
    .catch(err => res.status(400).json(err))
}

module.exports.updateMeal = (req, res) => {
    Meal.findOneAndUpdate(
        { _id: req.params.id }, 
        req.body, 
        { new: true, runValidators: true }
    )
    .then(updatedMeal => res.json(updatedMeal))
    .catch(err => res.status(400).json(err))
}

module.exports.deleteMeal = (req, res) => {
    Meal.deleteOne({_id: req.params.id})
    .then(status => res.json(status))
    .catch(err => res.status(400).json(err))
}

