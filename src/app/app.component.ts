import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationExtras } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private storage: StorageService, private router: Router) {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        const body = document.body;
        if (event.url === '/scanner') {
          body.classList.add('page-scanner');
        } else {
          body.classList.remove('page-scanner');
        }
      }
    });
  }

  async ngOnInit() {
    try {
      const estado = await this.storage.get("estado");
      if (estado) {
        const usuarioObtenido = await this.storage.get("usuario");
        if (usuarioObtenido) {
          let navigationExtras: NavigationExtras = {
            state: {
              usurname: usuarioObtenido.username,
              email: usuarioObtenido.email,
              password: usuarioObtenido.password,
              sede: usuarioObtenido.sede,
              asignaturas: usuarioObtenido.asignaturas,
            }
          }
          this.router.navigate(["/inicio"], navigationExtras);
        } else {
          this.router.navigate(["/home"]);
        }
      } else {
        this.router.navigate(["/home"]);
      }
    } catch (error) {
      console.error('Error al inicializar la aplicación:', error);
      this.router.navigate(["/home"]);
    }
  }
  

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
