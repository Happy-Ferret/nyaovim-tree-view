import React from 'react';

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
    return <span style={wrapper_style} onClick={props.onClick}>
        <i className={"fa fa-" + props.name} style={icon_style}></i>
    </span>;
};
export default IconButton;
