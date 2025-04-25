import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get('/bookings').then(response => {
            setBookings(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to fetch bookings:", error);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <AccountNav />
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <AccountNav />

            <h1 className="text-3xl  mb-6">Your Bookings</h1>

            {bookings.length === 0 && (
                <div className="bg-gray-100 p-8 rounded-2xl text-center">
                    <h2 className="text-xl font-medium text-gray-600 mb-4">You do not have any bookings yet</h2>
                    <Link to="/" className="bg-primary text-white py-2 px-6 rounded-full font-medium hover:bg-opacity-90 transition">
                        Start exploring places
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {bookings?.length > 0 && bookings.map((booking, index) => (
                    <Link
                        to={`/account/bookings/${booking._id}`}
                        key={index}
                        className="flex flex-col md:flex-row gap-4 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                    >
                        <div className="md:w-48 h-48 md:h-auto relative">
                            <PlaceImg place={booking.place} className="object-cover w-full h-full" />
                        </div>
                        <div className="p-4 md:py-3 md:pr-3 grow">
                            <h2 className="text-xl  mb-2">{booking.place.title}</h2>
                            <BookingDates
                                booking={booking}
                                className="mb-3 text-gray-600"
                            />
                            <div className="flex items-center gap-2 mt-4 text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                </svg>
                                <span className="text-xl font-medium">
                                    Total price: <span className="text-primary font-bold">${booking.price}</span>
                                </span>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <span className="bg-primary bg-opacity-10 text-white px-4 py-1 rounded-full text-sm font-medium">
                                    View details →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}