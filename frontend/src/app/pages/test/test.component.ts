import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  tests: any;
  testForm!: FormGroup;
  submitted = false;
  path: String = '';
  testID: String = '';

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private fireStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    let response = this.http.get('http://localhost:8090/test/');
    response.subscribe((data) => (this.tests = data));

    //validation
    this.testForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      number: [
        null,
        [Validators.required, Validators.min(5), Validators.max(20)],
      ],
      email: ['', [Validators.required, Validators.email]],
      image: ['', [Validators.required]],
    });
  }

  upload(event: any) {
    this.path = event.target.files[0];
  }

  async onSubmitAdd() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.testForm.invalid) {
      return;
    }

    //image upload
    const uploadTask = await this.fireStorage.upload(
      '/test/' + Math.random() + this.path,
      this.path
    );
    const url = await uploadTask.ref.getDownloadURL();
    console.log(url);

    //add data to database
    let response = this.http.post('http://localhost:8090/test/', {
      name: this.testForm.value.name,
      number: this.testForm.value.number,
      email: this.testForm.value.email,
      image: url,
    });
    response.subscribe((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Your data has been saved',

        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        let response = this.http.get('http://localhost:8090/test/');
        response.subscribe((data) => (this.tests = data));
        this.modalService.dismissAll();
      });
    });
  }

  async onSubmitEdit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.testForm.invalid) {
      return;
    }

    //image upload
    const uploadTask = await this.fireStorage.upload(
      '/test/' + Math.random() + this.path,
      this.path
    );
    const url = await uploadTask.ref.getDownloadURL();
    console.log(url);

    //edit data to database
    let response = this.http.put('http://localhost:8090/test/' + this.testID, {
      name: this.testForm.value.name,
      number: this.testForm.value.number,
      email: this.testForm.value.email,
      image: url,
    });
    response.subscribe((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Your data has been updated',

        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        let response = this.http.get('http://localhost:8090/test/');
        response.subscribe((data) => (this.tests = data));
        this.modalService.dismissAll();
      });
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  closeResult: string | undefined;

  openAdd(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.testForm.reset();
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
          this.testForm.reset();
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openEdit(content: any, id: any) {
    this.testID = id;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.testForm.reset();
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
          this.testForm.reset();
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

    let response = this.http.get('http://localhost:8090/test/' + id);
    response.subscribe((data) => {
      this.testForm.patchValue(data);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
