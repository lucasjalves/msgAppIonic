import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {UsuarioService} from '../service/usuario.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';


@Injectable()
export class AuthGuardRoutes implements CanActivate {

    constructor(private service: UsuarioService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const usuarioLogado: string = localStorage.getItem('usuario');
        if (usuarioLogado) {
            return true;
        }

        this.router.navigateByUrl('/home');
        return false;
    }
}
