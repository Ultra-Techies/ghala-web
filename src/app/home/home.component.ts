import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import Utils from 'app/helpers/Utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public emailChartType: ChartType;
  public emailChartData: any;
  public emailChartLegendItems: LegendItem[];

  public hoursChartType: ChartType;
  public hoursChartData: any;
  public hoursChartOptions: any;
  public hoursChartResponsive: any[];
  public hoursChartLegendItems: LegendItem[];

  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];

  addTask = false;
  tasks = [];

  constructor(private formBuilder: FormBuilder) {}

  addTaskForm!: FormGroup;
  ngOnInit() {
    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      labels: ['62%', '32%', '6%'],
      series: [62, 32, 6],
    };
    this.emailChartLegendItems = [
      { title: 'Open', imageClass: 'fa fa-circle text-info' },
      { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
      { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' },
    ];

    this.hoursChartType = ChartType.Line;
    this.hoursChartData = {
      labels: [
        '9:00AM',
        '12:00AM',
        '3:00PM',
        '6:00PM',
        '9:00PM',
        '12:00PM',
        '3:00AM',
        '6:00AM',
      ],
      series: [
        [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
        [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
        [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509],
      ],
    };
    this.hoursChartOptions = {
      low: 0,
      high: 800,
      showArea: true,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3,
      }),
      showLine: false,
      showPoint: false,
    };
    this.hoursChartResponsive = [
      [
        'screen and (max-width: 640px)',
        {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            },
          },
        },
      ],
    ];
    this.hoursChartLegendItems = [
      { title: 'Open', imageClass: 'fa fa-circle text-info' },
      { title: 'Click', imageClass: 'fa fa-circle text-danger' },
      { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' },
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
      series: [
        [542, 443, 320, 780, 0, 0, 0, 0, 0, 0, 0, 0],
        [412, 243, 280, 580, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
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
      { title: 'Inventory', imageClass: 'fa fa-circle text-info' },
      { title: 'Orders', imageClass: 'fa fa-circle text-danger' },
    ];

    this.addTaskForm = this.formBuilder.group({
      task: ['', [Validators.minLength(9)]],
    });

    this.tasks = this.getTasks();
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
    console.log(task);
    task.completed = !task.completed;
    Utils.saveTask(task.id, task);
  }
}
