import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-side-order',
  templateUrl: './side-order.component.html',
  styleUrls: ['./side-order.component.css']
})
export class SideOrderComponent implements OnInit {
  imagePath: any;
  idUser:any;
  user:any;
  acceptorders:any;
  pendingOrders:any;
  rejectOrders:any;
  data:any[] =[];
  dataPending:any[] =[];
  dataReject:any[] =[];
  statusAccept = true;
  statusPending = false;
  statusReject = false;
  title :any;
  isloading = true;
  constructor(myActivated: ActivatedRoute, public myService: UserService) {}
  ngOnInit(): void {
    this.idUser = localStorage.getItem('id');
    this.imagePath = localStorage.getItem('image');

    this.myService.getOneUser(this.idUser).subscribe({
      next: (res) => {
        this.user = res;
        console.log(this.user);
        // console.log(this.user.data[0].gender);
      },
      error(err) {
        console.log(err);
      },
    });
    this.myService.getAccept(this.idUser).subscribe({
      next:(res)=>{
        this.acceptorders = res;
         console.log(res);
        // loop for adding data in array
        for(let i = 0; i < (this.acceptorders.data).length; i++) { // 3
          (this.data).push(this.acceptorders.data[i]);
        }
        this.isloading = false;
        console.log(this.data);
      },
      error:(err)=>{},
    });
    this.myService.getPending(this.idUser).subscribe({
      next:(res)=>{
        this.pendingOrders = res;
        console.log(res);
       // loop for adding data in array
       for(let i = 0; i < (this.pendingOrders.data).length; i++) { // 3
         (this.dataPending).push(this.pendingOrders.data[i]);
       }
       this.isloading = false;
       console.log(this.dataPending);
      },
      error:(err)=>{},
    });
    this.myService.getReject(this.idUser).subscribe({
      next:(res)=>{
        this.rejectOrders = res;
        console.log(res);
       // loop for adding data in array
       for(let i = 0; i < (this.rejectOrders.data).length; i++) { // 3
         (this.dataReject).push(this.rejectOrders.data[i]);
       }
       this.isloading = false;
       console.log(this.dataReject);
      },
      error:(err)=>{},
    });

    //end ngOnIt
  }
  accepted(){
    this.statusAccept = true;
    this.statusPending = false;
    this.statusReject = false;
    console.log("accept");
  }
  pending(){
    this.statusPending = true;
    this.statusAccept = false;
    this.statusReject = false;
    console.log("pending");
  }
  rejected(){
    this.statusPending = false;
    this.statusAccept = false;
    this.statusReject = true;
    console.log("rejected");
  }

  search(){
    if(this.title ==""){
      this.ngOnInit();
    }else{
      this.acceptorders = this.acceptorders.filter((res: { title: string; })=>{
        return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
      })
    }
  }
}
