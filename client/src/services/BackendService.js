// exports.fetchLists = async () => {
//   try {
//     const response = await fetch(`http://localhost:4000/${twitchId}/lists`);
//     if (response.ok) {
//       const lists = await response.json();
//       setLists(lists);
//     } else {
//       console.error('Failed to fetch lists:', response.status);
//     }
//   } catch (error) {
//     console.error('Failed to fetch lists:', error);
//   }
// };