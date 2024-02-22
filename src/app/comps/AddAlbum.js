'use client';
import { handleAddToDB } from "@/lib/actions";
import { useState } from "react";


export default function AddAlbum({ album, formData, onFormChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddAlbum = async () => {
    setIsAdding(true);
    try {
      await handleAddToDB(album, formData);
      console.log("Album added successfully!");
    } catch (error) {
      console.error("Error adding album:", error);
    } finally {
      setIsAdding(false);
    }
  };


 return (
//   <div>
//     <form>
//                  <h4>Review Form</h4>
//                  <label for="number">Score out of 5 (1-5):</label>
//                   <select 
//                   id="number"   
//                   name="album_score"
//                   value={formData.album_score}
//                   onChange={onFormChange}
//                   required>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                   </select>
//                  <textarea
//                    name="album_review"
//                    placeholder="Album Review"
//                    value={formData.album_review}
//                    onChange={onFormChange}
//                    required
//                  ></textarea>
//     <button onClick={handleAddAlbum} type="submit" disabled={isAdding}>
//         {isAdding ? "Adding album..." : "Add album"}
//       </button>
//       </form>
// </div>
<div style={{ display: 'flex', justifyContent: 'center' }}>
    <form style={{ maxWidth: '400px', width: '100%' }}>
        <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Review Form</h4>
        <label htmlFor="number" style={{ display: 'block', marginBottom: '10px' }}>Score out of 5 (1-5):</label>
        <select 
            id="number"   
            name="album_score"
            value={formData.album_score}
            onChange={onFormChange}
            required
            style={{ padding: '8px', width: '100%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <textarea
            name="album_review"
            placeholder="Album Review"
            value={formData.album_review}
            onChange={onFormChange}
            required
            style={{ padding: '8px', width: '100%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        ></textarea>
        <button
            onClick={handleAddAlbum}
            type="submit"
            disabled={isAdding}
            style={{ padding: '10px 20px', backgroundColor: 'black', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
        >
            {isAdding ? "Adding album..." : "Add album"}
        </button>
    </form>
</div>

);

}



