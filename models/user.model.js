const { model } = require('mongoose');

const user = model('user', {
    name: String,
    email: String,
})
module.exports = user;