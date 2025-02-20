let fangdaolian = (reqeust, response, next) => {
    let { host } = reqeust.headers;
    let { hostname } = new URL('http://' + host);
    if (hostname == '127.0.0.1') {
        next();
    } else {
        response.status(404);
        response.send('<h1>404 Not Found</h1>');
        return;
    }
};

module.exports = fangdaolian;//如果文件中只有一个变量，那么就不要写在对象里，{变量}，这样会导致报错