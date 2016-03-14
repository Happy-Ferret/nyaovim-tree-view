import React from 'react';
import ReactDOM from 'react-dom';

Polymer({
    is: 'tree-view',

    properties: {},

    attached: function() {
        ReactDOM.render(
            <div>Hello, world!</div>,
            document.getElementById('nyaovim-treeview-root')
        );
    },
})

