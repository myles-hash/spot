'use client';
import { handleAddToDB } from "@/lib/actions";
import { useState } from "react";


export default function AddAlbum({ album }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddAlbum = async () => {
    setIsAdding(true);
    try {
      await handleAddToDB(album);
      console.log("Album added successfully!");
    } catch (error) {
      console.error("Error adding album:", error);
    } finally {
      setIsAdding(false);
    }
  };


 return (
  <div>
    <button onClick={handleAddAlbum} type="submit" disabled={isAdding}>
        {isAdding ? "Adding album..." : "Add album"}
      </button>
</div>
);

}

// console.log("id:", album.id)
// console.log("Name:",album.name);
// console.log("Image:", album.images[0].url);
// console.log("Spot Link:", album.external_urls.spotify);
// console.log("Artist:", album.artists[0].name);

