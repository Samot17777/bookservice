var app = require('./app.js')(require('./stockRepository'));

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});