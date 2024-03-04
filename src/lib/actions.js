'use server';
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function handleAddToDB( album, formData, fav_track ) {
    
    const album_score = formData.album_score;
    const album_review = formData.album_review;


    await sql`INSERT INTO reviews (album_id, album_image_url, album_name, spotify_link, album_artist, album_score, album_review, fav_track) 
    VALUES (${album.id}, ${album.images[0].url}, ${album.name}, ${album.external_urls.spotify}, ${album.artists[0].name}, ${album_score},${album_review},${fav_track} )`;
    revalidatePath(`/`);
    redirect(`/`);
}

    
