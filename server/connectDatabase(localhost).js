
    // config for your database
    // var config = {
    //     user: 'root',
    //     password: 'jdysz',
    //     server: 'localhost', 
    //     database: 'trial_database' 
    // };
// import {createRequire} from 'module';
// const require = createRequire(import.meta.url)

// var http = require('http');

// below works to put the html file to localhost server
// const http = require('http')
// const fs = require('fs')
// const port = 3000

// const server = http.createServer(function(req,res) {

//     res.writeHead(200, {'Content-Type': 'text/html'})
//     fs.readFile('Config.html', function(error,data) {
//         if (error) {
//             res.writeHead(404)
//             res.write('Error: File Not Found')
//         } else {
//             res.write(data)
//         }
//         res.end()
//     })
// })

// server.listen(port,function(error) {
//     if(error) {
//         console.log('something went wrong', error)
//     } else {
//         console.log('server is listening on port' + port)
//     }
// })

var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "jdysz",
    database: "trial_database"
});

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM("index.html");

console.log(dom.window.document.querySelector('div'))

con.connect(function(err) {
    if(err) {
        console.log('something went wrong', err)
    } else {
    console.log("connected!")
    var sql = "select * from refInvoiceNo where `數量` <> 0 order by `型號`;"
    con.query(sql,function(err,result,fields) {
        if(err) throw err;
        for(let i = 0; i < result.length; i++){
            // let row = document.createElement('div');

            // tempList = ['型號', '數量', '發票'];
            // for (let j = 0; j < 3; j++) {
            //     let div = document.createElement('div')
            //     div.innerText = result[i][tempList[j]]
            //     row.appendChild(div)
            // };
            
            // // console.log(result[i]['型號'], result[i]['數量'], result[i]['發票'])
            // document.getElementById('table').appendChild(row);
        }

    })

}});


