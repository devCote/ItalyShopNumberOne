import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const metadata: any = {
  contentType: 'image/jpeg'
};

export const imageUpload = (id: string, file: any, setProgress: Function) => {

  const storage = getStorage();

  const storageRef = ref(storage, `images/sections/${id}/` + file.name);
  const upload = uploadBytesResumable(storageRef, file, metadata);

  return new Promise(async (res, rej) => {
    upload.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(`Загрузка файла ${progress}%`)
      },
      (err) => {
        rej(err);
        setProgress(err.message)
      },
      async () => {
        const imageUrl = await getDownloadURL(upload.snapshot.ref);
        res({ imageUrl, storageRef });
      }
    );
  });


}
