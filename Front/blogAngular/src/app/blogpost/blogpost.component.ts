import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from '../model/blogpost';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css'],
})
export class BlogpostComponent implements OnInit {
  blogpost$: Observable<BlogPost>;
  id;
  blogs: {};
  imagePath = environment.imagePath;
  isImg = true;

  constructor(private activatedRoute: ActivatedRoute, private blogpostService: BlogpostService) { }

  getBlog(id) {
    this.id = id;
    id = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogpost$ = this.blogpostService.getPost(id);
    this.blogpost$.subscribe(data => {
      console.log('DATAblogpost', data)
      if (data && !data[0].images) {
        delete data[0].images
        this.isImg = false;
      }
    })
  }

  ngOnInit() {
    this.getBlog(this.id);
  }
}
