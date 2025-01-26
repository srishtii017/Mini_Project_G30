import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link , Navigate, useParams } from "react-router-dom"

export default function Account() {
    const[redirect,setRedirect]=useState(null);
    const { ready , user, setUser } = useContext(UserContext)
    let {subpage} = useParams();
    if(subpage===undefined){
        subpage='profile';
    }

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Loading ..'
    }
    
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'}  />
    }
    
    function LinkClasses(type=null){
        let classess = 'py-2 px-6';
        if(type===subpage){
            classess+= 'bg-primary text-white rounded-full';
        }
        return classess;
    }
    
    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
        <div>
            <nav className="w-full jusify-center mt-8 gap-2 mb-8">
                <Link className="{LinkClassess('profile')}" to={'/account'}>My Profile</Link>
                <Link className="{LinkClassess('bookings')}" to={'/account/bookings'}>My Bookings</Link>
                <Link className="{LinkClassess('places')}" to={'/account/places'}>My accommodations</Link>
            </nav>
            {subpage==='profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br/>
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </div>
    )
}