const MealController = require("../controllers/meal.controller")

module.exports = (app) => {
    app.get("/api/meals", MealController.allMeals)
    app.get("/api/meals/:id", MealController.oneMeal)
    app.post("/api/meals", MealController.addMeal)
    app.put("/api/meals/:id", MealController.updateMeal)
    app.delete("/api/meals/:id", MealController.deleteMeal)
}