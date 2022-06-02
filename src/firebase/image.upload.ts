import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const metadata: any = {
  contentType: 'image/jpeg'
};

export const imageUpload = async (id: string, file: any, setStatus: Function, path: string = 'sections') => {

  const storage = getStorage();

  const storageRef = ref(storage, `images/${path}/${id}/` + file.name);
  const upload = uploadBytesResumable(storageRef, file, metadata);

  return new Promise(async (res, rej) => {
    upload.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setStatus(`Загрузка файла ${progress}%`)
      },
      (err) => {
        rej(err);
      },
      async () => {
        const imageUrl = await getDownloadURL(upload.snapshot.ref);
        res({ imageUrl, storageRef });
      }
    );
  });


}
