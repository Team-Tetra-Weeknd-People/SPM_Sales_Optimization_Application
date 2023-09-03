import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  async onSubmit() {
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

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.testForm.value, null, 4));
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  closeResult: string | undefined;

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
