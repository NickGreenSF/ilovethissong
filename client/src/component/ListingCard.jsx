/* eslint-disable react/prop-types */
import React from 'react';

function ListingCard({ title, artist, description, user, createdAt }) {
  const datePosted = new Date(createdAt);
  return (
    <div>
      <div>
        <span>{title} </span>
        <span>{artist}</span>
        <span>
          {datePosted.getFullYear()}/{datePosted.getMonth() + 1}/
          {datePosted.getDate()}
        </span>
      </div>
      <span>{description} </span>
      <span>{user} </span>
    </div>
  );
}

export default ListingCard;
