import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import the RouterModule here
import { Subscription } from 'rxjs';
import { NavbarService } from '../../services/navbarService/navbar.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../services/translateService/translate.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
userActive: any;

  currentTheme = 'dark';

  languageSelected = 'es';

  banderaUrl: string = '';

  currentLanguage: string | undefined;

  textoIdioma = '';

  selectedOption: string | undefined;
  private subscription: Subscription = new Subscription;
  selectedLanguage: string | undefined;
  activeUser: any;
  isRolAdmin = false

  constructor( 
    private navbarService: NavbarService,
    public translate: TranslateService,
    public translationService: TranslationService,
    private usersService: UsersService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.subscription = this.navbarService.selectedOption$.subscribe(option => {
      this.selectedOption = option;
    });
    this.usersService.getCurrentUser().subscribe(user => {
      this.userActive = user?.data || '';
      this.isRolAdmin = this.userActive.data.rol === 'admin';
      console.log(this.isRolAdmin,'isrolAdmin');
      
      console.log(this.userActive.data.rol, 'navbar');
    }); 
    this.translate.setDefaultLang('es');
    this.translationService.getCurrentLanguage().subscribe(lang => {
      //this.currentLanguage = lang;
      //this.updateFlag(lang); // Método que cambia la bandera
      console.log(lang);
      this.textoIdioma =  lang.charAt(0).toUpperCase() + lang.slice(1);
      this.currentLanguage =this.pintarIdioma(lang);
      console.log(this.currentLanguage);

      
      
      
    });
    //this.languageActual();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectOption(option: string) {
    this.navbarService.setSelectedOption(option);
    //this.selectedOption = option;
    this.toggleNavbar();
  }

  toggleNavbar() {
    this.navbarService.collapseNavbar();
    
  }

  useLanguage(language: string){
    console.log('entro', language);  
    this.languageSelected = language;
    this.selectedLanguage = language;
    this.translationService.changeLanguage(language);  
    this.toggleNavbar();
  }

  // languageActual(){
  //   const prueba = this.translationService.getCurrentLanguage();  
  //   this.banderaUrl = this.pintarIdioma(prueba);
  //   console.log(this.banderaUrl);
    
  // }

  pintarIdioma(idioma: string): string {
    let rutaBandera = '';
  
    switch (idioma) {
      case 'es': // Español
        rutaBandera = '../../../assets/images/spain.png';
        break;
      case 'en': // Inglés
        rutaBandera = '../../../assets/images/england.png';
        break;
      case 'euz': // Euskera
        rutaBandera = '../../../assets/images/ikurrina.png';
        break;
      default:
        rutaBandera = '../../../assets/images/spain.png';
    }
  
    return rutaBandera;
  }

  logout(): void {
    this.usersService.clearCurrentUser();
    this.router.navigate(['login'])
 }

}
