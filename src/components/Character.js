import { Button, Box, Card, CardHeader, CardActions, Avatar, Modal, Typography } from '@mui/material';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function User({ character, characters }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return ( 
        <Card variant='outlined' sx={{ minWidth: 275 }}>
            <CardHeader
                avatar={
                <Avatar src={character.image} aria-label="recipe" />
                }
                title={character.name}
                subheader={`${character.species} - ${character.status}`}
            />
        </Card> 
    );
}

export default User;