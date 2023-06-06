import { useEffect, useState } from 'react';

interface EditMemeModalData {
  submitMemeHandler: (meme: string) => void;
  existingTitle?: string;
}

const EditMemeModal: React.FC<EditMemeModalData> = ({
  submitMemeHandler,
  existingTitle,
}) => {
  const [meme, setMeme] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (existingTitle) {
      setMeme(existingTitle);
    }
  }, [existingTitle]);

  useEffect(() => {
    if (meme.length > 0) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [meme]);

  const submitMeme = () => {
    if (!isError) {
      submitMemeHandler(meme);
      setMeme('');
    }
  };

  return (
    <div
      className='modal fade'
      id='editMemeModal'
      tabIndex={-1}
      aria-labelledby='editMemeModalLabel'
      aria-hidden='true'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Edit Meme</h5>
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
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMemeModal;
