import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { FilterOptions } from "src/app/models/filter.model";
import { cloneDeep } from "lodash";

@Component({
  selector: "app-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"]
})
export class MenuItemComponent implements OnInit, OnChanges {
  @Input() filterOptions: FilterOptions[];
  @Output() selectedFilter: EventEmitter<any> = new EventEmitter<any>();
  options = [];
  filterBy = [];

  constructor() {}

  ngOnInit() {
    this.filterBy = cloneDeep(this.filterOptions);
  }

  ngOnChanges() {}

  onfilterSelect(
    isChecked: boolean,
    name: string,
    option: string,
    indexNumber: number
  ) {
    this.filterBy = this.filterBy.map((filterElement, index) => {
      if (filterElement.name === name && indexNumber === index && isChecked) {
        const optionIndex = this.options.findIndex(op => op === option);
        if (optionIndex === -1 && indexNumber === index) {
          this.options.push(option);
        }
        if (filterElement.selectedItems && filterElement.selectedItems.length) {
          filterElement.selectedItems.push(this.options[0]);
        } else {
          filterElement = {
            ...filterElement,
            selectedItems: this.options
          };
        }
      } else {
        this.options = [];
      }

      if (!isChecked && filterElement.name === name && indexNumber === index) {
        filterElement.selectedItems = filterElement.selectedItems.filter(
          removedOption => removedOption !== option
        );
      }
      return filterElement;
    });
    this.selectedFilter.emit(this.filterBy);
  }
}
