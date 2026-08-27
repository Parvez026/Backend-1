import { useState } from "react";
import axios from "axios";

const App = () => {
  const [note, setNote] = useState([
    {
      title: "test title1",
      discription: "test dicription1",
    },
    {
      title: "test title1",
      discription: "test dicription1",
    },
    {
      title: "test title1",
      discription: "test dicription1",
    },
    {
      title: "test title1",
      discription: "test dicription1",
    },
  ]);

  axios.get("http://localhost:3000/api/notes").then((res) => {
    setNote(res.data.notes);
  });

  return (
    <div className="flex">
      {note.map((item) => (
        <div className="p-5">
          <div className="bg-zinc-500 w-50 p-5 rounded-2xl">
            <h1 className="text-2xl">{item.title}</h1>
            <p>{item.discription}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
