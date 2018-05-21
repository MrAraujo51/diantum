/*
 * @author: Manuel Araujo
 * Created on 2017-08-05 15:40:47
 */
import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';


@Injectable()
export class ValidateService {

  constructor() { }

  validateSignUp(user) {
    if (user.name === undefined || user.email === undefined || user.username === undefined || user.password === undefined) {
      return false;
    }
    return true;
  }
 // Function to validate e-mail is proper format
  validateEmail(control: AbstractControl) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(control.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

  // Function to validate username is proper format
  validateUsername(control: AbstractControl) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(control.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true } // Return as invalid username
    }
  }

  // Function to validate password
  validatePasswordUpperCase(control: AbstractControl) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[A-Z])/);
    // Test password against regular expression
    if (regExp.test(control.value)) {
      return null; // Return as valid password
    } else {
      return { 'upperCase': true } // Return as invalid password
    }
  }

  validatePasswordLowerCase(control: AbstractControl) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[a-z])/);
    // Test password against regular expression
    if (regExp.test(control.value)) {
      return null; // Return as valid password
    } else {
      return { 'lowerCase': true } // Return as invalid password
    }
  }

  validatePasswordNumber(control: AbstractControl) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[0-9])/);
    // Test password against regular expression
    if (regExp.test(control.value)) {
      return null; // Return as valid password
    } else {
      return { 'number': true } // Return as invalid password
    }
  }

  validatePasswordSpecialCharacter(control: AbstractControl) {
    // Create a regular expression
    const regExp = new RegExp(/(?=(.*[\W]){1,})(?!.*\s)/);
    // Test password against regular expression
    if (regExp.test(control.value)) {
      return null; // Return as valid password
    } else {
      return { 'specialCharacter': true } // Return as invalid password
    }
  }

  validateMatchingPasswords(password: string, confirm: string) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }
}
