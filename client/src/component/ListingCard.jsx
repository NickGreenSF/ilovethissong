/* eslint-disable react/prop-types */
import React from 'react';

function ListingCard({ title, artist, description, user, createdAt, id }) {
  const datePosted = new Date(createdAt);
  return (
    <div className="listingcard">
      <div className="listingcardMargins">
        <h1>
          <a className="listingcardTitle" href={`../soloview?id=${id}`}>
            {title}{' '}
          </a>
        </h1>
        <h3 className="listingcardArtist">by {artist}</h3>
        <h4 className="listingcardDesc">{description} </h4>
        <span className="listingcardUser">posted by {user} </span>
        <span className="listingcardDate">
          {datePosted.getFullYear()}/{datePosted.getMonth() + 1}/
          {datePosted.getDate()}
        </span>
      </div>
    </div>
  );
}

export default ListingCard;
