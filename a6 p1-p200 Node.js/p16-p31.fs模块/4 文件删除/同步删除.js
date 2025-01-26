var fs = require('fs');
fs.writeFileSync('同步删除参数.md',
    `111
    222
        333
            444`
)
// fs.rmSync('同步删除参数.md')   rm remove 移除
fs.unlinkSync('同步删除参数.md')