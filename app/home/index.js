const path=require('path')
const fs=require('fs')
let site = require(path.join(process.cwd(),'./json/site-multiple.json'))
module.exports=class{
    constructor(ctx){
        ctx.state.url =this.url;
    }
    async index(ctx){
        console.log(ctx.state, this.url('add'))
        ctx.render(this.path(),{
            title:'首页',
            message:'您好，欢迎光临我的首页！',
            site
        })
        
    }
    async add(ctx){
        let message='';
        if (this.isPost()){
            let data = ctx.request.body;
            if(!data.name){
                message ='site name is undefined';
            }else if (!data.link) {
                message = 'site link is undefined';
            }else{
                site.push(data);
                ctx.redirect(this.url('index'))
            }
            
        }
        
        ctx.render(this.path(), { message})
    }
    async upload(ctx){
        if(this.isPost()){
            console.log(ctx.request.files)
            fs.rename(ctx.request.files.fileName.path, './static/uploads/新文件.txt', (err) => {
                if (err) throw err;
                console.log('已完成重命名');
            });
            //ctx.redirect(this.url('index'))
        }
        ctx.render(this.path())
    }
}