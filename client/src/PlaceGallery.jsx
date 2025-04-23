import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import Image from './Image.jsx'
export default function PlaceGallery({ passplace }) {
    const place = useMemo(() => passplace, [passplace]);

    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className="fixed inset-0 bg-black text-white z-50 overflow-y-auto scrollbar-hide">
                <div className="p-4 md:p-8 pb-16">
                    {/* Header section */}
                    <div className="flex justify-between items-center mb-8 sticky top-0 bg-black py-4 z-10">
                        <h2 className="text-2xl font-medium">Photos of {place.title}</h2>
                        <button
                            onClick={() => setShowAllPhotos(false)}
                            className="flex items-center gap-1 py-2 px-4 rounded-full bg-white text-black hover:bg-gray-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                            Close photos
                        </button>
                    </div>

                    {/* Photos container */}
                    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                        {place?.photos?.length > 0 ? (
                            place.photos.map((photo, index) => (
                                <div key={index} className="w-full mb-6">
                                    <Image
                                        src={photo}
                                        alt={`Photo ${index + 1} of ${place.title}`}
                                        className="w-full object-contain rounded-lg max-h-[85vh]"
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <p>No photos available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden h-[500px]">
                {/* Left column - large single image */}
                <div className="h-full">
                    {place.photos?.[0] && (
                        <Image
                            onClick={() => setShowAllPhotos(true)}
                            className="cursor-pointer w-full h-full object-cover"
                            src={place.photos[0]}
                            alt=""
                        />
                    )}
                </div>

                {/* Right column - two stacked images */}
                <div className="grid grid-rows-2 gap-2 h-full">
                    {/* Top right image */}
                    <div>
                        {place.photos?.[1] && (
                            <Image
                                onClick={() => setShowAllPhotos(true)}
                                className="cursor-pointer w-full h-full object-cover"
                                src={place.photos[1]}
                                alt=""
                            />
                        )}
                    </div>
                    {/* Bottom right image */}
                    <div>
                        {place.photos?.[2] && (
                            <Image
                                onClick={() => setShowAllPhotos(true)}
                                className="cursor-pointer w-full h-full object-cover"
                                src={place.photos[2]}
                                alt=""
                            />
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>
                Show more photos
            </button>
        </div>
    );
}

PlaceGallery.propTypes = {
    passplace: PropTypes.shape({
        title: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

PlaceGallery.defaultProps = {
    passplace: {
        title: "Unknown Place",
        photos: [],
    },
};
