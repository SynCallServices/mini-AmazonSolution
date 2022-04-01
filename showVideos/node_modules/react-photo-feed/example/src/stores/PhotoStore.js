import SimpleStore from './SimpleStore';
import { LOAD_PUBLIC_FEED, _SUCCESS, _FAIL, _START } from '../actions/constants';
import AppDispatcher from '../dispatcher';

class PhotoStore extends SimpleStore {
    constructor(...args) {
        super(...args)
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response } = action;

            switch (type) {
                case LOAD_PUBLIC_FEED + _SUCCESS:
                    response.forEach(this.add);
                    this.emitChange();

                    break;
                default: return;
            }
        })
    }
}

export default PhotoStore;