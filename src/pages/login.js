import {useAuth} from "@/lib/auth";
import withoutAuth from "@/hocs/withoutAuth";
import {useForm} from "react-hook-form";
import {Button, Grid, makeStyles, TextField, Link as MuiLink, Typography,} from "@material-ui/core";
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
    },
    buttonWrapper: {
        textAlign: "center",
    },
}));

const Login = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const { register, handleSubmit} = useForm();

    const onSubmit = async (data) =>{
        setLoading(true);
        try {
            const userData = await login(data);
            setLoading(false);
            console.log('userData', data);

        }catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            setLoading(false);
            console.log(error.config);
        }
    };


    return (
        <div>
            <Grid container justify="center">
                <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} justify="center" alignItems="center">
                            <Image
                                src="/logo1-inconcerto.png"
                                alt="InConcerto"
                                width={150}
                                height={150}
                            />
                            <Grid xs={12} item>
                                <p>Please use this <b>credentials:</b></p>
                                <p>jhonathan-xabier@hotmail.com <br/> 123123</p>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="E-mail"
                                    {...register('identifier')}
                                    // inputRef={register}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    {...register('password')}
                                    // inputRef={register}
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid xs={12} item className={classes.buttonWrapper}>
                                <Button
                                    name="submit"
                                    variant="contained"
                                    type="submit"
                                    color="secondary"
                                    disabled={loading}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <p className={classes.buttonWrapper}>
                        <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                            <Link href='#' passHref>
                                <MuiLink>
                                    <h4>Forgot Password?</h4>
                                </MuiLink>
                            </Link>
                        </Typography>
                    </p>
                </Grid>
            </Grid>
        </div>
    );

};

export default withoutAuth(Login);