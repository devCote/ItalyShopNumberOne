import { getStorage, ref, deleteObject } from "firebase/storage";

export const deleteImage = (storageRef: string) => {

  const storage = getStorage();

  const desertRef = ref(storage, storageRef);

  deleteObject(desertRef).then(() => {
    console.info("File deleted successfully")
  }).catch((error) => {
    alert(error.message)
  });

}
