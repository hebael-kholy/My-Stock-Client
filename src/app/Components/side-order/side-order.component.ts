import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

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
  status = 'accepted';
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
        this.isloading = false;
        // console.log(this.data);
      },
      error:(err)=>{},
    });
    // this.myService.getPending(this.idUser).subscribe({
    //   next:(res)=>{
    //     this.pendingOrders = res;
    //     console.log(res);
    //    // loop for adding data in array
    //    for(let i = 0; i < (this.pendingOrders.data).length; i++) { // 3
    //      (this.dataPending).push(this.pendingOrders.data[i]);
    //    }
    //    this.isloading = false;
    //    console.log(this.dataPending);
    //   },
    //   error:(err)=>{},
    // });
   
    this.myService.getReject(this.idUser).subscribe({
      next:(res)=>{
        this.rejectOrders = res;
        console.log(res);
       this.isloading = false;
      //  console.log(this.dataReject);
      },
      error:(err)=>{},
    });
    this.getPending();
    //end ngOnIt
  }
  getPending(){
    this.myService.getPending(this.idUser).subscribe({
      next:(res)=>{
        this.pendingOrders = res;
        console.log(res);
       this.isloading = false;
       console.log("this data pending",this.pendingOrders);
      },
      error:(err)=>{},
    });
  }
  accepted(){
    this.status = 'accepted';
  }
  pending(){
    this.status = 'pending';
  }
  rejected(){
    this.status ='rejected';
  }
  searchText:string = '';

  onSearchTextEntered(searchValue:string){
    this.searchText = searchValue;
    console.log(this.searchText);
  }
  deleteOrder(event:any,id:any){
    this.myService.deleteOrder(id,'').subscribe(
      { next:(req)=>{
        console.log(req);
        this.getPending();
        Swal.fire('Deleted successfully ', 'Updated picture', 'success');
      },
      error:(err)=>{console.log(err)}}
      );
  }
}
