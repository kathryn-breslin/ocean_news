var path = require('path');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index')
    });

    app.get('/saved', function(res, res) {
        res.render('saved');
    });
}