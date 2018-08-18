const express = require('express');
const app = express();
const fetch = require('isomorphic-fetch');
const cors = require('cors');
const parser = require('xml2json');
//const parseString = require('xml2js').parseString;

app.use(cors());
app.use('/', express.static('src'));

app.get('/api/:cuisine', (req, res) => {
    fetch('http://www.zenbu.co.nz/search.xml?q=auckland+' + req.params.cuisine + '+restaurant+&key=ca1ed5c848d722adad5952dbe55f16a23d04b8fb', {
        mode: 'cors'
    })
        .then(response => response.text()).then(
            text => parser.toJson(text)
    ).then(json => res.send(json))
    .then(function (result) {
        console.log(result);
        res.send(result);
    })


});

app.listen(process.env.PORT || 5000);
