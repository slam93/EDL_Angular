import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login } from './listeVarGrandeRoute';

export function isToken() {
  const res = localStorage.getItem('token');
  if ( res === undefined || res === null || res === ''){
    this.router.navigate(login);
    return false;
  }else{
    return true;
  }
}

