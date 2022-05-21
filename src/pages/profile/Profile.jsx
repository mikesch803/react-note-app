import React from 'react'
import { Aside } from '../../components'
import { useAuthContext } from '../../context';
import { useTitle } from '../../hooks/useTitle';
import './Profile.css'
export function Profile() {
    const { user, logoutHandler } = useAuthContext();

    useTitle("Profile")
  return (
    <div className='page-layout'>
        <Aside/>
        <main className='main center-div'>
            <div className="profile-container ft-grey">
                <h2 >Profile</h2>
                <h3>Name: <span className='ft-w-400'>{user.firstName} {user.lastName}</span></h3>
                <h3>Email: <span className='ft-w-400'>{user.email}</span></h3>
                <button className='btn btn-logout' onClick={logoutHandler}>Logout</button>
            </div>
        </main>
    </div>
  )
}
