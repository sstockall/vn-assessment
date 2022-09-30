import { Button, Box, Card, CardHeader, Avatar, Modal, Typography, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';

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
        <section className='character' style={style.char}>
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
                        <InputLabel>Name</InputLabel>
                        <TextField size='small' name='name' defaultValue={character.name}/>
                        <InputLabel>Species</InputLabel>
                        <TextField size='small' name='species' defaultValue={character.species}/>
                        <InputLabel>Status</InputLabel>
                        <TextField size='small' name='status' defaultValue={character.status}/>
                        <Button style={style.button} variant='outlined' type='submit'>Edit</Button>
                    </form>
                </Box>
            </Modal>
        </section>
    );
}

export default User;