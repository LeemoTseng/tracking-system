import { Component, inject, input, OnInit, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-language-selected',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './language-selected.component.html',
})
export class LanguageSelectedComponent implements OnInit {


  // Cookie
  // document:Document = inject(Document)
  // constructor(@Inject(DOCUMENT) private document: Document){

  // }

  // lifrcycle
  ngOnInit(): void {
    // get cookie
    this.selectedLanguage = this.getCookie(this.selectedLanguage) || 'en';
    console.log('get cookie', this.selectedLanguage);
    
  }


  // language
  selectedLanguage: string = 'en';
  languageInput = input<string>();
  languageOutput = output<string>();



  // Select language
  selectLanguage(e: any) {
    const selectedLanguage: string = e.target.value;
    this.setSelectedLanguage();
    // set cookie
    this.clearCookie('language');
    this.setCookie('language', selectedLanguage, 3600);
  }

  //set selected language in element
  setSelectedLanguage() {
    const selectedOption = document.querySelector('option[selected]');
    if (selectedOption) {
      this.selectedLanguage = selectedOption.getAttribute('value') || 'en';
    }
  }
// Output language
  outputLanguage() {
    this.languageOutput.emit(this.selectedLanguage)
    console.log('outputLanguageIsSent!', this.selectedLanguage);
  }


  // Cookies operation

  setCookie(name: string, value: string, exdays: number) {
    if (this.selectedLanguage.trim() !== '') {
      document.cookie = `${name}=${value}; path=/; max-age=${exdays}`
    } else {
      console.log('No language selected');
    }
  }

  getCookie(language: string) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0].trim() === language) {
        return cookie[1];
      }
    }
    return null;
  }

  clearCookie(name: string) {
    document.cookie = `${name}=; path=/; max-age=0`;
  }




}
