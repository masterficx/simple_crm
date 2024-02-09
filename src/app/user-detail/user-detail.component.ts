import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

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
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  
  userId = "";
  docRef;
  user: User = new User();

  constructor(private route: ActivatedRoute, public dialog : MatDialog) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      this.docRef = doc(db, "users", this.userId);
      console.log('The id is', this.userId);
      this.getTheFreaikinDocument();
    })
  }

  async getTheFreaikinDocument(){
    let theUser = (await getDoc(this.docRef)).data();
    this.user = new User(theUser);
  }

 
  openEditUserAddressDialog(){
    const addressDialog = this.dialog.open(DialogEditAddressComponent);
    addressDialog.componentInstance.user = new User(this.user.toJSON());
    addressDialog.componentInstance.userId = this.userId;
    
  }

  openEditUserDetailsDialog(){
    const userDetailDialog = this.dialog.open(DialogEditUserComponent);
    userDetailDialog.componentInstance.user = new User(this.user.toJSON());
    userDetailDialog.componentInstance.userId = this.userId;
  }

 
}
