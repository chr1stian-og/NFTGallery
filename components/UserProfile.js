import React, { Component } from 'react';
import {useAuth0} from '@auth0/auth0-react'


function UserProfile() {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if(isLoading){
        return (<div>Loading</div>)
    }

    return(
        isAuthenticated && (
            <div>
                <img src={user.picture}/>
                <h1 className='text-black'>{user.name}</h1>
                <h2 className='text-black'>{user.email}</h2>
                <h2 className='text-black'>{user.family_name}</h2>
                <h2 className='text-black'>{user.nickname}</h2>
            </div>
        )
    );
}

export default UserProfile;