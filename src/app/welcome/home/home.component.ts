import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
// import {Swiper} from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

declare var Swiper: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService],
})
export class HomeComponent {

  constructor(private messageService: MessageService, private fb:FormBuilder, private modalService: NgbModal) { }
    
  
  ngOnInit(): void {
    var mySwiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
    
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-prev',
        prevEl: '.swiper-button-next',
      },
    
      // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
      
    });
    var swiperTimer = setInterval(function () {
      mySwiper.slideNext();
  }, 2000);


   }
   
   

closeResult = '';


reactiveForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', Validators.required],
  phone: ['', [Validators.required]],
  textarea: ['', Validators.required] 
});


onSubmit(){
    if (this.reactiveForm.valid) {
        this.messageService.add({ severity: 'success', summary: 'Submitted Successfully', detail: 'We Will Reach Out To You' });
        }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form is not valid. Please check the fields.'
      });
    }
  }


open(content: TemplateRef<any>) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
}

private getDismissReason(reason: any): string {
      switch (reason) {
        case ModalDismissReasons.ESC:
          return 'by pressing ESC';
        case ModalDismissReasons.BACKDROP_CLICK:
          return 'by clicking on a backdrop';
        default:
          return `with: ${reason}`;
      }
    }
}
