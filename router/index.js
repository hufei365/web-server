
const Router = require('koa-router');
const router = new Router();


const blog = require('./router.js');
const admin = require('./admin.js');


function addIn(router, fn){
    fn.call(router);
}

addIn(router, blog);
addIn(router, admin);


module.exports=router;