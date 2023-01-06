var server = require('server');

server.get('World', function (req, res, next) {
    res.json({ msg: 'Hello World!' });
    next();
});

module.exports = server.exports();
