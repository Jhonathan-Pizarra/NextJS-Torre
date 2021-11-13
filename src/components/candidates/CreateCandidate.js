import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR, {mutate} from "swr";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Fab, InputLabel,
    makeStyles, Select,
    TextField, Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {Candidate} from "@/lib/candidates";



const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

// Establecer los values={} acorde al campo que correspindan **
// Si tiene checkbox, selectos y así, copiar sus funciones handle del create **
// Si tiene checkbox, selectos y así, copiar sus variables consts del create **

const CreateCandidate = () => {
    const classes = useStyles();
    const { register, handleSubmit, reset } = useForm();
    const [open, setOpen] = useState(false);
    const {data: candidate, error, mutate} = useSWR(`/candidates`, fetcher);
    const {data: skills} = useSWR(`/skills`, fetcher);
    const {data: experiences} = useSWR(`/experiences`, fetcher);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"No se pudo crear el candidato..."</div>;
    if(!candidate) return <Loading/>;

    const handleOpen = () => {
        reset();
        setCreateSuccess(false);
        setCreateError(false);
        setOpen(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setOpen(false);
    };

    const onSubmit = async (data) => {
        console.log('data', data);
        console.log("imgen ", data.photo[0]);
        console.log("IMG ", data.photo[1]);

        const newCandidate = {
            name: data.name,
            email: data.email,
            age: data.age,
            phone: data.phone,
            direction: data.direction,
            description: data.description,
            photo: data.photo[0],
            //festival_id: data.festival_id,
        };

        const formData = new FormData();
        formData.append("name", newCandidate.name);
        formData.append("age", newCandidate.age);
        formData.append("email", newCandidate.email);
        formData.append("phone", newCandidate.phone);
        formData.append("direction", newCandidate.direction);
        formData.append("description", newCandidate.description);
        formData.append("photo", newCandidate.photo);
        //formData.append("festival_id", newCandidate.festival_id);

        try {
            setProcessing(true);
            await Candidate.create(formData);
            mutate("/candidates");
            handleClose();
            setCreateSuccess(true);

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // alert(error.response.message);
                console.error(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error", error.message);
            }
            console.error(error.config);
        }
        reset(); //Limpiar los imput después del submit
    };
    

    return (
        <div>

            <Tooltip title="Add" aria-label="add" className={classes.fixed}>
                <Fab  color="secondary" onClick={handleOpen} > {/*className={classes.fixed}*/}
                    <AddIcon />
                </Fab>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">Test-Torre</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            value={candidate.name}
                            {...register('name')}
                            fullWidth
                        />
                       
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="age"
                            label="Age"
                            type="number"
                            value={candidate.age}
                            {...register('age')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="phone"
                            label="Phone"
                            type="number"
                            value={candidate.phone}
                            {...register('phone')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            value={candidate.email}
                            {...register('email')}
                            fullWidth
                        />
                    </DialogContent>
                    
                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="direction"
                            label="Direction"
                            type="text"
                            value={candidate.direction}
                            {...register('direction')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //disabled={processing}
                            margin="dense"
                            id="description"
                            label="Description"
                            multiline
                            rows={3}
                            rowsMax={6}
                            type="text"
                            value={candidate.description}
                            {...register('description')}
                            fullWidth
                        />
                    </DialogContent>
                    
                    
                    <DialogContentText>
                        <DialogContent>
                            Cargar imagen:
                            <input
                                name="photo"
                                type="file"
                                {...register('photo')}
                            />
                        </DialogContent>
                    </DialogContentText>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleClose} color="primary" type="submit">
                            Crear
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default CreateCandidate;