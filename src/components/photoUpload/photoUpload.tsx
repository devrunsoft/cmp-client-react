"use client";
import { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import styles from "../photoUpload/photoUpload.module.css";
import { jwtDecode } from "jwt-decode";
import { getToken } from "core/src/utils/auth";
import { Site_URL } from "core/src/utils/url";
import { UploadPictureCommand } from "common/domain/command/upload_picture_command";
import { uploadPicture } from "data/api/register/company/upload_picture";
import { toast } from "react-toastify";

const PhotoUpload = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<
    string | ArrayBuffer | null
  >(null);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      var token = await getToken();
      var decoded = jwtDecode(token?.token ?? "");
      var profile = decoded["ProfilePicture"];
      if (profile) {
        var image = Site_URL + profile;
        setSelectedPhoto(image);
      }
    } catch (error) {}
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onSubmit(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto(reader!.result!);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = async (file) => {
    try {
      var command = new UploadPictureCommand(file);
      var result = await uploadPicture(command);
      result.fold(
        (s) => {},
        (_) => {
          toast.success(
            "Profile picture updated. Please log out and back in to see changes"
          );
        }
      );
    } finally {
    }
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className={styles.photoUploadContainer}>
      <div className={styles.previewContainer}>
        {selectedPhoto ? (
          <img
            src={selectedPhoto as string}
            alt="Selected Photo"
            className={styles.previewImage}
          />
        ) : (
          <BsPerson size={40} style={{ fill: "rgba(76, 142, 59)" }} />
        )}
      </div>
      <div className={styles.buttonContainer}>
        {selectedPhoto ? (
          <button className={styles.isade} onClick={handleRemovePhoto}>
            <FiTrash size={24} />
            <span>Remove</span>
          </button>
        ) : (
          <div className={styles.uploadButton}>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className={styles.hiddenInput}
            />
            <div className={styles.isade}>
              <img
                width={24}
                height={24}
                src="/export_icon_dark.svg"
                alt="Upload Icon"
              />
              <span>Upload Photo</span>
            </div>
          </div>
        )}
        <p>JPG or PNG file. Maximum file size of 5Mb </p>
      </div>
    </div>
  );
};

export default PhotoUpload;
