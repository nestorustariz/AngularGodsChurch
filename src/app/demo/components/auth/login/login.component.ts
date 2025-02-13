import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    
    correo: string = '';
    contrasena: string = '';
    
    constructor(private authService: AuthService, private router: Router) { }

    onLogin() {
      const user = {
        username: this.correo,
        password: this.contrasena
      };
    
      this.authService.login(user).subscribe(
        (token: string) => {
          
          console.log('Inicio de sesión exitoso');
          console.log('Token:', token);
          this.router.navigate(['/']);
    
          
        },
        (error: any) => {
          this.router.navigate(['/auth/access']);
        }
      );
    }
    

    iniciarSesion(): void {
      if (this.authService.autenticar(this.correo, this.contrasena)) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/auth/access']);
      }
    }
}
