import React from 'react';
import ReactDOM from 'react-dom';
import TreeViewRoot from './components/tree-view-root.jsx';

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
        // TODO: pass editor instance to component
        ReactDOM.render(
            <TreeViewRoot
                showHiddenFile={this.showHiddenFile}
                insetTitleBar={this.insetTitleBar}
                editor={this.editor}
            />,
            document.getElementById('nyaovim-treeview-entry')
        );
    }
});

