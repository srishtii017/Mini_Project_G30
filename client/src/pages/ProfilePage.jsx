// import { useContext, useState } from "react"
// import { UserContext } from "../UserContext"
// import { Navigate, useParams } from "react-router-dom"
// import axios from "axios";
// import PlacesPage from "./PlacesPage";
// import AccountNav from "../AccountNav";

// export default function ProfilePage() {
//     const [redirect, setRedirect] = useState(null);
//     const { ready, user, setUser } = useContext(UserContext)
//     let { subpage } = useParams();
//     if (subpage === undefined) {
//         subpage = 'profile';
//     }

//     async function logout() {
//         await axios.post('/logout');
//         setRedirect('/');
//         setUser(null);
//     }

//     if (!ready) {
//         return 'Loading ..'
//     }

//     if (ready && !user && !redirect) {
//         return <Navigate to={'/login'} />
//     }
//     if (redirect) {
//         return <Navigate to={redirect} />
//     }

//     return (
//         <div>
//             <AccountNav />
//             {subpage === 'profile' && (
//                 <div className="text-center max-w-lg mx-auto pt-4 pb-4">
//                     Logged in as {user.name} ({user.email}) <br />
//                     <button onClick={logout} className=" primary max-w-sm mt-4 ">Logout</button>
//                 </div>
//             )}
//             {subpage === 'places' && (
//                 <PlacesPage />
//             )}
//         </div>
//     );
// }



import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [bookingsCount, setBookingsCount] = useState(0);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();

    if (subpage === undefined) {
        subpage = "profile";
    }

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                bio: user.bio || "Tell us about yourself...",
            });
            
        }
    }, [user]);

    async function logout() {
        setIsLoading(true);
        try {
            await axios.post("/logout");
            setRedirect("/");
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function saveProfile(ev) {
        ev.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await axios.put("/update-profile", profileData);
            setUser(data);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Profile update failed:", error);
            
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }



    // Fetch bookings count on component mount
    useEffect(() => {
        
        async function bookingscount() {
            try {
                const response = await axios.get('/bookingscount');
                const count = response?.data?.count ?? 0;
                setBookingsCount(count);
            } catch (error) {
                console.error("Failed to fetch bookings count:", error);
                setBookingsCount(0);
            }
        }
        if (user) {
            bookingscount();
        }
    }, [user]);


   

    function handleChange(ev) {
        const { name, value } = ev.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    if (!ready) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    if (ready && !user && !redirect) {
        return <Navigate to={"/login"} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <AccountNav />

            {subpage === "profile" && (
                <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3 flex flex-col items-center">
                            
                            <div className="mt-8 w-full">

                                <div className="flex flex-col gap-2 mt-6">
                                    <div className="stats-box">
                                        <div className="flex justify-between">
                                            <span>Member since</span>
                                            <span className="font-semibold">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</span>
                                        </div>
                                    </div>
                                    <div className="stats-box">
                                        <div className="flex justify-between">
                                            <span>Bookings</span>
                                            <span className="font-semibold">{bookingsCount || 0}</span>
                                        </div>
                                    </div>
                                    <div className="stats-box">
                                        <div className="flex justify-between">
                                            <span>Listed properties</span>
                                            <span className="font-semibold">{user.placesCount || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            {isEditing ? (
                                <form onSubmit={saveProfile} className="flex flex-col gap-4">
                                    <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleChange}
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleChange}
                                            placeholder="Your phone number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Bio</label>
                                        <textarea
                                            name="bio"
                                            value={profileData.bio}
                                            onChange={handleChange}
                                            placeholder="Tell us about yourself..."
                                            rows="4"
                                        ></textarea>
                                    </div>

                                    <div className="flex gap-4 mt-4">
                                        <button
                                            type="submit"
                                            className="primary"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Saving..." : "Save Changes"}
                                        </button>
                                        <button
                                            type="button"
                                            className="secondary"
                                            onClick={() => setIsEditing(false)}
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="profile-info">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold">Profile Information</h2>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            Edit Profile
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="info-card">
                                            <div className="info-label">Full Name</div>
                                            <div className="info-value">{profileData.name}</div>
                                        </div>

                                        <div className="info-card">
                                            <div className="info-label">Email Address</div>
                                            <div className="info-value">{profileData.email}</div>
                                        </div>

                                        <div className="info-card">
                                            <div className="info-label">Member Status</div>
                                            <div className="info-value flex items-center">
                                                <span className="status-badge">Active</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <div className="info-label">Bio</div>
                                        <div className="bio-text">
                                            {profileData.bio || "No bio provided yet."}
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <button
                                            onClick={logout}
                                            className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
                                            disabled={isLoading}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                            </svg>
                                            {isLoading ? "Logging out..." : "Logout"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {subpage === "places" && <PlacesPage />}
        </div>
    );
}