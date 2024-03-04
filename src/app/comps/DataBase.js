import { sql } from "@vercel/postgres";
import Link from "next/link";



export default async function DataBase({ searchParams}) {
  let sortOrder = "DESC"; 


  if (searchParams.sort === "desc") {
      sortOrder = "ASC";
  }


  const queryString = `SELECT * FROM reviews ORDER BY album_score ${sortOrder}`;


  const dbAlbums = await sql.query(queryString);


    return (
        <div className="albumsContainer">
            <h1>SAVED ALBUMS</h1>
            <button className="saved-albums-button">
            <Link href="/?sort=asc" className="saved-albums-link">Sort By Highest Rating</Link>
            </button>
            <br />
            <br />  
            <button className="saved-albums-button">
            <Link href="/?sort=desc" className="saved-albums-link">Sort By Lowest Rating</Link>
            </button>
          <br />
          <br />
          <br />
          <br />
            <div className="albumGrid">
                {dbAlbums.rows.map((dbAlbum) => {
                    return (
                        <div className="albumContainer" key={dbAlbum.album_id}>
                            <div className="albumImage" style={{ backgroundImage: `url(${dbAlbum.album_image_url})` }}></div>
                            <div className="albumInfo">
                                <h3>{dbAlbum.album_name}</h3>
                                <Link href={dbAlbum.spotify_link} target='_blank' className="link play-album-link"><strong>PLAY</strong></Link>
                                <p>Artist: <strong>{dbAlbum.album_artist}</strong></p>
                                <p>Score: <strong>{dbAlbum.album_score} / 5</strong></p>
                                <p>Review: <strong>{dbAlbum.album_review}</strong></p>
                                <p>Favourite Track: <strong>{dbAlbum.fav_track}</strong></p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}