'use client';
import { handleAddToDB } from "@/lib/actions";
import { useState } from "react";


export default function AddAlbum({ album, formData, onFormChange, fav_track }) {
  const [isAdding, setIsAdding] = useState(false);


const handleAddAlbum = async (e) => {
    e.preventDefault();

    if (!fav_track || formData.album_score == ' ' || !formData.album_review) {

        alert("Please fill out all the required fields.");
        return;
    }

    setIsAdding(true);
    await handleAddToDB(album, formData, fav_track);
    setIsAdding(false);
}





 return (
<div className="add-album-div">
    <form className="add-album-form">
        <select 
            id="number"   
            name="album_score"
            value={formData.album_score}
            onChange={(e) => onFormChange(e, album.id)}
            className="add-album-select"
        >
            <option>Score out of 5</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <textarea
            name="album_review"
            value={formData.album_review}
            onChange={(e) => onFormChange(e, album.id)}
            className="add-album-textarea"
        ></textarea> 
        <button
            onClick={handleAddAlbum}
            type="submit"
            disabled={isAdding}
            className="add-album-button"
        >
            {isAdding ? "Adding album..." : "Add album"}
        </button>
    </form>
</div>

);

}