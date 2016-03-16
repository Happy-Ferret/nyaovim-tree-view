import {EventEmitter} from 'events';

class StateProxy extends EventEmitter {
    constructor() {
        super();
        this.state = {
            showHiddenFile: false,
            rootPath: global.process.cwd() || '/'
        };
    }

    getAll() {
        return this.state;
    }

    toggleHiddenFile() {
        this.state.showHiddenFile = !this.state.showHiddenFile;
        this.emit('hidden-file');
    }

    setRootPath(new_path) {
        this.state.rootPath = new_path;
        this.emit('root-path');
    }
}

const p = new StateProxy();
export default p;
