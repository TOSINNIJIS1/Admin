import React, { useState } from 'react';
import {axiosWithAuth} from '../../../api/axios'

export default function Create ({read}) {

    const [users, setUsers] = useState({
        username: "",
        password: ""
    })


    const handleChange = (e) => {
        setUsers({
            ...users, [e.target.name]: e.target.value
        })
    }

    
    const createUsers = async (e) => {
        e.preventDefault(e)
        console.log(e,'created')

        await axiosWithAuth().post(`/users`, users)
        .then(res => ( res.data))
        read()
        .catch(err => console.log(err.response))
    }

    
    return (
        <div>
            <div className='userHeader'>
                <h1> Add users </h1>
                    <form onSubmit={(e) => createUsers(e)}>
                        <label style={{color: 'white'}}> Username: </label>
                        <input
                        type='text'
                        name="username"
                        value={users.username}
                        onChange={(e) => handleChange(e)}
                        />
    
                        <label style={{color: 'white'}}> Password: </label>
                        <input
                        type='text'
                        name="password"
                        value={users.password}
                        onChange={(e) => handleChange(e)}
                        /> 
                        
                        <button style={{marginLeft: '1%'}} > Add User </button>
                    </form>
                    
            </div>
        </div>
    )
}