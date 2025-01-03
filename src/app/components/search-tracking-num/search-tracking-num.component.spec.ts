import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrackingNumComponent } from './search-tracking-num.component';

describe('SearchTrackingNumComponent', () => {
  let component: SearchTrackingNumComponent;
  let fixture: ComponentFixture<SearchTrackingNumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTrackingNumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTrackingNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
