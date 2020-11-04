module.exports = function(app, fs)
{
    app.get('/', function(req, res){
        res.render('home', {
        })
    });
    app.get('/load', function(req, res){
        res.render('load', {
        })
    });
    app.get('/result', function(req, res){
        res.render('result', {
            length: 5
        })
    });
}