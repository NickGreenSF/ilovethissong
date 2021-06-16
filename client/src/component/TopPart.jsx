// So the below eslint-disable is here because triggering the View Random Page button with a key press would interfere with search.
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCurrentUser = async () => {
  const res = await axios('/api/user/getCurrentUser');
  console.log(res);
  return res.data.user;
};

async function handleClick() {
  console.log('you have clicked this!');
  const res = await axios('/api/listing/getRandomListing');
  console.log(res);
  window.location.href = `./soloview?id=${res.data.listing.listing_id}`;
}

function TopPart() {
  const { data } = useQuery('currentUser', fetchCurrentUser);
  if (data) {
    return (
      <div>
        <span>I Love This Song! </span>
        <a role="link" tabIndex={0} onClick={handleClick}>
          View Random Page
        </a>
        <span> Logged in as {data.username}</span>
      </div>
    );
  }
  return (
    <div>
      <span>I Love This Song! </span>
      <span>View Random Page </span>
      <span>Log In </span>
      <span>Register </span>
    </div>
  );
}

export default TopPart;
