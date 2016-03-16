import React from 'react';
import path from 'path';
import TreeView from 'react-treeview';
import File from './file.jsx';
const fs = global.require('fs'); // Note: Avoid browserify shim

export default class Directory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: this.props.collapsed === undefined ? true : this.props.collapsed
        };
    }

    onTreeClick() {
        this.setState({
            collapsed: !this.state.collapsed
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
        const {parent, name, showHiddenFile, entries} = this.props;
        const sub_parent = path.join(parent, name);
        return entries.map((e, i) => {
            const props = {
                key: i,
                parent: sub_parent,
                name: e,
                showHiddenFile
            };
            try {
                let es = fs.readdirSync(path.join(sub_parent, e));
                if (!showHiddenFile) {
                    es = es.filter(e => !e.startsWith('.'));
                }
                return <Directory entries={es} {...props}/>;
            } catch(e) {
                return <File {...props}/>;
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

