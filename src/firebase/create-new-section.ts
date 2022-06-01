import { doc, setDoc } from "firebase/firestore";
import { firestore as db } from "./firebase.utils"
import { getStorage, ref } from "firebase/storage";
import { imageUpload } from './image-upload'
import { getDownloadURL } from 'firebase/storage'

type sectionObject = {
  title: string,
  engTitle: string,
  file: any,
  setProgress: Function,
}

export const createNewSection = async (data: sectionObject) => {

  const { title, engTitle, file, setProgress } = data

  if (!file) return

  const storage = getStorage();

  const storageRef = ref(storage, 'images/sections/' + file.name);

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

        const id = Math.round(Math.random() * 1000000000);

        const newCollectionObj = { title, engTitle, items: [] }
        const newSectionObj = { id, title, engTitle, imageUrl, storageRef: storageRef.fullPath }

        try {
          await setDoc(doc(db, 'products', engTitle), newCollectionObj);
          await setDoc(doc(db, 'sections', engTitle), newSectionObj)
        } catch (err) {
          alert(err)
        }

        setProgress('Загрузка завершена успешно');

      });
    }
  );

}
