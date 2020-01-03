import {Component, OnInit} from '@angular/core';
import {Tag} from '../tag';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {BlogService} from '../blog.service';
import {Blog} from '../blog';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})


export class BlogCreateComponent implements OnInit {
  ckEditorConfig = {
    extraPlugins: 'uploadimage',
    width: 1100,
    height: 500,
    filebrowserUploadUrl: 'http://localhost:4200/api/upload',
    filebrowserUploadMethod: 'form',
    toolbarGroups: [
      {name: 'insert', groups: ['insert']},
      '/',
      // {name: 'document', groups: ['mode', 'document', 'doctools']},
      // {name: 'clipboard', groups: ['clipboard', 'undo']},
      {name: 'editing', groups: ['find', 'selection']},
      '/',
      {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
      {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
      {name: 'links', groups: ['links']},
      '/',
      {name: 'styles', groups: ['styles']},
      {name: 'colors', groups: ['colors']},
    ]
  };
  // Editor = ClassicEditor;
  // editorConfig = {
  //   UploadUrl: 'http://localhost:4200/api/upload',
  //   UploadMethod: 'form',
  // };
  tagList: Tag[];
  BlogForm: FormGroup;
  blog: Blog;
  currentThumpnail: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private blogService: BlogService) {
  }

  ngOnInit() {
    this.loadTagList();
    this.BlogForm = this.fb.group({
      tittle: [''],
      description: [''],
      thumbnail: [''],
      tagList: this.fb.array([]),
      content: []
    });
  }

  loadTagList() {
    this.blogService.getTag().subscribe(data => {
      this.tagList = data;
    });
  }

  onSubmit() {
    if (confirm('Are You Sure?')) {
      this.blogService.createNewBlog(this.BlogForm.value).subscribe(data => {
        console.log(data);
        this.blog = data;
        alert('Create Blog: ' + this.blog.tittle);
        this.router.navigateByUrl('/blog');
      });
    }
  }

  onChangeBox(id: number, checked: boolean) {
    const tagFormArray = <FormArray> this.BlogForm.controls.tagList;

    if (checked) {
      tagFormArray.push(new FormControl(id));
    } else {
      let index = tagFormArray.controls.findIndex(x => x.value === id);
      tagFormArray.removeAt(index);
    }
  }

  onChangeThumpnailUrl(event) {
    this.currentThumpnail = event.target.value;
  }
}
