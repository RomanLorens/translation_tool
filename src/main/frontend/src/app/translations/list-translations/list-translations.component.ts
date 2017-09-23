import { Component, OnInit } from '@angular/core';
import { ViewContainerRef, ViewEncapsulation } from '@angular/core'
import {DatePipe} from '@angular/common'

import * as $ from 'jquery';

import { ModalModule, OverlayRenderer, DOMOverlayRenderer, Overlay } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { TranslationsService } from '../translations.service';
import {Translation} from '../Translation';

@Component({
  selector: 'app-list-translations',
  templateUrl: './list-translations.component.html',
  styles: ['.bottom-margin { margin-bottom: 10px; }', '.selected {background: #63b0b5 !important}'],
  providers: [Modal]
})
export class ListTranslationsComponent implements OnInit {

  languages: string[];
  search: Search;
  translations;
  selectedId: number;
  changedIds = new Set();
  toUpdate: Translation[] = [];
  showUpdateBtn: boolean;
  toAdd: Translation[] = [];

  constructor(private translationService: TranslationsService, private modal: Modal) { 
    this.search = new Search();
    this.search.language = 'eng';
  }

  ngOnInit() {
    this.languages = this.translationService.getLanguages();
  }

  searchTranslations() {
    this.translationService.search(this.search).subscribe(data => this.translations = data)
    
  }

  new() {
    let translation : Translation = new Translation();
    this.toAdd.push(translation)

    var newRow = $("<tr class='new_tr'>");
    var cols = "";
    let date = new Date().getTime();
    let user = 'RL78794';
    cols += '<td class="tr_key"><input [(ngModel)]="translation.key" class="form-control input-sm" type="text" /></td>';
    cols += '<td class="tr_tr"><input class="form-control input-sm" type="text" /></td>';
    cols += '<td class="tr_lang"><input class="form-control input-sm" type="text"/></td>';
    cols += `<td class="tr_user">${user}</td>`;
    cols += `<td class="tr_date">${date}</td>`;
    newRow.append(cols);
    $('#translations').prepend(newRow);

    this.showUpdateBtn = true;
  }

  edit() {
    this.addTranslationForUpdate();
    this.inputsToTd();
    this.addInput('tr_key');
    this.addInput('tr_tr');
    this.changedIds.add(this.selectedId);
    this.showUpdateBtn = true;
  }

  update() {
    console.log('update')

    console.log(this.toAdd)

    this.addTranslationForUpdate();
    this.inputsToTd();
    this.translationService.update(this.toUpdate).subscribe();

    this.toUpdate = [];
    this.showUpdateBtn = false;
  }

  private inputsToTd() {
    $('td input').each(function (i, el) {
      let v = $(this).val();
      $(this).parent().html(v);
    })
  }

  private addTranslationForUpdate() {
    let toEdit = $('tr input').closest('tr').attr('id');
    if (toEdit) {
      let toEditId = Number(toEdit);
      let current: Translation = this.translations.filter(el => el.id == toEditId)[0];
      let key = $(`#${toEdit}-tr_key`).val()
      let translation = $(`#${toEdit}-tr_tr`).val()
      current.key = key;
      current.translation = translation;

      let updatedBefore = this.toUpdate.filter(el =>  el.id == toEditId);
      if (updatedBefore.length > 0) {
        updatedBefore[0] = current;
      } else {
        this.toUpdate.push(current);
      }
    }
    let newTranslations = $('tr.new_tr');
    if (newTranslations.length > 0) {
      console.log("nt = " , newTranslations)
      
    }

  }

  private addInput(className:string) {
    let keyRef = $(`tr#${this.selectedId} td.${className}`);
    let key = keyRef.html();
    var input = $(`<input id='${this.selectedId}-${className}' class="form-control input-sm" type="text" />`);
    input.val(key);
    $(keyRef).html(input);
  }

  selectForEdit(id) {
    $("tr" ).removeClass( "selected");
    $('#' + id ).addClass('selected');
    this.selectedId = id;
  }
}

class Search {
  key: string;
  translation: string;
  language: string;
}

