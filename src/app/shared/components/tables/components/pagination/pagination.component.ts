import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationInterface} from "@core-interfaces/tables/pagination.interface";
import {generateQuerySearchUrl} from "../../../../helpers/helper-table";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagination!: PaginationInterface;

  private params: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  changePage(pageLink: any) {
    const queryString = pageLink.split("?")[1];
    const params = new URLSearchParams(queryString);
    const page = params.get('page');
    const queryGenerated = generateQuerySearchUrl(this.params);
    const path = window.location.pathname;
    this.router.navigateByUrl(`${path}?page=${page}${queryGenerated}`)
  }
}
