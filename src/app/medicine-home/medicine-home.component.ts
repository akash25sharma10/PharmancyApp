import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { MedicineService } from '../service/medicine.service';
import { Medicine } from '../model/Medicine.model';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-medicine-home',
  templateUrl: './medicine-home.component.html',
  styleUrls: ['./medicine-home.component.css']
})
export class MedicineHomeComponent implements OnInit {
  title = 'ABC Pharmancy';
  medicineDetailList: any[] = [];
  filteredDataLength = { count: 0 };  
  queryString: string = "";
  closeResult: string ="";
  medicineItems = {} as Medicine;; 
  isSuccess: boolean = false;
  SelectedDate = new Date();
  options: DatepickerOptions = {
    minYear: (new Date()).getFullYear(),
    position: 'bottom',
    inputClass: 'input',
    calendarClass: 'datepicker-default',
    scrollBarColor: '#010001'
  };
  constructor(private medicineService : MedicineService, private modalService: NgbModal) {    
   }
  

  ngOnInit(): void {
    this.queryString = "";
    this.loadMedicineList();
    this.isSuccess = false;
  }

  loadMedicineList(){
    this.medicineService.getMedicine().subscribe(data=> {
      if (data && data.length > 0) {
        this.medicineDetailList = data;
      }
    });
  }

   public Changebg(Stock: any, ExpiryDate : any):any{    
    let currentDate = new Date();   
    let expiryDate = new Date(ExpiryDate);
    let days=  Math.floor((expiryDate.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);
    if(days < 30)
      return {'background-color':'red', color: 'red'};
    if(Stock < 10)
      return {'background-color':'yellow'}; 
  }

  onsearch(value:any) {
    debugger;
    if (value == "") {
      this.filteredDataLength.count = this.medicineDetailList.length;
    }
  }
  msgRemove() {
    // this.isSuccess = false;
    // $('#saveid').html("");
  }

  onbtnSaveClick(){
    this.medicineItems.ExpiryDate = this.SelectedDate;
    this.medicineService.updateMedicine(this.medicineItems).subscribe(
      data => {
        if (data && data.length > 0) { 
          this.medicineDetailList = data;  
          this.isSuccess = true;                
        }
        else {                     
          this.isSuccess = false;
        }
      });
      this.modalService.dismissAll();    
  }

  open(content: any) {
    this.SelectedDate = new Date();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
 
    if (!reg.test(input)) {
        event.preventDefault();
    }
 }

}
