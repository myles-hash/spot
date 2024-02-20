import { sql } from "@vercel/postgres"

export default async function AlbumsDB() {

    const dbAlbums = await sql `SELECT * FROM albums`;

  return (
    <div>
      <ul>
        {dbAlbums.rows.map((dbalbum) => {
            <li key ={dbalbum.album_id}>{dbalbum.album_name}</li>
        })}
      </ul>
    </div>
  )
}
