import { ViewAllNewsletterComponent } from './view-all-newsletter/view-all-newsletter.component';
import { ReviewsComponent } from './Review/view-all-reviews/reviews.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { ViewAllPostsComponent } from './posts/view-all-posts/view-all-posts.component';
import { PostCommentComponent } from './posts/post-comment/post-comment.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryComponent } from './category/category.component';
import { GuardsGuard } from '../auth-guard/guards.guard';
import { AddReviewComponent } from './Review/add-review/add-review.component';

const routes: Routes = [
  { path: 'dashboard', component: IndexComponent, canActivate: [GuardsGuard] },
  { path: 'add-post/:id', component: AddPostComponent, canActivate: [GuardsGuard] },
  { path: 'add-post', component: AddPostComponent, canActivate: [GuardsGuard] },
  { path: 'view-all-posts', component: ViewAllPostsComponent, canActivate: [GuardsGuard] },
  { path: 'category', component: CategoryComponent, canActivate: [GuardsGuard] },
  { path: 'post-comments', component: PostCommentComponent, canActivate: [GuardsGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [GuardsGuard] },
  { path: 'view-all-users', component: ViewAllUsersComponent, canActivate: [GuardsGuard] },
  { path: 'contacts', component: ContactComponent, canActivate: [GuardsGuard] },
  { path: 'add-review', component: AddReviewComponent, canActivate: [GuardsGuard] },
  { path: 'add-review/:id', component: AddReviewComponent, canActivate: [GuardsGuard] },
  { path: 'view-all-reviews', component: ReviewsComponent, canActivate: [GuardsGuard] },
  { path: 'newsletter', component: ViewAllNewsletterComponent, canActivate: [GuardsGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
