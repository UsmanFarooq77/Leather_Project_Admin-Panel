import { contact } from './../../interfaces/contact';
import { Product } from '../../interfaces/Product';
import { Component, OnInit } from '@angular/core';
import { Review } from '../../interfaces/review';
import { AdminserviceService } from '../../services/adminservice.service';
import { Color } from 'ng2-charts';
import * as chartDataLabels from 'chartjs-plugin-datalabels'
import { newsletter } from '../../interfaces/newsletter';
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
	public barChartPlugins = [chartDataLabels];
	newsLetter: newsletter[];

	constructor(private adService: AdminserviceService) {
		this.posts = [];
		this.comments = [];
		this.users = [];
		this.categories = [];
		this.contacts = [];
		this.reviews = [];
		this.newsLetter = [];
		this.isLoading = true;
		this.barChartLabels = ['Posts', 'Categories', 'Users', 'Comments', 'Contacts', 'Reviews', 'Newsletters'];
		this.barChartType = 'bar',
			this.dataSet = [
				{
					data: [0, 0, 0, 0, 0, 0, 0], label: 'Today Statistics'
				}
			];
		this.barChartColor = [
			{
				borderColor:
					[
						'rgb(54, 162, 235)',
						'rgb(255, 99, 132)',
						'rgb(255, 159, 64)',
						'rgb(2, 117, 2)',
						'rgb(54, 162, 235)',
						'rgb(105, 231, 105)',
						'rgb(128, 128, 128)'
					],
				backgroundColor:
					[
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 99, 132, 0.2)',
						'rgba(255, 205, 86, 0.2)',
						'rgba(91, 180, 91, 0.2)',
						'rgba(173, 216, 230, 0.2)',
						'rgba(144, 238, 144, 0.2)',
						'rgba(211, 211, 211, 0.2)'
					],
				borderWidth: 1
			},
		];
		this.barChartOptions = {
			responsive: true,
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true
						}
					}
				]
			}
		}
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
			}
		});
		this.adService.getNewsLetter().subscribe((newsletter) => {
			if (newsletter) {
				this.newsLetter = newsletter;
				this.barChart();
			}
		});
	}
	barChart() {
		this.dataSet = [
			{
				data: [this.posts.length, this.categories.length, this.users.length, this.comments.length,
				this.contacts.length, this.reviews.length, this.newsLetter.length], label: 'Today Statistics'
			}
		];
	}
}
