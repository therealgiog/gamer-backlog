exports.getPanelOwnerInfo = (channelId, helixToken) => {
  let userInfo;
  fetch(`https://api.twitch.tv/helix/users?id=${channelId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': process.env.REACT_APP_CLIENT_ID,
          'Authorization': `Extension ${helixToken}`
         }
      })
      .then(res => res.json())
      .then(data => userInfo = data)
      .catch(e => console.log(e));
    return userInfo;
  }