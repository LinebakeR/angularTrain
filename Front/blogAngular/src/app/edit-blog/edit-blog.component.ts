import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { BlogpostService } from '../blogpost-service';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../model/blogpost';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
  editForm: FormGroup;
  blogPostId: String;
  blogpost: BlogPost;
  updatefileToUpload: File = null;

  constructor(
    private fb: FormBuilder,
    private blogPostService: BlogpostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.blogPostId = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogPostService.getPost(this.blogPostId).subscribe(
      data => {
        if (data[0].content) {
          this.blogpost = data;
          console.log('data edit', data);
          console.log('this.blogpost', this.blogpost);
        }
      },
      error => console.log('Error', error),
    );
    this.createForm();
  }

  createForm() {
    this.editForm = this.fb.group({
      title: '',
      subtitle: '',
      content: '',
      images: '',
    });
  }

  updateBlog() {
    console.log('first blogpost', this.blogpost[0].content);

    if (this.editForm) {
      if (this.blogpost[0] !== '') {
        console.log('editForm.value', this.editForm.value.title);
        if (this.updatefileToUpload) {
          this.blogPostService.uploadImage(this.updatefileToUpload).subscribe(
            data => console.log('imgUpload', data),
            error => console.log('error when update img', error),
          );
        }
        this.blogPostService.editBlogPost(this.blogPostId, this.editForm.value).subscribe(
          data => console.log('data uploaded', data),
          error => console.log('error when uploaded data', error),
        );
        if (this.editForm.value) {
          this.router.navigate(['']);
        }
      }
    } else if (this.editForm) {
      this.blogPostService.editBlogPost(this.blogPostId, this.editForm.value).subscribe(
        data => (this.updatefileToUpload = null),
        error => console.log('error2', error),
      );
      this.router.navigate(['']);
    }
  }

  handleFileUpdate(event) {
    if (this.updatefileToUpload) {
      this.updatefileToUpload = event.target.files[0];
    } else {
      this.updatefileToUpload = null;
    }
    console.log('uploaded file', this.updatefileToUpload);
  }
}
