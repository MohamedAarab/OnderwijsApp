webpackJsonp([10,14],{

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(253);
__webpack_require__(408);
var OrganisatiesService = (function () {
    function OrganisatiesService(http) {
        this.http = http;
        console.log('OrganisatieService Initialized...');
    }
    OrganisatiesService.prototype.getOrganisaties = function () {
        return this.http.get('http://curcon-huict.rhcloud.com/rest/organisaties/')
            .map(function (res) { return res.json(); });
    };
    OrganisatiesService.prototype.getOrganisatieById = function (id) {
        return this.http.get('http://curcon-huict.rhcloud.com/rest/organisaties/' + id)
            .map(function (res) { return res.json(); });
    };
    OrganisatiesService.prototype.getOrganisatieByObject = function (obj) {
        return this.http.get(obj.href)
            .map(function (res) { return res.json(); });
    };
    OrganisatiesService.prototype.getDataByHref = function (href) {
        return this.http.get(href)
            .map(function (res) { return res.json(); });
    };
    return OrganisatiesService;
}());
OrganisatiesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], OrganisatiesService);
exports.OrganisatiesService = OrganisatiesService;
var _a;
//# sourceMappingURL=E:/Projects/onderwijsapp/src/organisaties.service.js.map

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var organisaties_service_1 = __webpack_require__(170);
var FullLayoutComponent = (function () {
    function FullLayoutComponent(organisatieService) {
        var _this = this;
        this.organisatieService = organisatieService;
        this.disabled = false;
        this.status = { isopen: false };
        organisatieService.getOrganisaties().subscribe(function (organisaties) {
            _this.allOrganisaties = organisaties;
            if (localStorage.getItem('selectedOrganisatie') == null)
                localStorage.setItem('selectedOrganisatie', JSON.stringify(_this.allOrganisaties[0]));
            console.log(_this.allOrganisaties);
        });
        this.selectedOrganisatie = JSON.parse(localStorage.getItem('selectedOrganisatie')).naam;
    }
    FullLayoutComponent.prototype.toggled = function (open) {
        console.log('Dropdown is now: ', open);
    };
    FullLayoutComponent.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    };
    FullLayoutComponent.prototype.ngOnInit = function () {
    };
    FullLayoutComponent.prototype.onChange = function (item) {
        var _this = this;
        this.organisatieService.getOrganisatieById(item).subscribe(function (organisatie) {
            localStorage.setItem('selectedOrganisatie', JSON.stringify(organisatie));
            _this.selectedOrganisatie = organisatie.naam;
        });
    };
    return FullLayoutComponent;
}());
FullLayoutComponent = __decorate([
    core_1.Component({
        selector: 'app-dashboard',
        template: __webpack_require__(703),
        providers: [organisaties_service_1.OrganisatiesService],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof organisaties_service_1.OrganisatiesService !== "undefined" && organisaties_service_1.OrganisatiesService) === "function" && _a || Object])
], FullLayoutComponent);
exports.FullLayoutComponent = FullLayoutComponent;
var _a;
//# sourceMappingURL=E:/Projects/onderwijsapp/src/full-layout.component.js.map

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var SimpleLayoutComponent = (function () {
    function SimpleLayoutComponent() {
    }
    SimpleLayoutComponent.prototype.ngOnInit = function () { };
    return SimpleLayoutComponent;
}());
SimpleLayoutComponent = __decorate([
    core_1.Component({
        selector: 'app-dashboard',
        template: '<router-outlet></router-outlet>',
    }),
    __metadata("design:paramtypes", [])
], SimpleLayoutComponent);
exports.SimpleLayoutComponent = SimpleLayoutComponent;
//# sourceMappingURL=E:/Projects/onderwijsapp/src/simple-layout.component.js.map

/***/ }),

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./chartjs/chartjs.module": [
		715,
		8
	],
	"./components/components.module": [
		716,
		3
	],
	"./coordinatoren/coordinatoren.module": [
		717,
		2
	],
	"./cursussen/cursussen.module": [
		718,
		1
	],
	"./dashboard/dashboard.module": [
		719,
		7
	],
	"./icons/icons.module": [
		720,
		5
	],
	"./leerplannen/leerplannen.module": [
		721,
		0
	],
	"./pages/pages.module": [
		722,
		4
	],
	"./widgets/widgets.module": [
		723,
		6
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 400;


/***/ }),

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var platform_browser_dynamic_1 = __webpack_require__(509);
var app_module_1 = __webpack_require__(540);
var environment_1 = __webpack_require__(546);
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=E:/Projects/onderwijsapp/src/main.js.map

/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var organisaties_service_1 = __webpack_require__(170);
var AppComponent = (function () {
    function AppComponent(organisatieService) {
        this.organisatieService = organisatieService;
    }
    AppComponent.prototype.ngOnInit = function () {
        //    localStorage.setItem("")
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line
        selector: 'body',
        template: '<router-outlet></router-outlet>'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof organisaties_service_1.OrganisatiesService !== "undefined" && organisaties_service_1.OrganisatiesService) === "function" && _a || Object])
], AppComponent);
exports.AppComponent = AppComponent;
var _a;
//# sourceMappingURL=E:/Projects/onderwijsapp/src/app.component.js.map

/***/ }),

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__(149);
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(70);
var app_component_1 = __webpack_require__(539);
var dropdown_1 = __webpack_require__(417);
var tabs_1 = __webpack_require__(418);
var nav_dropdown_directive_1 = __webpack_require__(544);
var ng2_charts_1 = __webpack_require__(414);
var sidebar_directive_1 = __webpack_require__(545);
var aside_directive_1 = __webpack_require__(542);
var breadcrumb_component_1 = __webpack_require__(543);
// Routing Module
var app_routing_1 = __webpack_require__(541);
// Layouts
var full_layout_component_1 = __webpack_require__(350);
var simple_layout_component_1 = __webpack_require__(351);
var organisaties_service_1 = __webpack_require__(170);
var http_1 = __webpack_require__(253);
var forms_1 = __webpack_require__(410);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_1.AppRoutingModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            common_1.CommonModule,
            dropdown_1.DropdownModule.forRoot(),
            tabs_1.TabsModule.forRoot(),
            ng2_charts_1.ChartsModule
        ],
        declarations: [
            app_component_1.AppComponent,
            full_layout_component_1.FullLayoutComponent,
            simple_layout_component_1.SimpleLayoutComponent,
            nav_dropdown_directive_1.NAV_DROPDOWN_DIRECTIVES,
            breadcrumb_component_1.BreadcrumbsComponent,
            sidebar_directive_1.SIDEBAR_TOGGLE_DIRECTIVES,
            aside_directive_1.AsideToggleDirective,
        ],
        providers: [{
                provide: common_1.LocationStrategy,
                useClass: common_1.HashLocationStrategy
            }, organisaties_service_1.OrganisatiesService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=E:/Projects/onderwijsapp/src/app.module.js.map

/***/ }),

/***/ 541:
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
// Layouts
var full_layout_component_1 = __webpack_require__(350);
var simple_layout_component_1 = __webpack_require__(351);
exports.routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: full_layout_component_1.FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'cursussen',
                loadChildren: './cursussen/cursussen.module#CursussenModule',
            },
            {
                path: 'leerplannen',
                loadChildren: './leerplannen/leerplannen.module#LeerplannenModule'
            },
            {
                path: 'coordinatoren',
                loadChildren: './coordinatoren/coordinatoren.module#CoordinatorenModule'
            },
            {
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            },
            {
                path: 'icons',
                loadChildren: './icons/icons.module#IconsModule'
            },
            {
                path: 'widgets',
                loadChildren: './widgets/widgets.module#WidgetsModule'
            },
            {
                path: 'charts',
                loadChildren: './chartjs/chartjs.module#ChartJSModule'
            }
        ]
    },
    {
        path: 'pages',
        component: simple_layout_component_1.SimpleLayoutComponent,
        data: {
            title: 'Pages'
        },
        children: [
            {
                path: '',
                loadChildren: './pages/pages.module#PagesModule',
            }
        ]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(exports.routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=E:/Projects/onderwijsapp/src/app.routing.js.map

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
* Allows the aside to be toggled via click.
*/
var AsideToggleDirective = (function () {
    function AsideToggleDirective() {
    }
    AsideToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('aside-menu-hidden');
    };
    return AsideToggleDirective;
}());
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AsideToggleDirective.prototype, "toggleOpen", null);
AsideToggleDirective = __decorate([
    core_1.Directive({
        selector: '.aside-menu-toggler',
    }),
    __metadata("design:paramtypes", [])
], AsideToggleDirective);
exports.AsideToggleDirective = AsideToggleDirective;
//# sourceMappingURL=E:/Projects/onderwijsapp/src/aside.directive.js.map

/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(255);
__webpack_require__(415);
var BreadcrumbsComponent = (function () {
    function BreadcrumbsComponent(router, route) {
        this.router = router;
        this.route = route;
    }
    BreadcrumbsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.filter(function (event) { return event instanceof router_1.NavigationEnd; }).subscribe(function (event) {
            _this.breadcrumbs = [];
            var currentRoute = _this.route.root, url = '';
            do {
                var childrenRoutes = currentRoute.children;
                currentRoute = null;
                childrenRoutes.forEach(function (route) {
                    if (route.outlet === 'primary') {
                        var routeSnapshot = route.snapshot;
                        url += '/' + routeSnapshot.url.map(function (segment) { return segment.path; }).join('/');
                        _this.breadcrumbs.push({
                            label: route.snapshot.data,
                            url: url
                        });
                        currentRoute = route;
                    }
                });
            } while (currentRoute);
        });
    };
    return BreadcrumbsComponent;
}());
BreadcrumbsComponent = __decorate([
    core_1.Component({
        selector: 'breadcrumbs',
        template: "\n  <template ngFor let-breadcrumb [ngForOf]=\"breadcrumbs\" let-last = last>\n    <li class=\"breadcrumb-item\" *ngIf=\"breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/' || breadcrumb.label.title&&last\" [ngClass]=\"{active: last}\">\n      <a *ngIf=\"!last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</a>\n      <span *ngIf=\"last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</span>\n    </li>\n  </template>"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object])
], BreadcrumbsComponent);
exports.BreadcrumbsComponent = BreadcrumbsComponent;
var _a, _b;
//# sourceMappingURL=E:/Projects/onderwijsapp/src/breadcrumb.component.js.map

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var NavDropdownDirective = (function () {
    function NavDropdownDirective(el) {
        this.el = el;
    }
    NavDropdownDirective.prototype.toggle = function () {
        this.el.nativeElement.classList.toggle('open');
    };
    return NavDropdownDirective;
}());
NavDropdownDirective = __decorate([
    core_1.Directive({
        selector: '.nav-dropdown'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object])
], NavDropdownDirective);
exports.NavDropdownDirective = NavDropdownDirective;
/**
* Allows the dropdown to be toggled via click.
*/
var NavDropdownToggleDirective = (function () {
    function NavDropdownToggleDirective(dropdown) {
        this.dropdown = dropdown;
    }
    NavDropdownToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        this.dropdown.toggle();
    };
    return NavDropdownToggleDirective;
}());
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NavDropdownToggleDirective.prototype, "toggleOpen", null);
NavDropdownToggleDirective = __decorate([
    core_1.Directive({
        selector: '.nav-dropdown-toggle',
    }),
    __metadata("design:paramtypes", [NavDropdownDirective])
], NavDropdownToggleDirective);
exports.NavDropdownToggleDirective = NavDropdownToggleDirective;
exports.NAV_DROPDOWN_DIRECTIVES = [NavDropdownDirective, NavDropdownToggleDirective];
var _a;
// export const NGB_DROPDOWN_DIRECTIVES = [NgbDropdownToggle, NgbDropdown];
//# sourceMappingURL=E:/Projects/onderwijsapp/src/nav-dropdown.directive.js.map

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
* Allows the sidebar to be toggled via click.
*/
var SidebarToggleDirective = (function () {
    function SidebarToggleDirective() {
    }
    SidebarToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('sidebar-hidden');
    };
    return SidebarToggleDirective;
}());
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SidebarToggleDirective.prototype, "toggleOpen", null);
SidebarToggleDirective = __decorate([
    core_1.Directive({
        selector: '.sidebar-toggler',
    }),
    __metadata("design:paramtypes", [])
], SidebarToggleDirective);
exports.SidebarToggleDirective = SidebarToggleDirective;
var MobileSidebarToggleDirective = (function () {
    function MobileSidebarToggleDirective() {
    }
    // Check if element has class
    MobileSidebarToggleDirective.prototype.hasClass = function (target, elementClassName) {
        return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
    };
    MobileSidebarToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('sidebar-mobile-show');
    };
    return MobileSidebarToggleDirective;
}());
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MobileSidebarToggleDirective.prototype, "toggleOpen", null);
MobileSidebarToggleDirective = __decorate([
    core_1.Directive({
        selector: '.mobile-sidebar-toggler',
    }),
    __metadata("design:paramtypes", [])
], MobileSidebarToggleDirective);
exports.MobileSidebarToggleDirective = MobileSidebarToggleDirective;
/**
* Allows the off-canvas sidebar to be closed via click.
*/
var SidebarOffCanvasCloseDirective = (function () {
    function SidebarOffCanvasCloseDirective() {
    }
    // Check if element has class
    SidebarOffCanvasCloseDirective.prototype.hasClass = function (target, elementClassName) {
        return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
    };
    // Toggle element class
    SidebarOffCanvasCloseDirective.prototype.toggleClass = function (elem, elementClassName) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
        if (this.hasClass(elem, elementClassName)) {
            while (newClass.indexOf(' ' + elementClassName + ' ') >= 0) {
                newClass = newClass.replace(' ' + elementClassName + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
        else {
            elem.className += ' ' + elementClassName;
        }
    };
    SidebarOffCanvasCloseDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        if (this.hasClass(document.querySelector('body'), 'sidebar-off-canvas')) {
            this.toggleClass(document.querySelector('body'), 'sidebar-opened');
        }
    };
    return SidebarOffCanvasCloseDirective;
}());
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SidebarOffCanvasCloseDirective.prototype, "toggleOpen", null);
SidebarOffCanvasCloseDirective = __decorate([
    core_1.Directive({
        selector: '.sidebar-close',
    }),
    __metadata("design:paramtypes", [])
], SidebarOffCanvasCloseDirective);
exports.SidebarOffCanvasCloseDirective = SidebarOffCanvasCloseDirective;
exports.SIDEBAR_TOGGLE_DIRECTIVES = [SidebarToggleDirective, SidebarOffCanvasCloseDirective, MobileSidebarToggleDirective];
//# sourceMappingURL=E:/Projects/onderwijsapp/src/sidebar.directive.js.map

/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};
//# sourceMappingURL=E:/Projects/onderwijsapp/src/environment.js.map

/***/ }),

/***/ 703:
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler mobile-sidebar-toggler hidden-lg-up\" type=\"button\">&#9776;</button>\n  <a class=\"navbar-brand\" href=\"#\"></a>\n\n  <ul class=\"nav navbar-nav hidden-md-down\">\n    <li class=\"nav-item px-1\">\n      <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\"><i class=\"icon-speedometer\"></i> Dashboard</a>\n    </li>\n    <li class=\"nav-item px-1\">\n      <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/cursussen']\"><i class=\"fa fa-graduation-cap\"></i> Cursussen</a>\n    </li>\n    <li class=\"nav-item px-1\">\n      <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/leerplannen']\"><i class=\"fa fa-book\"></i> Leerplannen</a>\n    </li>\n    <li class=\"nav-item px-1\">\n      <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/coordinatoren']\"><i class=\"fa fa-book\"></i> Coordinatoren</a>\n    </li>\n  </ul>\n\n  <ul class=\"nav navbar-nav ml-auto\">\n    <!--\n    <li class=\"nav-item hidden-md-down\">\n      <a class=\"nav-link\" href=\"#\"><i class=\"icon-bell\"></i><span class=\"badge badge-pill badge-danger\">5</span></a>\n    </li>\n    <li class=\"nav-item hidden-md-down\">\n      <a class=\"nav-link\" href=\"#\"><i class=\"icon-list\"></i></a>\n    </li>\n    <li class=\"nav-item hidden-md-down\">\n      <a class=\"nav-link\" href=\"#\"><i class=\"icon-location-pin\"></i></a>\n    </li>\n    -->\n    <li>\n      {{selectedOrganisatie}}\n    </li>\n    <li class=\"nav-item dropdown\" dropdown (onToggle)=\"toggled($event)\">\n      <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\n        <img src=\"assets/img/avatars/unknown.png\" class=\"img-avatar\" alt=\"You\">\n        <span class=\"hidden-md-down\">admin</span>\n      </a>\n      <div class=\"dropdown-menu dropdown-menu-right\" dropdownMenu aria-labelledby=\"simple-dropdown\">\n\n        <div class=\"dropdown-header text-center\"><strong>Account</strong></div>\n        <a class=\"dropdown-item\" href=\"#\"><i class=\"fa fa-lock\"></i> Logout</a>\n        <!--\n        <a class=\"dropdown-item\" href=\"#\"><i class=\"fa fa-bell-o\"></i> Updates<span class=\"badge badge-info\">42</span></a>\n        <a class=\"dropdown-item\" href=\"#\"><i class=\"fa fa-envelope-o\"></i> Messages<span class=\"badge badge-success\">42</span></a>\n        <a class=\"dropdown-item\" href=\"#\"><i class=\"fa fa-tasks\"></i> Tasks<span class=\"badge badge-danger\">42</span></a>\n        <a class=\"dropdown-item\" href=\"#\"><i class=\"fa fa-comments\"></i> Comment<span class=\"badge badge-warning\">42</span></a>\n\n        <div class=\"dropdown-header text-center\"><strong>Settings</strong></div>\n\n        <a class=\"dropdown-item\" href=\"#\"><i class=\"fa fa-user\"></i> Profile</a>\n        <a class=\"dropdown-item\" href=\"#\"><i class=\"fa fa-wrench\"></i> Setting</a>\n        <a class=\"dropdown-item\" href=\"#\"><i class=\"fa fa-usd\"></i> Payments<span class=\"badge badge-default\">42</span></a>\n        <a class=\"dropdown-item\" href=\"#\"><i class=\"fa fa-file\"></i> Projects<span class=\"badge badge-primary\">42</span></a>\n        <div class=\"divider\"></div>\n        <a class=\"dropdown-item\" href=\"#\"><i class=\"fa fa-shield\"></i> Lock account</a>\n\n        -->\n      </div>\n    </li>\n    <!--\n    <li class=\"nav-item hidden-md-down\">\n      <a class=\"nav-link navbar-toggler aside-menu-toggler\" href=\"#\">&#9776;</a>\n    </li> -->\n  </ul>\n\n</header>\n\n<div class=\"app-body\">\n  <!--<div class=\"sidebar\">-->\n    <!--<nav class=\"sidebar-nav\">-->\n      <!--<ul class=\"nav\">-->\n        <!--<li class=\"divider\"></li>-->\n        <!--<li class=\"nav-title\">-->\n          <!--Navigatie-->\n        <!--</li>-->\n        <!--<li class=\"nav-item\">-->\n          <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\"><i class=\"icon-speedometer\"></i> Dashboard</a>-->\n        <!--</li>-->\n        <!--<li class=\"nav-item\">-->\n          <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/cursussen']\"><i class=\"fa fa-graduation-cap\"></i> Cursussen</a>-->\n        <!--</li>-->\n        <!--<li class=\"nav-item\">-->\n          <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/leerplannen']\"><i class=\"fa fa-book\"></i> Leerplannen</a>-->\n        <!--</li>-->\n\n        <!--&lt;!&ndash;-->\n        <!--<li class=\"divider\"></li>-->\n        <!--<li class=\"nav-title\">-->\n          <!--UI Elements-->\n        <!--</li>-->\n        <!--<li class=\"nav-item nav-dropdown\" routerLinkActive=\"open\">-->\n          <!--<a class=\"nav-link nav-dropdown-toggle\" href=\"#\"><i class=\"icon-puzzle\"></i> Components</a>-->\n          <!--<ul class=\"nav-dropdown-items\">-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/components/buttons']\"><i class=\"icon-puzzle\"></i> Buttons</a>-->\n            <!--</li>-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/components/social-buttons']\"><i class=\"icon-puzzle\"></i> Social Buttons</a>-->\n            <!--</li>-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/components/cards']\"><i class=\"icon-puzzle\"></i> Cards</a>-->\n            <!--</li>-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/components/forms']\"><i class=\"icon-puzzle\"></i> Forms</a>-->\n            <!--</li>-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/components/modals']\"><i class=\"icon-puzzle\"></i> Modals</a>-->\n            <!--</li>-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/components/switches']\"><i class=\"icon-puzzle\"></i> Switches</a>-->\n            <!--</li>-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/components/tables']\"><i class=\"icon-puzzle\"></i> Tables</a>-->\n            <!--</li>-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/components/tabs']\"><i class=\"icon-puzzle\"></i> Tabs</a>-->\n            <!--</li>-->\n          <!--</ul>-->\n        <!--</li>-->\n        <!--<li class=\"nav-item nav-dropdown\" routerLinkActive=\"open\">-->\n          <!--<a class=\"nav-link nav-dropdown-toggle\" href=\"#\"><i class=\"icon-star\"></i> Icons</a>-->\n          <!--<ul class=\"nav-dropdown-items\">-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/icons/font-awesome']\"><i class=\"icon-star\"></i> Font Awesome</a>-->\n            <!--</li>-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/icons/simple-line-icons']\"><i class=\"icon-star\"></i> Simple Line Icons</a>-->\n            <!--</li>-->\n          <!--</ul>-->\n        <!--</li>-->\n        <!--<li class=\"nav-item\">-->\n          <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/widgets']\"><i class=\"icon-calculator\"></i> Widgets <span class=\"badge badge-info\">NEW</span></a>-->\n        <!--</li>-->\n        <!--<li class=\"nav-item\">-->\n          <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/charts']\"><i class=\"icon-pie-chart\"></i> Charts</a>-->\n        <!--</li>-->\n        <!--<li class=\"divider\"></li>-->\n        <!--<li class=\"nav-title\">-->\n          <!--Extras-->\n        <!--</li>-->\n        <!--<li class=\"nav-item nav-dropdown\">-->\n          <!--<a class=\"nav-link nav-dropdown-toggle\" href=\"#\"><i class=\"icon-star\"></i> Pages</a>-->\n          <!--<ul class=\"nav-dropdown-items\">-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/pages/login']\"><i class=\"icon-star\"></i> Login</a>-->\n            <!--</li>-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/pages/register']\"><i class=\"icon-star\"></i> Register</a>-->\n            <!--</li>-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/pages/404']\"><i class=\"icon-star\"></i> Error 404</a>-->\n            <!--</li>-->\n            <!--<li class=\"nav-item\">-->\n              <!--<a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/pages/500']\"><i class=\"icon-star\"></i> Error 500</a>-->\n            <!--</li>-->\n          <!--</ul>-->\n        <!--</li>-->\n        <!--&ndash;&gt;-->\n      <!--</ul>-->\n    <!--</nav>-->\n  <!--</div>-->\n\n  <!-- Main content -->\n  <main class=\"content\">\n\n    <!-- Breadcrumb -->\n    <ol class=\"breadcrumb\">\n      <breadcrumbs></breadcrumbs>\n\n      <!-- Breadcrumb Menu-->\n      <!-- <li class=\"breadcrumb-menu hidden-md-down\">\n        <div class=\"btn-group\" role=\"group\" aria-label=\"Button group with nested dropdown\">\n          <a class=\"btn btn-secondary\" href=\"#\"><i class=\"icon-speech\"></i></a>\n          <a class=\"btn btn-secondary\" [routerLink]=\"['/dashboard']\"><i class=\"icon-graph\"></i> &nbsp;Dashboard</a>\n          <a class=\"btn btn-secondary\" href=\"#\"><i class=\"icon-settings\"></i> &nbsp;Settings</a>\n        </div>\n      </li> -->\n\n    </ol>\n\n    <div class=\"container-fluid\">\n      <router-outlet></router-outlet>\n    </div><!-- /.conainer-fluid -->\n  </main>\n\n  <aside class=\"aside-menu\">\n    <tabset>\n      <tab>\n        <template tabHeading><i class=\"icon-list\"></i></template>\n        <div class=\"callout m-0 py-h text-muted text-center bg-faded text-uppercase\">\n          <small><b>Today</b></small>\n        </div>\n        <hr class=\"transparent mx-1 my-0\">\n        <div class=\"callout callout-warning m-0 py-1\">\n          <div class=\"avatar float-right\">\n            <img src=\"assets/img/avatars/7.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n          </div>\n          <div>Meeting with <strong>Lucas</strong></div>\n          <small class=\"text-muted mr-1\"><i class=\"icon-calendar\"></i>&nbsp; 1 - 3pm</small>\n          <small class=\"text-muted\"><i class=\"icon-location-pin\"></i>&nbsp; Palo Alto, CA </small>\n        </div>\n        <hr class=\"mx-1 my-0\">\n        <div class=\"callout callout-info m-0 py-1\">\n          <div class=\"avatar float-right\">\n            <img src=\"assets/img/avatars/4.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n          </div>\n          <div>Skype with <strong>Megan</strong></div>\n          <small class=\"text-muted mr-1\"><i class=\"icon-calendar\"></i>&nbsp; 4 - 5pm</small>\n          <small class=\"text-muted\"><i class=\"icon-social-skype\"></i>&nbsp; On-line </small>\n        </div>\n        <hr class=\"transparent mx-1 my-0\">\n        <div class=\"callout m-0 py-h text-muted text-center bg-faded text-uppercase\">\n          <small><b>Tomorrow</b></small>\n        </div>\n        <hr class=\"transparent mx-1 my-0\">\n        <div class=\"callout callout-danger m-0 py-1\">\n          <div>New UI Project - <strong>deadline</strong></div>\n          <small class=\"text-muted mr-1\"><i class=\"icon-calendar\"></i>&nbsp; 10 - 11pm</small>\n          <small class=\"text-muted\"><i class=\"icon-home\"></i>&nbsp; creativeLabs HQ </small>\n          <div class=\"avatars-stack mt-h\">\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/2.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/3.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/4.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/5.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/6.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n          </div>\n        </div>\n        <hr class=\"mx-1 my-0\">\n        <div class=\"callout callout-success m-0 py-1\">\n          <div><strong>#10 Startups.Garden</strong> Meetup</div>\n          <small class=\"text-muted mr-1\"><i class=\"icon-calendar\"></i>&nbsp; 1 - 3pm</small>\n          <small class=\"text-muted\"><i class=\"icon-location-pin\"></i>&nbsp; Palo Alto, CA </small>\n        </div>\n        <hr class=\"mx-1 my-0\">\n        <div class=\"callout callout-primary m-0 py-1\">\n          <div><strong>Team meeting</strong></div>\n          <small class=\"text-muted mr-1\"><i class=\"icon-calendar\"></i>&nbsp; 4 - 6pm</small>\n          <small class=\"text-muted\"><i class=\"icon-home\"></i>&nbsp; creativeLabs HQ </small>\n          <div class=\"avatars-stack mt-h\">\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/2.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/3.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/4.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/5.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/6.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/7.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n            <div class=\"avatar avatar-xs\">\n              <img src=\"assets/img/avatars/8.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n            </div>\n          </div>\n        </div>\n        <hr class=\"mx-1 my-0\">\n      </tab>\n      <tab>\n        <template tabHeading><i class=\"icon-speech\"></i></template>\n        <div class=\"p-1\">\n          <div class=\"message\">\n            <div class=\"py-1 pb-3 mr-1 float-left\">\n              <div class=\"avatar\">\n                <img src=\"assets/img/avatars/7.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n                <span class=\"avatar-status badge-success\"></span>\n              </div>\n            </div>\n            <div>\n              <small class=\"text-muted\">Lukasz Holeczek</small>\n              <small class=\"text-muted float-right mt-q\">1:52 PM</small>\n            </div>\n            <div class=\"text-truncate font-weight-bold\">Lorem ipsum dolor sit amet</div>\n            <small class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>\n          </div>\n          <hr>\n          <div class=\"message\">\n            <div class=\"py-1 pb-3 mr-1 float-left\">\n              <div class=\"avatar\">\n                <img src=\"assets/img/avatars/7.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n                <span class=\"avatar-status badge-success\"></span>\n              </div>\n            </div>\n            <div>\n              <small class=\"text-muted\">Lukasz Holeczek</small>\n              <small class=\"text-muted float-right mt-q\">1:52 PM</small>\n            </div>\n            <div class=\"text-truncate font-weight-bold\">Lorem ipsum dolor sit amet</div>\n            <small class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>\n          </div>\n          <hr>\n          <div class=\"message\">\n            <div class=\"py-1 pb-3 mr-1 float-left\">\n              <div class=\"avatar\">\n                <img src=\"assets/img/avatars/7.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n                <span class=\"avatar-status badge-success\"></span>\n              </div>\n            </div>\n            <div>\n              <small class=\"text-muted\">Lukasz Holeczek</small>\n              <small class=\"text-muted float-right mt-q\">1:52 PM</small>\n            </div>\n            <div class=\"text-truncate font-weight-bold\">Lorem ipsum dolor sit amet</div>\n            <small class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>\n          </div>\n          <hr>\n          <div class=\"message\">\n            <div class=\"py-1 pb-3 mr-1 float-left\">\n              <div class=\"avatar\">\n                <img src=\"assets/img/avatars/7.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n                <span class=\"avatar-status badge-success\"></span>\n              </div>\n            </div>\n            <div>\n              <small class=\"text-muted\">Lukasz Holeczek</small>\n              <small class=\"text-muted float-right mt-q\">1:52 PM</small>\n            </div>\n            <div class=\"text-truncate font-weight-bold\">Lorem ipsum dolor sit amet</div>\n            <small class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>\n          </div>\n          <hr>\n          <div class=\"message\">\n            <div class=\"py-1 pb-3 mr-1 float-left\">\n              <div class=\"avatar\">\n                <img src=\"assets/img/avatars/7.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n                <span class=\"avatar-status badge-success\"></span>\n              </div>\n            </div>\n            <div>\n              <small class=\"text-muted\">Lukasz Holeczek</small>\n              <small class=\"text-muted float-right mt-q\">1:52 PM</small>\n            </div>\n            <div class=\"text-truncate font-weight-bold\">Lorem ipsum dolor sit amet</div>\n            <small class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</small>\n          </div>\n        </div>\n      </tab>\n      <tab>\n        <template tabHeading><i class=\"icon-settings\"></i></template>\n        <div class=\"p-1\">\n          <h6>Settings</h6>\n\n          <div class=\"aside-options\">\n            <div class=\"clearfix mt-2\">\n              <small><b>Option 1</b></small>\n              <label class=\"switch switch-text switch-pill switch-success switch-sm float-right\">\n                <input type=\"checkbox\" class=\"switch-input\" checked>\n                <span class=\"switch-label\" data-on=\"On\" data-off=\"Off\"></span>\n                <span class=\"switch-handle\"></span>\n              </label>\n            </div>\n            <div>\n              <small class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>\n            </div>\n          </div>\n\n          <div class=\"aside-options\">\n            <div class=\"clearfix mt-1\">\n              <small><b>Option 2</b></small>\n              <label class=\"switch switch-text switch-pill switch-success switch-sm float-right\">\n                <input type=\"checkbox\" class=\"switch-input\">\n                <span class=\"switch-label\" data-on=\"On\" data-off=\"Off\"></span>\n                <span class=\"switch-handle\"></span>\n              </label>\n            </div>\n            <div>\n              <small class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>\n            </div>\n          </div>\n\n          <div class=\"aside-options\">\n            <div class=\"clearfix mt-1\">\n              <small><b>Option 3</b></small>\n              <label class=\"switch switch-text switch-pill switch-success switch-sm float-right\">\n                <input type=\"checkbox\" class=\"switch-input\">\n                <span class=\"switch-label\" data-on=\"On\" data-off=\"Off\"></span>\n                <span class=\"switch-handle\"></span>\n              </label>\n            </div>\n          </div>\n\n          <div class=\"aside-options\">\n            <div class=\"clearfix mt-1\">\n              <small><b>Option 4</b></small>\n              <label class=\"switch switch-text switch-pill switch-success switch-sm float-right\">\n                <input type=\"checkbox\" class=\"switch-input\" checked>\n                <span class=\"switch-label\" data-on=\"On\" data-off=\"Off\"></span>\n                <span class=\"switch-handle\"></span>\n              </label>\n            </div>\n          </div>\n\n          <hr>\n          <h6>System Utilization</h6>\n\n          <div class=\"text-uppercase mb-q mt-2\"><small><b>CPU Usage</b></small></div>\n          <div class=\"progress progress-xs\">\n            <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">348 Processes. 1/4 Cores.</small>\n\n          <div class=\"text-uppercase mb-q mt-h\"><small><b>Memory Usage</b></small></div>\n          <div class=\"progress progress-xs\">\n            <div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 70%\" aria-valuenow=\"70\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">11444GB/16384MB</small>\n\n          <div class=\"text-uppercase mb-q mt-h\"><small><b>SSD 1 Usage</b></small></div>\n          <div class=\"progress progress-xs\">\n            <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 95%\" aria-valuenow=\"95\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">243GB/256GB</small>\n\n          <div class=\"text-uppercase mb-q mt-h\"><small><b>SSD 2 Usage</b></small></div>\n          <div class=\"progress progress-xs\">\n            <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 10%\" aria-valuenow=\"10\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">25GB/256GB</small>\n        </div>\n      </tab>\n    </tabset>\n  </aside>\n</div>\n\n<footer class=\"app-footer\">\n  <span class=\"float-right\">Powered by <a href=\"http://google.nl\">MA-GROEP</a></span>\n</footer>\n"

/***/ }),

/***/ 711:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(401);


/***/ })

},[711]);
//# sourceMappingURL=main.bundle.js.map