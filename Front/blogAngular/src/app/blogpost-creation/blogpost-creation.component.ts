import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlogpostService } from '../blogpost-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogpost-creation',
  templateUrl: './blogpost-creation.component.html',
  styleUrls: ['./blogpost-creation.component.css'],
})
export class BlogpostCreationComponent implements OnInit {
  creationForm: FormGroup;
  fileToUpload: File = null;


  constructor(private router: Router, private fb: FormBuilder, private blogPostService: BlogpostService) { }

  ngOnInit() {
    this.createForm();
    console.log('filetouploadatLoad', this.fileToUpload)
  }

  createForm() {
    this.creationForm = this.fb.group({
      title: '',
      subTitle: '',
      content: '',
      images: '',
    });
  }

  createBlog() {
    if (this.creationForm.valid) {
      if (this.fileToUpload) {
        this.blogPostService.uploadImage(this.fileToUpload).subscribe(
          data => console.log('image', data),
          error => console.log('error', error),
        );
      }
      console.log('formGrp', this.creationForm);
      this.blogPostService.createBlogPost(this.creationForm.value).subscribe(
        data => console.log('DATA posted', data),
        error => this.handleError(error),
      );
      if (this.creationForm.value) {
        this.router.navigate(['']);
      }
    } else {
      if (this.creationForm.valid) {
        if (this.fileToUpload === null)
          this.blogPostService.createBlogPost(this.creationForm.value).subscribe(
            data => (this.fileToUpload = null),
            error => this.handleError(error),
          );
      }
    }
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload === null) {
      this.fileToUpload === null
    }
    console.log('uploaded file', this.fileToUpload);
  }

  handleSuccess(data) {
    console.log('Post send', data);
  }
  handleError(error) {
    console.log('Error when try to send post', error);
  }
}
