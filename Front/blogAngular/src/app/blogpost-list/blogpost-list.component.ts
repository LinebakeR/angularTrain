import { Component, OnInit } from "@angular/core";
import { BlogPost } from "../model/blogpost";
import { Observable } from "rxjs";
import { BlogpostService } from "../blogpost-service";

@Component({
  selector: "app-blogpost-list",
  templateUrl: "./blogpost-list.component.html",
  styleUrls: ["./blogpost-list.component.css"]
})
export class BlogpostListComponent implements OnInit {
  blogPostList$: Observable<BlogPost[]>;

  constructor(private blogpostService: BlogpostService) {}

  ngOnInit() {
    this.blogPostList$ = this.blogpostService.getAllPosts();
  }
}
