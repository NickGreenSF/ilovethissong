import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

// when the viewing user is changed, prepare a set of messages that is only between the current user and the user being viewed

// Things the component only has to do once.
let dataSorted = false;
let initial = false;
// We have to store users we've had messages with.
let users;
// The includes function is used to determine which users we've already seen here.
let userIds;
// The user that we are.
let currentUser;

async function fetchUserMessages() {
  const user = await axios('/api/user/getCurrentUser');
  currentUser = user.data.user.id;
  const res = await axios('/api/message/getUserMessages', {
    params: { userId: currentUser },
  });
  console.log(res);
  return res.data.messages;
}

function changeViewedUser(userId, messages) {
  console.log(messages);
  const m = [];
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    // console.log(messages[i]);
    if (
      messages[i].sender.user_id === userId ||
      messages[i].receiver.user_id === userId
    ) {
      m.push([messages[i].sender.username, messages[i].body, i]);
    }
  }
  return m;
}

function sortData(messages) {
  users = [];
  userIds = [];
  for (let i = 0; i < messages.length; i += 1) {
    // console.log(messages[i]);
    if (
      messages[i].sender.user_id !== currentUser &&
      !userIds.includes(messages[i].sender.user_id)
    ) {
      users.push([messages[i].sender.username, messages[i].sender.user_id]);
      userIds.push(messages[i].sender.user_id);
    } else if (
      messages[i].receiver.user_id !== currentUser &&
      !userIds.includes(messages[i].receiver.user_id)
    ) {
      users.push([messages[i].receiver.username, messages[i].receiver.user_id]);
      userIds.push(messages[i].receiver.user_id);
    }
  }
  console.log(users);
  dataSorted = true;
  return messages;
}

function MessageBox() {
  const { isLoading, error, data } = useQuery(
    'userMessages',
    fetchUserMessages
  );
  const [messages, setMessages] = useState([]);
  if (isLoading || error) {
    return <div>Loading...</div>;
  }
  if (data && !dataSorted) {
    sortData(data);
    return <div>Loading... </div>;
  }
  if (dataSorted) {
    if (!initial) {
      const newMessages = changeViewedUser(users[0][1], data);
      console.log(newMessages);
      setMessages(newMessages);
      initial = true;
    }
    return (
      <div>
        {users.map((user) => (
          <div key={user[1]}>
            <button
              type="button"
              onClick={() => {
                const newMessages = changeViewedUser(user[1], data);
                console.log(newMessages);
                setMessages(newMessages);
              }}
            >
              {user[0]}
            </button>
          </div>
        ))}
        {messages.map((message) => (
          <div key={message[2]}>
            {/* console.log(message) */}
            <div>{message[0]}</div> {message[1]}
          </div>
        ))}
      </div>
    );
  }
}

export default MessageBox;
