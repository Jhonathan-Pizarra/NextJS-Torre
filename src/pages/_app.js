import '@/styles/globals.css'
import {AuthProvider} from "@/lib/auth";
import Navigation from "@/components/Navigation";
import Head from "next/head";
import {Container, CssBaseline, Grid, ThemeProvider} from "@material-ui/core";
import theme from "@/styles/theme";


function App({ Component, pageProps }) {
  return (
      <div>
          <Head>
              <title>Jhonathan Pizarra</title>
              <meta
                  name="viewport"
                  content="minimum-scale=1, initial-scale=1, width=device-width"
              />
          </Head>
          <AuthProvider> {/*Todos los componentes que se renderizan aqui van a tener acceso a AuthContext*/}
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Navigation/>
                  <Container maxWidth='lg'>
                      <Grid container spacing={2}>
                          <Grid item xs={12}>
                              <Component {...pageProps} />
                          </Grid>
                      </Grid>
                  </Container>
              </ThemeProvider>
          </AuthProvider>
      </div>
  );

}

export default App
