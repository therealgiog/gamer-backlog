import React, { useState, useEffect } from "react";
import './Panel.css';
import SelectList from "./SelectList";
import CreateListForm from "./CreateListForm";
import AddGameForm from "./AddGameForm";
import GameList from "./GameList";

const twitch = window.Twitch.ext;

function Panel() {
  const [panelOwnerInfo, setPanelOwnerInfo] = useState({displayName: "", id: "", login: ""});
  const [viewerId, setViewerId] = useState('');
  const [isViewerOwner, setIsViewerOwner] = useState(false);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [games, setGames] = useState([]);

  function authorizeTwitch () {
    twitch.onAuthorized(async (auth) => {
      try {
        //Get and set the userInfo in which the Panel extension was installed on
        const response = await fetch(`https://api.twitch.tv/helix/users?id=${auth.channelId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Client-Id': process.env.REACT_APP_CLIENT_ID,
            'Authorization': `Extension ${auth.helixToken}`
          }
        });
        const data = await response.json();
        setPanelOwnerInfo({...panelOwnerInfo, displayName: data.data[0].display_name, id: data.data[0].id, login: data.data[0].login});

        //Get and set the id of the viewer of the extension
        setViewerId(twitch.viewer.opaqueId);

      } catch (error) {
        console.error(error);

      }
    });
  }

  //Sets whether the viewer of the extension is also the owner of the extension.
  function checkViewerOwner () {
    if (viewerId.substring(1) === panelOwnerInfo.id) {
      setIsViewerOwner(true);
    }
  }

  //Gets and sets all the lists the broadcaster has.
  async function loadLists () {
    try {
      const response = await fetch(`http://localhost:4000/api/${panelOwnerInfo.id}/lists`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.error();
    }
  }

  async function loadGames () {
    try {
      const response = await fetch(`http://localhost:4000/api/${panelOwnerInfo.id}/lists/${selectedList}/games`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error();
    }
  }

  const handleSelect = (selectedValue) => {
    setSelectedList(selectedValue);
  };

  const handleCreateList = async (listName) => {
    const lowerCaseListName = listName.toLowerCase();
    if (lists.find(list => list.listName.toLowerCase() === lowerCaseListName)) {
      //let user know the list already exist
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/${panelOwnerInfo.id}/lists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          listName: listName
        })
      });
      const data = await response.json();
      setLists([...lists, data]);

    } catch (error) {
      console.error();
    }
  };

  const handleAddGame = async (gameTitle) => {
    const lowerCaseGameTitle = gameTitle.toLowerCase();
    if (games.find(game => game.title.toLowerCase() === lowerCaseGameTitle)) {
      //let user know the game already exist
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/${panelOwnerInfo.id}/lists/${selectedList}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gameTitle: gameTitle
        })
      });
      const data = await response.json();
      setGames([...games, data]);

    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    authorizeTwitch();
    console.log("Panel Owner Info", panelOwnerInfo);
  },[]);

  useEffect(() => {
    if (viewerId) {
      checkViewerOwner();
      console.log("Is Viewer Owner", isViewerOwner);
    }
  },[viewerId]);

  useEffect(() => {
    if (panelOwnerInfo.id) {
      loadLists();
      console.log("Lists", lists);
    }
  },[panelOwnerInfo]);

  useEffect(() => {
    if (selectedList) {
      loadGames();
      console.log("Games", games);
    }
  },[selectedList]);

  return (
    <div className="Panel">
      <h2 id="header">{panelOwnerInfo.displayName} Gamer Lists</h2>
      <SelectList lists={lists} onSelect={handleSelect} />
      <CreateListForm onCreateList={handleCreateList}/>
      {selectedList && (
        <>
          <h2 id="list-header">{selectedList} List</h2>
          <AddGameForm onAddGame={handleAddGame}/>
          <GameList gameList={games} />
        </>
      )}

    </div>
  );
}

export default Panel;
