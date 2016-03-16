import React from 'react';
import ReactDOM from 'react-dom';
import TreeViewRoot from './components/tree-view-root.jsx';
import RpcListener from './rpc-listener';

Polymer({
    is: 'tree-view',

    properties: {
        showHiddenFile: {
            type: Boolean,
            value: false
        },
        insetTitleBar: {
            type: Boolean,
            value: false
        },
        editor: Object
    },

    attached: function() {
        const rpc = new RpcListener(this.editor);
        ReactDOM.render(
            <TreeViewRoot
                showHiddenFile={this.showHiddenFile}
                insetTitleBar={this.insetTitleBar}
                editor={this.editor}
                rpc={rpc}
            />,
            document.getElementById('nyaovim-treeview-entry')
        );
    }
});

