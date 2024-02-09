import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

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
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  loading = false;
  user: User;
  userId: string;
  birthDate: Date;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialog.closeAll();
  }

  async saveUserDetailsChanges() {
    this.loading = true;
    const theDocToBeUpdated = doc(db, "users", this.userId);
    await updateDoc(theDocToBeUpdated, this.user.toJSON()).then( () => {
      this.loading = false;
      this.dialog.closeAll();
    } );
    
  }
}
