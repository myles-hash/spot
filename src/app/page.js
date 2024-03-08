import DataBase from "./comps/DataBase";

export const metadata = {
  title: "Muso Muse | Saved Albums",
  description: "Saved albums on 'Muso Muse', an album review app",
};

export default function Home({ searchParams }) {
  console.log(searchParams);

  return (
    <div>
    <DataBase searchParams={searchParams}/>
      </div>
  )
}