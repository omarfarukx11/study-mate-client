import React from 'react';

const TopPartners = ({data}) => {

    return (
        <div>
            {/* <h1>{data.name}</h1>
            <h1>{data.subject}</h1>
            <h1>{data.rating}</h1> */}
            <h1>{data.length}</h1>
        </div>
    );
};

export default TopPartners;