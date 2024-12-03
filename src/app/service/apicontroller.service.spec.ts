import { TestBed } from '@angular/core/testing';
import { ApicontrollerService } from './apicontroller.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar el módulo de prueba para HttpClient

describe('ApicontrollerService', () => {
  let service: ApicontrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Proporciona HttpClient para pruebas
    });
    service = TestBed.inject(ApicontrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
