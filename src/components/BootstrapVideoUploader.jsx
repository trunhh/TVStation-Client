import React, { useState } from "react";

const BootstrapVideoUploader = ({ mediaUrl, onUpload, placeholder, className, type, ...props}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

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
    if (file?.type.startsWith(`${type}/`)) {
      uploadVideo(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith(`${type}/`)) {
      uploadVideo(file);
    }
  };

  return (
    <div>
      {mediaUrl ? (
        <video controls className={className} {...props}>
          <source src={"https://localhost:7031/" + mediaUrl} />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      ) : (
        <div
          {...props}
          className={`${className} ${dragOver ? "border-primary bg-light" : ""} border d-flex flex-column justify-content-center align-items-center text-muted text-center`} 
          onClick={() => document.getElementById("mediaInput").click()}
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
              <i className="bi bi-cloud-arrow-up fs-1"/>
              <small>{placeholder}</small>
            </>
          )}
          <input
            id="mediaInput"
            type="file"
            accept={`${type}/*`}
            hidden
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default BootstrapVideoUploader;
