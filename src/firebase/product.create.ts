import { doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore as db, uploadImageCollection } from "./firebase.utils"

export const createNewProduct = async (
  product: Object,
  id: string,
  file: any,
  setStatus: Function) => {

  if (!file) return alert('Не загружено фото')

  const tempArrUrl: any = [];
  const tempArrChildRef: any = [];
  const path = `images/products/${id}/`

  const docRef = doc(db, "products", id);
  const prevDoc = await getDoc(docRef)

  const uploadImages = await uploadImageCollection(path, file, setStatus)

  uploadImages.forEach((image: any) => {
    tempArrUrl.push(image.url);
    tempArrChildRef.push(image.childRef.fullPath);
  })


  await updateDoc(docRef, { items: [{ ...product, imageUrl: tempArrUrl, imageRef: tempArrChildRef }, ...prevDoc.data()?.items] })
  setStatus('Загрузка завершена успешно');
}
