import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService],
})
export class HomeComponent {

  constructor(private messageService: MessageService, private fb:FormBuilder, private modalService: NgbModal) { }
    
  ngOnInit(): void { }


closeResult = '';
reactiveForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', Validators.required],
  phone: ['', [Validators.required, Validators.email]],
  textarea: ['', Validators.required] 
});

onSubmit(){
    if (this.reactiveForm.valid) {
        this.messageService.add({ severity: 'success', summary: 'Toast Message', detail: 'Form submitted successfully!' });
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
