import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ListingCard from './ListingCard';

async function fetchUserListings() {
  const user = await axios('/api/user/getCurrentUser');
  console.log(user);
  const res = await axios('/api/listing/getUserListings', {
    params: { userId: user.data.user.id },
  });
  console.log(res);
  return res.data.listings;
}

function ListingBox() {
  const { isLoading, error, data } = useQuery(
    'userListings',
    fetchUserListings
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    return (
      <div className="listingboxMultiview">
        {data.map((listing) => (
          <div key={listing.listing_id}>
            <ListingCard
              title={listing.title}
              artist={listing.artist}
              description={listing.description}
              user={listing.user.username}
              createdAt={listing.createdAt}
              id={listing.listing_id}
              isAdmin={listing.user.isAdmin}
            />
          </div>
        ))}
      </div>
    );
  }
  return <div>Listing box</div>;
}

export default ListingBox;
