// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import AudioDropzone from "./components/AudioDropzone";
import ImageDropzone from "./components/ImageDropzone";
import WaveSurfer from "wavesurfer.js";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

  // Initialize WaveSurfer when audio file is provided
  useEffect(() => {
    if (typeof window !== "undefined" && audioFile) {
      const wavesurferInstance = WaveSurfer.create({
        container: "#waveform",
        waveColor: "violet",
        progressColor: "purple",
        barWidth: 3,
        height: 128,
      });

      wavesurferInstance.load(URL.createObjectURL(audioFile));
      setWaveSurfer(wavesurferInstance);

      const handleResize = () => {
        if (wavesurferInstance) {
          wavesurferInstance.empty();
          wavesurferInstance.load(URL.createObjectURL(audioFile));
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        wavesurferInstance.destroy();
      };
    }
  }, [audioFile]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Audio Reactive Animation App</h1>

      {/* Audio Dropzone */}
      <AudioDropzone onFileUpload={setAudioFile} />

      {/* Image Dropzone */}
      <ImageDropzone
        onFileUpload={(file) => console.log("Image file uploaded:", file)}
      />

      {/* Waveform Container */}
      <div
        id="waveform"
        style={{ height: "200px", width: "100%", backgroundColor: "#f0f0f0" }}
      >
        {audioFile ? "Loading waveform..." : "No audio loaded yet"}
      </div>
    </div>
  );
}
