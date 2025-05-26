import { Component } from '@angular/core';
import { Tour } from '../../../tours/interfaces/tour';
import { ToursService } from '../../../tours/services/tours.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tours: Tour[] = [];
  isLoading: boolean = false;

  constructor(
    private toursService: ToursService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getTopCheapTours(this.activatedRoute.snapshot.queryParams);
    this.getTopCheapTours();
  }

  getTopCheapTours(queryParams?: any): void {
    this.isLoading = true;
    this.toursService.getTopCheapTours().subscribe((res: any) => {
      console.log('res', res);
      this.tours = res.data;
      console.log('Top cheap tours:', this.tours);
      this.isLoading = false;
    });
  }
}
