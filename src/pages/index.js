import styles from '@/styles/Home.module.css';
import BackToTop from "@/components/BackToTop";
import {Grid} from "@material-ui/core";
import ReactPlayer from 'react-player';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paper2: {
        //padding: theme.spacing(0),
        textAlign: 'center',
        //color: theme.palette.text.secondary,
    },
    adornated:{
        float: 'left',
        lineHeight: 0.7,
        fontSize: 55,
        color: '#333',
        border: 'solid #333',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        paddingLeft: 5,
        marginRight: 5,
        marginBottom: -5,
    },
    cover: {
        width: 151,
    },
    container2: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default function Home() {
    
    const classes = useStyles();

  return(
      <div className={styles.container}>
          <div className={classes.container2}>
              <p className={styles.title}>♪♬♩🎵Test-System ♪🎶♫...</p>
              <i>"By: Jhonathan Pizarra..."</i>
          </div>
          <BackToTop/>

          <Grid container spacing={3}>
              <Grid item xs >

                  <p>
                      <span className={classes.adornated}>J</span>honathan Pizarra ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                      Sremque laudantium, totcabo. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatm vel eum iure reprehenderit qui in ea voluptate velit esse quam niur?
                      accusantium architecto beatae vitae dicta sunt explicabotur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariat
                      
                  </p>
                  <p>
                      -Jhonathan Pizarra-
                  </p>


              </Grid>
              <Grid item xs>
                  <ReactPlayer
                      className={classes.playerWraper}
                      url='https://www.youtube.com/watch?v=OQJ_XPioWXE'
                      width="100%"
                      height="90%"
                      playing={false}
                      controls={true}
                  />
              </Grid>
          </Grid>
          <br/>
              {[...new Array(6)]
                  .map(() =>
                      `Cras mattis consectetur purus sit amet fermentum.
                       Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                       Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                       Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                  )
                  .join('\n')}



      </div>

  )
}