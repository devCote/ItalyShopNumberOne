import { doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore as db } from "./firebase.utils"
import { imageUpload } from "./image.upload"

export const createNewProduct = async (
  product: Object,
  id: string,
  file: any,
  setStatus: Function) => {

  if (!file) return alert('Не загружена картинка')

  const tempArrUrl: any = [];
  const tempArrChildRef: any = [];
  const path = `products`

  const docRef = doc(db, "products", id);
  const prevDoc = await getDoc(docRef)

  const uploadImages = await Promise.all(file.map((item: any) => imageUpload(id, item, setStatus, path)))

  uploadImages.forEach(async (image: any) => {
    tempArrUrl.push(image.imageUrl);
    tempArrChildRef.push(image.storageRef.fullPath);
  })

  try {
    await updateDoc(docRef, { items: [{ ...product, imageUrl: tempArrUrl, storageRef: tempArrChildRef }, ...prevDoc.data()?.items] })
  } catch (err: any) {
    console.log(err.message)
  }
  setStatus('Загрузка завершена успешно');
}
