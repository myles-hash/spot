import { sql } from "@vercel/postgres";
import Link from "next/link";



export default async function DataBase({ searchParams}) {
  let sortOrder = "ASC"; 


  if (searchParams.sort === "desc") {
      sortOrder = "DESC";
  }


  const queryString = `SELECT * FROM reviews ORDER BY album_score ${sortOrder}`;


  const dbAlbums = await sql.query(queryString);

    return (
        <div className="albumsContainer">
            <h1>SAVED ALBUMS</h1>
            <button style={{ padding: '8px 16px', backgroundColor: 'black', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><Link href="/?sort=asc" style={{color: 'white', textDecoration: 'none'}}>Sort By Highest Rating</Link></button> - <button style={{ padding: '8px 16px', backgroundColor: 'black', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><Link href="/?sort=desc" style={{color: 'white', textDecoration: 'none'}}>
            Sort By Lowest Rating
          </Link></button>
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
                                <Link href={dbAlbum.spotify_link} target='_blank'>Play</Link>
                                <p>Artist: {dbAlbum.album_artist}</p>
                                <p>Score: {dbAlbum.album_score} / 5</p>
                                <p>Review: {dbAlbum.album_review}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
