import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [note, setNote] = useState([]);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");

  //   const titleRef = useRef();
  //   const discriptionRef = useRef();

  // GET
  function fetchNote() {
    axios.get("https://backend-1-bvw2.onrender.com/api/notes").then((res) => {
      setNote(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNote();
  }, []);

  // CREATE / UPDATE
  function handelSubmit(e) {
    e.preventDefault();

    const { title, discription } = e.target.elements;
    

    // Agar editId hai to UPDATE hoga
    if (editId) {
      axios
        .patch("https://backend-1-bvw2.onrender.com/api/notes/" + editId, {
          title: title.value,
          discription: discription.value,
        })
        .then(() => {
          fetchNote();

          // Form clear
          title.value = "";
          discription.value = "";

          // Edit mode hata do
          setEditId(null);
        });

      return;
    }

    // Agar editId nahi hai to CREATE hoga
    axios
      .post("https://backend-1-bvw2.onrender.com/api/notes", {
        title: title.value,
        discription: discription.value,
      })
      .then(() => {
        fetchNote();

        title.value = "";
        discription.value = "";
      });
  }

  // DELETE
  function deleteHandeler(noteId) {
    axios.delete("https://backend-1-bvw2.onrender.com/api/notes/" + noteId)
    .then(() => {
      fetchNote();
    });
  }

  // UPDATE button
  function updateNote(noteId) {
    // jis card par click kiya us note ko find karo
    const selectedNote = note.find((item) => item._id === noteId);

    // form ke input me data daalo
    // titleRef.current.value = selectedNote.title;
    // discriptionRef.current.value = selectedNote.discription;
    setTitle(selectedNote.title);
    setDiscription(selectedNote.discription);

    // ID save karo
    setEditId(noteId);
  }

  return (
    <div className="bg-zinc-800 w-full h-screen p-10">
      <form onSubmit={handelSubmit} className="flex gap-4">
        <input
          //   ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-amber-50 bg-white"
          name="title"
          type="text"
          placeholder="title"
        />

        <input
          //   ref={discriptionRef}
          value={discription}
          onChange={(e) => setDiscription(e.target.value)}
          className="border border-amber-50 bg-white"
          name="discription"
          type="text"
          placeholder="discription"
        />

        <button className="px-4 font-bold py-1 bg-blue-600 rounded-md">
          {editId ? "Update" : "Create"}
        </button>
      </form>

      <div className="flex gap-4 mt-5">
        {note.map((note, idx) => (
          <div
            key={idx}
            className="w-60 h-40 bg-gray-400 rounded-md text-center p-5 text-white"
          >
            <h2 className="text-2xl">{note.title}</h2>

            <p className="font-bold">{note.discription}</p>

            <button
              onClick={() => {
                deleteHandeler(note._id);
              }}
              className="bg-red-500 rounded-md px-3 py-1 mt-2"
            >
              Delete
            </button>

            <button
              onClick={() => {
                updateNote(note._id);
              }}
              className="bg-blue-500 rounded-md px-3 py-1 mt-2 ml-4"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
