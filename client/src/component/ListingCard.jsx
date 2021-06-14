/* eslint-disable react/prop-types */
import React from 'react';

function ListingCard({ title, artist, description, user }) {
  return (
    <div>
      <span>{title}</span>
      <span>{artist}</span>
      <span>{description}</span>
      <span>{user}</span>
    </div>
  );
}

export default ListingCard;
