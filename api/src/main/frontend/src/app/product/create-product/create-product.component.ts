import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../product";
import {FileService} from "../../common/file.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  createForm: FormGroup;
  submitted = false;
  fileName:string;


  constructor(private productService: ProductService,
              private fileService: FileService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm = this.fb.group({
      file: new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required])
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0];

      // single upload
      /*
      const file = event.target.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append('file', file);
      this.fileService.upload(formData).subscribe(
        data=>console.log(data),
        error => console.log(error)
      )*/

      // multi upload
 /*     console.log(event.target.files);
      let data = new FormData();
      for (var i = 0; i < event.target.files.length; i++) {
       data.append("files", event.target.files[i], event.target.files[i].name);
      }
     this.fileService.multiUpload(data).subscribe(
        data=>console.log(data),
        error => console.log(error)
      )*/
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  onCreateProductFormSubmit(form: FormGroup) {
    this.submitted = true;
   /* this.productService.create(form.value)
      .subscribe(data => console.log(data), err => console.log(err))*/

    const formData = new FormData();
    formData.append('file', this.fileName);
    this.fileService.upload(formData).subscribe(
      data=> {

          form.value['image'] = data['url'];

        this.productService.create(form.value)
          .subscribe(data => console.log(data), err => console.log(err))

        },
      error => console.log(error)
    )



  }

}
