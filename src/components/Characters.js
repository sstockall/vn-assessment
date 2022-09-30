import { Grid, Button, Typography, Box, Modal, MenuItem, Select, InputLabel, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';

const style = {
    modal : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    },
    form : {
        display: 'flex',
        flexDirection: 'column'
    },
    ctas : {
        display: 'flex',
        justifyContent: 'center'
    },
    char : {
        margin: '0.5rem',
        cursor: 'pointer'
    },
    select : {
        marginBottom: '0.5rem'
    },
    button : {
        marginTop: '0.5rem',
        width: '7rem'
    },
    deleteButton: {
        marginTop: '0.5rem',
        marginLeft: '0.5rem',
        width: '7rem'
    }
  };

function Users() {
    const URL = "https://rickandmortyapi.com/api/character"
    const [characters, setCharacters] = useState([]);
    const [char, setChar] = useState("");

    const [open, setOpen] = useState(false);
    const toggleOpen = () => !open ? setOpen(true) : setOpen(false);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const toggleDelete = () => !deleteOpen ? setDeleteOpen(true) : setDeleteOpen(false);

    const getCharacters = () => {
        axios.get(URL)
        .then(res => {
            setCharacters(res.data.results.slice(0,20))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    let createChar = (e) => {
        e.preventDefault();
        let newChar = {
            id: characters.length + 1,
            name: e.target.name.value,
            species: e.target.species.value,
            status: e.target.status.value
        }
        characters.push(newChar);
        setCharacters(characters);
        toggleOpen();
    }

    const handleChange = (e) => {
        setChar(e.target.value);
      };

    let deleteChar = (e) => {
        e.preventDefault();
        let newIds = characters.filter(character => {
            return character.id > characters[char-1].id
        }).forEach(character => {
            character.id = character.id-1
        })
        characters.splice([char-1],1);
        setCharacters(characters);
        toggleDelete();
    }
  
    useEffect(() => {
        getCharacters();
    }, [])

    return ( 
        <section className='users'>
            <Grid container>
                {characters.map(character => { 
                    return  <Grid item xs={12} sm ={6} md={3} key={character.id}>
                        <Character character={character} style={style}/>
                    </Grid>
                })}
            </Grid>  
            <div className='ctas' style={style.ctas}>
                <div className='new'>
                    <Button style={style.button} variant='outlined' size='small' onClick={toggleOpen}>New</Button>
                    <Modal
                        open={open}
                        onClose={toggleOpen}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={style.modal}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add New Character
                            </Typography>
                            <form onSubmit={createChar} style={style.form}>
                                <InputLabel>Name</InputLabel>
                                <TextField size='small' name='name'/>
                                <InputLabel>Species</InputLabel>
                                <TextField size='small' name='species'/>
                                <InputLabel>Status</InputLabel>
                                <TextField size='small' name='status'/>
                                <Button style={style.button} variant='outlined' type='submit'>Create</Button>
                            </form>
                        </Box>
                    </Modal>
                </div>
                <div className='delete'>
                    <Button style={style.deleteButton} variant='outlined' size='small' onClick={toggleDelete}>Delete</Button>
                    <Modal
                        open={deleteOpen}
                        onClose={toggleDelete}
                        aria-labelledby="modal-modal-title"
                        >
                        <Box sx={style.modal}>
                            <Typography variant="h6" component="h2">
                                Choose a Character
                            </Typography>
                            <form style={style.form} onSubmit={deleteChar}>
                                <Select style={style.select} size='small' placeholder="Choose..." onChange={handleChange}  value={char}>
                                    {characters.map(char => {
                                        return <MenuItem key ={char.name} value={char.id}>{char.name}</MenuItem>
                                    })}
                                </Select >
                                <Button style={style.button} variant='outlined' type='submit'>Delete</Button>
                            </form>
                        </Box>
                    </Modal>
                </div>
            </div>                        
        </section>
    );
}

export default Users;