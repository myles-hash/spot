import { handleReviewForm } from "@/lib/actions";
import SubmitFormBtn from "./SubmitFormBtn";

export default function ReviewForm() {
  return (
    <div>
         <form action={handleReviewForm}>
                 <h4>Review Form</h4>
                 <input
                   name="album_score"
                   placeholder="Album Score"
                   required
                 />
                 <textarea
                   name="album_review"
                   placeholder="Album Review"
                   required
                 ></textarea>
                 <SubmitFormBtn />
               </form>
    </div>
  )
}
