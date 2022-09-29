import { Button, Grid, Card, CardContent, CardActions, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Avatar alt='avatar' src={user.avatar}/>
                                {user.first_name}
                            </CardContent>
                            <CardActions>
                                <Button size='small'>Delete</Button>
                                <Button size='small'>Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                })}
            </Grid>                           
        </section>
    );
}

export default Users;