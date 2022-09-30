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

function User({ character, style }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let editChar = (e) => {
        e.preventDefault();
        character.name = e.target.name.value;
        character.species = e.target.species.value;
        character.status = e.target.status.value;
        handleClose()
    }

    return ( 
        <section className='character'>
            <Card  onClick={handleOpen} variant='outlined' sx={{ minWidth: 275 }}>
                <CardHeader
                    avatar={
                    <Avatar src={character.image} aria-label="recipe" />
                    }
                    title={character.name}
                    subheader={`${character.species} - ${character.status}`}
                />
            </Card> 
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style.modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Character
                    </Typography>
                    <form onSubmit={editChar} style={style.form}>
                        <label>Name</label>
                        <input name='name' defaultValue={character.name}/>
                        <label>Species</label>
                        <input name='species' defaultValue={character.species}/>
                        <label>Status</label>
                        <input name='status' defaultValue={character.status}/>
                        <Button type='submit'>Edit</Button>
                    </form>
                </Box>
            </Modal>
        </section>
    );
}

export default User;