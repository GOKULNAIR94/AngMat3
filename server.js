var http = require('http'),
    express = require('express'),
    path = require('path');

var app = express();

app.get('/', onRequest);
app.use(express.static(path.join(__dirname, '/')));

function onRequest(request, response){
  response.sendFile(path.join(__dirname, '/index.html'));
}

function send404(response){
	response.writeHead(404, {'Context-Type' : "text/plain"});
	response.write("Error 404 : Page not Found");
	response.end();
}

var uname = "AKASHDEEP";//;"kaamana";
var pword = "lntLNT2K16_1";//"Oracle1234";
var varAuth = 'Basic ' + new Buffer(uname + ':' + pword).toString('base64');
var varHost =  'acs.crm.ap2.oraclecloud.com';  //'cbhs-test.crm.us2.oraclecloud.com';
var varPath = '/crmCommonApi/resources/latest/contacts/'; //'/salesApi/resources/latest/__ORACO__PromotionProgram_c/';
var childCollection = '/child/PrimaryAddress/';
const https = require('https');

app.get('/main',function(request,response){
    var options = {
          host: varHost,
          path: varPath + "?limit=10",
          headers: {
          'Authorization': varAuth
          //'Content-Type': 'application/vnd.oracle.adf.resourceitem+json'
        }   
      };
      var responseObject;
      var r = https.get(options, function(res){
      var body = "";

        res.on('data', function(data) {
            console.log("Data : " +data);
            body += data;
        });
        res.on('end', function() {          
            //console.log("Body : " +body);
            responseObject = JSON.parse(body);
            response.json(responseObject);
            //console.log(responseObject);

        })
        }).on('error', function(e){
      console.error(e);
  });
});

app.get('/getAccounts',function(request,response){
    var varPath = '/crmCommonApi/resources/latest/accounts/';
          var options = {
          host: varHost,
          path: varPath + "?limit=10",
          headers: {
          'Authorization': varAuth
          //'Content-Type': 'application/vnd.oracle.adf.resourceitem+json'
        }   
      };
      var responseObject;
      var r = https.get(options, function(res){
      var body = "";

        res.on('data', function(data) {
            console.log("Data : " +data);
            body += data;
        });
        res.on('end', function() {          
            //console.log("Body : " +body);
            responseObject = JSON.parse(body);
            response.json(responseObject);
            //console.log(responseObject);

        })
        }).on('error', function(e){
      console.error(e);
  });
});

http.createServer(app).listen(8888);
console.log('Server is now Running');