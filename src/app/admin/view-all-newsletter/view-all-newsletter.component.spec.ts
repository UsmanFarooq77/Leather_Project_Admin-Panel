import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllNewsletterComponent } from './view-all-newsletter.component';

describe('ViewAllNewsletterComponent', () => {
  let component: ViewAllNewsletterComponent;
  let fixture: ComponentFixture<ViewAllNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
