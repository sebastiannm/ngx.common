import { OnInit, OnDestroy, ElementRef } from '@angular/core';
export declare class DynamicImageComponent implements OnInit, OnDestroy {
    private elem;
    url: string;
    resolution: any;
    align: string;
    sizemode: string;
    scale: number;
    loaded: boolean;
    spacerStyle: any;
    assetRatio: number;
    mainSide: string;
    imgUrl: string;
    private wrapperRatio;
    private width;
    private height;
    private servingUrl;
    private servingSize;
    private timeoutFunc;
    constructor(elem: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private getSize();
    private getServingUrl();
    private resize();
    private render();
}
