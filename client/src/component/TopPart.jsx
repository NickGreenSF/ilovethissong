import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCurrentUser = async () => {
  const res = await axios('/api/user/getCurrentUser');
  console.log(res);
  return res.data.user;
};

function TopPart() {
  const { data } = useQuery('currentUser', fetchCurrentUser);
  if (data) {
    return (
      <div>
        <span>I Love This Song! </span>
        <span>View Random Page </span>
        <span>Logged in as {data.username}</span>
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
