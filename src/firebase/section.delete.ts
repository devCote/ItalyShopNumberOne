import { doc, deleteDoc } from "firebase/firestore";
import { firestore as db } from './firebase.utils'
import { deleteImage } from "./image.delete"

export const deleteSection = async (id: string) => {

  deleteImage(`images/products/${id}`)
  deleteImage(`images/sections/${id}`)
  await deleteDoc(doc(db, "products", id));
  await deleteDoc(doc(db, "sections", id));
}

