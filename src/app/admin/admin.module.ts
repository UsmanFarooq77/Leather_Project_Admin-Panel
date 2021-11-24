import { MaterialModule } from './../shared/material.module';
import { ComponentsModule } from './../components/components.module';
import { AddReviewComponent } from './Review/add-review/add-review.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule} from 'ng2-search-filter'
import { NgxPaginationModule} from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
import { NavComponent } from './nav/nav.component';
import { IndexComponent } from './index/index.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { CommentsComponent } from './comments/comments.component';
import { ViewAllPostsComponent } from './posts/view-all-posts/view-all-posts.component';
import { PostCommentComponent } from './posts/post-comment/post-comment.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { ContactComponent } from './contact/contact.component'; 
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CategoryComponent } from './category/category.component';
import { ReviewsComponent } from './Review/view-all-reviews/reviews.component';
import { ChartsModule } from 'ng2-charts';
import { ViewAllNewsletterComponent } from './view-all-newsletter/view-all-newsletter.component';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgPipesModule,
    MaterialModule,
    ChartsModule
    // BrowserAnimationsModule
  ],
  exports:[
    IndexComponent,
  ],
  declarations: [ 
    NavComponent, IndexComponent, 
    AddPostComponent, CommentsComponent, 
    ViewAllPostsComponent, PostCommentComponent, 
    ProfileComponent, ViewAllUsersComponent, ContactComponent, CategoryComponent, 
    ReviewsComponent, AddReviewComponent, ViewAllNewsletterComponent]
})
export class AdminModule { }
