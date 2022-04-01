import { EventEmitter } from 'events';
const CHANGE_EVENT = 'CHANGE_EVENT';

class SimpleStore extends EventEmitter {
    constructor() {
        super();
        this.__items = [];
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getAll() {
        return this.__items.slice();
    }

    getById = (id) => {
        let result = this.__items.filter((item) => item.id == id);
        return result && result.length > 0 ? result[0] : null;
    };

    add = (item) => {
        this.delete(item.id);
        this.__items.push(item);
    };

    delete = (id) => {
        this.__items = this.__items.filter(item => item.id != id);
    };


}

export default SimpleStore;