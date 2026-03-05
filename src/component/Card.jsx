import React from 'react';
import { useContext } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { productContext } from '../context/Products';

function Card({ data }) {
let {back_URL} = useContext(productContext)
  return (
    <>
      <h1>{data.name}</h1>

      {/* React Image Magnify Component */}
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: `Image of ${data.name}`,
           
            src: `${back_URL}/uploads/${data.image}`,
            width: 200,
            height: 200,
          },
          largeImage: {
            src: `${back_URL}/uploads/${data.image}`,
            width: 500,
            height: 800,
          },
        }}
      />
    </>
  );
}

export default Card;
