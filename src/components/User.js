import { Button, Box, Card, CardHeader, CardActions, Avatar, Modal, Typography, IconButton } from '@mui/material';
import axios from 'axios';
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

function User({ character, URL }) {
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
            <CardActions>
                <Button size='small'>Delete</Button>
                <Button size='small' onClick={handleOpen}>Edit</Button>
            </CardActions>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </Card> 
    );
}

export default User;