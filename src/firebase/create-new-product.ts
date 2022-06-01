import { doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore as db, uploadImageCollection } from "./firebase.utils"

export const createNewProduct = async (
  product: Object,
  sectionName: string,
  file: any,
  setStatus: Function) => {
  if (!file) return

  const tempArrUrl: any = [];
  const tempArrChildRef: any = [];
  const path = `images/products/${sectionName}/`

  const docRef = doc(db, "products", sectionName);
  const prevDoc = await getDoc(docRef)

  const uploadImages = await uploadImageCollection(path, file, setStatus)

  uploadImages.forEach((image: any) => {
    tempArrUrl.push(image.url);
    tempArrChildRef.push(image.childRef.fullPath);
  })

  await updateDoc(docRef, { items: [{ ...product, imageUrl: tempArrUrl, imageRef: tempArrChildRef }, ...prevDoc.data()?.items] })
  setStatus('Загрузка завершена успешно');
}
