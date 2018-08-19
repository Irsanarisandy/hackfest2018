const express = require('express');
const app = express();
const fetch = require('isomorphic-fetch');
const cors = require('cors');
const parser = require('xml2json');
const https = require('https');

app.use(cors());
app.use('/', express.static('src'));

app.get('/api/:cuisine', (req, res) => {
    fetch('http://www.zenbu.co.nz/search.xml?q=auckland+' + req.params.cuisine + '+restaurant+&key=ca1ed5c848d722adad5952dbe55f16a23d04b8fb', {
        mode: 'cors'
    }).then(response => response.text()).then(
        text => parser.toJson(text)
    ).then(json => res.send(json))
    .then(result => {
        console.log(result);
        res.send(result);
    });
});

let subscriptionKey = 'f408a19826fd4c3f98e8d1ce847214b9';
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';

let bing_image_search = (search, callback) => {
    let request_params = {
        method : 'GET',
        hostname : host,
        path : path + '?q=' + encodeURIComponent(search),
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
    };

    let req = https.request(request_params, callback);
    req.end();
}

app.get('/image/:name', (req, res) => {
    if (subscriptionKey.length === 32) {
        bing_image_search(req.params.name, (response) => {
            let body = '';
            response.on('data', (d) => {
                body += d;
            });
            response.on('end', () => {
                for (var header in response.headers)
                    // header keys are lower-cased by Node.js
                    if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
                        console.log(header + ": " + response.headers[header]);
                body = JSON.parse(body);
                res.send({imgUrl: body.value[0].contentUrl});
            });
            response.on('error', (e) => {
                console.log('Error: ' + e.message);
            });
        })
    } else {
        console.log('Invalid Bing Search API subscription key!');
        console.log('Please paste yours into the source code.');
    }
});

app.listen(process.env.PORT || 5000);
