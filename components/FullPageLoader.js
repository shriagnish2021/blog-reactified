import React from 'react';
import Loader from 'react-loader-spinner';

const FullPageLoader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80vh' }}>
        <Loader type="ThreeDots" color="#26495c" height={100} width={100} />
    </div>
);

export default FullPageLoader;
