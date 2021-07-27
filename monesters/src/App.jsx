import Header from './Layouts/Header.jsx';
import Cards from './Layouts/Cards.jsx';
import Footer from './Layouts/Footer.jsx';
import {Container, Paper} from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

export default function App() {
 const themeX = createTheme({
  palette: {
    type: "dark",
    background: {
      paper: "#000000"
    },
  },
  typography: {
    "fontFamily": `"Monster"`,
  }
});
  return(
    <ThemeProvider theme={themeX}>
      <Container className="wrapper">
        <Paper>
          <Header />
          <Cards />
          <Footer />
        </Paper>
      </Container>
    </ThemeProvider>
    )
}