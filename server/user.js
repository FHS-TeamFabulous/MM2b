function User(id, name = '', room = null) {
    this.id = id;
    this.name = name;
    this.room = room;
    this.resources = { audio: true, video: true, screen: false };
    this.loggedIn = false;
}

User.prototype.equals = user => {
    return user.name === this.name; // extend if necessary
};

module.exports = User;
