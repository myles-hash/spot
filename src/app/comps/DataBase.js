import { sql } from "@vercel/postgres"
import Link from "next/link";


export default async function DataBase() {
    const dbAlbums = await sql `SELECT * FROM albums`;

    console.log("SAVED ALBUMS", dbAlbums);

  return (
    <div>
        <h1>SAVED ALBUMS:</h1>
         <ul>
                    {dbAlbums.rows.map( (dbAlbum) => {
                      return (
                        <div className="albumContainer" key={dbAlbum.album_id}>
                        <img src={`${dbAlbum.album_image_url}`} />
                        <h3>{dbAlbum.album_name}</h3>
                        <Link href={`${dbAlbum.spotify_link}`}>Play</Link>
                        <p>Artist: {dbAlbum.album_artist}</p>
                        <p>Score: {dbAlbum.album_score}</p>
                        <p>Review: {dbAlbum.album_review}</p>
                        </div>
                      )
                    })}
                </ul>
    </div>
  )
}
