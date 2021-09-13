import { Component, OnInit } from '@angular/core';
import { GoodsService } from './goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {

  constructor(public goodsService: GoodsService) {
  }

  ngOnInit() {
    this.goodsService.setGoodsInState();
  }

}
