import { Link, useNavigate } from "react-router-dom";
import { User, authAPI } from "./models/user";
import axios from 'axios';
import { useContext, useState } from "react";
import { AuthContextType, AuthContext } from "./context/Trips/AuthContext";

function UserLogin(): JSX.Element {
    const navigate = useNavigate();
    const { setToken } = useContext<AuthContextType>(AuthContext);
    const [user, setUser] = useState<Partial<User>>({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(authAPI + '/login', user)
            .then(res => {
                alert(res.data.message);
                setToken(res.data.responseObj.token);
                navigate('/trips');
            })
            .catch(err => console.log(err));
    }
    return (<>
        <Link to='/'>Home</Link>
        <form onSubmit={handleSubmit} className="container fx-col">
            <input type='text' value={user.email}
                onChange={handleChange} placeholder="email" name='email' />
            <input type='password' value={user.password}
                onChange={handleChange} placeholder="password" name='password' />
            <button type="submit">Login</button>
        </form>
    </>);
}

export default UserLogin;