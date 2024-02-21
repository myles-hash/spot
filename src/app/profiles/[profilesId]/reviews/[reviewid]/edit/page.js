import EditReviewBtn from "@/app/components/EditReviewBtn";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function EditReview({ params }) {
  const { userId } = auth();


  const review = await sql`SELECT * FROM reviews WHERE id = ${params.reviewid}`;

  async function handleEditReview(formData) {
    "use server";
        const album_title = formData.get("album_title");
        const album_artist = formData.get("album_artist");
        const album_score = formData.get("album_score");
        const album_review = formData.get("album_review");

        await sql`UPDATE reviews SET album_title = ${album_title},album_artist = ${album_artist}, album_score= ${album_score}, album_review = ${album_review} WHERE user_id = ${userId}`;

        revalidatePath(`/profiles/${params.profilesId}/reviews${params.reviewid}`);
        revalidatePath(`/profiles/${params.profilesId}/reviews${params.reviewid}/edit`);
        redirect(`/profiles/${params.profilesId}/reviews/${params.reviewid}`);

  }


if(userId !== review.rows[0].user_id) {
  return <p>404 not found</p>
}

  return (
    <div>
      <h2>Edit Review</h2>
      <form action={handleEditReview}>
        <h4>Edit Review of - {review.rows[0].album_title}</h4>
        <input name="album_title" placeholder="Ablum Title"  defaultValue={review.rows[0].album_title}/>
        <input name="album_artist" placeholder="Ablum Title" defaultValue={review.rows[0].album_artist}/>
        <input name="album_score" placeholder="Ablum Score" defaultValue={review.rows[0].album_score}/>
        <textarea name="album_review" placeholder="Review" defaultValue={review.rows[0].album_review}></textarea>
        <EditReviewBtn />
      </form>
    </div>
  );
}