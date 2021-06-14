import React from 'react';
// import { useQuery } from 'react-query';
// import axios from 'axios';

// const fetchCurrentUser = async () => {
//   const res = await axios('/api/user/getCurrentUser');
//   console.log(res);
//   return res.data;
// };

// const searchTest = async () => {
//   const res = await axios('/api/listing/searchListings', {
//     params: { search: 'king' },
//   });
//   console.log(res);
// };

function TopPart() {
  // This is a tester function for the backend connection. It works, so I don't need this anymore.
  // console.log('top part');
  // const { isLoading, data } = useQuery('currentUser', fetchCurrentUser);
  // if (!isLoading) {
  //   const uId = data.user.id;
  //   const submit = async () => {
  //     const submitRes = await axios.post('/api/user/banUser', {
  //       userId: uId,
  //     });
  //     console.log(submitRes);
  //   };
  //   submit();
  // }

  // const onSubmit = async () => {
  //   const submitRes = await axios.post('/api/user/logoutUser', {});
  //   console.log(submitRes);
  // };

  // const onSubmit = async () => {
  //   const submitRes = await axios.post('/api/user/loginUser', {
  //     username: 'fetty',
  //     password: 'heyhihello',
  //   });
  //   console.log(submitRes);
  // };

  // const onSubmit = async () => {
  //   const submitRes = await axios.post('/api/listing/postListing', {
  //     userId: 1,
  //     title: 'king',
  //     artist: 'king',
  //     description: 'o u know that song',
  //   });
  //   console.log(submitRes);
  // };

  // const onSubmit = async () => {
  //   const submitRes = await axios.post('/api/user/registerUser', {
  //     username: 'oui',
  //     password: 'hyes',
  //   });
  //   console.log(submitRes);
  // };

  // onSubmit();
  // searchTest();

  return (
    <div>
      <span>I Love This Song!</span>
      <span>Log In</span>
      <span>Register</span>
      <span>View Random Page</span>
    </div>
  );
}

export default TopPart;
