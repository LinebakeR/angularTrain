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
  isChange = false;
  imgMounted: File = null;


  constructor(
    private fb: FormBuilder,
    private blogPostService: BlogpostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.blogPostId = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogPostService.getPost(this.blogPostId).subscribe(
      data => {
        this.blogpost = data;
        console.log('data can be edit', this.blogpost[0]);
      },
      error => console.log('Error', error),
    );
    this.createForm();
    console.log('IMAGE: ', this.updatefileToUpload)
    console.log('isCHange?: ', this.isChange)
    console.log('imgMounted?: ', this.imgMounted)
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
    console.log('blogpost', this.blogpost[0]);

    if (this.editForm.valid) {
      if (this.blogpost[0] !== '') {
        if (this.isChange) {
          this.blogPostService.uploadImage(this.updatefileToUpload).subscribe(
            data => console.log('imgUpload', data),
            error => console.log('error when update img', error),
          );
        }
        this.blogPostService.editBlogPost(this.blogPostId, this.editForm.value).subscribe(
          data => console.log('data uploaded with no img change', data),
          error => console.log('error when uploaded data', error),
        );

        if (this.editForm.value) {
          this.router.navigate(['']);
        }
      }
    }
  }

  handleFileUpdate(event) {
    this.updatefileToUpload = event.target.files[0];
    if (this.updatefileToUpload) {
      this.isChange = true;
      console.log('uploaded file', this.updatefileToUpload);
      console.log('uploaded file', this.isChange);
    }
    if (!this.isChange) {
      this.updatefileToUpload === this.blogpost[0].images
    }

  }
}
