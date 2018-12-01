const nr = require('newrelic');
const express = require('express');
const httpProxy = require('http-proxy');
const morgan = require('morgan');

const app = express();
const apiProxy = httpProxy.createProxyServer();

const stockPriceChart = 'http://54.212.223.213:3001/',
      priceVolumeChart = 'ec2-54-193-42-73.us-west-1.compute.amazonaws.com',
      buyService = 'http://ec2-54-183-106-241.us-west-1.compute.amazonaws.com/',
      peopleAlsoBought = 'http://ec2-18-224-182-229.us-east-2.compute.amazonaws.com/';

app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
const port = 3000;

let stockPriceChartId = 0;
app.all('/api/symbol/:stockPriceChartId/day', (req, res) => {
  stockPriceChartId = req.params.stockPriceChartId;
  apiProxy.web(req, res, {target: stockPriceChart});
});

app.all(`/api/symbol/:${stockPriceChartId + 1}/week`, (req, res) => {
  apiProxy.web(req, res, { target: stockPriceChart });
});

app.all(`/api/symbol/:${stockPriceChartId + 2}/week`, (req, res) => {
  apiProxy.web(req, res, { target: stockPriceChart });
});

app.all(`/api/symbol/:${stockPriceChartId + 3}/week`, (req, res) => {
  apiProxy.web(req, res, { target: stockPriceChart });
});

app.all(`/api/symbol/:${stockPriceChartId + 4}/week`, (req, res) => {
  apiProxy.web(req, res, { target: stockPriceChart });
});

app.all(`/api/volumes/symbols/:id`, (req, res) => {
  apiProxy.web(req, res, { target: priceVolumeChart });
});

app.all('/api/buytest', (req, res) => {
  apiProxy.web(req, res, { target: buyService });
});

app.all('/api/alsoBought/1', (req, res) => {
  // console.log(req.);
  apiProxy.web(req, res, { target: peopleAlsoBought });
});

app.listen(port, () => console.log('Server listening on port ' + port));
