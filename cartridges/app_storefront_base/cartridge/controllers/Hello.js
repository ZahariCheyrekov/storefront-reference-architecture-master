var server = require('server');

server.get('World', function (req, res, next) {
    res.json({ msg: 'Sugaraaaaaaa' });
    next();
});

module.exports = server.exports();
