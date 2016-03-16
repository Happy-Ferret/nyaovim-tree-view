import {dirname, basename} from 'path';
import React from 'react';
import IconButton from './icon-button.jsx';
import Directory from './directory.jsx';

const fs = global.require('fs');

export default class TreeViewRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHiddenFile: this.props.showHiddenFile,
            rootPath: global.process.cwd() || '/'
        };
    }

    onParentDir() {
        const new_root = dirname(this.state.rootPath);
        this.setState({
            showHiddenFile: this.state.showHiddenFile,
            rootPath: new_root
        });
    }

    renderFileTree() {
        try {
            const {rootPath, showHiddenFile} = this.state;
            let entries = fs.readdirSync(rootPath);
            if (!this.state.showHiddenFile) {
                entries = entries.filter(e => !e.startsWith('.'));
            }
            return <Directory
                parent={dirname(rootPath)}
                name={basename(rootPath)}
                showHiddenFile={showHiddenFile}
                collapsed={false}
                entries={entries}
            />;
        } catch(e) {
            console.error(e);
            return <span>
                No directory
            </span>;
        }
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
            menu_style.paddingLeft = '80px';
        }
        const body_style = {
            flex: 'auto',
            height: 'calc(100% - 30px)',
            overflow: 'auto'
        };
        const eye_icon = this.state.showHiddenFile ? 'eye' : 'eye-slash';
        return (
            <div style={style}>
                <div style={menu_style}>
                    <IconButton name="arrow-circle-up" onClick={this.onParentDir.bind(this)}/>
                    <IconButton name={eye_icon}/>
                    <IconButton name="expand"/>
                    <IconButton name="compress"/>
                </div>
                <div style={body_style}>
                    {this.renderFileTree()}
                </div>
            </div>
        );
    }
}

