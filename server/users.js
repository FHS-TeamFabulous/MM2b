function Users() {
    this.users = {};
}

Users.prototype.add = function(user) {
    const equalUser = this.getUsers().find(u => u.equals(user));

    if (equalUser) {
        this.updateUserId(equalUser.id, user.id);
        return user;
    }

    const hasId = this.getUsers().find(id => user.id === id);
    if (hasId) {
        this.users[hasId] = user;
    } else {
        this.users[user.id] = user;
    }

    return user;
};

Users.prototype.getUsers = function() {
    return Object.keys(this.users)
        .map(id => this.users[id]);
};

Users.prototype.findByName = function(name) {
    return this.getUsers()
        .find(user => user.name === name);
};

Users.prototype.findById = function(id) {
    return this.getUsers()
        .find(user => user.id === id);
};

Users.prototype.updateUserId = function(oldId, newId) {
    const user = this.findById(oldId);

    if (user) {
        user.id = newId;
        this.removeUser(oldId);
        this.add(user);
    }

    return user;
};

Users.prototype.removeUser = function(id) {
    delete this.users[id];
};

module.exports = Users;
