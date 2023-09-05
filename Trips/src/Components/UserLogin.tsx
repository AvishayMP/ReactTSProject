import { nav } from "./models/types";

interface UserLoginProps {
    nav: nav;
}
function UserLogin({ nav }: UserLoginProps): JSX.Element {
    return (<>
        Login
    </>);
}

export default UserLogin;