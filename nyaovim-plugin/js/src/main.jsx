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
        const label = <span onClick={this.onNameClick.bind(this)} style={{cursor: 'pointer'}}>
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

const IconButton = props => {
    const wrapper_style = {
        flex: 'auto',
        margin: 'auto 0',
        textAlign: 'center'
    };
    const icon_style = {
        margin: '0 auto',
        cursor: 'pointer'
    };
    return <span style={wrapper_style}>
        <i className={"fa fa-" + props.name} onClick={props.onClick} style={icon_style}></i>
    </span>;
};

class TreeViewRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHiddenFile: this.props.showHiddenFile
        };
    }

    render() {
        const style = {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
        };
        const menu_style = {
            flex: 'none',
            display: 'flex',
            flexDirection: 'row',
            height: '30px',
            boxSizing: 'border-box'
        };
        if (this.props.insetTitleBar) {
            menu_style.paddingLeft = '100px';
        }
        const body_style = {
            flex: 'auto',
            height: 'calc(100% - 30px)',
            overflow: 'auto'
        };
        return (
            <div style={style}>
                <div style={menu_style}>
                    <IconButton name="arrow-circle-up"/>
                    <IconButton name="expand"/>
                    <IconButton name="compress"/>
                </div>
                <div style={body_style}>
                    <Directory
                        parent="/Users"
                        name="npsdev5"
                        showHiddenFile={this.state.showHiddenFile}
                    />
                </div>
            </div>
        );
    }
}

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
            <TreeViewRoot showHiddenFile={this.showHiddenFile} insetTitleBar={this.insetTitleBar}/>,
            document.getElementById('nyaovim-treeview-entry')
        );
    }
});

