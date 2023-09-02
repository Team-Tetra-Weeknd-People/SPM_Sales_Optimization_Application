import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  tests:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let response = this.http.get("http://localhost:8090/test/");
    response.subscribe((data) => this.tests = data);
  }

}
