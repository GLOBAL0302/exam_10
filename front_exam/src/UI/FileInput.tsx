import { ChangeEvent, useRef, useState } from 'react';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
}

const FileInput: React.FC<Props> = ({ onChange, name }) => {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName('');
    }
    onChange(event);
  };
  return (
    <div>
      <input type="file" ref={inputRef} name={name} className="d-none" onChange={onFileChange} />
      <div className="input-group mb-3">
        <input
          defaultValue={fileName}
          onClick={activateInput}
          type="text"
          className="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <button type="button" className="input-group-text" id="basic-addon2" onClick={activateInput}>
          Select File
        </button>
      </div>
    </div>
  );
};

export default FileInput;
