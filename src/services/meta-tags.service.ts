/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, Inject } from '@angular/core';
import { DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
import { DOCUMENT, ɵgetDOM } from '@angular/platform-browser';

/**
 * Represent meta element.
 *
 * ### Example
 *
 * ```ts
 * { name: 'application-name', content: 'Name of my application' },
 * { name: 'description', content: 'A description of the page', id: 'desc' }
 * // ...
 * // Twitter
 * { name: 'twitter:title', content: 'Content Title' }
 * // ...
 * // Google+
 * { itemprop: 'name', content: 'Content Title' },
 * { itemprop: 'description', content: 'Content Title' }
 * // ...
 * // Facebook / Open Graph
 * { property: 'fb:app_id', content: '123456789' },
 * { property: 'og:title', content: 'Content Title' }
 * ```
 *
 * @experimental
 */
export interface MetaDefinition {
  charset?: string;
  content?: string;
  httpEquiv?: string;
  id?: string;
  itemprop?: string;
  name?: string;
  property?: string;
  scheme?: string;
  url?: string;
  [prop: string]: string;
}

/**
 * A service that can be used to get and add meta tags.
 *
 * @experimental
 */
@Injectable()
export class Meta {
  private _dom: DomAdapter = ɵgetDOM();


  constructor( @Inject(DOCUMENT) private _document: any) { }

  /**
   * Sets the title of the page
   */
  setTitle(title: string) {
    this._document.title = title
  }

  /**
   * Adds a new meta tag to the dom.
   *
   *  ### Example
   *
   * ```ts
   * const name: MetaDefinition = {name: 'application-name', content: 'Name of my application'};
   * const desc: MetaDefinition = {name: 'description', content: 'A description of the page'};
   * const tags: HTMLMetaElement[] = this.meta.addTags([name, desc]);
   * ```
   *
   * @param tags
   * @returns {HTMLMetaElement[]}
   */
  addTags(...tags: Array<MetaDefinition | MetaDefinition[]>): HTMLMetaElement[] {
    const presentTags = this._flattenArray(tags);
    if (presentTags.length === 0) return [];
    return presentTags.map((tag: MetaDefinition) => this._addInternal(tag));

  }

  private _addInternal(tag: MetaDefinition): HTMLMetaElement {
    const meta: HTMLMetaElement = this._createMetaElement();
    this._prepareMetaElement(tag, meta);
    this._appendMetaElement(meta);
    return meta;
  }

  private _createMetaElement(): HTMLMetaElement {
    return this._dom.createElement('meta') as HTMLMetaElement;
  }

  private _prepareMetaElement(tag: MetaDefinition, el: HTMLMetaElement): HTMLMetaElement {
    Object.keys(tag).forEach((prop: string) => this._dom.setAttribute(el, prop, tag[prop]));
    return el;
  }

  private _appendMetaElement(meta: HTMLMetaElement): void {
    const head = this._document.head;
    this._dom.appendChild(head, meta);
  }

  private _flattenArray(input: any[], out: any[] = []): any[] {
    if (input) {
      for (let i = 0; i < input.length; i++) {
        const item: any = input[i];
        if (Array.isArray(item)) {
          this._flattenArray(item, out);
        } else if (item) {
          out.push(item);
        }
      }
    }
    return out;
  }
}
