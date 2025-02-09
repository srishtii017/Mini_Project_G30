import PropTypes from "prop-types";
export default function Image({ src, ...rest }) {
    src = src && src.includes('http://')
        ? src
        : 'http://localhost:4000/uploads/' + src;
    return (
        <img {...rest} src={src} alt={''} />
    );
}

Image.propTypes = {
    src: PropTypes.string.isRequired, // src should be a string and is required
    alt: PropTypes.string,            // alt is optional but should be a string
};