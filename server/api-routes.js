const Books = require('./books');

module.exports = (api) => {
    api.get('/books/', (req, res) => {
        Books.provide()
            .then((data) => {
                res.json({ data });
            });
    });

    return api;
};
