import React from 'react';

const Div = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};

export default Div;