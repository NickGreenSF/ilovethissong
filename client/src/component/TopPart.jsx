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

async function handleLogoutClick() {
  const res = await axios('/api/user/logoutUser');
  console.log(res);
  window.location.href = './';
}

function TopPart() {
  const { data } = useQuery('currentUser', fetchCurrentUser);
  if (data) {
    return (
      <div className="toppartMain">
        <a className="toppartTitle toppartSpan" href="./">
          I Love This Song!{' '}
        </a>
        <span
          role="link"
          tabIndex={0}
          onClick={handleLogoutClick}
          onKeyPress={handleLogoutClick}
          className="toppartSpan toppartText"
        >
          {' '}
          Log out
        </span>
        <a href="./dashboard" className="toppartText toppartA toppartSpan">
          {' '}
          Logged in as {data.username} ({data.notif})
        </a>
        <a href="./listingsubmit" className="toppartText toppartA toppartSpan">
          {' '}
          Create Listing{' '}
        </a>
        <span
          className="toppartText toppartSpan"
          role="link"
          tabIndex={0}
          onClick={handleRandomClick}
          onKeyPress={handleRandomKeyPress}
        >
          View Random Page
        </span>
      </div>
    );
  }
  return (
    <div className="toppartMain">
      <a href="./" className="toppartTitle toppartSpan">
        I Love This Song!{' '}
      </a>
      <a href="./register" className="toppartText toppartA toppartSpan">
        Register{' '}
      </a>
      <a href="./login" className="toppartText toppartA toppartSpan">
        Log In{' '}
      </a>
      <span
        role="link"
        tabIndex={0}
        onClick={handleRandomClick}
        onKeyPress={handleRandomKeyPress}
        className="toppartText toppartSpan"
      >
        View Random Page
      </span>
    </div>
  );
}

export default TopPart;
