'use strict';

const dirToJson = require('dir-to-json');
const getImageSize = require('image-size');
const config = require('config');
const path = require('path');

module.exports = {
    books: [],

    isLoaded: false,

    provide(shouldUpdate = false) {
        if (!this.isLoaded || shouldUpdate) {
            return this.load()
                .then(data => {
                    this.books = this.parse(data);
                    return this.books;
                });
        }

        return Promise.resolve(this.books);
    },

    load() {
        return dirToJson(path.join(__dirname, config.paths.assets + '/books'), { sortType: true })
            .then(dirTree => {
                this.isLoaded = true;

                return dirTree;
            });
    },

    parse(data) {
        let parsedBooks = [];
        let books = data.children;
        let basePath = 'assets/books';

        return books.filter(book => book.children).map(book => {
            let pages = book.children.map(page => {
                return {
                    number: page.name.match(/([0-9]+)/g)[0],
                    url: `${basePath}/${page.path}`
                };
            })
            .sort((a, b) => a.number - b.number);

            let pageSize = getImageSize(path.join(__dirname, '../' + pages[0].url));

            return {
                id: book.name,
                title: book.name.replace(/-/g, ' '),
                dimensions: { 
                    width: pageSize.width, 
                    height: pageSize.height 
                },
                pages
            };
        });
    }
}
