const MemeCard = ({ title, id, deleteMemeHandler, editMemeHandler }) => {
  return (
    <div className='card w-100 mb-3'>
      <div className='card-body d-flex justify-content-between align-items-center w-100'>
        <p className='card-text'>{title}</p>
        <div className='btn-group'>
          <button
            className='btn btn-danger btn-sm'
            onClick={() => {
              deleteMemeHandler(id);
            }}
          >
            Delete
          </button>
          <button
            className='btn btn-primary btn-sm'
            onClick={() => {
              editMemeHandler(id, title);
            }}
            data-bs-toggle='modal'
            data-bs-target='#editMemeModal'
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeCard;
