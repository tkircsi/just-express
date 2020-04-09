import React from 'react';
import axios from 'axios';

const FileForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const resp = await axios.post(
      'http://localhost:3999/uploadFiles',
      new FormData(e.target),
      config
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="meme" id="file-field" />
      <input type="file" name="meme" id="file-field2" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FileForm;
