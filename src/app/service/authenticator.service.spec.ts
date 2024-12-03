import { TestBed } from '@angular/core/testing';
import { AuthenticatorService } from './authenticator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { IonicStorageModule } from '@ionic/storage-angular'; 

describe('AuthenticatorService', () => {
  let service: AuthenticatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        IonicStorageModule.forRoot(), 
      ],
    });
    service = TestBed.inject(AuthenticatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
