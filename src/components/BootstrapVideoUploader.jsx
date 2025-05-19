import React, { useState } from "react";
import { ROOT_PATH } from "../constants/apiConstants";

const BootstrapVideoUploader = ({ mediaUrl, onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      console.log(formData);
      const res = await fetch("https://localhost:7031/api/Media/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.filePath) {
        onUpload(data.filePath); // Gọi callback khi upload thành công
      } else {
        alert("Upload thất bại hoặc không nhận được URL.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Tải lên thất bại.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith("video/")) {
      uploadVideo(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("video/")) {
      uploadVideo(file);
    }
  };

  return (
    <div className="mb-3">
      {mediaUrl ? (
        <video controls className="w-100 rounded" style={{ height: 360 }}>
          <source src={ROOT_PATH + mediaUrl} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      ) : (
        <div
          className={`border border-2 rounded d-flex flex-column justify-content-center align-items-center text-muted text-center p-5 ${
            dragOver ? "border-primary bg-light" : "border-secondary"
          }`}
          style={{ height: 300, cursor: "pointer" }}
          onClick={() => document.getElementById("videoInput").click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="spinner-border text-primary" />
          ) : (
            <>
              <i className="bi bi-cloud-arrow-up" style={{ fontSize: "2rem" }}></i>
              <div>Kéo & thả video vào đây hoặc click để chọn</div>
            </>
          )}
          <input
            id="videoInput"
            type="file"
            accept="video/*"
            hidden
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default BootstrapVideoUploader;
