const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const PORT = 3000;
const ServerOne = 'http://localhost:3001',
      ServerTwo = 'http://localhost:3002',
      ServerThree = 'http://localhost:3003',
      ServerFour = 'http://localhost:3007';

app.use(express.static(__dirname+'/../public'));

let stockPriceChartId = 0;
app.all('/api/symbol/:stockPriceChartId/day', (req, res) => {
  stockPriceChartId = req.params.stockPriceChartId;
  proxy.web(req, res, {target: ServerOne});
});

app.all(`/api/symbol/:${stockPriceChartId + 1}/week`, (req, res) => {
  proxy.web(req, res, { target: ServerOne });
});

app.all(`/api/symbol/:${stockPriceChartId + 2}/week`, (req, res) => {
  pProxy.web(req, res, { target: ServerOne });
});

app.all(`/api/symbol/:${stockPriceChartId + 3}/week`, (req, res) => {
  roxy.web(req, res, { target: ServerOne });
});

app.all(`/api/symbol/:${stockPriceChartId + 4}/week`, (req, res) => {
  proxy.web(req, res, { target: ServerOne });
});

app.all('/api/volumes/symbols/', function(req, res, next){
    console.log('Redirecting Server2');
    proxy.web(req, res, {target: ServerTwo} );

})
app.all('/api/buytest', function(req, res, next){
    console.log('Redirecting Server2');
    proxy.web(req, res, {target: ServerThree} );

})
app.all('/api/alsoBought/1', function(req, res, next){
    console.log('Redirecting Server2');
    proxy.web(req, res, {target: ServerFour} );

}) 


app.listen(PORT, ()=>{
    console.log('Listening to Port: ', PORT);
})