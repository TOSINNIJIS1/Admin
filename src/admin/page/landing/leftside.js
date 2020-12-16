import React from 'react';
import '../../style/admin.scss';
import {Link} from 'react-router-dom';

export default function Left () {
    return (
        <div className='left'>
            <div className='admin'>
                <div>
                    <Link to='/users' style={{textDecoration: 'none'}}>
                        <h1> Manage Users </h1>
                    </Link>
                </div>

                <div to='/posts' >
                    {/* <NavLink> */}
                        <h1> Manage Posts </h1>
                    {/* </NavLink> */}
                </div>

                <div>
                    <Link to='/articles' style={{textDecoration: 'none'}}>
                        <h1> Manage Articles </h1>
                    </Link>
                </div>

                <div>
                    <Link to='/audios' style={{textDecoration: 'none'}}>
                        <h1> Manage Audios </h1>
                    </Link>
                </div>

                <div>
                    <Link to='/books' style={{textDecoration: 'none'}}>
                        <h1> Manage Books </h1>
                    </Link>
                </div>

                <div>
                    <Link to='/ref' style={{textDecoration: 'none'}}> 
                    <h1> Manage Testimonials </h1>
                    </Link>
                </div>

                <div className='signout'>
                    <h1> Sign Out </h1>
                </div>
            </div>
        </div>
    )
}