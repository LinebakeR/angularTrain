import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlogpostService } from '../blogpost-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogpost-creation',
  templateUrl: './blogpost-creation.component.html',
  styleUrls: ['./blogpost-creation.component.css'],
})
export class BlogpostCreationComponent implements OnInit {
  creationForm: FormGroup;
  fileToUpload: File = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private blogPostService: BlogpostService,
    private el: ElementRef,
  ) {}

  ngOnInit() {
    this.createForm();
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
      console.log('formGrp', this.creationForm);
      this.blogPostService.createBlogPost(this.creationForm.value).subscribe(
        data => this.handleSuccess(data),
        error => this.handleError(error),
      );
      if (this.creationForm.value) {
        this.router.navigate(['']);
      }
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item[0];
  }

  handleSuccess(data) {
    console.log('Post send', data);
  }
  handleError(error) {
    console.log('Error when try to send post', error);
  }
}
