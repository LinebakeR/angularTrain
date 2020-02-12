import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from './model/blogpost';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<BlogPost[]> {
    return this.httpClient.get<BlogPost[]>(`${this.url}/allblogs`);
  }

  getPost(id): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(`${this.url}/blog/${id}`);
  }

  deletePost(id) {
    return this.httpClient.delete(`${this.url}/admin/${id}`);
  }

  createBlogPost(post: BlogPost) {
    return this.httpClient.post<BlogPost>(`${this.url}/create`, post);
  }

  uploadImage(fileToUpload: File) {
    let formData = new FormData();
    formData.append('images', fileToUpload, fileToUpload.name);
    return this.httpClient.post(`${this.url}/images`, formData);
  }

  // catchImg(img): Observable<BlogPost[]> {
  //   return this.httpClient.get<BlogPost[]>(`${this.url}/uploadImg/${img}`);
  // }
}
