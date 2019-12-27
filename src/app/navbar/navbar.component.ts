import {DataTranferService} from '../data-tranfer.service';
import {Router} from '@angular/router';
import {BlogService} from '../blog/blog.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  constructor(private dataTransferService: DataTranferService,
              private router: Router,
              private blogService: BlogService) {
  }

  ngOnInit() {
  }

  SearchBlog(event) {
    const keyword = event.target.value;
    if (keyword === '') {
      this.blogService.getBlogList().subscribe(data => {
        const blogs = data;
        this.dataTransferService.setData(blogs);
        this.router.navigateByUrl('/blog');
      });
    } else {
      this.blogService.searchBlogByName(event.target.value).subscribe(data => {
        const blogs = data;
        this.dataTransferService.setData(blogs);
        this.router.navigateByUrl('/blog');
      });
    }
  }

  goToNewBlog() {
    this.router.navigateByUrl('/blog/newBlog');
  }

  goToBlogList() {
    this.blogService.getBlogList().subscribe(data => {
      this.searchInput.nativeElement.value = '';
      const blogs = data;
      this.dataTransferService.setData(blogs);
      this.router.navigateByUrl('/blog');
    });
  }
}
