import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

@Directive({ selector:  '[vote]' })

export class VoteDirective implements OnInit {

  @Input() item: any = {};

  constructor(
    private elem: ElementRef,
    private http: Http
  ) {}

  ngOnInit() {
    let votes: any = localStorage.getItem('smVotes');
    if (votes) {
      votes = JSON.parse(votes);
      const checkIfVoted = votes.find((vote) => {
        return this.item.sys.id === vote;
      });
      if (checkIfVoted) {
        return this.item.voted = true;
      }
    }
    this.elem.nativeElement.addEventListener('click', () => {
      this.onClick();
    });
  }

  onClick() {
    if (this.item.saving || this.item.voted) return;
    this.item.saving = true;
    if (!this.item.fields.privateInfo) this.item.fields.privateInfo = {};
    if (!this.item.fields.privateInfo.likes) this.item.fields.privateInfo.likes = 0;
    this.item.fields.privateInfo.likes ++;
    this.item.voted = true;
    this.http.post(`https://ecommerce.sebastianmoreno.se/api/clients/nicolefalciani/like-post`, {id: this.item.sys.id})
      .map(response => response.json())
      .subscribe((response) => {
        this.item.fields.privateInfo = response;
        this.item.saving = false;
      });

    let votes: any = localStorage.getItem('smVotes');
    if (votes) {
      votes = JSON.parse(votes);
      votes.push(this.item.sys.id);
    } else {
      votes = [this.item.sys.id];
    }

    localStorage.setItem('smVotes', JSON.stringify(votes));
  }

}
