'use strict';

const User = require('./user');

const Users = {
    usersById: {},

    users: [],

    create(userData) {
        const user = new User(userData);

        this.add(user);
        
        return user;
    },

    get(id) {
        return this.usersById[id];
    },

    add(user) {
        this.usersById[user.id] = user;
        this.users.push(user);
    },

    remove(id) {
        const user = this.get(id);
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
        delete this.usersById[user.id];
    },

    toJSON() {
        return this.users.map((user) => user.toJSON());
    }
};

module.exports = Users;
