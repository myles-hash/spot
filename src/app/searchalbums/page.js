import Form from "../comps/Form";

export const metadata = {
  title: "Muso Muse | Search Albums, Write Reviews",
  description: "Save albums and write reviews on 'Muso Muse', an album review app",
};



export default function searchAlbumsPage() {
  return (
    <div>
      <h1>Search:</h1>
      <Form />
    </div>
  )
}
