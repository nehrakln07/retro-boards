
import RetroBoard from "./componets/RetroBoard";

export default function Home() {


  return (
    <>
      <header className="bg-indigo-800 text-white p-4">
        <h1 className="text-2xl font-bold">Retro 
        Board</h1>
      </header>
      <main className="w-full p-10">
        <div className="">
          <RetroBoard />
        </div>
      </main>
    </>
  );
}
