import CreateCommentBtn from "@/app/components/CreateCommentBtn";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";


export default async function SingleReview({ params }) {
    const {userId} = auth();

    const review = await sql`SELECT * FROM reviews WHERE id = ${params.reviewid}`;


    const comments = await sql`SELECT * FROM comments where review_id = ${params.reviewid} ORDER BY id asc`;

    const currentUsername = await sql`SELECT username FROM profiles where clerk_user_id = ${userId} `;


    

    async function handleAddComment(formData) {
        "use server";
        const username = formData.get("username");
        const content = formData.get("content");
    
        await sql`INSERT INTO comments (username, content, review_id, user_id) VALUES (${username}, ${content}, ${params.reviewid}, ${userId})`;
        revalidatePath(`/${params.reviewid}`);
        }
    
  
    return (
        <div>
            <h3>{review.rows[0].album_title}</h3>
            <h4>{review.rows[0].album_artist}</h4>
            <h6>{review.rows[0].album_score}</h6>
            <h4>{review.rows[0].album_review}</h4>

            {userId === review.rows[0].user_id  && <Link href={`/profiles/${params.profilesId}/reviews/${params.reviewid}/edit`}>Edit</Link>}

        {userId && <form action={handleAddComment}>
            <h4>Add a comment</h4>
            <input name="username" placeholder="Username" defaultValue={currentUsername.rows[0].username} value={currentUsername.rows[0].username} readOnly/>
             <textarea name="content" placeholder="Content"></textarea>
             <CreateCommentBtn />
         </form>}
         {!userId && <h2>Please sign in to add comments</h2>}

         {comments.rows.map((comment) => {
        return (
          <div key={comment.id}>
            <h3>{comment.username}</h3>
            <p>{comment.content}</p>
            <p>
            {userId === comment.user_id && <Link href={`/profiles/${params.profilesId}/reviews/${params.reviewid}/comments/${comment.id}/edit`}>
              Edit
            </Link>}</p>
          </div>
        );
      })}
        </div>
    );
}
