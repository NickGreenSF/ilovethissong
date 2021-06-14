import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchListing = async () => {
  const res = await axios('/api/listing/getListingByID', {
    params: {
      listingId: 1,
    },
  });
  console.log(res);
  return res.data.listing;
};

function SoloView() {
  const { isLoading, error, data } = useQuery('listing', fetchListing);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div>{data.title}</div>
      <div>{data.artist}</div>
      <div>{data.description}</div>
    </div>
  );
}

export default SoloView;
