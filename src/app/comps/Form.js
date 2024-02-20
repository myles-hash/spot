'use client';

const CLIENT_ID = "d4f2b82471934979a5fdc3296de5b02e";
const CLIENT_SECRET = "d8981fc6821c4138a5e08ec4ac771350";

import Image from "next/image";
import Link from "next/link";
import { useState,useEffect } from "react";

export default function Form() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([ ]);
    
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
        <div>
            <div>
            <form onChange={event => setSearchInput(event.target.value)} onSubmit={search}>
                <input placeholder="Search For Artist" type="input" />
            </form>
            <button onClick={search}>Button</button>
            </div>
            <div>
                <h2>Albums</h2>
                <ul>
                    {albums.map( (album, i) => {
                      return (
                        <div key={album.id}>
                        <img src={`${album.images[0].url}`} />
                        <h3>{album.name}</h3>
                        <Link href={`${album.external_urls.spotify}`}>Play</Link>
                        </div>
                      )
                    })}
                </ul>
            </div>
        </div>
    )
    
}