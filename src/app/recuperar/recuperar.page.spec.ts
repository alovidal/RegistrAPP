import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarPage } from './recuperar.page';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar HttpClientTestingModule

describe('RecuperarPage', () => {
  let component: RecuperarPage;
  let fixture: ComponentFixture<RecuperarPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarPage],
      imports: [HttpClientTestingModule],  // Añadir HttpClientTestingModule
    });

    fixture = TestBed.createComponent(RecuperarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
