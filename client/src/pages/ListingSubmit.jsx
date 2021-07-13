import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function ListingSubmit() {
  const { register, handleSubmit, errors, setError } = useForm({
    criteriaMode: 'all',
  });
  // useHistory handles reroutes!
  const history = useHistory();

  const onSubmit = async (formData) => {
    // console.log(formData);
    const res = await axios('/api/user/getCurrentUser');
    console.log(res);
    if (!res.data.user) {
      alert('You must log in to submit listings.');
      return;
    }
    if (res.data.user.banned) {
      alert('You are banned and cannot submit listings.');
      return;
    }
    // const listingRes = await axios.post('/api/listing/postListing', {
    //   title: formData.title,
    //   artist: formData.artist,
    //   userId: res.data.user.id,
    //   description: formData.description,
    // });
    // console.log(listingRes);
    // history.push('/');
    axios({
      method: 'post',
      url: '/api/listing/postListing',
      data: {
        title: formData.title,
        artist: formData.artist,
        userId: res.data.user.id,
        description: formData.description,
      },
    })
      .then((result) => {
        console.log(result);
        // redirects to the page of the listing just created.
        history.push(`/soloview?id=${result.data.listing.id}`);
      })
      .catch((e) => {
        if (e.response.data.errors[0]) {
          setError(e.response.data.errors[0].field, {
            type: 'manual',
            message: e.response.data.errors[0].message,
          });
          console.log(e.response.data);
          console.log(errors);
        }
      });
  };

  return (
    <div className="page createListing">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <span>What's your favorite song right now?</span>
          <input
            name="title"
            className="form-control"
            placeholder="Title"
            ref={register({
              required: 'Please title your listing',
              maxLength: {
                value: 400,
                message: 'Your title is too long.',
              },
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <span>Who made it?</span>
          <input
            name="artist"
            className="form-control"
            placeholder="Artist"
            ref={register({
              required: 'Please submit an artist',
              maxLength: {
                value: 400,
                message: 'Your artist is too long.',
              },
            })}
          />
          {errors.artist && <p>{errors.artist.message}</p>}
        </div>

        <div className="form-group">
          <span>What do you love about this song?</span>
          <Form.Control
            as="textarea"
            className="form-control"
            placeholder="Description"
            name="description"
            ref={register({
              maxLength: {
                value: 3000,
                message: 'Your description is too long.',
              },
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className="listingsubmitBtns">
          <button type="submit" className="btn btn-primary btn-block">
            Submit for approval
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ backgroundColor: 'red' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListingSubmit;
