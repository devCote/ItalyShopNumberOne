import { doc, setDoc } from "firebase/firestore";
import { firestore as db } from "./firebase.utils"
import { imageUpload } from './image.upload'

export const createNewSection = async (title: string, url: string, file: any, setProgress: Function) => {

  if (!file) return alert("Не загружена картинка")

  const id = Math.round(Math.random() * 1000000000).toString();

  const { imageUrl, storageRef }: any = await imageUpload(id, file, setProgress)

  const newCollectionObj = { title, url, items: [] }
  const newSectionObj = { id, title, url, imageUrl, storageRef: storageRef.fullPath }

  try {
    await setDoc(doc(db, 'products', id), newCollectionObj);
    await setDoc(doc(db, 'sections', id), newSectionObj)
  } catch (err) {
    alert(err)
  }

  setProgress('Загрузка завершена успешно');

}
