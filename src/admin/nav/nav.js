import React from 'react';
import {Link} from 'react-router-dom';

export default function Nav () {
    return (
        <div className='nav'>
            <div className='navbar'>
                <Link to='/'> 
                <h1>
                    EnovLab Admin
                </h1>
                </Link>
            </div>
        </div>
    )
}
