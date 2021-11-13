import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {makeStyles} from "@material-ui/core/styles";
import CreateCandidate from "@/components/candidates/CreateCandidate";
import Routes from "@/constants/routes";
import {
    Button,
    CardActions,
    CardMedia,
    Grid,
    Typography,
    Link as MuiLink,
    Card,
    Box,
    CardContent
} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        flexDirection: 'unset',
        position: 'relative',
        top: -75,
        left: 20
    },
    content: {
        flex: '1 0 ',
    },
    cover: {
        width: 150,
        //height: 331,
        "&:hover, &:focus": {
            //"-webkit-transform":`scale(${1.5})`,
            //"-ms-transform": `scale(${1.5})`,
            //transform: `scale(${1.5})`,
            width: 500,
        },
    },
    cardDimension: {
        /*width: 240,
        height: 420*/
        width: 400,
        height: 300
    },
    title: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
    },
    body: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 4,
        "-webkit-box-orient": "vertical",
    },

}));

const CandidateReadForm = () => {

    const classes = useStyles();
    const {data: candidates, error} = useSWR(`/candidates`, fetcher);

    if(error) return <p>No se pudieron cargar los candidatos...</p>;
    if (!candidates) return <Loading/>;

    return (
        // Ver artists index si quieres hacer una tabla
        // Ver festivals index si quieres hacer cards
        // Ver essays index si quieres hacer lists
        // Ver resources index si quieres hacer en tabs
        <div>
            <h1>Candidates</h1>
            <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                {/*{festivals.data ? <SnackSuccess/> : <Loading/>}*/}
                {candidates && candidates.map(candidate => {
                    return(
                        <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} key={candidate.id}>
                            <Card className={classes.root}>

                                <Box m={2} className={classes.cardDimension}>
                                    <div>
                                        <CardContent className={classes.content}>
                                            <Typography component="h5" variant="h5"  className={classes.title}>
                                                {candidate.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary"  className={classes.body}>
                                                <p>{candidate.description}</p>
                                            </Typography>
                                        </CardContent>
                                    </div>
                                </Box>

                                <CardMedia
                                    className={classes.cover}
                                    /*image={`http://localhost:8000/storage/${festival.image}`}*/
                                    //image={`https://inconcerto.herokuapp.com/storage/${festival.image}`}
                                    //image={`https://res.cloudinary.com/inconcerto/image/upload/${candidate.photo}`}
                                    image={candidate.photo.url}
                                    // image={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${candidate.image}`}
                                    title={candidate.name}
                                />

                            </Card>

                            <div className={classes.details}>
                                <Grid container>
                                    <CardActions >
                                        <Link href={`${Routes.CANDIDATES}/${candidate.id}`} passHref >
                                            <MuiLink>
                                                <Button size="small" color="primary">
                                                    See detail
                                                </Button>
                                            </MuiLink>
                                        </Link>
                                    </CardActions>
                                </Grid>
                            </div>

                        </Grid>
                    );
                })}
            </Grid>
            <CreateCandidate/>
        </div>
        

    )
}

export default CandidateReadForm;//Colocar WithAuth Al terminar