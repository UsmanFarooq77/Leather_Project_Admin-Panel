import { contact } from './../../interfaces/contact';
import { Product } from '../../interfaces/Product';
import { Component, OnInit } from '@angular/core';
import { Review } from '../../interfaces/review';
import { AdminserviceService } from '../../services/adminservice.service';
import { Color } from 'ng2-charts';
import * as chartDataLabels from 'chartjs-plugin-datalabels'
@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
	posts: Product[];
	comments: any[];
	users: any[];
	categories: any[];
	contacts: contact[];
	reviews: Review[];
	isLoading: boolean;
	dataSet: any[];
	barChartLabels: string[];
	barChartOptions = {};
	barChartType: string;
	barChartLegend: boolean;
	barChartColor: Color[];
	public barChartPlugins = [chartDataLabels]
	constructor(private adService: AdminserviceService) {
		this.posts = [];
		this.comments = [];
		this.users = [];
		this.categories = [];
		this.contacts = [];
		this.reviews = [];
		this.isLoading = true;
		this.barChartLabels = ['Posts', 'Comments', 'Users', 'Categories', 'Reviews', 'Contacts'];
		this.barChartType = 'bar',
			this.dataSet = [
				{
					data: [0, 0, 0, 0, 0, 0], label: 'Today Statistics'
				}
			];
		this.barChartColor = [
			{
				borderColor:
					[
						'rgb(255, 99, 132)',
						'rgb(255, 159, 64)',
						'rgb(75, 192, 192)',
						'rgb(54, 162, 235)',
						'rgb(153, 102, 255)',
						'rgb(201, 203, 207)'
					],
				backgroundColor:
					[
						'rgba(255, 99, 132, 0.2)',
						'rgba(255, 205, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(201, 203, 207, 0.2)',
					],
				borderWidth: 1
			},
		];
		// this.barChartLegend = true;
		// this.barChartOptions = {
		// 	scaleShowVerticalLines: false,
		// 	responsive: true,
		// 	scales : { xAxes : [{}], yAxes : [{}] },
		// 	// plugins : {
		// 	// 	dataLabels : {
		// 	// 		anchor : 'end',
		// 	// 		align  : 'start'
		// 	// 	}
		// 	// }
		// };
		//   this.barChartPlugins = [ChartDataLabels ];
	}
	ngOnInit() {
		this.adService.getPost().subscribe((posts) => {
			if (posts) {
				this.posts = posts
				this.isLoading = false;
			}
		});
		this.adService.getComment().subscribe((comments) => {
			if (comments) {
				this.comments = comments;
			}
		});
		this.adService.getUsers().subscribe((users) => {
			if (users) {
				this.users = users;
			}
		});
		this.adService.getCategories().subscribe((categories) => {
			if (categories) {
				this.categories = categories;
			}
		});
		this.adService.getContact().subscribe((contacts) => {
			if (contacts) {
				this.contacts = contacts;
			}
		});
		this.adService.getReviews().subscribe((reviews) => {
			if (reviews) {
				this.reviews = reviews;
				this.barChart();
			}
		});
	}
	barChart() {
		this.dataSet = [
			{
				data: [this.posts.length, this.comments.length, this.users.length
					, this.categories.length, this.reviews.length, this.contacts.length], label: 'Today Statistics'
			}
		];
	}
}
