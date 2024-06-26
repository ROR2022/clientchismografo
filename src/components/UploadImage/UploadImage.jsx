import {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image';

const UploadImage = ({setDataImg}) => {
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const myImg = e.target.files[0];
    setDataImg(myImg);
    setImages((images) => [URL.createObjectURL(myImg)]);
    return URL.revokeObjectURL(myImg);
  };

  const deleteImage = (blob) => {
    setImages(images.filter((x) => x !== blob));
    setDataImg(null);
  };

  useEffect(() => {
   
    // console.log("images:..", images);
    //setDataImg(images)
  }, [images]);

  return (
    <div className=" p-3">
      {images.length === 0 && (
        <div className="button">
          <label className="btn btn-primary">
            <input
              type="file"
              className="visually-hidden"
              onChange={handleChange}
            />
            Upload
          </label>
        </div>
      )}

      {/* <label className="fs-5">Elige tu imagen:</label>
      <input className="ms-auto me-auto d-block my-3" type="file" onChange={handleChange} /> */}

      {images.map((row, index) => (
        <div className="d-flex flex-column align-items-center" key={index}>  
          <img
            style={{ width: "20vw" }}
            className="mb-3 rounded"
            src={row}
            alt={row}
          />
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteImage(row)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

UploadImage.propTypes = {
  setDataImg: PropTypes.func.isRequired
}

export default UploadImage