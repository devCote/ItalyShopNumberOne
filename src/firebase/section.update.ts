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

  if (!file) {
    try {
      await updateDoc(doc(db, 'sections', id), { title, url })
      await updateDoc(doc(db, 'products', id), { title, url })
    } catch (err: any) {
      alert(err.message)
    } finally {
      return window.location.replace('/')
    }
  }

  deleteImage(storageFilePath)
  const { imageUrl, storageRef }: any = await imageUpload(id, file, setStatus)
  try {
    await updateDoc(doc(db, 'sections', id), { title, url, imageUrl, storageRef: storageRef.fullPath })
    await updateDoc(doc(db, 'products', id), { title, url, })
  } catch (err) {
    alert(err)
  }

  setStatus('Загрузка завершена успешно');
}
