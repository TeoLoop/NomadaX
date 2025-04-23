import { useDropzone } from 'react-dropzone';

const ImageDropzone = ({ onImagesChange }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      onImagesChange(filesWithPreview);
    }
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Arrastra tus imágenes aquí o haz click para seleccionar</p>
    </div>
  );
};
