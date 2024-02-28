'use client';

import { useState, useEffect } from "react";
import AddAlbum from "./AddAlbum";

const CLIENT_ID="d4f2b82471934979a5fdc3296de5b02e";
const CLIENT_SECRET="d8981fc6821c4138a5e08ec4ac771350";



export default function Form() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [artistSuggestions, setArtistSuggestions] = useState([]);
    const [albums, setAlbums] = useState([ ]);
    const [albumTracks, setAlbumTracks] = useState([ ]);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [formData, setFormData] =useState({
        album_score: '',
        album_review: '',
        fav_track: ''
      });

    
  useEffect(() => {
    let authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
    async function fetchData() {
    const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
    const data = await response.json();
    setAccessToken(data.access_token);
    }
    fetchData();
    }, []);

  
    useEffect(() => {
      // Fetch artist suggestions when searchInput changes
      async function fetchArtistSuggestions() {
        if (searchInput.trim() !== "") {
          let searchParameters = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          };
  
          const response = await fetch(
            "https://api.spotify.com/v1/search?q=" +
              searchInput +
              "&type=artist",
            searchParameters
          );
          const data = await response.json();
          setArtistSuggestions(data.artists.items);
        } else {
          // Clear suggestions if searchInput is empty
          setArtistSuggestions([]);
        }
      }
  
      fetchArtistSuggestions();
    }, [searchInput, accessToken]);
  



    async function search() {
        console.log("Search for " + searchInput);

        let searchParameters = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
            }

        }


        let artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
        .then(response => response.json())
        .then(data => {
          return data.artists.items[0].id;
      });


        console.log("Artist ID is " + artistID);


        let returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=GB&limit=50', searchParameters)
        .then(response => response.json())
        .then(data => {console.log("This", data.items[0].id); setAlbums(data.items);})



    }

    async function fetchTracks(albumId) {
        let tracks = await fetch(
          `https://api.spotify.com/v1/albums/${albumId}/tracks`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Tracks for album with ID", albumId, ":", data.items);
            setAlbumTracks(data.items);
              setSelectedAlbumId(albumId);
          })
          .catch((error) => {
            console.error("Error fetching tracks:", error);
          });

        
      }

      const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      console.log(artistSuggestions)
    
    return(
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , flexWrap: 'wrap', justifyContent: 'space-around'}}> 
    <div style={{ marginBottom: '20px' }}>
        <form style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }} onChange={event => setSearchInput(event.target.value)} onSubmit={(e) => { e.preventDefault(); search(); }}>
    <input style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }} placeholder="Search For Artist" type="input" />
</form>
<button style={{ padding: '8px 16px', backgroundColor: 'black', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={search}>SEARCH</button>
<ul style={{ listStyle: "none", padding: "0" }}>
          {artistSuggestions.map((artist) => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ul>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: 'calc(100% - 150px)', alignItems: 'center' , flexWrap: 'wrap' }}>
        <h2 style={{ marginBottom: '10px', width: '100%' }}>Available Albums:</h2>
        <ul style={{ listStyle: 'none', padding: '0', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
            {albums.map(album => (
                <div key={album.id} style={{ marginBottom: '20px', border: '3px solid black', padding: '1rem', width: 'calc(25% - 30px)' }}>
                    <img src={`${album.images[0].url}`} style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '10px' }} />
                    <h3 style={{ marginBottom: '5px', textAlign: 'center' }}>{album.name}</h3>
                    <a href={`${album.external_urls.spotify}`} target="_blank" style={{ textDecoration: 'none', color: '#007bff', marginBottom: '5px', display: 'block', textAlign: 'center' }}>Play</a>
                    <p style={{ margin: '0', textAlign: 'center' }}>Artist: {album.artists[0].name}</p>
                    <button onClick={() => fetchTracks(album.id)}>View Tracks</button>
                    {selectedAlbumId === album.id && (
                <select
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  style={{ padding: '8px', width: '100%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                >
                  <option> Select a favorite track</option>
                  {albumTracks.map((track) => (
                    <option key={track.id} value={track.name}>
                      {track.name}
                    </option>
                  ))}
                </select>
              )}
                    <AddAlbum album={album} formData={formData} onFormChange={handleFormChange} fav_track={selectedTrack}/>
                </div>
            ))}
        </ul>
    </div>
</div>


    )
    
}