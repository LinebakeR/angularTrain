import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../model/blogpost';
import { Observable } from 'rxjs';
import { BlogpostService } from '../blogpost-service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css'],
})
export class BlogpostListComponent implements OnInit {
  blogPostList$: Observable<BlogPost[]>;
  blogPostImg$: Observable<BlogPost[]>;
  img;
  imagePath = environment.imagePath;
  isImg = false;

  constructor(private blogpostService: BlogpostService) { }

  ngOnInit() {
    this.blogPostList$ = this.blogpostService.getAllPosts();
    this.getAllPost();
  }

  getAllPost() {
    this.blogPostList$ = this.blogpostService.getAllPosts();
    this.blogPostList$.subscribe(data => {
      console.log('DATA', data)
      for (let img of data) {
        if (img.images) {
          this.isImg = true;

        } else {
          delete img.images;
        }
      }
      // console.log('data', data);
    });
  }
}
