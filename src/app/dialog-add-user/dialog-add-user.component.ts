import { Component, OnInit } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { addDoc, collection, getFirestore, doc, setDoc} from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDaSVE2mNKWcxWezVKTIfJoUkeHTEwxHjQ",
  authDomain: "simple-crm-f3ccd.firebaseapp.com",
  projectId: "simple-crm-f3ccd",
  storageBucket: "simple-crm-f3ccd.appspot.com",
  messagingSenderId: "293925838176",
  appId: "1:293925838176:web:e396eaad7d044db85ed205"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate: Date;
  loading = false;

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {

  }

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    // console.log('Current user is', this.user);
    const newDocRef = doc(collection(db, "users"));
    // await addDoc(collection(db, "users"),this.user.toJSON());
    await setDoc(
      newDocRef, 
      {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        birthDate: this.user.birthDate,
        street: this.user.street,
        zipCode: this.user.zipCode,
        city: this.user.city,
        id: newDocRef.id
      }
  )
    this.closeDialog();
    this.loading = false;
  }

  closeDialog(){
    this.dialog.closeAll()
  }
}