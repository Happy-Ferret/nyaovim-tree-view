import React from 'react';
import path from 'path';
import TreeView from 'react-treeview';
import File from './file.jsx';
const fs = global.require('fs'); // Note: Avoid browserify shim

export default class Directory extends React.Component {
    constructor(props) {
        super(props);
        fs.readdir(path.join(props.parent, props.name), (err, entries) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!props.showHiddenFile) {
                entries = entries.filter(e => !e.startsWith('.'));
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

    onNameClick() {
        // TODO:
        console.log('TODO: Recreate entire menu tree using this directory as root');
    }

    renderChildren() {
        if (this.state.collapsed) {
            return [];
        }
        const {parent, name, showHiddenFile} = this.props;
        const new_parent = path.join(parent, name);
        return this.state.entries.map((e, i) => {
            const props = {
                key: i,
                parent: new_parent,
                name: e,
                showHiddenFile
            };
            try {
                const stats = fs.lstatSync(path.join(new_parent, e));
                if (stats && stats.isDirectory()) {
                    return <Directory {...props}/>;
                } else {
                    return <File {...props}/>;
                }
            } catch(e) {
                // Ignore
                return undefined;
            }
        });
    }

    render() {
        const label =
        <span
            onClick={this.onNameClick.bind(this)}
            style={{cursor: 'pointer'}}
            className="nyaovim-treeview-directory"
        >
            {this.props.name}
        </span>;

        return (
            <TreeView
                nodeLabel={label}
                collapsed={this.state.collapsed}
                onClick={this.onTreeClick.bind(this)}
            >
            {this.renderChildren()}
            </TreeView>
        );
    }
}

