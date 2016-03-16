import React from 'react';
import ReactDOM from 'react-dom';
import TreeViewRoot from './components/tree-view-root.jsx';

Polymer({
    is: 'tree-view',

    properties: {
        showHiddenFile: {
            type: Boolean,
            value: true
        },
        insetTitleBar: {
            type: Boolean,
            value: false
        }
    },

    attached: function() {
        // TODO: pass editor instance to component
        ReactDOM.render(
            <TreeViewRoot
                showHiddenFile={this.showHiddenFile}
                insetTitleBar={this.insetTitleBar}
            />,
            document.getElementById('nyaovim-treeview-entry')
        );
    }
});

