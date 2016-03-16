import {EventEmitter} from 'events';

export default class RpcListener extends EventEmitter {
    constructor(editor) {
        super();
        this.client = editor.getClient();
        this.client.subscribe('nyaovim-tree-view:open-dir');
        this.client.subscribe('nyaovim:edit-start');
        this.client.on('notification', this.onNotification.bind(this));
    }

    onNotification(method, args) {
        switch(method) {
        case 'nyaovim-tree-view:open-dir':
            this.emit('open-dir', args[0]);
            break;
        case 'nyaovim:edit-start':
            this.emit('edit', args[0]);
            break;
        default:
            break;
        }
    }

    unsubscribe() {
        this.client.unsubscribe('nyaovim-tree-view:open-dir');
        this.client.unsubscribe('nyaovim:edit-start');
    }
}
