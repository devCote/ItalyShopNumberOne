import { doc, setDoc } from "firebase/firestore";
import { firestore as db } from "./firebase.utils"
import { getStorage, ref } from "firebase/storage";

type sectionObject = {
  title: string,
  routeName: string,
  file: any,
  setStatus: Function,
  setProgress: Function,
}

export const createNewSection = async (data: sectionObject) => {

  // TODO: check if collection exists and imageUrl

  const { title, routeName, file } = data

  const storage = getStorage();

  if (!file) return
  const storageRef = ref(storage, 'images/sections/' + file.name);

  // While the file names are the same, the references point to different files
  // mountainsRef.name === mountainImagesRef.name;           // true
  // mountainsRef.fullPath === mountainImagesRef.fullPath;   // false

  // create new section and it's collection
  const newCollectionObj = { id: routeName, items: [], routeName, title }
  const newSectionObj = { id: routeName, collectionId: routeName, childRef: storageRef.fullPath, imageUrl: '', linkUrl: `shop/${routeName}`, title }

  // Add a new documents in collection
  await setDoc(doc(db, 'collections', routeName), newCollectionObj);
  await setDoc(doc(db, 'sections', routeName), newSectionObj)
}
