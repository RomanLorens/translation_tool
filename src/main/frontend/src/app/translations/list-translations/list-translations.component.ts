import { Component, OnInit } from '@angular/core';
import { ViewContainerRef, ViewEncapsulation } from '@angular/core'
import { DatePipe } from '@angular/common'

import * as $ from 'jquery';


import { TranslationsService } from '../translations.service';
import { Translation } from '../Translation';
import { Language } from '../Language';

@Component({
  selector: 'app-list-translations',
  templateUrl: './list-translations.component.html',
  styles: ['.bottom-margin { margin-bottom: 10px; }', '.selected {background: #63b0b5 !important}'],
  providers: []
})
export class ListTranslationsComponent implements OnInit {

  languages: Language[] = [];
  search: Search;
  translations;
  selectedId: number;
  changedIds = new Set();
  toUpdate: Translation[] = [];
  showUpdateBtn: boolean;
  user: string;
  langMap: Map<number, Language>;

  constructor(private translationService: TranslationsService) {
    this.search = new Search();
    this.user = 'RL78794'
  }

  ngOnInit() {
    this.translationService.getLanguages().subscribe(data => {
      this.languages = data;
      this.langMap = new Map<number, Language>(data.map((i) => [i.id, i]));
    }
    )
  }

  searchTranslations() {
    this.translationService.search(this.search).subscribe(data => this.translations = data)
  }

  new() {
    var newRow = $("<tr class='new_tr'>");
    var cols = "";
    let date = new Date().getTime();
    let user = 'RL78794';
    cols += '<td class="tr_key"><input class="form-control input-sm" type="text" /></td>';
    cols += '<td class="tr_tr"><input class="form-control input-sm" type="text" /></td>';
    let select = this.buildLangSelect().prop('outerHTML')
    cols += `<td class="tr_lang">${select}</td>`;
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
    this.addSelectToLang();
    this.changedIds.add(this.selectedId);
    this.showUpdateBtn = true;
  }

  update() {
    console.log('update')

    let newTranslations = this.toTranslations();
    newTranslations.forEach(t => this.toUpdate.push(t))

    this.addTranslationForUpdate();
    this.inputsToTd();
    this.selectToTd();
    this.translationService.update(this.toUpdate).subscribe();

    this.toUpdate = [];
    this.showUpdateBtn = false;
    $('.new_tr').removeClass('new_tr')
  }

  private selectToTd() {
    let that = this
    $('td select').each(function (i, el) {
      let v = Number($(el).val());
      $(el).closest('td').html(that.langMap.get(v).name);
    })
  }

  private addSelectToLang() {
    let keyRef = $(`tr#${this.selectedId} td.tr_lang`);
    let key = keyRef.html();
    let select = this.buildLangSelect();
    $(keyRef).html(select);
  }

  private buildLangSelect() {
    let select = $('<select>');
    select.addClass('form-control');
    this.langMap.forEach( lang => {
      select.append($("<option>").attr('value',lang.id).text(lang.name));
    })
    return select;
  }

  private toTranslations(): Translation[] {
    let translations: Translation[] = [];
    $('.new_tr').each((i, el) => {
      let t = new Translation();
      t.key = this.getNewPropertyValue(el, 'tr_key');
      t.translation = this.getNewPropertyValue(el, 'tr_tr');
      t.lang = Number($(el).find('td.tr_lang select option:selected').val());
      t.modifiedBy = this.user;
      translations.push(t)
    })
    return translations;
  }

  private getNewPropertyValue(el, className): string {
    let key = $(el).find(`td.${className}`).text();
    if (!key) {
      key = $(el).find(`td.${className} input`).val();
    }
    return key;
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
      let lang =  $(`tr#${toEdit} td.tr_lang option:selected`).val()
      current.key = key;
      current.translation = translation;
      current.lang = Number(lang);
      current.modifiedBy = this.user

      let updatedBefore = this.toUpdate.filter(el => el.id == toEditId);
      if (updatedBefore.length > 0) {
        updatedBefore[0] = current;
      } else {
        this.toUpdate.push(current);
      }
    }
  }

  private addInput(className: string) {
    let keyRef = $(`tr#${this.selectedId} td.${className}`);
    let key = keyRef.html();
    var input = $(`<input id='${this.selectedId}-${className}' class="form-control input-sm" type="text" />`);
    input.val(key);
    $(keyRef).html(input);
  }

  selectForEdit(id) {
    $("tr").removeClass("selected");
    $('#' + id).addClass('selected');
    this.selectedId = id;
  }
}

class Search {
  key: string;
  translation: string;
  language: number;
}

