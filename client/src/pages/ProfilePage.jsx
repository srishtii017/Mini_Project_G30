import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const [bookingsCount, setBookingsCount] = useState(0);
    const [listingsCount, setListingsCount] = useState(0);
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
        async function listingscount() {
            try {
                const response = await axios.get('/listingscount');
                const count = response?.data?.count ?? 0;
                setListingsCount(count);
            } catch (error) {
                console.error("Failed to fetch listings count:", error);
                setListingsCount(0);
            }
        }

        if (user) {
            bookingscount();
            listingscount();
        }
    }, [user]);

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
                                            <span>Bookings</span>
                                            <span className="font-semibold">{bookingsCount || 0}</span>
                                        </div>
                                    </div>
                                    <div className="stats-box">
                                        <div className="flex justify-between">
                                            <span>Listed properties</span>
                                            <span className="font-semibold">{listingsCount || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-2/3">
                        
                                <div className="profile-info">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold">Profile Information</h2>
                                        
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
                            
                        </div>
                    </div>
                </div>
            )}

            {subpage === "places" && <PlacesPage />}
        </div>
    );
}