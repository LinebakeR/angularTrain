import { Component, OnInit, ɵConsole } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../model/blogpost';
import { BlogpostComponent } from '../blogpost/blogpost.component';
import { BlogpostService } from '../blogpost-service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: [ './admin.component.css' ]
})
export class AdminComponent implements OnInit {
	allPost: BlogPost[];

	constructor(private blogpostService: BlogpostService) {}

	deleteBlogPosts(id) {
		this.blogpostService.deletePost(id).subscribe((data) => {
			this.allPost = this.allPost.filter((elem) => {
				return elem.id === id;
			});
			this.refresh();
		});
	}

	refresh() {
		this.blogpostService.getAllPosts().subscribe((data) => {
			console.log('DATA', data);
			this.allPost = data;
		});
	}

	ngOnInit() {
		this.refresh();
	}
}
