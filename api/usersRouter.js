const express = require('express');
const router = express.Router();

const Users = require('./usersModel.js');

router.get('/', (req, res) => {
    Users.findAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:'could not retrieve users'})
        })
});

module.exports = router;