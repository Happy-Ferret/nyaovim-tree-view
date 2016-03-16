import React from 'react';
import IconButton from './icon-button.jsx';
import Directory from './directory.jsx';

export default class TreeViewRoot extends React.Component {
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
            menu_style.paddingLeft = '80px';
        }
        const body_style = {
            flex: 'auto',
            height: 'calc(100% - 30px)',
            overflow: 'auto'
        };
        const eye_icon = this.state.showHiddenFile ? 'eye-slash' : 'eye';
        return (
            <div style={style}>
                <div style={menu_style}>
                    <IconButton name="arrow-circle-up"/>
                    <IconButton name={eye_icon}/>
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

