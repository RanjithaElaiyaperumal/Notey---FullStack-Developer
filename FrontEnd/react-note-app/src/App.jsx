import React from "react";
import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import AddNotePage from "./pages/AddNotePage";
import EditNotePage from "./pages/EditNotePage";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import { TbError404Off } from "react-icons/tb"
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchNotes from "./components/SearchNotes";



const App = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");

  const handleFilterText = (val) => {
    setFilterText(val);
  };


  const handelSearchText = (val) => {
    setSearchText(val);
  };

  const filteredNotes =
    filterText === "BUSINESS"
      ? notes.filter((note) => note.category == "BUSINESS")
      : filterText === "PERSONAL"
      ? notes.filter((note) => note.category == "PERSONAL")
      : filterText === "IMPORTANT"
      ? notes.filter((note) => note.category == "IMPORTANT")
      : notes;


      useEffect(() => {
        if(searchText.length < 3) return;
        axios.get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
        .then(res => {
          console.log(res.data)
          setNotes(res.data)
        })
        .catch(err => console.log(err.message))
      }, [searchText])

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/notes/")
      .then((res) => {
        // console.log(res.data);
        setNotes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const addNote = (data) => {
    axios
      .post("http://127.0.0.1:8000/notes/", data)
      .then((res) => {
        setNotes([...notes, data]);
        toast.success("A new note has been added");
        console.log(res.data);
      })

      .catch((err) => {
        console.log(console.log(err.message));
      });
  };

  const updateNote = (data, id) => {
    axios
      .put(`http://127.0.0.1:8000/notes/${id}/`, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Note updated succesfully");
      })

      .catch((err) => console.log(err.message));
  };

  const deleteNote = (id) => {
    console.log("id>>>:",id);
    
    axios
      .delete(`http://127.0.0.1:8000/notes/${id}`)
      .catch((err) => console.log(err.message));
  };

  // const deleteNote = async (slug) => {
  //   try {
  //     await axios.delete(`http://127.0.0.1:8000/notes/${slug}`);
  //     console.log(`Note with slug "${slug}" deleted successfully.`);
  //   } catch (error) {
  //     console.error("Error deleting note:", error);
  //   }
  // };

  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainLayout
            searchText={searchText}
            handelSearchText={handelSearchText}
          />
        }
      >
        <Route
          index
          element={ 
            <HomePage
              notes={filteredNotes}
              loading={isLoading}
              handleFilterText={handleFilterText}
            />
          }
        />
        <Route path="/add-note" element={<AddNotePage addNote={addNote} />} />
        <Route
          path="/edit-note/:id"
          element={<EditNotePage updateNote={updateNote} />}
        />
        <Route
          path="/notes/:id"
          element={<NoteDetailPage deleteNote={deleteNote} />}
        />
        <Route path="/note/:id" element={<NoteDetailPage deleteNote={() => {}} />} />
        <Route path="/" element={<SearchNotes results={[]} />} />


      </Route>

    )
  ); 

  return <RouterProvider router={router} />;
};

export default App; 
 





