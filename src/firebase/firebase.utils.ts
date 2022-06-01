import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const config = {
  apiKey: 'AIzaSyC7Fxyktik-rtX4nXjklHGXukI-NRGu954',
  authDomain: 'eshop-number1.firebaseapp.com',
  projectId: 'eshop-number1',
  storageBucket: 'eshop-number1.appspot.com',
  messagingSenderId: '93698448492',
  appId: '1:93698448492:web:a668b7cc5973bba0090c49',
  measurementId: 'G-39DG6L3LWP',
};

export const deleteImage = (childRef: any, isListAll = false) => {
  const storageRef = storage.ref();
  const desertRef = storageRef.child(childRef);

  if (!isListAll)
    desertRef
      .delete()
      .then(() => {
        console.log('fileDeleted');
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  else
    desertRef.listAll().then((res: any) => {
      console.log(res);
      res.items.forEach((item: any) => {
        console.log(item);
        item.delete();
      });
    });
};

export const uploadImageCollection = (
  path: string,
  file: any,
  setStatus: any,
  setPercentage: any,
  setUrl: any,
  setChildRef: any
) => {
  const tempArrUrl: any = [];
  const tempArrChildRef: any = [];

  const uploadAsync = async (uri: any) => {
    const storageRef = storage.ref();
    const childRef = storageRef.child(path + uri.name);

    return new Promise(async (res, rej) => {
      const upload = childRef.put(uri);

      upload.on(
        'state_changed',
        (_snapshot) => { },
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res({ url, childRef });
        }
      );
    });
  };

  const updateImageArray = async (imageArray: any) => {
    return Promise.all(imageArray.map((item: any) => uploadAsync(item)));
  };

  updateImageArray(file).then((response) => {
    response.forEach((element: any) => {
      tempArrUrl.push(element.url);
      tempArrChildRef.push(element.childRef.fullPath);
    });
    setUrl(tempArrUrl);
    setChildRef(tempArrChildRef);
    setStatus('Все файлы загружены');
    setPercentage('100');
  });
};

export const uploadImage = (
  path: string,
  file: any,
  setStatus: any,
  setPercentage: any,
  setUrl: any,
  setChildRef: any
) => {
  if (!path || !file) return;
  const storageRef = storage.ref();
  const childRef = storageRef.child(path + file.name);
  const uploadTask = childRef.put(file);

  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      setStatus('Загрузка...');
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPercentage(Math.round(progress));
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          setStatus('Пауза...');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          setStatus('Загрузка...');
          break;
      }
    },
    function(error: any) {
      switch (error.code) {
        case 'storage/unauthorized':
          setStatus('Ошибка!');
          break;
        case 'storage/canceled':
          setStatus('Ошибка!');
          break;
        case 'storage/unknown':
          setStatus('Ошибка!');
          break;
        default:
          setStatus('Ошибка!');
          break;
      }
    },
    async function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(url: any) {
        setUrl(url);
        setChildRef(childRef);
        setStatus('Загрузка завершена успешно');
      });
    }
  );
};

export const createUserProfileDocument = async (
  userAuth: any,
  aditionalData: any
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdDate,
        ...aditionalData,
      });
    } catch (err) {
      console.log('error creating user');
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const addItemToCollection = async (
  collectionKey: string,
  objectToAdd: any,
  docId?: string
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  if (docId) {
    const docRef = collectionRef.doc(docId);
    const snapshot: any = await docRef.get();
    const fireObj: any = await snapshot.data();
    let fireArr = [];
    let itemIdx = 0;
    if (fireObj.items)
      fireArr = fireObj.items.filter((i: any, idx: number) => {
        if (Number(i.id) !== Number(objectToAdd.id)) {
          return i;
        } else {
          itemIdx = idx;
          return null;
        }
      });
    console.log(fireArr);
    fireObj.items = [...fireArr];
    fireObj.items.splice(itemIdx, 0, objectToAdd);
    batch.update(docRef, fireObj);
  } else {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, { ...objectToAdd, id: newDocRef.id });
    await batch.commit();
    return newDocRef.id;
  }
  return await batch.commit();
};

export const deleteItemFromCollection = async (
  collectionKey: string,
  objectKey: string,
  docId?: any
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  if (docId) {
    const docRef = collectionRef.doc(objectKey);
    const snapshot: any = await docRef.get();
    const fireObj: any = await snapshot.data();
    let fireArr = [];
    if (fireObj.items)
      fireArr = fireObj.items.filter(
        (i: any) => Number(i.id) !== Number(docId)
      );
    fireObj.items = fireArr;
    batch.update(docRef, fireObj);
  } else {
    const delDocRef = collectionRef.doc(objectKey);
    batch.delete(delDocRef);
  }
  return await batch.commit();
};

export const updateItemInCollection = async (
  collectionKey: string,
  objectKey: string,
  newObject: any
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  const documentRef = collectionRef.doc(objectKey);
  batch.update(documentRef, newObject);
  return await batch.commit();
};

export const addCollectionAndDocuments = async (
  collectionKey: any,
  objectsToAdd: any
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach((obj: any) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections: any) => {
  const transformedCollection = collections.docs.map((doc: any) => {
    const { title, items, engTitle } = doc.data();

    return {
      routeName: encodeURI(engTitle.toLowerCase()),
      title,
      items,
      engTitle,
    };
  });

  return transformedCollection.reduce((accumulator: any, collection: any) => {
    accumulator[collection.routeName] = collection;
    return accumulator;
  }, {});
};

export const convertDirectorySnapshotToMap = (sections: any) => {
  const transformedDirectory = sections.docs.map((doc: any) => {
    const { id, title, engTitle, imageUrl } = doc.data();

    return {
      id,
      title,
      imageUrl,
      engTitle
    };
  });

  return transformedDirectory;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export default firebase;
