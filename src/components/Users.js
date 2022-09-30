import { Grid, Button, Typography, Box, Modal } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';

const style = {
    modal : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    form : {
        display: 'flex',
        flexDirection: 'column'
    }
  };

function Users() {
    const URL = "https://rickandmortyapi.com/api/character"
    const [characters, setCharacters] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getCharacters = () => {
        axios.get(URL)
        .then(res => {
            setCharacters(res.data.results.slice(0,12))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    let createChar = (e) => {
        e.preventDefault()
        let newChar = {
            id: characters.length + 1,
            name: e.target.name.value,
            species: e.target.species.value,
            status: e.target.status.value
        }
        characters.push(newChar);
        setCharacters(characters);
        handleClose();
        console.log(characters)
    }
  
    useEffect(() => {
        getCharacters();
    }, [])

    return ( 
        <section className='users'>
            <Grid container>
                {characters.map(character => { 
                    return  <Grid item xs={12} sm ={6} md={3} key={character.id}>
                        <User character={character} URL={URL} />
                    </Grid>
                })}
            </Grid>  
            <div className='new'>
                <Button size='small' onClick={handleOpen}>New Character</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style.modal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new character
                        </Typography>
                        <form onSubmit={createChar} style={style.form}>
                            <label>Name</label>
                            <input name='name'/>
                            <label>Species</label>
                            <input name='species'/>
                            <label>Status</label>
                            <input name='status'/>
                            <Button type='submit'>Create</Button>
                        </form>
                    </Box>
                </Modal>
            </div>                         
        </section>
    );
}

export default Users;