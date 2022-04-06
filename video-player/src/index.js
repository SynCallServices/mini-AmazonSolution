import React, { useState } from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import AWS from 'aws-sdk';

const InputDownload = () => {
  const [template, setTemplate] = useState('Choose Template');

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  });

const handleClick = (e) => {
    e.preventDefault();
  };

  const handleDownload = () => {
    const s3 = new AWS.S3();

    const params = {
      Bucket: process.env.REACT_APP_INTERNAL_BUCKET_NAME,
      Key: `templates/${template}`,
    };


    function downloadBlob(blob, name = `${template}.csv`) {
      // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
      const blobUrl = URL.createObjectURL(blob);
      // Create a link element
      const link = document.createElement('a');
      // Set link's href to point to the Blob URL
      link.href = blobUrl;
      link.download = name;
      // Append link to the body
      document.body.appendChild(link);
      // Dispatch click event on the link
      // This is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      // Remove link from body
      document.body.removeChild(link);
    }

    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        let csvBlob = new Blob([data.Body.toString()], {
          type: 'text/csv;charset=utf-8;',
        });
        downloadBlob(csvBlob, `${template}`);
      }
    });

}

  return (
    <>
      <form className='bg-white my-4' onSubmit={handleClick}>
        <Dropdown>
          <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
            {template}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onSelect={() => setTemplate('T1')}>
              T1</Dropdown.Item>
            <Dropdown.Item onSelect={() => setTemplate('IV1')}>
              IV1
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => setTemplate('IV2')}>
              IV2
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => setTemplate('DV1')}>
              DV1
            </Dropdown.Item>
            
          </Dropdown.Menu>
        </Dropdown>
        <input
          type='submit'
          value='Download'
          className='btn btn-primary btn-block mt-3'
          onClick={handleDownload}
        />
      
      </form>
    </>
  );
};

export default InputDownload;
