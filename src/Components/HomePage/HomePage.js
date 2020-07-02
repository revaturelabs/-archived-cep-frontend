import React from 'react';
import {Link} from 'react-router-dom';

export default function HomePage(){
    return(
        <div>
        <h1>Welcome</h1>
        <h1>This is here for others to edit. 
            Just wanted to show link functionality
            from the drawer.
        </h1>
        <Link to='/drawer'>
            <button>Drawer</button>
        </Link>
        </div>
    )
}