import {Injectable} from "@angular/core";

@Injectable()
export class ErrorsHelper {


  public errors: any = {
    login_service: {

    },
    register_service: {
      email: 'Email en uso ó inválido',
      phone_number: 'Número celular en uso ó inválido',
      username: 'Nombre de usuario no disponible'
    },
  }


  generateTotalErrorsRegister(errors: any): string {
    const keyErrors = Object.keys(errors);
    let wordErrors = '';
    let ind = 0;
    for (let key of keyErrors) {
      if(ind == 0){
        wordErrors = wordErrors + this.errors.register_service[key];
        ind +=1;
      }
      else if(ind == (keyErrors.length - 1)){
        wordErrors = wordErrors + ', ' + this.errors.register_service[key].toLowerCase() + '.';
        ind +=1;
      }
      else{
        wordErrors = wordErrors + ', ' + this.errors.register_service[key].toLowerCase();
        ind +=1;
      }
    }
    return wordErrors;
  }

  generateTotalErrorsLogin(errors: any): string {
    return '';
  }

}
