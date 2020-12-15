import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../../../api/axios';
import Pagination from '../pagination';
import Create from './create'



export default function UserHeader (props) {
    const [users, setUsers] = useState([])

    const [editUsers, setEditUser] = useState([])

    const [password, setPassword] = useState({
        type: 'text'
    })

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(3)

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);


    const paginate =  (pageNumber) => setCurrentPage(pageNumber)
    
    const onClick = () => setPassword(({type}) => ({
        type: type === 'text' ? 'password' : 'text'
    }))

    // 

    const readUsers = async () => {
        let get = await axiosWithAuth().get('/users')
        .then(({data}) => data);
        setUsers(get)
    }

    // 

    const EditUsers = (id) => {
        axiosWithAuth().put(`/users/${id}`, editUsers)
        .then(res => {
            setEditUser(users.map(user => {
                if (user.id === res.data.id) {
                    console.log('SUCCESS')
                    setEditUser({ })
                    return res.data
                } else {
                    // console.log('ERROR')
                    return user
                }}))})
        .catch(err => console.log('Error, Product Not Edited', err))

        readUsers()
    }

    // 

    const deleteUsers = (id) => {
        axiosWithAuth().delete(`/users/${id}`, ...users)
        .then(res => (
            readUsers()
        ))

        // const list = users.list.filter(data => data.id !== id);
        // setUsers({list})
    }

    // 

    useEffect(() => (
        readUsers() // eslint-disable-next-line
    ),[]) 

    return (
        <div>
            <Create read={readUsers} />
            <h1 style={{color: '#3F729B', textAlign: 'center'}}> Users </h1>
            {currentUsers.map(event => {
                return (
                    <div style={{margin: '3%', display: 'flex', justifyContent: 'center'}}>
                        <form>
                            <label style={{color: 'white'}}> Username: </label>
                            <input
                            type='text'
                            value={event.username}
                            onChange={(e) => {setEditUser({...editUsers, username: e.target.value})}}
                            />

                            <label style={{color: 'white'}}> Password: </label>
                            <input
                            type={password.type}
                            value={event.password}
                            onClick={onClick}
                            onChange={(e) => {setEditUser({...editUsers, password: e.target.value})}}
                            /> 
                        </form>
                        <button style={{marginLeft: '1%'}} onClick={(e) => EditUsers(event.id, e)} > Edit </button>
                        <button style={{marginLeft: '1%'}} onClick={(e) => deleteUsers(event.id, e)}> Delete </button> 
                    </div>
                )
            })}
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Pagination paginate={paginate} total={users.length} page={postPerPage} />
            </div>
        </div>
    )
}