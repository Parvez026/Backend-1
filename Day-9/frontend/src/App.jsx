import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [note, setNote] = useState([]);
  console.log("rendering...");

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNote(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handelSubmit(e) {
    e.preventDefault();
    const { title, discription } = e.target.elements;
    // console.log(title.value,discription.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        discription: discription.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function deleteHandeler(noteId) {
    console.log(noteId);
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function updateNote(noteId,oldTitle, oldDiscription){
  const newTitle = prompt("Enter new title", oldTitle);
  const newDiscription = prompt("Enter new description", oldDiscription);

  if (!newTitle || !newDiscription) return;

    axios.patch("http://localhost:3000/api/notes/"+noteId,{
    title:newTitle,
    discription:newDiscription
    })
    .then((res)=>{
        console.log(res.data);
      fetchNotes()
    })
  }

  return (
    <>
      <form onSubmit={handelSubmit} className="px-8 py-4 flex gap-4">
        <input
          name="title"
          type="text"
          placeholder="title"
          className="border"
        />
        <input
          name="discription"
          type="text"
          placeholder="discription"
          className="border"
        />
        <button className="bg-blue-600 text-white px-3 py-1 rounded-md active:scale-95">
          create note
        </button>
      </form>

      <div className="flex">
        {note.map((item) => (
          <div className="p-5">
            <div className="bg-zinc-500 w-50 p-5 rounded-2xl">
              <h1 className="text-2xl">{item.title}</h1>
              <p>{item.discription}</p>
              <button
                onClick={() => {
                  deleteHandeler(item._id);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded-md active:scale-95 mt-2"
              >
                delete
              </button>
              <button
              onClick={()=>{updateNote(item._id,item.title,item.discription)}}
              className="bg-blue-600 text-white px-3 py-1 rounded-md active:scale-95 mt-2"
              >update note</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
