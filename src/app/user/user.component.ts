import { Component, OnInit } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, collection, query } from "firebase/firestore";

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
const q = query(collection(db, "users"));



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User = new User();
  users = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    onSnapshot(q, (querySnapshot) => {
      this.users = [];
      querySnapshot.forEach((doc) => {
        this.users.push(doc.data());
      });
      console.log(this.users);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }

}








