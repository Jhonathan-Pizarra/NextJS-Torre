import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import {CardActions, CardMedia, Grid, makeStyles, Paper, Typography, Link as MuiLink, Avatar,} from "@material-ui/core";
import React, {useState} from "react";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from '@material-ui/icons/Facebook'
import GitHubIcon from '@material-ui/icons/GitHub';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import withAuth from "@/hocs/withAuth";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '100%',
    },
    image: {
        textAlign: 'center',
        marginLeft: 'auto',
        display: "block",
        marginRight: 'auto'
    },
    experience: {
        color: '#1565c0',
    },
    fondo:{
        backgroundColor: 'white',
    },
    facebook:{
        color: "#3b5998",
    },
    github:{
        color: "#212121",
    },
    folio:{
        color: "#f57c00",
    }
}));

const CandidateID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: candidate, error, mutate} = useSWR(`/candidates/${id}`, fetcher);
    const [visibleEx, setVisibleEx] = useState(false);
    const [visibleSkill, setVisibleSkill] = useState(false);

    // if(error) return <div><NotFound/></div>;
    if(!candidate) return <Loading/>;

    const handleHideEx = () => {
        setVisibleEx(!visibleEx);
    };

    const handleHideSkills = () => {
        setVisibleSkill(!visibleSkill);
    };
    

    return (
        <div>
            <h1>Candidate Detail</h1>
            <div>
                
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={3} md={4} lg={4} xl={4} className={classes.image} >
                            <CardMedia
                                display="flex"
                                component="img"
                                alt={candidate.name}
                                height="100%"
                                width= "100%"
                                //image={`https://inconcerto.herokuapp.com/storage/${festival.image}`}
                                //image={`https://res.cloudinary.com/inconcerto/image/upload/${festival.image}`}
                                //image={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${festival.image}`}
                                image={candidate.photo.url}
                                title={candidate.name}
                            />
                        </Grid>

                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <h2>{candidate.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Age:</b>&ensp;{candidate.age}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Phone:</b>&ensp;{candidate.phone}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Email:</b>&ensp;{candidate.email}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Direction:</b>&ensp;{candidate.direction}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Description:</b>&ensp;{candidate.description}</p>
                                    </Typography>
                                    <hr/>
                                    <Typography variant="body2" gutterBottom>
                                        <p onClick={handleHideEx}>
                                            <Link href='#' passHref>
                                                <MuiLink><h3 className={classes.experience}>Experience(s)&ensp;</h3></MuiLink>
                                            </Link>
                                        </p>
                                        {
                                            visibleEx ?
                                                <ul>
                                                    <li>{candidate.experiences.map(experience => experience.company+" | "+experience.date_out+" ")}</li>
                                                </ul>
                                                :
                                                <p></p>
                                        }
                                    </Typography>
                                    <hr/>
                                    <Typography variant="body2" gutterBottom>
                                        <p onClick={handleHideSkills}>
                                            <Link href='#' passHref>
                                                <MuiLink><h3 className={classes.experience}>Skill(s)&ensp;</h3></MuiLink>
                                            </Link>
                                        </p>
                                        {
                                            visibleSkill ?
                                                <ul>
                                                    <li>{candidate.skills.map(skill => skill.name+" | "+" ")}</li>
                                                </ul>
                                                :
                                                <p></p>
                                        }
                                    </Typography>
                                    {/*<ReadFestivalConcerts id={festival.id}/>*/}

                                </Grid>
                                <Grid container>
                                    <CardActions>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                            <Avatar className={classes.fondo}>
                                                <Link href="https://www.facebook.com/jhonathan.pizarra/" >
                                                    <IconButton aria-label="ver" size="small">
                                                        <FacebookIcon className={classes.facebook}/>
                                                    </IconButton>
                                                </Link>
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

                                            <Avatar className={classes.fondo}>
                                                <Link href="https://github.com/Jhonathan-Pizarra">
                                                    <IconButton aria-label="ver"  size="small">
                                                        <GitHubIcon className={classes.github}/>
                                                    </IconButton>
                                                </Link>
                                            </Avatar>

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

                                            <Avatar className={classes.fondo}>
                                                <Link href="https://jhonathan-pizarra.github.io/portfolio">
                                                    <IconButton aria-label="ver"  size="small">
                                                        <BusinessCenterIcon className={classes.folio}/>
                                                    </IconButton>
                                                </Link>
                                            </Avatar>
                                        </Grid>
                                    </CardActions>
                                </Grid>
                            </Grid>
                            {/*<Grid item>*/}
                            {/*    <Typography variant="subtitle1">$19.00</Typography>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );

};

export default withAuth(CandidateID);