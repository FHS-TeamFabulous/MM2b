'use strict';

const STATES = {
    FREE: 'FREE',
    BUSY: 'BUSY'
};

class User  {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.state = STATES.FREE;
        this.socket = data.socket;
    }

    isFree() {
        this.state = STATES.FREE;
    }

    isBusy() {
        this.state = STATES.BUSY;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            state: this.state,
            isFree: this.state === STATES.FREE
        }
    }
}

module.exports = User;
