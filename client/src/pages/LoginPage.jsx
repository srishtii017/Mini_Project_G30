// import { Link } from "react-router-dom";

// export default function LoginPage() {
//     const[email,setEmail]=useState('');
//     const[password, setPassword]= useState('');
//     async function handleLoginSubmit(ev){
//         try{
//             await axios.post('/login', {email,password});
//             alert('login successful');
//         }
//         catch(e){
//             alert('login failed');
//         }
//     }
//     return (
//         <div className="mt-4 grow items-center justify-around">
//             <div className="mb-64">
//                 <h1 className="text-4xl text-center mb-4">Login</h1>
//                 <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}  >
//                     <input type="email" placeholder="your@gmail.com" value={email} 
//                     onChange={e => setEmail(eval.target.value)} />
//                     <input type="password" placeholder="password" value={password} 
//                     onChange={ev => setPassword(ev.target.value)} />
//                     <button className="primary">Login</button>
//                     <div className="text-center py-2 text-gray-500">
//                         Don&apos;t have an account yet?
//                         <Link className="underline text-black" to={'/register'}>Register now</Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

axios.defaults.baseURL = 'http://localhost:4000'; // Ensure the backend URL is correct

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser}= useContext(UserContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault(); // Prevent page reload
        try {
            const userInfo = await axios.post('/login', { email, password });
            setUser(userInfo);
            alert('Login successful');
            setRedirect(true);
        } catch (e) {
            alert('Login failed');
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        placeholder="your@gmail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)} // Fixed here
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} // Corrected here
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don&apos;t have an account yet?{' '}
                        <Link className="underline text-black" to={'/register'}>
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
