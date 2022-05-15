import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import Utils from 'app/helpers/Utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public inventoryOrderChart: ChartType;
  public inventoryOrderChartData: any;
  public inventoryOrderChartItems: LegendItem[];

  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];

  addTask = false;
  tasks = [];
  orderData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  invetoryValue = 0;
  inventoryorderstats = [
    Number(localStorage.getItem('inventory%')),
    Number(localStorage.getItem('orders%')),
  ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  addTaskForm!: FormGroup;
  ngOnInit() {
    this.addTaskForm = this.formBuilder.group({
      task: ['', [Validators.minLength(9)]],
    });

    //initialize order history from local storage
    let ordersHistory = localStorage.getItem('orderData');
    if (ordersHistory) {
      let ordersHistoryArray = ordersHistory.split(',');
      for (let i = 0; i < ordersHistoryArray.length; i++) {
        this.orderData[i] = Number(ordersHistoryArray[i]);
      }
    }

    this.tasks = this.getTasks();
    this.getStats();

    this.inventoryOrderChart = ChartType.Pie;
    this.inventoryOrderChartData = {
      labels: [
        localStorage.getItem('inventory%') + '%',
        localStorage.getItem('orders%') + '%',
      ],
      series: this.inventoryorderstats,
    };
    this.inventoryOrderChartItems = [
      { title: 'Inventory', imageClass: 'fa fa-circle text-info' },
      { title: 'Orders', imageClass: 'fa fa-circle text-danger' },
    ];

    this.activityChartType = ChartType.Bar;
    this.activityChartData = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.orderData],
    };

    this.activityChartOptions = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false,
      },
      height: '245px',
    };
    this.activityChartResponsive = [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            },
          },
        },
      ],
    ];
    this.activityChartLegendItems = [
      // { title: 'Inventory', imageClass: 'fa fa-circle text-info' },
      { title: 'Orders', imageClass: 'fa fa-circle text-danger' },
    ];
  }

  getStats() {
    this.http
      .get(
        Utils.BASE_URL + 'stats/' + localStorage.getItem('assignedWarehouse'),
        { headers: Utils.getHeaders() }
      )
      .subscribe(
        (data) => {
          //console.log('Stats: ' + data['inventoryValue']);
          this.invetoryValue = data['inventoryValue'];

          for (let i = 0; i < data['orderValue'].length; i++) {
            if (data['orderValue'][i]['month'] === 1) {
              this.orderData[0] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            } else if (data['orderValue'][i]['month'] === 2) {
              this.orderData[1] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            } else if (data['orderValue'][i]['month'] === 3) {
              this.orderData[2] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            } else if (data['orderValue'][i]['month'] === 4) {
              this.orderData[3] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            } else if (data['orderValue'][i]['month'] === 5) {
              this.orderData[4] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            } else if (data['orderValue'][i]['month'] === 6) {
              this.orderData[5] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            } else if (data['orderValue'][i]['month'] === 7) {
              this.orderData[6] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            } else if (data['orderValue'][i]['month'] === 8) {
              this.orderData[7] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            } else if (data['orderValue'][i]['month'] === 9) {
              this.orderData[8] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            } else if (data['orderValue'][i]['month'] === 10) {
              this.orderData[9] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            } else if (data['orderValue'][i]['month'] === 11) {
              this.orderData[10] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            } else if (data['orderValue'][i]['month'] === 12) {
              this.orderData[11] = data['orderValue'][i]['sum']
                ? data['orderValue'][i]['sum']
                : 0;
            }
          }

          Utils.saveUserData('orderData', this.orderData);
          this.getInventoryvsOrders();
        },
        (error) => {
          console.log(error);
          if (error.status === 403) {
            this.router.navigate(['/forbidden']);
          }
        }
      );
  }

  getInventoryvsOrders() {
    //calculate % of inventory vs orders. Orders should be sum of items in orderData array
    let inventory = this.invetoryValue;
    let orders = 0;
    for (let i = 0; i < this.orderData.length; i++) {
      orders += this.orderData[i];
    }
    let ordersvsInventory = (orders / (inventory + orders)) * 100;
    let inventoryvsOrders = (inventory / (orders + inventory)) * 100;
    this.inventoryorderstats = [
      Utils.removeDecimalPlaces(inventoryvsOrders),
      Utils.removeDecimalPlaces(ordersvsInventory),
    ];

    this.inventoryOrderChartData.series = this.inventoryorderstats;
    this.inventoryOrderChartData.labels = [
      this.inventoryorderstats[0] + '%',
      this.inventoryorderstats[1] + '%',
    ];

    Utils.saveUserData('inventory%', this.inventoryorderstats[0]);
    Utils.saveUserData('orders%', this.inventoryorderstats[1]);
  }

  toggleAddTasks() {
    this.addTask = !this.addTask;

    if (!this.addTask) {
      const randomString = Utils.getRandomString(5);
      const task = {
        id: 'task-' + randomString,
        task: this.addTaskForm.value.task,
        completed: false,
      };
      Utils.saveTask(task.id, task);
      this.addTaskForm.reset();
      this.ngOnInit();
    }
  }

  //loop through local storage and get all tasks with task.id starting with 'task-' and return them
  getTasks() {
    const tasks = [];
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key.startsWith('task-')) {
        tasks.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    return tasks;
  }

  updateTask(task) {
    //console.log(task.completed);
    task.completed = !task.completed;
    Utils.saveTask(task.id, task);
    this.getTasks();
  }

  deleteTask(task) {
    Utils.deleteTask(task.id);
  }
}
