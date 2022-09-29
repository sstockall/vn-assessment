import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';

function Users() {
    const URL = 'https://reqres.in/api'
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        axios.get(`${URL}/users`)
        .then(res => {
            setUsers(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
  
    useEffect(() => {
        getUsers();
    }, [])

    return ( 
        <section className='users'>
            <Grid container>
                {users.map(user => { 
                    return  <Grid item xs={12} sm ={6} md={3} key={user.id}>
                        <User user={user} />
                    </Grid>
                })}
            </Grid>                           
        </section>
    );
}

export default Users;