



const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id: String,
    path: String,
    mtime: Number
});


const BlogList = mongoose.model('BlogList', schema);




module.exports = {
    list: async function(){
        return new Promise((resolve, reject) => {
            BlogList.find(function (err, docs) {
                if(err){
                    console.log('get blog list failed~~');
                    reject(false);
                } else {
                    console.log(`get blog list success!!`);
                    resolve(docs);
                }
            })
        })
    },

    detail: async function(id){
        return new Promise((resolve, reject) => {
            BlogList.find({'id': id}, (err, docs) =>{
                if(err){
                    console.log(`get blog[${id}] detail failed~~`);
                    reject(false);
                } else {
                    console.log(`get blog[${id}] detail success!!`);
                    resolve(docs[0]);
                }
            })
        })
    }
}