import './App.css';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore/lite';
import MemeCard from './components/MemeCard';
import db from './firebase.config';
import { useEffect, useState } from 'react';
import EditMemeModal from './components/EditMemeModal';
import AddMemeModal from './components/AddMemeModal';

// ------------ structure of a meme data ----------------
interface Memes {
  id: string;
  title: string;
}

const App = () => {
  const memesCollectionReference = collection(db, 'memes');
  const [memes, setMemes] = useState<Memes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [existingTitle, setExistingTitle] = useState<string>('');
  const [editMemeItemId, setEditMemeItemId] = useState<string>('');

  // ------------ function to get all memes ---------------------
  const getMemesHandler = async () => {
    setIsLoading(true);
    const memesSnapShot = await getDocs(memesCollectionReference);
    const newMemes: Memes[] = memesSnapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Memes[];
    setMemes([...newMemes]);
    setIsLoading(false);
  };

  // -------------- function to add new memes ---------------------
  const addMemeHandler = async (newMeme: string) => {
    await addDoc(memesCollectionReference, {
      title: newMeme,
    });
    getMemesHandler();
  };

  // --------------- function to execute on opening the edit meme modal -----------------
  const editMemeHandler = (id: string, title: string) => {
    setExistingTitle('');
    setExistingTitle(title);
    setEditMemeItemId(id);
  };

  // --------------- function to edit an existing meme ------------------------
  const submitEditMemeHandler = async (newTitle: string) => {
    const memeReference = doc(db, 'memes', editMemeItemId);
    await updateDoc(memeReference, {
      title: newTitle,
    });
    getMemesHandler();
  };

  // ------------------ function to delete a meme ---------------------
  const deleteMemeHandler = async (id: string) => {
    const result = window.confirm('Are you sure to delete this meme?');
    if (result) {
      const memeReference = doc(db, 'memes', id);
      await deleteDoc(memeReference);
      getMemesHandler();
    }
  };

  // ------------------ load all memes from firebase -----------------
  useEffect(() => {
    getMemesHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container mt-3'>
      <div className='mb-3 d-flex justify-content-between align-items-center'>
        <h1>My Memes</h1>
        <button
          className='btn btn-outline-primary'
          data-bs-toggle='modal'
          data-bs-target='#addMemeModal'
          onClick={() => {
            setExistingTitle('');
          }}
        >
          + Add Meme
        </button>
      </div>
      {isLoading ? (
        // show loader while the memes are loading
        <div className='text-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : memes.length === 0 ? (
        // if no memes found
        <p className='text-center text-muted'>
          No meme found. Click on '+ Add Meme' to add a new meme.
        </p>
      ) : (
        memes.map((meme) => (
          <MemeCard
            key={meme.id}
            title={meme.title}
            id={meme.id}
            deleteMemeHandler={deleteMemeHandler}
            editMemeHandler={editMemeHandler}
          />
        ))
      )}

      <EditMemeModal
        existingTitle={existingTitle}
        submitMemeHandler={submitEditMemeHandler}
      />

      <AddMemeModal submitMemeHandler={addMemeHandler} />
    </div>
  );
};

export default App;
