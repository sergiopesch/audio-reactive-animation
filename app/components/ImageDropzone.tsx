// app/components/ImageDropzone.tsx
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

type ImageDropzoneProps = {
  onFileUpload: (file: File) => void;
};

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onFileUpload }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImageFile(acceptedFiles[0]);
      onFileUpload(acceptedFiles[0]);
    }
  };

  // Correct `accept` type
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #F78800",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <input {...getInputProps()} />
      {imageFile ? (
        <p>Image File: {imageFile.name}</p>
      ) : (
        <p>Drag & drop an image here, or click to select one</p>
      )}
    </div>
  );
};

export default ImageDropzone;
