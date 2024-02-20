import { sql } from "@vercel/postgres"
import Link from "next/link";


export default async function DataBase() {
    const dbAlbums = await sql `SELECT * FROM albums`;

  return (
    <div>
        <h1>STORED ALBUMS</h1>
         <ul>
                    {dbAlbums.rows.map( (dbAlbum) => {
                      return (
                        <div key={dbAlbum.album_id}>
                        <img src={`${dbAlbum.album_image_url}`} />
                        <h3>{dbAlbum.album_name}</h3>
                        <Link href={`${dbAlbum.spotify_link}`}>Play</Link>
                        <p>Artist: {dbAlbum.album_artist}</p>
                        </div>
                      )
                    })}
                </ul>
    </div>
  )
}
