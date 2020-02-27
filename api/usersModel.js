const db = require('../data/dbConfig.js');

module.exports = {
    register,
    findBy,
    findAll
};
function register(newUser){
    return db('users')
        .insert(newUser, 'id')
};
function findBy(username){
    return db('users')
        .where(username);
};
function findAll(){
    return db('users')
        .select('id', 'username')
};