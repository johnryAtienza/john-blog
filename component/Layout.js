import styles from '../styles/Layout.module.css'
import Header from './Header'
import Nav from './Nav'
import {Container} from '@material-ui/core';

const Layout = ({children}) => {
    return (
        <>
            <Nav />
            <Container maxWidth="lg">
                <main>
                    <Header />
                    {children}
                </main>
            </Container>
        </>
    )
}

export default Layout
