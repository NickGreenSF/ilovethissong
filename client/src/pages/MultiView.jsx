import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import ListingCard from '../component/ListingCard';

let term;
let lastId;
let moreData = true;

async function searchListings(lId) {
  moreData = false;
  console.log(lId);
  const url = String(document.URL);
  const idStr = url.split('=');
  [, term] = idStr;
  if (!term) {
    const res = await axios('/api/listing/getRecentListings', {
      params: {
        listingId: lId,
      },
    });
    console.log(res);
    if (res.data.listings.length > 0) {
      lastId = res.data.listings[res.data.listings.length - 1].listing_id;
    }
    const r = res.data.listings;
    if (r.length === 6) {
      moreData = true;
      r.pop();
    }
    return r;
  }
  term = decodeURI(term);
  console.log(term);
  const result = await axios('/api/listing/searchListings', {
    params: {
      search: term,
      listingId: lId,
    },
  });
  // console.log(result);
  if (result.data.listings.length > 0) {
    lastId = result.data.listings[result.data.listings.length - 1].listing_id;
  }
  const re = result.data.listings;
  console.log(re);
  if (re.length === 3) {
    moreData = true;
    re.pop();
    console.log(re);
  }
  return re;
}

function MultiView() {
  const { isLoading, error, data } = useQuery(100000000, searchListings);
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

  function loadFunc() {
    console.log('trying to load more');
    if (data && moreData) {
      moreData = false;
      // data.push({ user: { username: null, isAdmin: null } });
      searchListings(lastId).then((d) => {
        console.log(d);
        for (let i = 0; i < d.length; i += 1) {
          data.push(d[i]);
        }
        if (term) {
          history.push(`/?t=${term}`);
        } else {
          history.push('/');
        }
      });
    }
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
  // console.log('rerender');
  // moreData = true;
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
      <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore>
        {data.map((listing) => (
          <div className="multiviewCard" key={listing.listing_id}>
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
      </InfiniteScroll>
    </div>
  );
}

export default MultiView;
