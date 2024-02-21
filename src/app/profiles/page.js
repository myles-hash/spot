import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import Link from "next/link";


export default async function Profiles() {
  const {userId} = auth();

    const profiles = await sql `SELECT * FROM profiles`;

   
    return (
      <div>
        <h1>Profiles</h1>
        {!userId && (
          <div>
            <h2>Please sign up/in to view user reviews</h2>
            {profiles.rows.map((profile) => (
              <div key={profile.id}>
                <h3>{profile.username}</h3>
                <p>{profile.bio}</p>
                <br/>
              </div>
            ))}
          </div>
        )}
    
        {userId && (
          <div>
            {profiles.rows.map((profile) => (
              <Link key={profile.id} href={`/profiles/${profile.id}/reviews`}>
                <h3>{profile.username}</h3>
                <p>{profile.bio}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
    
}