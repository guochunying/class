var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mysql = require("mysql");

app.use(express.static(__dirname + "/static"))
app.use(bodyparser.urlencoded({ extended: false }));
// app.set('views', __dirname + '/views');


var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "123456",
    database: "angular"
})
connection.connect();

app.get("/foot", function(req, res) {
    connection.query("select * from work", function(err, results) {
        if (results.length > 0) {
            res.send({ results: results })
        }
    })

})
app.post("/add", function(req, res) {
    connection.query('insert into work(title,count) values( "' + req.body.title + '", "' + req.body.count + '")', function(err, result) {
        res.send({ code: 0, msg: '添加成功' })
    })
})
app.listen("8080", function() {
    console.log(123)
})