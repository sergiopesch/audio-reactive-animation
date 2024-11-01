// app/components/AudioDropzone.tsx
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

type AudioDropzoneProps = {
  onFileUpload: (file: File) => void;
};

const AudioDropzone: React.FC<AudioDropzoneProps> = ({ onFileUpload }) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setAudioFile(acceptedFiles[0]);
      onFileUpload(acceptedFiles[0]);
    }
  };

  // Modify `accept` to match TypeScript expected type
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #0087F7",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <input {...getInputProps()} />
      {audioFile ? (
        <p>Audio File: {audioFile.name}</p>
      ) : (
        <p>Drag & drop an audio file here, or click to select one</p>
      )}
    </div>
  );
};

export default AudioDropzone;
