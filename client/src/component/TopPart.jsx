import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCurrentUser = async () => {
  const res = await axios('/api/user/getCurrentUser');
  console.log(res);
  return res.data.user;
};

async function handleRandomClick() {
  const res = await axios('/api/listing/getRandomListing');
  console.log(res);
  window.location.href = `./soloview?id=${res.data.listing.listing_id}`;
}

function handleRandomKeyPress() {
  console.log('huh');
  handleRandomClick();
}

function handleLogoutClick() {
  console.log('logout');
}

function TopPart() {
  const { data } = useQuery('currentUser', fetchCurrentUser);
  if (data) {
    return (
      <div>
        <span>I Love This Song! </span>
        <span
          role="link"
          tabIndex={0}
          onClick={handleRandomClick}
          onKeyPress={handleRandomKeyPress}
        >
          View Random Page
        </span>
        <span> Logged in as {data.username}</span>
        <a href="./dashboard"> View Dashboard </a>
        <span
          role="link"
          tabIndex={0}
          onClick={handleLogoutClick}
          onKeyPress={handleLogoutClick}
        >
          {' '}
          Log out
        </span>
      </div>
    );
  }
  return (
    <div>
      <span>I Love This Song! </span>
      <span
        role="link"
        tabIndex={0}
        onClick={handleRandomClick}
        onKeyPress={handleRandomKeyPress}
      >
        View Random Page
      </span>
      <span>Log In </span>
      <span>Register </span>
    </div>
  );
}

export default TopPart;
