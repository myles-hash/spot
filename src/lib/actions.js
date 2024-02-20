'use server';
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function handleAddToDB(album) {

    await sql`INSERT INTO albums (album_id, album_image_url, album_name, spotify_link, album_artist) 
    VALUES (${album.id}, ${album.images[0].url}, ${album.name}, ${album.external_urls.spotify}, ${album.artists[0].name})`;
    revalidatePath(`/`);
    redirect(`/`);
}