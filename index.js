const Koa = require('koa');



const mongoose = require('mongoose');

const serve = require('koa-static');
const views = require('koa-views');

const path = require('path');
 
const app = new Koa();
const router = require('./router/index.js');


const publicFiles = serve(path.join(__dirname, 'public'));
// publicFiles._name = '/public';

// Must be used before any router is used
app.use(views(__dirname + '/views', {
    map: {
      html: 'handlebars'
    }
  }));

  // consle
 

 
app
  .use(router.routes());
//   .use(router.allowedMethods());

  app.use(publicFiles);


  app.listen(3000, async ()=>{
      let link = await linkDataBase();
      if(link){

        console.log('koa server has started at port: 3000')
      }
  });


function linkDataBase() {
    return new Promise((resolve, reject) => {

        mongoose.connect('mongodb://localhost:27017/myblog', async (err) => {
            if (err) {
                console.error(`link to mongodb failed ~~`);
                reject(false);
            } else {
                console.log(`link mongodb success!!`);
                resolve(true)
            }
        });
    })
}