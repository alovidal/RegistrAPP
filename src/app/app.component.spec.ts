import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular'; 
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        IonicModule.forRoot(), 
        IonicStorageModule.forRoot(),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} }, // Proveer un mock vacío para ActivatedRoute
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

