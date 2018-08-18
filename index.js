const express = require('express');
const app = express();
const fetch = require('isomorphic-fetch');
const cors = require('cors');

app.use(cors());
app.use('/', express.static('src'));

app.get('/api', (req, res) => {
    fetch('http://www.zenbu.co.nz/search.xml?q=wellington+breakfast&key=ca1ed5c848d722adad5952dbe55f16a23d04b8fb')
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.text();
        })
        .then(function(result) {
            res.send(result)
        });

});

app.listen(process.env.PORT || 5000);
