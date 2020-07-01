import React from 'react';
import {Link} from 'react-router-dom';

export default function HomePage(){
    return(
        <div>
        <h1>Welcome</h1>
        <h1>This will not overlap</h1>
        <Link to='/drawer'>
            <button>Drawer</button>
        </Link>
        </div>
    )
}