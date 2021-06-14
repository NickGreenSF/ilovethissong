import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import ListingCard from '../component/ListingCard';

const fetchRecentListings = async () => {
  const result = await axios('/api/listing/getRecentListings');
  console.log(result);
  return result.data.listings;
};

function MultiView() {
  const { isLoading, error, data } = useQuery(
    'fetchListings',
    fetchRecentListings
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      {data.map((listing) => (
        <div key={listing.listing_id}>
          <ListingCard
            title={listing.title}
            artist={listing.artist}
            description={listing.description}
            user={listing.user.username}
          />
        </div>
      ))}
    </div>
  );
}

export default MultiView;
