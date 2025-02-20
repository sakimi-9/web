//JWT操作token
//1.安装jwt  cnpm i jsonwebtoken
//2.导入jwt
const jwt = require('jsonwebtoken');

// secret  对密钥灵活配置,方便维护
const secret = '密钥';

//3.生成token
let token = jwt.sign({ name: 'zhangsan', password: '123456' }, secret, { expiresIn: 60 * 5 });
//jwt.sign({用户信息},'密钥',{可选配置 expiresIn:最大生命周期(s)})    sign 签订  secret 加密,密码
//密钥  简单理解   用于加密jwt(生成的token)的

console.log(token);

//4.验证token
// jwt.verify(token,'签名密钥',callback(err,data))
jwt.verify(token, secret, (err, data) => {
    if (err) {
        console.log('token错误', 'err:'
            + err
        );
        return;
    } else {
        console.log('验证成功', 'data:' + data);
    }

})

//具体JWT的笔记看笔记补充