
const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken");


const {User} = require("./models/user.model")

require("./config/mongoose.config")

require('dotenv').config();

const payload = {
    id: User._id
}

const userToken = jwt.sign(payload, process.env.secret_key)

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }))


const MealRoutes = require("./routes/meal.routes");
MealRoutes(app)

const UserRoutes = require("./routes/user.routes")
UserRoutes(app)




// 4. listen to port
app.listen(8000, () => console.log("listening to port 8000"))