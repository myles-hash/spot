import CreateReviewBtn from "@/app/components/CreateReviewBtn";
import EditProfileBtn from "@/app/components/EditProfileBtn";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";



export const metadata = {
    title: "Album Review | Reviews",
    description: "Reviews made by users",
  };

export default async function ProfilePage({ params }) {
    const {userId} = auth();
    
    const profile = await sql `
    SELECT * FROM profiles WHERE id = ${params.profilesId}
    `;

    const reviews = await sql `
    SELECT * FROM reviews WHERE user_id = ${profile.rows[0].clerk_user_id} ORDER BY id desc
    `

    

    async function handleEditProfile(formData) {
        "use server";
    
        const username = formData.get("username");
        const bio = formData.get("bio");
    
        await sql`UPDATE profiles SET username = ${username}, bio = ${bio} WHERE clerk_user_id = ${userId}`;
        revalidatePath(`/profiles`);
        revalidatePath(`/profiles/${params.profilesId}/reviews`);
        redirect(`/profiles/${params.profilesId}/reviews`);
      }


      async function handleCreateReview(formData) {
        "use server";
        const album_title = formData.get("album_title");
        const album_artist = formData.get("album_artist");
        const album_score = formData.get("album_score");
        const album_review = formData.get("album_review");

        await sql`INSERT INTO reviews (album_title, album_artist, album_score, album_review, user_id) VALUES (${album_title}, ${album_artist}, ${album_score}, ${album_review}, ${userId})`;

        revalidatePath(`/profiles/${params.profileId}/reviews`);
    }


    return (
        <div>
                <p>username:</p>
                <h1>{profile.rows[0].username}</h1>
                <p>bio:</p>
                <h2>{profile.rows[0].bio}</h2>
            
                
                {userId === profile.rows[0].clerk_user_id && (
                <div>
              <form action={handleEditProfile}>
                 <h4>Edit profile</h4>
                 <input
                   name="username"
                   placeholder="Username"
                   defaultValue={profile.rows[0].username}
                   required
                 />
                 <textarea
                   name="bio"
                   placeholder="Bio"
                   defaultValue={profile.rows[0].bio}
                   required
                 ></textarea>
                 <EditProfileBtn />
               </form>
               </div>
                )}
                
                 <h1>Reviews by {profile.rows[0].username}</h1>
      {userId === profile.rows[0].clerk_user_id && (<form action={handleCreateReview}>
        <h4>Add a new review</h4>
        <input name="album_title" placeholder="Ablum Title" />
        <input name="album_artist" placeholder="Ablum Title" />
        <input name="album_score" placeholder="Ablum Score" />
        <textarea name="album_review" placeholder="Review" ></textarea>
        <CreateReviewBtn/>
      </form>)}
      {!userId && <div><h2>Please... Sign in to add reviews</h2></div>}
     
      <div>
  <h1>Reviews</h1>
  {reviews.rows.map((review) => (
    <div key={review.id} id="rev-div">
      <p>ALBUM TITLE:</p>
      <h3>{review.album_title}</h3>
      <p>ALBUM ARTIST:</p>
      <h3>{review.album_artist}</h3>    
      <Link href={`/profiles/${params.profilesId}/reviews/${review.id}`}>
    <h3>Read Review ...</h3>
    </Link>
    </div>
  ))}
</div>
               </div>
    )

              
}

