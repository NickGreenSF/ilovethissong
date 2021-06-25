import React, { useState } from 'react';
import ListingBox from '../component/ListingBox';
import MessageBox from '../component/MessageBox';

function Dashboard() {
  const [display, setDisplay] = useState('ListingBox');
  const components = { ListingBox, MessageBox };

  const RenderedPage = components[display];
  return (
    <div>
      <div>
        <button type="button" onClick={() => setDisplay('ListingBox')}>
          My Listings
        </button>
        <button type="button" onClick={() => setDisplay('MessageBox')}>
          My Messages
        </button>
      </div>
      <RenderedPage />
    </div>
  );
}

export default Dashboard;
