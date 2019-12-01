import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() globalSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleClick: EventEmitter<any> = new EventEmitter<any>();

  employeeName: string;

  constructor() {}

  ngOnInit() {}

  globalFilter() {
    this.globalSearch.emit(this.employeeName);
  }

  toggle() {
    this.toggleClick.emit();
  }
}
