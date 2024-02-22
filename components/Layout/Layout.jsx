import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { ThemeProvider } from "@mui/material";
import { Theme } from "../Theme/Theme";



export default function Layout() {
    return (

        <>
        <ThemeProvider theme={Theme}>
        <Header/>
        <Banner/>
        <Main/>
        <Footer/>
        </ThemeProvider>
        </>

    )
}