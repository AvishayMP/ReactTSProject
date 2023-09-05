import { nav } from "./models/types";
interface UserRegistrationProps {
    nav: nav;
}
function UserRegistration({ nav }: UserRegistrationProps): JSX.Element {
    return (<>Register</>);
}

export default UserRegistration;