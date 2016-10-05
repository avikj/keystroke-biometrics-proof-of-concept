var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

if(process.argv.length < 3) {
	console.error('Please specify file path.');
	process.exit();
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
	res.sendFile(__dirname+'/index.html');
});
app.post('/data', function(req, res) {
	var allData = JSON.parse(fs.readFileSync('./'+process.argv[2])).data;
	allData.push(req.body.data);
	fs.writeFileSync('./'+process.argv[2], JSON.stringify({data: allData}));
	res.sendStatus(200);
})
app.use(express.static('public'))
app.listen(3000);