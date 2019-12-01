import { Component, OnChanges, OnInit } from "@angular/core";
import dummyDay from "./constants/MOCK_DATA.json";
import { CommonService } from "./service/common.service.js";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnChanges {
  title = "angular";
  rows = dummyDay;
  toggleClicked = true;
  pager: any = { currentPage: 1 };
  pagedItems: any[] = [];
  selectedRow = [];
  selectedPage = 1;
  pages: [];
  perPageValue = 10;
  temp: any;
  filter1 = [];
  filter2 = [];
  filter3 = [];
  filter4 = [];
  filter5 = [];
  filterOptions: any;
  filteredData = [];

  constructor(private commonService: CommonService) {}

  ngOnChanges() {}

  ngOnInit() {
    this.setPerPage(1);
  }

  setPerPage(page: number) {
    this.pagedItems = new Array<any>();
    this.selectedRow = new Array<any>();
    this.selectedPage = page;
    this.pager = this.commonService.getPagerWithCustomPageIndex(
      this.rows.length,
      this.selectedPage,
      Number(this.perPageValue)
    );
    const keys = Object.keys(this.rows);
    const start = Number(this.pager.startIndex);
    const length = Number(this.pager.endIndex);
    let i = 0;
    let tempIndex = 0;
    for (i = start; i <= length; i++) {
      const key = keys[i];
      this.pagedItems[tempIndex] = this.rows[key];
      tempIndex = tempIndex + 1;
    }
    this.selectedRow = this.pagedItems;
    this.temp = this.selectedRow;
    this.filteredData = this.selectedRow;
    this.createFilters(this.selectedRow);
  }

  searchEmployeeByName(empName) {
    const val = empName.toLowerCase();
    this.temp = this.temp.map(data => {
      data.full_name = data.first_name + " " + data.last_name;
      return data;
    });
    const temp = this.temp.filter(d => {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.selectedRow = temp;
    this.filteredData = this.selectedRow;
    this.createFilters(this.selectedRow);
  }

  createFilters(items) {
    this.resetFilter();
    items.forEach(item => {
      const filter1Index = this.filter1.findIndex(
        title => title === item.job_title
      );
      if (filter1Index === -1) {
        this.filter1.push(item.job_title);
      }
      const filter2Index = this.filter2.findIndex(
        title => title === item.department
      );
      if (filter2Index === -1) {
        this.filter2.push(item.department);
      }
      const filter3Index = this.filter3.findIndex(
        title => title === item.company
      );
      if (filter3Index === -1) {
        this.filter3.push(item.company);
      }
      const filter4Index = this.filter4.findIndex(
        title => title === item.location
      );
      if (filter4Index === -1) {
        this.filter4.push(item.location);
      }
      const filter5Index = this.filter5.findIndex(
        title => title === item.gender
      );
      if (filter5Index === -1) {
        this.filter5.push(item.gender);
      }
    });
    this.filterOptions = [
      { name: "Title", options: this.filter1, job_title: "" },
      { name: "Department", options: this.filter2, department: "" },
      { name: "Company", options: this.filter3, company: "" },
      { name: "Location", options: this.filter4, location: "" },
      { name: "Gender", options: this.filter5, gender: "" }
    ];
  }

  resetFilter() {
    this.filter1 = [];
    this.filter2 = [];
    this.filter3 = [];
    this.filter4 = [];
    this.filter5 = [];
  }

  onFilterSelection(event) {
    const selectedFiltred = event.filter(
      selectedFilter =>
        selectedFilter.selectedItems && selectedFilter.selectedItems.length
    );
    this.selectedRow = [];
    if (selectedFiltred.length) {
      selectedFiltred.forEach(item => {
        item.selectedItems.forEach(element => {
          this.filteredData.filter(row => {
            Object.keys(row).map(itemKey => {
              if (element === row[itemKey]) {
                this.selectedRow = [...this.selectedRow, row];
              }
            });
          });
        });
      });
    } else {
      this.selectedRow = this.filteredData;
    }
  }
}
