import DataBase from "./comps/DataBase";


export default function Home({ searchParams }) {
  console.log(searchParams);

  return (
    <div>
    <DataBase searchParams={searchParams}/>
      </div>
  )
}