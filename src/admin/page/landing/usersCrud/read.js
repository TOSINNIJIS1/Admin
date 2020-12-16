import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../../../api/axios';
import Pagination from '../pagination';
import Modal from './modal';

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

    const Header = (e) => {
        // let header = Object.keys(users[0]) 
        // output the id, username, and password 
        // but it's crashing after reload
        let header = Object.keys(users)
        return header.map((data, i) => {
            return <th key={i}>{data}</th>
        })
    }


    const Map = () => {
        return currentUsers.map((data, i) => {
            const {id, username, password} = data

            return (
                <tr key={i}>
                    <td> {id} </td>
                    <td> {username} </td>
                    <td> {password} </td>
                    <button>Edit</button>
                    <button style={{margin: '5px', color: 'white'}} onClick={(e) => deleteUsers(id, e)}><i class="bi bi-trash">Delete</i></button>
                </tr>
            )
        })
    }

    return (
        <div>
            <Modal read={readUsers} />
            {/* <Create read={readUsers} /> */}
            <h1 style={{color: '#3F729B', textAlign: 'center'}}> Users </h1>
            
            <table class="table table-dark table-hover">
                <tbody>
                    <tr>{Header()} </tr>
                    {Map()}
                </tbody>
            </table>
                        

                        {/* <button style={{marginLeft: '1%'}} onClick={(e) => EditUsers(event.id, e)} > Edit </button>
                        <button style={{marginLeft: '1%'}} onClick={(e) => deleteUsers(event.id, e)}> Delete </button>  */}
                    {/* </div> */}
                {/* ) */}
            {/* <div style={{display: 'flex', flexDirection: 'row'}}> */}
                <Pagination paginate={paginate} total={users.length} page={postPerPage} />
            {/* </div> */}
        </div>
    )
}