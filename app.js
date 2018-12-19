const Koa=require('koa')
const path=require('path')
const koaBody = require('koa-body');
const render=require('koa-art-template')
const app=new Koa();
const Controller=require('koa-ws-controller');
app.use(Controller.sliceSuffix())
app.use(koaBody({ 
    multipart:true,
    formidable:{
        uploadDir: path.join(__dirname,'./static/tmp')
    }
}));
app.use(require('koa-static')(__dirname+"./static"));
app.use(new Controller({appPath: path.join(__dirname,'./app')}))
render(app,{
    root:path.join(__dirname,"/views"),
    extname:".html",
    debug: process.env.NODE_ENV !== 'production'
})
app.listen(3030)