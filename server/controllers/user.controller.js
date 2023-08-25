const {User} = require("../models/user.model")
const bcrypt = require("bcrypt")

module.exports.register = (req, res) => {
    User.create(req.body)
    .then(createdUser => {
        res.json(createdUser)
    })
    .catch(err => res.status(400).json(err))
}

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (match) {
                            res.json("Success");
                        } else {
                            res.json("Incorrect password");
                        }
                    })
                    .catch(err => res.status(400).json(err));
            } else {
                res.json("No record exists");
            }
        })
        .catch(err => res.status(400).json(err));
};