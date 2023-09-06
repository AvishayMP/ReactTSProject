import { Link } from 'react-router-dom';

function Home() {
    return (<>
        <Link to='/trips'>Trips</Link>
        <Link to='/login'>log in</Link>
        <Link to='/register'>Register</Link>
    </>);
}

export default Home;