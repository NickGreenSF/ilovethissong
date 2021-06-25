import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

let spotResult;
let thisUser = false;
let isUser;
let currentUser;

async function deleteListing(id) {
  const res = await axios('/api/listing/deleteListing', {
    params: { listingId: id },
  });
  console.log(res);
}

const fetchListing = async () => {
  const url = String(document.URL);
  const idStr = url.split('=');
  const id = parseInt(idStr[1]);
  if (!id) {
    return;
  }
  const user = await axios('/api/user/getCurrentUser');
  console.log(user);
  currentUser = user;
  const res = await axios('/api/listing/getListingByID', {
    params: {
      listingId: id,
    },
  });
  console.log(res);
  if (res.data.listing.user.user_id) {
    isUser = [res.data.listing.user.username, res.data.listing.user.user_id];
  }
  console.log(isUser);
  if (res.data.listing.user.user_id === user.data.user.id) {
    thisUser = true;
    console.log('this user made this');
  }
  let search = `${res.data.listing.title} ${res.data.listing.artist}`;
  search = search.toLowerCase();
  const result = await axios('/api/spotify/searchForSong', {
    params: { searchTerm: search },
  });
  console.log(result);
  if (result.data.song.items.length === 0) {
    return res.data.listing;
  }
  // spotResult = result;
  const spotUrlString = result.data.song.items[0].external_urls.spotify;
  const twoUrlStrings = spotUrlString.split('.com/');
  spotResult = `${twoUrlStrings[0]}.com/embed/${twoUrlStrings[1]}`;
  // spotResult = embedUrlString;
  return res.data.listing;
};

function SoloView() {
  const { isLoading, error, data } = useQuery('listing', fetchListing);
  const { register, handleSubmit, errors } = useForm({
    criteriaMode: 'all',
  });
  const [show, setShow] = useState(false);
  const history = useHistory();
  function handleShow() {
    setShow(true);
  }
  function handleHide() {
    setShow(false);
  }
  async function onSubmit(formData) {
    // console.log(formData);
    if (!currentUser) {
      alert('You must log in to submit listings.');
      return;
    }
    if (currentUser.data.user.banned) {
      alert('You are banned and cannot submit listings.');
    }
    axios({
      method: 'post',
      url: '/api/message/postMessage',
      data: {
        messageBody: formData.body,
        senderId: currentUser.data.user.id,
        receiverId: isUser[1],
      },
    }).then(alert('Message successfully sent'), setShow(false));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!data) {
    return <div>no listing</div>;
  }
  if (!spotResult) {
    return (
      <div>
        <div>{data.title}</div>
        <div>{data.artist}</div>
        <div>{data.description}</div>
      </div>
    );
  }
  // https://open.spotify.com/embed/track/0939D7aT18uBDS2MTjWzct?si=1c5a782b422d495f
  return (
    <div>
      <Modal show={show} onHide={handleHide}>
        <div>To: {isUser[0]}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <span>Message: </span>
            <input
              name="body"
              className="form-control"
              placeholder=""
              ref={register({
                required: 'Empty messages are not allowed.',
                maxLength: {
                  value: 400,
                  message: 'Your message is too long.',
                },
              })}
            />
            {errors.body && <p>{errors.body.message}</p>}
          </div>
          <button type="submit">Send</button>
        </form>
      </Modal>
      <div>{data.title}</div>
      <div>{data.artist}</div>
      <div>{data.description}</div>
      <iframe
        title="song"
        src={spotResult}
        width="600"
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      />
      <br />
      {isUser && !thisUser ? (
        <button type="button" onClick={handleShow}>
          Message User
        </button>
      ) : null}
      {thisUser ? (
        <span
          role="link"
          tabIndex={0}
          onClick={() => {
            deleteListing(data.listing_id)
              .then(alert('deleted'), history.push('/'))
              .catch((e) => {
                alert('failed to delete');
              });
          }}
          onKeyPress={() => {
            deleteListing(data.listing_id)
              .then(alert('deleted'), history.push('/'))
              .catch((e) => {
                alert('failed to delete');
              });
          }}
        >
          DELETE LISTING
        </span>
      ) : null}
    </div>
  );
}

export default SoloView;
