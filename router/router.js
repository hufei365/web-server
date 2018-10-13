



const Blog = require('../model/blog.js');
const fs = require('../libs/async-fs.js');
const marked = require('marked');

marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    },
});


module.exports = function () {
    let router = this;

    router.get('/', async (ctx, next) => {
        await ctx.render('home.html');
    });

    router.get(['/blog/:page', '/blog'], async (ctx, next) => {

        let list = await Blog.list({
            page: ctx.params.page || 1,
            pageSize: 10
        });
        // console.log(list);
        await ctx.render('blog.html', list);
    });

    router.get('/about', async (ctx, next) => {
        await ctx.render('about.html');
    });

    router.get('/blog/:id', async (ctx, next) => {
        console.log(ctx.params.id);

        let blogid = ctx.params.id;

        let blog = await Blog.detail(blogid);
        console.log(blog);
        let content = await fs.readFile(blog.path);
        let html = marked(String(content));

        await ctx.render('blog-detail', {
            title: 'blog title' + new Date() + Math.random(0, 1),
            body: html
        })

    });
};