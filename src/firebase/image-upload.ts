import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

export const imageUpload = (file: any) => {

  const storage = getStorage();

  const storageRef = ref(storage, 'images/sections/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  return uploadTask

}
