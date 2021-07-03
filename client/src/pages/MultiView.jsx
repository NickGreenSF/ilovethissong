import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import ListingCard from '../component/ListingCard';

let term;

async function searchListings() {
  const url = String(document.URL);
  const idStr = url.split('=');
  [, term] = idStr;
  if (!term) {
    const res = await axios('/api/listing/getRecentListings');
    console.log(res);
    return res.data.listings;
  }
  term = decodeURI(term);
  console.log(term);
  const result = await axios('/api/listing/searchListings', {
    params: {
      search: term,
    },
  });
  console.log(result);
  return result.data.listings;
}

function MultiView() {
  const { isLoading, error, data } = useQuery('fetchListings', searchListings);
  const [search, setSearch] = useState('');
  const history = useHistory();

  function handleSearch(e) {
    e.preventDefault();
    console.log(search);
    history.push(`/?t=${search}`);
    history.go(0);
  }

  function setSearchTerm(e) {
    setSearch(e.target.value);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!data) {
    return (
      <div>
        <ListingCard title="no results" />
      </div>
    );
  }
  return (
    <div className="multiview">
      <form onSubmit={handleSearch}>
        <input
          className="multiviewSearch"
          type="text"
          defaultValue={term}
          onChange={setSearchTerm}
        />
      </form>
      {data.map((listing) => (
        <div className="multiviewCard" key={listing.listing_id}>
          <ListingCard
            title={listing.title}
            artist={listing.artist}
            description={listing.description}
            user={listing.user.username}
            createdAt={listing.createdAt}
            id={listing.listing_id}
          />
        </div>
      ))}
    </div>
  );
}

export default MultiView;
