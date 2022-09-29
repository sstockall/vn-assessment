import { Button, Card, CardHeader, CardActions, Avatar, Typography, IconButton } from '@mui/material';

function User({ user }) {


    return ( 
        <Card variant='outlined' sx={{ minWidth: 275 }}>
            <CardHeader
                avatar={
                <Avatar src={user.avatar} aria-label="recipe">
                    R
                </Avatar>
                }
                title={user.first_name}
                subheader={user.email}
            />
            <CardActions>
                <Button size='small'>Delete</Button>
                <Button size='small'>Edit</Button>
            </CardActions>
        </Card> 
    );
}

export default User;