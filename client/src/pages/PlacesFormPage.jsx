import { useState } from "react";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";

export default function PlacesFormPage() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>

        );
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>

        );
    }
    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests
        };
        await axios.post('/places', placeData);
            setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
    
    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your Place, should be short and catchy as in advertisement')}

                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My Lovely Apt" />
                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />

                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'description of the place')}

                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('Perks', 'select all the perks of your place')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {preInput('ExtraInfo', 'house rules, etc')}

                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                {preInput('Check in&out times', 'Add Check in and out times, remember to have some time window for cleaning the room between guests')}

                <div className="grid gap-2 sm:grid-cols-3">

                    <div>
                        <h3 className="mt-2 -mb-1"> Check in Time</h3>
                        <input type="text"
                            placeholder="14:00"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1"> Check out Time</h3>
                        <input type="text"
                            placeholder="11"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1"> Max no. of guests</h3>
                        <input type="number"
                            min={1}
                            // max={100}
                            value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)}
                        />
                    </div>

                </div>
                <div>
                    <button className="primary my-4">
                        Save

                    </button>
                </div>
            </form>
        </div>

    )
}