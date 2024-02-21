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

export async function handleReviewForm(formData) {

    const album_score = formData.get("review_score");
    const album_review = formData.get("album_review");

    await sql`INSERT INTO reviews (album_score, album_review) VALUES (${album_score},${album_review})`;
  }
