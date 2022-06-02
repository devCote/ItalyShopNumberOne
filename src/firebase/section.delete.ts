import { doc, deleteDoc } from "firebase/firestore";
import { firestore as db } from './firebase.utils'
import { deleteImage } from "./image.delete"

export const deleteSection = async (id: string, productsRefs: [string], sectionRef: string, setStatus: Function) => {

  if (productsRefs) productsRefs.forEach(ref => { deleteImage(ref) })
  if (sectionRef) deleteImage(sectionRef)

  try {
    await deleteDoc(doc(db, "products", id));
    await deleteDoc(doc(db, "sections", id));
  } catch (err: any) {
    alert(err.message)
  } finally {
    setStatus('done')
  }
}

