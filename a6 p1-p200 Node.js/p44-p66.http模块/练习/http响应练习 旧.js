//import http module
var http = require('http');

//create server object
var server = http.createServer((request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end(`<!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <style>
                        table,
                        td {
                            border: 2px solid black;
                        border-collapse: collapse;
                        padding: 20px 30px;
                        margin: 10px;
        }

                        table,
                        td:nth-child(odd) {
                            background: #aef;
        }

                        table,
                        td:nth-child(even) {
                            background: #fec;
        }
                    </style>
                </head>

                <body>
                    <table>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <script>
                        let tds = document.querySelectorAll('td');
        tds.forEach(item => {
                              item.onclick = () => {
                // item.style.backgroundColor = 'black';
                item.style.cssText = 'background-Color:black;';
                // item.setAttribute('style', 'background-Color:black')
                            }
                        });
                    </script>
                </body>

            </html>`);
})

//set server.listen
server.listen(9000, () => {
    console.log('服务启动...');
})




//content内容  padding内边距  border边框  margin外边距
//border-collapse:collapse（塌陷）  边框塌陷 双线框变单线框