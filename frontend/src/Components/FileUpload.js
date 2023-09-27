const FileUpload = ({ name }) => {
  return (
    <input type="file" accept=".csv" name={name} multiple />
  );
}

export default FileUpload;