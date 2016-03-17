import React from 'react';
import path from 'path';

function openInNeovim(props) {
    const client = props.editor.getClient();
    const file = path.join(props.parent, props.name);
    client.command('edit! ' + file);
    props.editor.focus();
}

const File =
    props => <div style={{cursor: 'pointer'}} onClick={() => openInNeovim(props)}>
        {props.name}
    </div>;
export default File;
