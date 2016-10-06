var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

if(process.argv.length < 3) {
	console.error('Please specify username.');
	process.exit();
}
var filePath = './data/'+process.argv[2] + (process.argv[3] && process.argv[3].toLowerCase() == 'test' ? 'Test' : '')+'.json';
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
	res.sendFile(__dirname+'/index.html');
});
app.post('/data', function(req, res) {
	var allData;
	try {
		allData = JSON.parse(fs.readFileSync(filePath)).data;
	} catch(e) {
		allData = [];
	}
	
	allData.push(req.body.data);
	fs.writeFileSync(filePath, JSON.stringify({data: allData}));
	res.sendStatus(200);
})
app.use(express.static(__dirname+'/public'))
app.listen(3000);