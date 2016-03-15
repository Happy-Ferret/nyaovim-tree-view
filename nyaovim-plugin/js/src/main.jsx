import React from 'react';
import ReactDOM from 'react-dom';
import TreeView from 'react-treeview';
import path from 'path';
const fs = global.require('fs');

class File extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        // TODO
    }

    render() {
        return <span onClick={this.onClick.bind(this)}>
            {this.props.name}
        </span>;
    }
}

class Directory extends React.Component {
    constructor(props) {
        super(props);
        fs.readdir(path.join(props.parent, props.name), (err, entries) => {
            if (err) {
                console.error(err);
                return;
            }
            this.setState({
                collapsed: this.state.collapsed,
                entries
            });
        });
        this.state = {
            collapsed: true,
            entries: []
        };
    }

    onTreeClick() {
        this.setState({
            collapsed: !this.state.collapsed,
            entries: this.state.entries
        });
    }

    renderChildren() {
        if (this.state.collapsed) {
            return [];
        }
        const parent = path.join(this.props.parent, this.props.name);
        return this.state.entries.map((e, i) => {
            const stats = fs.lstatSync(path.join(parent, e));
            if (stats && stats.isDirectory()) {
                return <Directory key={i} parent={parent} name={e}/>
            } else {
                return <File key={i} parent={parent} name={e}/>;
            }
        });
    }

    render() {
        return (
            <TreeView
                nodeLabel={this.props.name}
                collapsed={this.state.collapsed}
                onClick={this.onTreeClick.bind(this)}
            >
            {this.renderChildren()}
            </TreeView>
        );
    }
}

Polymer({
    is: 'tree-view',

    properties: {},

    attached: function() {
        // TODO: pass editor instance to component
        ReactDOM.render(
            <Directory parent="/Users" name="rhayasd"/>,
            document.getElementById('nyaovim-treeview-root')
        );
    }
});

