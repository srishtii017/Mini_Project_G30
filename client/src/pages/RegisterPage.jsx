import { useState } from "react";
import { Link , Navigate} from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password
            });
            // alert('Registration Successfull, now you can login');
            toast.success('Registration Successfull, now you can login');
            setRedirect(true);

        } catch(e) {
            // alert('Registration failed , please again later');
            console.log('REGISTRATION ERROR : ',e);
        }
    }
    if (redirect) {
            return <Navigate to={'/login'} />
        }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter your name .."
                        onChange={ev => setName(ev.target.value)}
                    />
                    <input type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already have an account ? <Link className="underline text-black hover:drop-shadow-lg " to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}