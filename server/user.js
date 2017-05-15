'use strict';

class User  {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.socket = data.socket;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }
}

module.exports = User;
