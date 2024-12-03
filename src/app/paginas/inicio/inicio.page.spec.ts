import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para pruebas de HttpClient
import { IonicStorageModule } from '@ionic/storage-angular'; // Para pruebas de almacenamiento
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Storage } from '@ionic/storage-angular';  // Importar el Storage para poder inyectarlo

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;
  let storage: Storage;

  beforeEach(async () => {
    // Proveer el almacenamiento correctamente
    await TestBed.configureTestingModule({
      declarations: [InicioPage],
      imports: [
        HttpClientTestingModule,  // Para pruebas de HttpClient
        IonicStorageModule.forRoot(),  // Asegura que Storage esté disponible
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Ignora elementos desconocidos
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    storage = TestBed.inject(Storage);  // Inyectar Storage

    // Simular el valor de username en el Storage
    spyOn(storage, 'get').and.returnValue(Promise.resolve({ username: '' }));  // Simula la respuesta del Storage

    // Esperar a que la promesa se resuelva y los cambios sean detectados
    await fixture.whenStable();  // Asegura que todas las promesas pendientes se resuelvan
    fixture.detectChanges();  // Detectar cambios después de que la promesa se haya resuelto
  });

  it('should create', async () => {
    // Asegurarse de que el componente se crea correctamente
    expect(component).toBeTruthy();

    // Esperar a que el valor de username se haya cargado correctamente
    await fixture.whenStable();  // Espera a que las promesas pendientes se resuelvan

    // Verificar el valor cargado en userStorage después de haber esperado
    expect(component.userStorage.username).toBe('');  // Verificar que el username se ha asignado correctamente
  });
});
