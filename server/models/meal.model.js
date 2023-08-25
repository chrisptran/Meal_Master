const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    mealType: {
        type: String,
        required: [true, "Meal type is required"],
        minlength: [3, "Meal type must be at least 3 characters"]
    },
    calories: {
        type: Number,
        required: [true, "Calories is required"],
        min: [100, "Mininum calories is 100"]
    },

    isFull: {
        type: Boolean,
        default: false
    },
    details: {
        type: String,
        required: [true, "Details is required"],
        minlength: [3, "Details must be at least 3 characters"]
    }

}, { timestamps: true })

module.exports.Meal = mongoose.model('Meal', MealSchema)