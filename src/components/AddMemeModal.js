import { useEffect, useState } from 'react';

const AddMemeModal = ({ submitMemeHandler }) => {
  const [meme, setMeme] = useState('');
  const [isError, setIsError] = useState(false);

  const submitMeme = () => {
    if (!isError) {
      submitMemeHandler(meme);
      setMeme('');
    }
  };

  useEffect(() => {
    if (meme.length > 0) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [meme]);

  return (
    <div
      className='modal fade'
      id='addMemeModal'
      tabIndex='-1'
      aria-labelledby='addMemeModalLabel'
      aria-hidden='true'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Add Meme</h5>
          </div>
          <div className='modal-body'>
            <input
              className='form-control'
              type='text'
              placeholder='Enter Your Meme Here...'
              value={meme}
              onChange={(e) => {
                setMeme(e.target.value);
              }}
            />
            {isError && (
              <p className='text-danger'>
                <small>Meme input is a required field!</small>
              </p>
            )}
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={submitMeme}
              data-bs-dismiss={!isError && 'modal'}
              disabled={isError ? true : false}
            >
              Add Meme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemeModal;
