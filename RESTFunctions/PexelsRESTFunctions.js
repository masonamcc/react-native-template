// export async function fetchPexelsSearch(query, perPage = 10) {
//     try {
//         const response = await fetch(
//             `http://localhost:9090/pexels/search?query=${encodeURIComponent('Trees')}&perPage=${perPage}`
//         );
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data;  // JSON data from your API
//     } catch (error) {
//         console.error('Error fetching Pexels data:', error);
//         return null;
//     }
// }
