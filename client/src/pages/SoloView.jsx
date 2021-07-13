import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

let spotResult;
let thisUser = false;
// isUser contains the username, userId, and admin status of the user that posted this listing.
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
  currentUser = user.data.user;
  const res = await axios('/api/listing/getListingByID', {
    params: {
      listingId: id,
    },
  });
  console.log(res);
  if (res.data.listing.user.user_id) {
    isUser = [
      res.data.listing.user.username,
      res.data.listing.user.user_id,
      res.data.listing.user.isAdmin,
    ];
  }
  console.log(isUser);
  if (user.data.user && res.data.listing.user.user_id === user.data.user.id) {
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
    if (currentUser.banned) {
      alert('You are banned and cannot submit listings.');
    }
    axios({
      method: 'post',
      url: '/api/message/postMessage',
      data: {
        messageBody: formData.body,
        senderId: currentUser.id,
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
  return (
    <div className="soloview">
      <Modal className="soloviewModal" show={show} onHide={handleHide}>
        <div className="soloviewFormText">To: {isUser[0]}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="soloviewFormText form-group">
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
          <button className="soloviewMsgSendBtn" type="submit">
            Send
          </button>
        </form>
      </Modal>
      <div>
        <span className="soloviewTitle">{data.title}</span>
        {spotResult ? (
          <span className="soloviewEmbed">
            <iframe
              title="song"
              src={spotResult}
              width="600"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />
          </span>
        ) : null}
      </div>
      <div className="soloviewArtist"> by {data.artist}</div>
      <div className="soloviewDesc">{data.description}</div>
      <div>
        <span className="soloviewUser">
          Posted by
          {isUser[2] ? (
            <span className="admin"> {isUser[0]} [A]</span>
          ) : (
            <span> {isUser[0]}</span>
          )}
        </span>
        {currentUser && isUser && !thisUser ? (
          <button
            className="soloviewMessageBtn"
            type="button"
            onClick={handleShow}
          >
            Message User
          </button>
        ) : null}
        {thisUser || (currentUser && currentUser.admin) ? (
          <button
            type="button"
            className="soloviewDeleteBtn"
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
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default SoloView;
