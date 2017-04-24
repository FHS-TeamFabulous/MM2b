'use strict';

module.exports = (api) => {
    api.get('/books/:id', (req, res) => {
        res.json({
            data: {
                title: 'Foxy Joxy Plays A Trick',
                pages: [
                    {
                        url: '/assets/books/Foxy-Joxy-Plays-A-Trick/page-1.jpg'
                    },
                    {
                        url: '/assets/books/Foxy-Joxy-Plays-A-Trick/page-2.jpg'
                    },
                    {
                        url: '/assets/books/Foxy-Joxy-Plays-A-Trick/page-3.jpg'
                    },
                    {
                        url: '/assets/books/Foxy-Joxy-Plays-A-Trick/page-4.jpg'
                    }
                ],
                dimensions: {
                    width: 1660,
                    height: 1655
                }
            }
        });
    });

    return api;
};
