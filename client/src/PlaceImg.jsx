import PropTypes from "prop-types";
export default function PlaceImg({ place , index=0 , className = null }) {
    if(!place.photos?.length){
        return '';
    }
    if(!className){
        className='object-cover ';
    }
    return (
   
            <img className={className} src={'http://localhost:4000/uploads/' + place.photos[index]} alt="" />
        
    );
}

PlaceImg.propTypes = {
    place: PropTypes.shape({
        title: PropTypes.string,
        photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    index: PropTypes.number,
    className: PropTypes.string,
};

PlaceImg.defaultProps = {
    place: {
        title: 'Unknown Place',
        photos: [],
    },
    index: 0,
    className: 'object-cover',
};