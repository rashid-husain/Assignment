import { Component, OnInit, Input } from "@angular/core";
import { CommonService } from "./../../service/common.service";
import { Rows } from "src/app/models/rows.model";

@Component({
  selector: "app-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"]
})
export class DatatableComponent implements OnInit {
  @Input() rows: Rows[];

  constructor() {}

  ngOnInit() {
    console.log("data", this.rows);
  }
}
