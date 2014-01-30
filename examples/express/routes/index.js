
/*
 * GET home page.
 */
var config = require('../config.json');

exports.index = function(req, res){
    req.api.getApiInfo(function(error, results){
        res.render('index', {
            title: config.app.name,
            results: results,
        });
    });
};
