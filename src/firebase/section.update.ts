import { doc, updateDoc } from "firebase/firestore";
import { firestore as db } from "./firebase.utils"
import { deleteImage } from "./image.delete";
import { imageUpload } from './image.upload'

export const updateSection = async (
  id: string,
  title: string,
  url: string,
  file: any,
  storageFilePath: string,
  setStatus: Function,
) => {

  alert(file)
  alert(storageFilePath)

  if (!file) return await updateDoc(doc(db, 'sections', id), { title, url })

  deleteImage(storageFilePath)

  const { imageUrl, storageRef }: any = await imageUpload(file, setStatus)

  try {
    await updateDoc(doc(db, 'sections', id), { title, url, imageUrl, storageRef: storageRef.fullPath })
  } catch (err) {
    alert(err)
  }

  setStatus('Загрузка завершена успешно');
}
