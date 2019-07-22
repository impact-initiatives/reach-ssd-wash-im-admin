import React from 'react';
import Img from 'gatsby-image';

import exports from '../config/exports';

const getImage = (images: any, name: string) =>
  images.find(image => image.node.fluid.originalName === name);

const MapsPage = ({ images }) => {
  return (
    <nav className="columns is-multiline">
      {exports.maps.map((map, index) => (
        <div
          className="column is-one-quarter"
          style={{ display: 'flex' }}
          key={index}
        >
          <div className="card">
            <a className="card-image" href={map.url}>
              <Img
                fluid={{
                  ...getImage(images, map.img).node.fluid,
                  aspectRatio: 4 / 3,
                }}
                alt="Placeholder image"
              />
            </a>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{map.title}</p>
                </div>
              </div>
              <div className="content">{map.description}</div>
            </div>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default MapsPage;
