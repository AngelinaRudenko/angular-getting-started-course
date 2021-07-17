import { EventEmitter } from "@angular/core";
import { Component, Input, OnChanges, Output } from "@angular/core";

@Component ({
    selector: "star-rating",
    templateUrl: "./star.component.html",
    styleUrls: ["./star.component.css"]
})
export class StarComponent implements OnChanges {
    cropWidth: number = 4;
    @Input() rating: number = 75;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>(); 

    ngOnChanges(): void {
        this.cropWidth = this.rating * 75/5;
    }

    onClick(): void {
        this.notify.emit(`You changed rating to ${this.rating}.`);
    }
}