//1.导入express
import express, { request, response } from 'express';

//2.框架实例化
const app = express();

//3.路由配置
app.get('/AJAX', (request, response) => {
    //设置响应头 允许跨域请求    这样那个有ajax的html页面才能对这个http服务的页面 跨域请求   否则,ajax的默认特性不允许跨源
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.send(`        
        观书有感
        作者：朱熹
半亩方塘一鉴开，天光云影共徘徊。
问渠那得清如许？为有源头活水来`);
});

//4.设置监听函数
app.listen(3000, () => {
    console.log('服务启动...');

})