webpackJsonp([8,14],{

/***/ 1061:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ChartJSComponent = (function () {
    function ChartJSComponent() {
        // lineChart
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
            { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartOptions = {
            animation: false,
            responsive: true
        };
        this.lineChartColours = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        // barChart
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
        // Doughnut
        this.doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
        this.doughnutChartData = [350, 450, 100];
        this.doughnutChartType = 'doughnut';
        // Radar
        this.radarChartLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
        this.radarChartData = [
            { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
        ];
        this.radarChartType = 'radar';
        // Pie
        this.pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
        this.pieChartData = [300, 500, 100];
        this.pieChartType = 'pie';
        // PolarArea
        this.polarAreaChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        this.polarAreaChartData = [300, 500, 100, 40, 120];
        this.polarAreaLegend = true;
        this.polarAreaChartType = 'polarArea';
    }
    // events
    ChartJSComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ChartJSComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    return ChartJSComponent;
}());
ChartJSComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1261)
    })
], ChartJSComponent);
exports.ChartJSComponent = ChartJSComponent;
//# sourceMappingURL=E:/Projects/onderwijsapp/src/chartjs.component.js.map

/***/ }),

/***/ 1231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(255);
var chartjs_component_1 = __webpack_require__(1061);
var routes = [
    {
        path: '',
        component: chartjs_component_1.ChartJSComponent,
        data: {
            title: 'Charts'
        }
    }
];
var ChartJSRoutingModule = (function () {
    function ChartJSRoutingModule() {
    }
    return ChartJSRoutingModule;
}());
ChartJSRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], ChartJSRoutingModule);
exports.ChartJSRoutingModule = ChartJSRoutingModule;
//# sourceMappingURL=E:/Projects/onderwijsapp/src/chartjs-routing.module.js.map

/***/ }),

/***/ 1261:
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n  <div class=\"card-columns cols-2\">\n    <div class=\"card\">\n      <div class=\"card-header\">\n        Line Chart\n        <div class=\"card-actions\">\n          <a href=\"http://www.chartjs.org\">\n            <small class=\"text-muted\">docs</small>\n          </a>\n        </div>\n      </div>\n      <div class=\"card-block\">\n        <div class=\"chart-wrapper\">\n          <canvas baseChart class=\"chart\"\n          [datasets]=\"lineChartData\"\n          [labels]=\"lineChartLabels\"\n          [options]=\"lineChartOptions\"\n          [colors]=\"lineChartColours\"\n          [legend]=\"lineChartLegend\"\n          [chartType]=\"lineChartType\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"></canvas>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        Bar Chart\n        <div class=\"card-actions\">\n          <a href=\"http://www.chartjs.org\">\n            <small class=\"text-muted\">docs</small>\n          </a>\n        </div>\n      </div>\n      <div class=\"card-block\">\n        <div class=\"chart-wrapper\">\n          <canvas baseChart class=\"chart\"\n          [datasets]=\"barChartData\"\n          [labels]=\"barChartLabels\"\n          [options]=\"barChartOptions\"\n          [legend]=\"barChartLegend\"\n          [chartType]=\"barChartType\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"></canvas>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        Doughnut Chart\n        <div class=\"card-actions\">\n          <a href=\"http://www.chartjs.org\">\n            <small class=\"text-muted\">docs</small>\n          </a>\n        </div>\n      </div>\n      <div class=\"card-block\">\n        <div class=\"chart-wrapper\">\n          <canvas baseChart class=\"chart\"\n          [data]=\"doughnutChartData\"\n          [labels]=\"doughnutChartLabels\"\n          [chartType]=\"doughnutChartType\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"></canvas>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        Radar Chart\n        <div class=\"card-actions\">\n          <a href=\"http://www.chartjs.org\">\n            <small class=\"text-muted\">docs</small>\n          </a>\n        </div>\n      </div>\n      <div class=\"card-block\">\n        <div class=\"chart-wrapper\">\n          <canvas baseChart class=\"chart\"\n          [datasets]=\"radarChartData\"\n          [labels]=\"radarChartLabels\"\n          [chartType]=\"radarChartType\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"></canvas>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        Pie Chart\n        <div class=\"card-actions\">\n          <a href=\"http://www.chartjs.org\">\n            <small class=\"text-muted\">docs</small>\n          </a>\n        </div>\n      </div>\n      <div class=\"card-block\">\n        <div class=\"chart-wrapper\">\n          <canvas baseChart class=\"chart\"\n          [data]=\"pieChartData\"\n          [labels]=\"pieChartLabels\"\n          [chartType]=\"pieChartType\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"></canvas>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-header\">\n        Polar Area Chart\n        <div class=\"card-actions\">\n          <a href=\"http://www.chartjs.org\">\n            <small class=\"text-muted\">docs</small>\n          </a>\n        </div>\n      </div>\n      <div class=\"card-block\">\n        <div class=\"chart-wrapper\">\n          <canvas baseChart class=\"chart\"\n          [data]=\"polarAreaChartData\"\n          [labels]=\"polarAreaChartLabels\"\n          [legend]=\"polarAreaLegend\"\n          [chartType]=\"polarAreaChartType\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"></canvas>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 715:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ng2_charts_1 = __webpack_require__(414);
var chartjs_component_1 = __webpack_require__(1061);
var chartjs_routing_module_1 = __webpack_require__(1231);
var ChartJSModule = (function () {
    function ChartJSModule() {
    }
    return ChartJSModule;
}());
ChartJSModule = __decorate([
    core_1.NgModule({
        imports: [
            chartjs_routing_module_1.ChartJSRoutingModule,
            ng2_charts_1.ChartsModule
        ],
        declarations: [chartjs_component_1.ChartJSComponent]
    })
], ChartJSModule);
exports.ChartJSModule = ChartJSModule;
//# sourceMappingURL=E:/Projects/onderwijsapp/src/chartjs.module.js.map

/***/ })

});
//# sourceMappingURL=8.chunk.js.map