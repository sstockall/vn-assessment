import { Grid, Button, Typography, Box, Modal, MenuItem, FormControl, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
    const [char, setChar] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);


    const [editOpen, setEditOpen] = useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

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
        handleClose();
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
        console.log(characters)
        handleDeleteClose();
    }
  
    useEffect(() => {
        getCharacters();
    }, [])

    return ( 
        <section className='users'>
            <Grid container>
                {characters.map(character => { 
                    return  <Grid item xs={12} sm ={6} md={3} key={character.id}>
                        <Character character={character} characters={characters}/>
                    </Grid>
                })}
            </Grid>  
            <div className='new'>
                <Button size='small' onClick={handleOpen}>New</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style.modal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add New Character
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
                <Button size='small' onClick={handleDeleteOpen}>Delete</Button>
                <Modal
                    open={deleteOpen}
                    onClose={handleDeleteClose}
                    aria-labelledby="modal-modal-title"
                    >
                    <Box sx={style.modal}>
                        <Typography variant="h6" component="h2">
                            Choose Character
                        </Typography>
                        <form onSubmit={deleteChar}>
                        <InputLabel>Character</InputLabel>
                            <Select onChange={handleChange}  value={char}>
                                {characters.map(char => {
                                    return <MenuItem key ={char.name} value={char.id}>{char.name}</MenuItem>
                                })}
                            </Select >
                            <Button type='submit'>Delete</Button>
                        </form>
                    </Box>
                </Modal>
                <Button size='small'>Update</Button>
            </div>                         
        </section>
    );
}

export default Users;