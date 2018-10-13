const _ = require('../libs/base');



const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id: String,
    path: String,
    title: String,
    mtime: String
});


const BlogList = mongoose.model('BlogList', schema);

function preList(list) {
    return list.map((v) => {
        v.mtime = _.date.format(parseInt(v.mtime), 'yyyy-MM-dd');
        return v;
    });
}

module.exports = {
    list: async function (filter) {
        return new Promise((resolve, reject) => {
            
            BlogList.find()
                .skip((filter.page - 1) * filter.pageSize || 0)
                .limit(filter.pageSize)
                .exec(function (err, docs) {
                    if (err) {
                        console.log('get blog list failed~~');
                        reject(false);
                    } else {
                        console.log(`get blog list success!!`);
                        let _docs = preList(docs);
                        resolve(_docs);
                    }
                })
        })
    },

    count: async function(filter){
        return new Promise((resolve, reject) => {
            BlogList.count({},(err, count)=>{
                if (err) {
                    console.log(`get count failed~~`);
                    reject(false);
                } else {
                    console.log(`get count success!!`);
                    resolve(count);
                }
            });
        })
    },

    detail: async function (id) {
        return new Promise((resolve, reject) => {
            BlogList.find({ 'id': id }, (err, docs) => {
                if (err) {
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