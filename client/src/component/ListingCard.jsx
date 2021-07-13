/* eslint-disable react/prop-types */
import React from 'react';

function ListingCard({
  title,
  artist,
  description,
  user,
  createdAt,
  id,
  isAdmin,
}) {
  let d = description;
  if (description.length > 100) {
    d = description.substring(0, 100);
    d += '...';
  }
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
        <h4 className="listingcardDesc">{d} </h4>
        <span className="listingcardUser">
          posted by{' '}
          {isAdmin ? (
            <span className="admin"> {user} [A]</span>
          ) : (
            <span> {user}</span>
          )}
        </span>
        <span className="listingcardDate">
          {datePosted.getFullYear()}/{datePosted.getMonth() + 1}/
          {datePosted.getDate()}
        </span>
      </div>
    </div>
  );
}

export default ListingCard;
