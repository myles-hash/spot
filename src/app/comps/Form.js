'use client';

import Link from "next/link";
import { useState,useEffect } from "react";
import AddAlbum from "./AddAlbum";

const CLIENT_ID="d4f2b82471934979a5fdc3296de5b02e";
const CLIENT_SECRET="d8981fc6821c4138a5e08ec4ac771350";



export default function Form() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([ ]);
    const [formData, setFormData] =useState({
        album_score: '',
        album_review: ''
      });

      const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    
    useEffect(() => {
        let authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json ())
    .then (data => setAccessToken(data.access_token))
    }, [])

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
        .then(data => { return data.artists.items[0].id})

        console.log("Artist ID is " + artistID);

        let returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=GB&limit=50', searchParameters)
        .then(response => response.json())
        .then(data => {console.log(data); setAlbums(data.items);})

    }

    
    return(
        // <div>
        //     <div>
        //     <form onChange={event => setSearchInput(event.target.value)} onSubmit={search}>
        //         <input placeholder="Search For Artist" type="input" />
        //     </form>
        //     <button onClick={search}>Button</button>
        //     </div>
        //     <div>
        //         <h2>Available Albums:</h2>
        //         <ul>
        //             {albums.map( (album) => {
        //               return (
        //                 <div key={album.id}>
        //                 <img src={`${album.images[0].url}`} />
        //                 <h3>{album.name}</h3>
        //                 <Link href={`${album.external_urls.spotify}`} target="_blank">Play</Link>
        //                 <p>Artist: {album.artists[0].name}</p>
        //                 <AddAlbum album={album} formData={formData} onFormChange={handleFormChange}/>
        //                 </div>
        //               )
        //             })}
        //         </ul>
        //     </div>
        // </div>
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , flexWrap: 'wrap', justifyContent: 'space-around'}}> 
    <div style={{ marginBottom: '20px' }}>
        {/* <form onChange={event => setSearchInput(event.target.value)} onSubmit={search}>
            <input placeholder="Search For Artist" type="input" />
        </form>
        <button onClick={search}>Search</button> */}
        <form style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }} onChange={event => setSearchInput(event.target.value)} onSubmit={search}>
    <input style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }} placeholder="Search For Artist" type="input" />
</form>
<button style={{ padding: '8px 16px', backgroundColor: 'black', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={search}>SEARCH</button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: 'calc(100% - 150px)', alignItems: 'center' , flexWrap: 'wrap' }}>
        <h2 style={{ marginBottom: '10px', width: '100%' }}>Available Albums:</h2>
        <ul style={{ listStyle: 'none', padding: '0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
            {albums.map(album => (
                <div key={album.id} style={{ marginBottom: '20px', border: '3px solid black', padding: '1rem', width: 'calc(25% - 30px)' }}>
                    <img src={`${album.images[0].url}`} style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '10px' }} />
                    <h3 style={{ marginBottom: '5px', textAlign: 'center' }}>{album.name}</h3>
                    <a href={`${album.external_urls.spotify}`} target="_blank" style={{ textDecoration: 'none', color: '#007bff', marginBottom: '5px', display: 'block', textAlign: 'center' }}>Play</a>
                    <p style={{ margin: '0', textAlign: 'center' }}>Artist: {album.artists[0].name}</p>
                    <AddAlbum album={album} formData={formData} onFormChange={handleFormChange} />
                </div>
            ))}
        </ul>
    </div>
</div>


    )
    
}

