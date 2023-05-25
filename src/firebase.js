//firebase.js
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCwDyH460n2koaZU5EEp479xgljSzPkgF8",
    authDomain: "practice-6bae6.firebaseapp.com",
    projectId: "practice-6bae6",
    storageBucket: "practice-6bae6.appspot.com",
    messagingSenderId: "272580016930",
    appId: "1:272580016930:web:fd9aecedd0eb9bfda1037b",
    measurementId: "G-ZHZ6XS0VYD"
  };

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };