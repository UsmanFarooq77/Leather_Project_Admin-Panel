import { booking } from '../interfaces/booking';
import { comment } from '../interfaces/comment';
import { Product } from '../interfaces/Product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { contact } from '../interfaces/contact';
import { Review } from '../interfaces/review';
import { newsletter } from '../interfaces/newsletter';
@Injectable()
export class AdminserviceService {
  constructor(private db: AngularFireDatabase) { }
  addCategory(category, categoryname) {
    const toSend = this.db.object('/categories/' + categoryname)
    return toSend.set(category);
  }
  getCategories() {
    return this.db.list('/categories');
  }
  deleteCategories(key) {
    return this.db.object('/categories/' + key).remove();
  }
  updateCategory(category, categoryname) {
    this.db.object('/categories/' + categoryname).remove();
    return this.db.object('/categories/' + category.name).update(category);
  }
  addPost(addpost) {
    return this.db.list('/addpost').push(addpost);
  }
  getPost() {
    return this.db.list('/addpost');
  }
  delete(deleteId) {
    return this.db.object('/addpost/' + deleteId).remove();
  }
  updatePost(updateId, addpost) {
    return this.db.object('/addpost/' + updateId).update(addpost);
  }
  updatePostStatus(key, Status) {
    return this.db.object('/addpost/' + key).update({ post_status: Status });
  }
  getIdObject(idObject): FirebaseObjectObservable<Product> {
    return this.db.object('/addpost/' + idObject);
  }
  // addBooking(booking, key){
  //   const toSend= this.db.object('/booking/'+key);
  //   return toSend.set(booking)
  // }
  addBooking(booking) {
    const toSend = this.db.list('/booking').push(booking);
    return toSend;
  }
  getUsers(): FirebaseListObservable<booking[]> {
    return this.db.list('/booking');
  }
  getIdUser(idUser): FirebaseObjectObservable<booking> {
    return this.db.object('/booking/' + idUser);
  }
  deleteUser(key) {
    return this.db.object('/booking/' + key).remove();
  }
  addContact(contact) {
    return this.db.list('/contact').push(contact);
  }
  getContact(): FirebaseListObservable<contact[]> {
    return this.db.list('/contact');
  }
  deleteContact(key) {
    return this.db.object('/contact/' + key).remove();
  }
  // addComment(comment,key){
  //   const toSend= this.db.list('/comment/'+key).push(comment);
  //   return toSend;
  // }
  addComment(comment) {
    return this.db.list('/comment').push(comment);
  }
  getComment(): FirebaseListObservable<comment[]> {
    return this.db.list('/comment');
  }
  deleteComment(key) {
    return this.db.object('/comment/' + key).remove();
  }
  updateComment(key, approved, toggle) {
    return this.db.object('/comment/' + key).update({ comment_status: approved, comment_toggle: toggle })
  }

  addReview(addreview){
    return this.db.list('/addReview').push(addreview)
  }
  getReviews() : FirebaseListObservable<Review[]>{
    return this.db.list('/addReview');
  }

  updateReview(key,review){
    return this.db.object('/addReview/'+key).update(review)
  }
  getReviewObject(key): FirebaseObjectObservable<Review>{
    return this.db.object('/addReview/'+key)
  }
  deleteReview(reviewId){
    return this.db.object('/addReview/'+reviewId).remove();
  }
  getNewsLetter() : FirebaseListObservable<newsletter[]>{
    return this.db.list('/newsletter');
  }
  deleteNewsletter(key){
    return this.db.object('/newsletter/'+key).remove();
  }
}
