import { getStorage, ref, deleteObject } from "firebase/storage";

export const deleteImage = async (storageRef: string) => {

  const storage = getStorage();

  const folderRef = ref(storage, storageRef);

  deleteObject(folderRef).then(() => {
    console.info("File deleted successfully")
  }).catch((error) => {
    alert(error.message)
  });

}
