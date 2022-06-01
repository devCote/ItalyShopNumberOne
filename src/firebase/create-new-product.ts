import { doc, setDoc } from "firebase/firestore";
import { firestore as db } from "./firebase.utils"
import { getStorage, ref } from "firebase/storage";
import { imageUpload } from './image-upload'
import { getDownloadURL } from 'firebase/storage'

type newProduct = {
  title: string,
  engTitle: string,
  file: any,
  collectionName: string,
  setProgress: Function,
}

export const createNewProduct = async (data: newProduct) => {

  const { title, engTitle, file, setProgress, collectionName } = data

  if (!file) return

  const storage = getStorage();

  const storageRef = ref(storage, 'images/collections/' +
    collectionName + file.name);

  const uploadTask = imageUpload(file)

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress('Загрузка ' + progress + '% выполнена');
      switch (snapshot.state) {
        case 'paused':
          setProgress('Пауза');
          break;
        case 'running':
          setProgress('Идет загрузка');
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          alert('storage/unauthorized')
          break;
        case 'storage/canceled':
          alert('storage/canceled')
          break;
        case 'storage/unknown':
          alert('storage/unknown')
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (imageUrl) => {

        const newCollectionObj = { title, engTitle, items: [] }
        const newSectionObj = { title, engTitle, imageUrl, storageRef: storageRef.fullPath }

        await setDoc(doc(db, 'product', engTitle), newCollectionObj);
        await setDoc(doc(db, 'sections', engTitle), newSectionObj)
        setProgress('Загрузка завершена успешно');

      });
    }
  );

}
