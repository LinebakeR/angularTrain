import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from '../model/blogpost';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css'],
})
export class BlogpostComponent implements OnInit {
  blogpost$: Observable<BlogPost>;
  id;
  blogs: {};

  constructor(private activatedRoute: ActivatedRoute, private blogpostService: BlogpostService) {}

  getBlog(id) {
    this.id = id;
    id = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogpost$ = this.blogpostService.getPost(id);

    console.log('blogpost', this.blogpost$);
  }

  ngOnInit() {
    this.getBlog(this.id);
  }
}
