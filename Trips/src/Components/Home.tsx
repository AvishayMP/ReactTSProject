
import {currentVeiw, nav} from './models/types';

interface HomeProps {
    nav: nav;
}
function Home({ nav }: HomeProps) {
    return (<>
        <button onClick={() => nav(currentVeiw.Trips)}>All Trips</button>
        <button onClick={() => nav(currentVeiw.LogIn)}>log in</button>
        <button onClick={() => nav(currentVeiw.SignIn)}>Sign in</button>
    </>);
}

export default Home;