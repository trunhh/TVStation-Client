import { Outlet}  from 'react-router-dom';
import Header from './Header';


const HomePage = (props) => {
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default HomePage;