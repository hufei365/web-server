const _ = require('../libs/base');

const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id: String,
    username: String,
    password: String
});


const User = mongoose.model('User', schema);


module.exports = {

    login: async function (user, pwd) {
        return new Promise((resolve, reject) => {
            User.find({ 'username': user, 'password': pwd }, (err, docs) => {
                if (err) {
                    console.log(`get user[${user}] detail failed~~`);
                    reject(false);
                } else {
                    console.log(`get user[${user}] detail success!!`);
                    resolve(docs[0]);
                }
            })
        })
    }
}