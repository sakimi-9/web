module.exports = (req, res, next) => {//检测登录中间件   使用后确保登录后才运行路由的任务体
    // session的导入和配置都必须在顶层进行 也就是app.js里  
    // 否则session在其他路由文件下初始化异常 导致无法正常使用session
    // 比如登录检测中间件,res.session.username 无法使用
    if (!req.session.username) {//比对服务器端数据库的session
        return res.redirect('/login');//不是则 直接跳转登录页面   res.redirect('URl') 这就是重定向 
    }
    next();
}