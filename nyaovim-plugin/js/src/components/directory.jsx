import React from 'react';
import path from 'path';
import TreeView from 'react-treeview';
import File from './file.jsx';
import Proxy from '../state-proxy';
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
        Proxy.setRootPath(path.join(this.props.parent, this.props.name));
    }

    renderChildren() {
        if (this.state.collapsed) {
            return [];
        }
        const {parent, name, showHiddenFile, entries, editor, color} = this.props;
        const sub_parent = path.join(parent, name);
        return entries.map((e, i) => {
            const props = {
                key: i,
                parent: sub_parent,
                name: e,
                editor,
                showHiddenFile
            };
            try {
                let es = fs.readdirSync(path.join(sub_parent, e));
                if (!showHiddenFile) {
                    es = es.filter(e => !e.startsWith('.'));
                }
                return <Directory entries={es} color={color} {...props}/>;
            } catch(e) {
                return <File {...props}/>;
            }
        });
    }

    render() {
        const label =
        <span
            onClick={this.onNameClick.bind(this)}
            style={{
                cursor: 'pointer',
                color: this.props.color
            }}
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

