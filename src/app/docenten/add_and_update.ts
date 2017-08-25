
<style>
.selectable:hover {
	cursor: pointer;
}

.table-label {
	width: 10%;
}
</style>

<div class="animated fadeIn">
	<div *ngIf="loading" align="center" class="page-loading">
		<img src="assets/img/ripple.svg" />
	</div>
	<div class="row">
		<div class="col-md-12 col-lg-2">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title mb-0">Cursussen</h4>
				</div>
				<button type="button" class="btn btn-info"
					(click)="cursusModal.show(); initializeCursusForm();">
					<i class="fa fa-plus" aria-hidden="true"></i>
				</button>
				<div class="card-block">
					<div class="course-wrapper">
						<div class="row">
							<div class="col-md-12">
								<table class="table table-hover">
									<tbody>
										<tr *ngFor="let cursus of courses" (click)="onSelect(cursus)"
											class="selectable">
											<td colspan="1">{{ cursus.code }}
												<div>{{ cursus.naam }}</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-10 course">
			<div *ngIf="currentCourse">
				<div class="card-header">
					<h4 class="card-title mb-0">{{currentCourse.code | uppercase}}</h4>
				</div>
				<!-- Nav tabs -->
				<tabset> <tab> <template tabHeading> <i
					class="icon-list"></i> Algemeen</template>
				<form #editCourse="ngForm" novalidate>
					<a href="javascript:void(0)" (click)="changeMode('edit')"
						*ngIf="mode == 'view'">Bewerken</a> <a href="javascript:void(0)"
						(click)="changeMode('view')" *ngIf="mode == 'edit'">Annuleren</a>
					<a href="javascript:void(0)" (click)="save(editCourse)"
						*ngIf="mode == 'edit'">Opslaan</a>
					<div class="form-group row">
						<label for="code" class="col-2 col-form-label">Code</label>
						<div class="col-10">
							<div class="col-form-label" *ngIf="mode == 'view'">{{currentCourse.code}}</div>
							<input *ngIf="mode == 'edit'" class="form-control" type="text"
								id="code" name="code" required [(ngModel)]="currentCourse.code">
						</div>
					</div>
					<div class="form-group row">
						<label for="naam" class="col-2 col-form-label">Naam</label>
						<div class="col-10">
							<div class="col-form-label" *ngIf="mode == 'view'">{{currentCourse.naam}}</div>
							<input *ngIf="mode == 'edit'" class="form-control" type="text"
								id="naam" name="naam" required [(ngModel)]="currentCourse.naam">
						</div>
					</div>
					<div class="form-group row">
						<label for="periode" class="col-2 col-form-label">Periode</label>
						<div class="col-10">
							<div class="col-form-label" *ngIf="mode == 'view'">{{currentCourse.periode}}</div>
							<input *ngIf="mode == 'edit'" class="form-control" type="text"
								id="periode" name="periode" required
								[(ngModel)]="currentCourse.periode">
						</div>
					</div>
					<div class="form-group row">
						<label for="europeanCredits" class="col-2 col-form-label">Ects</label>
						<div class="col-10">
							<div class="col-form-label" *ngIf="mode == 'view'">{{currentCourse.europeanCredits}}</div>
							<input *ngIf="mode == 'edit'" class="form-control" type="text"
								id="europeanCredits" name="europeanCredits" required
								[(ngModel)]="currentCourse.europeanCredits">
						</div>
					</div>
					<div class="form-group row">
						<label for="coordinator" class="col-2 col-form-label">Coördinator</label>
						<div class="col-10">
							<div class="col-form-label" *ngIf="mode == 'view'">{{currentCourse.coordinator?.naam}}</div>
							<select *ngIf="mode == 'edit'"
								[ngModel]="formCourse.coordinator?.id" type="text"
								class="form-control" id="coordinator" name="coordinator">
								<option *ngFor="let a of allDocenten" [ngValue]="a.id">{{a.naam}}</option>
							</select>
						</div>
					</div>


					{{editCourse.value | json}}
				</form>
				</tab> <tab> <template tabHeading> <i
					class="icon-calculator"></i> Beroepstaken</template>
				<div class="col-12">
					<div class="row">
						<div class="table-responsive">
							<table class="table preview-table">
								<thead>
									<tr>
										<th></th>
										<th>Architectuur laag</th>
										<th>Activiteit</th>
										<th>Niveau</th>
										<th>Omschrijving</th>
									</tr>
								</thead>
								<tbody>
									<tr *ngFor="let bt of currentCourse.beroepstaken">
										<td><a class="text-danger lead" href="javascript:void(0)"
											(click)="deleteBeroepstaak(bt)"><i
												class="fa fa-minus-circle" aria-hidden="true"></i></a></td>
										<td>{{bt.architectuurlaag}}</td>
										<td>{{bt.activiteit}}</td>
										<td>{{bt.niveau}}</td>
										<td>{{bt.omschrijving}}</td>
									</tr>
								</tbody>
								<!-- preview content goes here-->
							</table>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<div class="btn-group pull-right" role="group" aria-label="...">
								<button type="button" class="btn btn-info"
									(click)="BeroepstaakModal.show(); getBeroepstaakTypes();">
									<i class="fa fa-plus" aria-hidden="true"></i>
								</button>
							</div>
						</div>
					</div>
				</div>

				</tab> <tab> <template tabHeading> <i
					class="icon-pie-chart"></i> Professional skills</template>
				<div class="col-12">
					<div class="row">
						<div class="table-responsive">
							<table class="table preview-table">
								<thead>
									<tr>
										<th></th>
										<th>Code</th>
										<th>Beschrijving</th>
										<th>Niveau</th>
									</tr>
								</thead>
								<tbody>
									<tr *ngFor="let ps of currentCourse.professionalskills">
										<td><a class="text-danger lead" href="javascript:void(0)"
											(click)="deleteProfessionalskill(ps)"><i
												class="fa fa-minus-circle" aria-hidden="true"></i></a></td>
										<td>{{ps.code}}</td>
										<td>{{ps.beschrijving}}</td>
										<td>{{ps.niveau}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<div class="btn-group pull-right" role="group" aria-label="...">
								<button type="button" class="btn btn-info"
									(click)="ProfessionalskillModal.show(); getProfessionalskillTypes();">
									<i class="fa fa-plus" aria-hidden="true"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
				</tab> <tab> <template tabHeading> <i
					class="icon-pie-chart"></i> Leerdoelen</template>
				<div class="col-12">
					<div class="row">
						<div class="table-responsive">
							<table class="table preview-table">
								<thead>
									<tr>
										<th></th><th></th>
										<th>Bloomniveau</th>
										<th>Professional Skill</th>
										<th>Beroepstaak</th>
										<th>Omschrijving</th>
									</tr>
								</thead>
								<tbody>
									<tr *ngFor="let ld of currentCourse.leerdoelenlijst">
										<td><a class="text-danger" href="javascript:void(0)"
											(click)="deleteLeerdoel(ld)"><i
												class="fa fa-minus-circle" aria-hidden="true"
												style="font-size: 20px;"></i></a></td>
										<td><a href="javascript:void(0)"
											(click)="LeerdoelModal.show(); initializeLeerdoelForm();"><i
												class="fa fa-pencil-square" aria-hidden="true"
												style="font-size: 20px;"></i></a></td>
										<td>{{ld.bloomniveau.naam}}</td>
										<td>{{ld.eindPS.naam}}</td>
										<td>{{ld.eindBT.naam}}</td>
										<td>{{ld.omschrijving}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<div class="btn-group pull-right" role="group" aria-label="...">
								<button type="button" class="btn btn-info"
									(click)="LeerdoelModal.show(); initializeLeerdoelForm();">
									<i class="fa fa-plus" aria-hidden="true"></i>
								</button>
							</div>
						</div>
					</div>
				</div>

				</tab> <tab> <template tabHeading> <i
					class="icon-pie-chart"></i> Toetsen</template>
				<div class="col-12">
					<div class="row">
						<div class="table-responsive">
							<table class="table preview-table">
								<thead>
									<tr>
										<th></th>
										<th>Naam</th>
										<th>Gewicht</th>
										<th>Osiris Resultaat type</th>
										<th>beoordelingsElementen</th>
									</tr>
								</thead>
								<tbody>
									<tr *ngFor="let to of currentCourse.toetsenlijst">
										<td><a class="text-danger lead" href="javascript:void(0)"
											(click)="deleteToets(to)"><i class="fa fa-minus-circle"
												aria-hidden="true"></i></a></td>
										<td>{{to.naam}}</td>
										<td>{{to.gewicht}}%</td>
										<td>{{to.osirisResultaatType.naam}}</td>
										<td>
											<table class="table table-sm">
												<tr>
													<th colspan="4"><div style="overflow: auto;"
															role="group" aria-label="...">
															<button class="btn btn-info btn-sm pull-right"
																(click)="beoordelingselementModal.show(); initializeBeoordelingsForm(to);">
																<i class="fa fa-plus" aria-hidden="true"></i>
															</button>
														</div></th>
												</tr>
												<tr *ngFor="let be of to.beoordelingsElementen">
													<td><a class="text-danger lead text-sm"
														href="javascript:void(0)"
														(click)="deleteBeoordelingsElement(be)"><i
															class="fa fa-minus-circle" aria-hidden="true"></i></a></td>
													<td><b>Naam:</b> {{be.naam}}</td>
													<td><b>Omschrijving:</b> {{be.omschrijving}}</td>
												</tr>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<div class="btn-group pull-right" role="group" aria-label="...">
								<button type="button" class="btn btn-info"
									(click)="ToetsModal.show(); initializeToetsForm();">
									<i class="fa fa-plus" aria-hidden="true"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
				</tab> <tab> <template tabHeading> <i
					class="icon-pie-chart"></i> Toetsmatrijs</template>
				<table class="toetsmatrijs table table-bordered table-nonfluid">
					<tr>
						<td class="tableInvisible"></td>
						<td class="tableInvisible"></td>
						<td class="tableInvisible"></td>
						<td class="tableInvisible"></td>
						<td class="tableInvisible"></td>
						<ng-container
							*ngFor="let row of currentCourse.toetsmatrijs; let i = index">
						<ng-container *ngIf="i == 0"> <ng-container
							*ngFor="let item of row; let j = index"> <ng-container
							*ngIf="j > 4">
						<td class="toetsKopje"><div>
								<span>{{item}}</span>
							</div></td>
						</ng-container> </ng-container> </ng-container> </ng-container>
					</tr>
					<tr class="toetsElementen">
						<td class="tableInvisible"><div>
								<span>Prof. Skill</span>
							</div></td>
						<td class="tableInvisible"><div>
								<span>Beroepstaak</span>
							</div></td>
						<td class="tableInvisible"><div>
								<span>Leerdoel</span>
							</div></td>
						<td class="tableInvisible"><div>
								<span>Bloom</span>
							</div></td>
						<td class="tableInvisible"></td>
						<ng-container
							*ngFor="let row of currentCourse.toetsmatrijs; let i = index">
						<ng-container *ngIf="i == 1"> <ng-container
							*ngFor="let item of row; let j = index"> <ng-container
							*ngIf="j > 4">
						<td class="toetsElementKopje"><div>
								<span>{{item.naam}}</span>
							</div></td>
						</ng-container> </ng-container> </ng-container> </ng-container>
					</tr>
					<tr>
						<td class="empty"></td>
						<td class="empty"></td>
						<td class="empty"></td>
						<td class="empty"></td>
						<td class="empty total">Totaal</td>
						<ng-container
							*ngFor="let row of currentCourse.toetsmatrijs; let i = index">
						<ng-container *ngIf="i == 2"> <ng-container
							*ngFor="let item of row; let j = index"> <ng-container
							*ngIf="j > 4">
						<td class="total"><div>
								<span>{{item}} %</span>
							</div></td>
						</ng-container> </ng-container> </ng-container> </ng-container>
					</tr>
					<ng-container
						*ngFor="let row of currentCourse.toetsmatrijs; let i = index">
					<ng-container *ngIf="i > 2">
					<tr>
						<ng-container *ngFor="let item of row; let j = index">
						<ng-container *ngIf="j < 5">
						<td class="ld" [ngClass]="{'total': j == 4}"><div>
								<span>{{item}} <ng-container *ngIf="j == 4">%</ng-container></span>
							</div></td>
						</ng-container> <ng-container *ngIf="j > 4">
						<td class="weging"
							*ngIf="toetsMatrijsEdit != item?.id && toetsMatrijsAdd !== item"><div
								(click)="editCell(item?.id, item?.gewicht)"
								class="btn-editToets" *ngIf="item !== Array">
								<span>{{item?.gewicht}} <ng-container
										*ngIf="item?.gewicht != undefined">%</ng-container></span>
							</div>
							<div *ngIf="item?.length > 0">
								<button class="btn btn-small btn-info btn-addToets"
									(click)="addCell(item)">
									<i class="fa fa-plus" aria-hidden="true"></i>
								</button>
							</div></td>
						<td class="weging" *ngIf="toetsMatrijsEdit == item?.id">
							<form #f="ngForm">
								<input type="number" name="gewicht" class="form-control"
									[(ngModel)]="toetsMatrijsEditForm.gewicht" max="100" />
								<button class="btn btn-success btn-sm"
									(click)="editToetsElement()">
									<i class="fa fa-check"></i>
								</button>
								<button class="btn btn-danger btn-sm"
									(click)="cancelEditGewicht()">
									<i class="fa fa-close"></i>
								</button>
								<button class="btn btn-danger btn-sm"
									(click)="deleteToetsElement()">
									<i class="fa fa-trash"></i>
								</button>
							</form>
						</td>
						<td class="weging" *ngIf="toetsMatrijsAdd == item">
							<form #f="ngForm">
								<input type="number" name="gewicht" class="form-control"
									[(ngModel)]="toetsMatrijsAddForm.gewicht" max="100" />
								<button class="btn btn-success btn-sm"
									(click)="addToetsElement()">
									<i class="fa fa-check"></i>
								</button>
								<button class="btn btn-danger btn-sm"
									(click)="cancelSaveGewicht()">
									<i class="fa fa-close"></i>
								</button>
							</form>
						</td>
						</ng-container> </ng-container>
					</tr>
					</ng-container> </ng-container>
				</table>
				</tab> </tabset>
			</div>
		</div>
	</div>
</div>

<div bsModal #CursusModal="bs-modal" class="addModal modal fade"
	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	aria-hidden="true">
	<div class="modal-dialog modal-primary" role="document">
		<div class="modal-content">
			<form #f="ngForm">
				<div class="modal-header">
					<h4 class="modal-title">Nieuwe cursus</h4>
					<button type="button" class="close" (click)="cursusModal.hide()"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div *ngIf="loading" align="center">
						<br /> <img src="assets/img/ripple.svg" />
					</div>
					<div class="form">

						<div class="form-group row">
							<label for="naam" class="col-2 col-form-label">Code</label>
							<div class="col-10">
								<input class="form-control" type="text" id="code" name="code"
									required [(ngModel)]="cursusForm.code">
							</div>
						</div>
						<div class="form-group row">
							<label for="naam" class="col-2 col-form-label">Naam</label>
							<div class="col-10">
								<input class="form-control" type="text" id="naam" name="naam"
									required [(ngModel)]="cursusForm.naam">
							</div>
						</div>
						<div class="form-group row">
							<label for="periode" class="col-2 col-form-label">Periode</label>
							<div class="col-10">
								<input class="form-control" type="text" id="periode"
									name="periode" required [(ngModel)]="cursusForm.periode">
							</div>
						</div>

						<div class="form-group row">
							<label for="europeanCredits" class="col-2 col-form-label">ECTS</label>
							<div class="col-10">
								<input class="form-control" type="text" id="europeanCredits"
									name="europeanCredits" required
									[(ngModel)]="cursusForm.europeanCredits">
							</div>
						</div>
						<div class="form-group row">
							<label for="coordinator" class="col-2 col-form-label">Coördinator</label>
							<div class="col-10">
								<select class="form-control" id="coordinator" name="coordinator"
									[(ngModel)]="cursusForm.coordinator">
									<option *ngFor="let a of allDocenten" [ngValue]="a.id">{{a.naam}}</option>
								</select>
							</div>
						</div>

						{{cursusForm | json}}

					</div>
				</div>
				<div *ngIf="!loading" class="modal-footer">
					<button type="button" class="btn btn-secondary"
						(click)="cursusModal.hide()">Sluiten</button>
					<button type="button" class="btn btn-primary" (click)="addCursus()">Toevoegen</button>
				</div>
			</form>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<div bsModal #BeroepstaakModal="bs-modal" class="addModal modal fade"
	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	aria-hidden="true">
	<div class="modal-dialog modal-primary" role="document">
		<div class="modal-content">
			<form #f="ngForm">
				<div class="modal-header">
					<h4 class="modal-title">Beroepstaken</h4>
					<button type="button" class="close"
						(click)="BeroepstaakModal.hide()" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div *ngIf="loading" align="center">
						<br /> <img src="assets/img/ripple.svg" />
					</div>
					<span *ngIf="error" class="text-danger">U heeft geen
						beroepstaak geselecteerd</span>
					<div class="form">
						<div class="form-group">
							<label for="architectuurlaag">Architectuur laag:</label> <select
								class="form-control" id="architectuurlaag"
								name="architectuurlaag"
								[(ngModel)]="beroepstakenForm.architectuurlaag">
								<option *ngFor="let a of beroepstakenTypes.architectuurLagen"
									[ngValue]="a.id">{{a.naam}}</option>
							</select>
						</div>

						<div class="form-group">
							<label for="activiteit">Activiteit:</label> <select
								class="form-control" id="activiteit" name="activiteit"
								[(ngModel)]="beroepstakenForm.activiteit">
								<option *ngFor="let a of beroepstakenTypes.activiteiten"
									[ngValue]="a.id">{{a.naam}}</option>
							</select>
						</div>

						<div class="form-group">
							<label for="niveau">Niveau:</label> <select class="form-control"
								id="niveau" name="niveau" [(ngModel)]="beroepstakenForm.niveau">
								<option *ngFor="let a of beroepstakenTypes.niveaus"
									[ngValue]="a">{{a}}</option>
							</select>
						</div>
						{{beroepstakenForm | json}}

					</div>
				</div>
				<div *ngIf="!loading" class="modal-footer">
					<button type="button" class="btn btn-secondary"
						(click)="BeroepstaakModal.hide()">Sluiten</button>
					<button type="button" class="btn btn-primary"
						(click)="addBeroepstaak()">Toevoegen</button>
				</div>
			</form>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<div bsModal #ProfessionalskillModal="bs-modal"
	class="addModal modal fade" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-primary" role="document">
		<div class="modal-content">
			<form #f="ngForm">
				<div class="modal-header">
					<h4 class="modal-title">Professional skill</h4>
					<button type="button" class="close"
						(click)="BeroepstaakModal.hide()" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div *ngIf="loading" align="center">
						<br /> <img src="assets/img/ripple.svg" />
					</div>
					<span *ngIf="error" class="text-danger">U heeft geen
						Professional skill geselecteerd</span>
					<div class="form">
						<div class="form-group">
							<label for="activiteit">Activiteit:</label> <select
								class="form-control" id="activiteit" name="activiteit"
								[(ngModel)]="professionalskillForm.activiteit">
								<option *ngFor="let a of professionalskillsTypes.activiteiten"
									[ngValue]="a.id">{{a.naam}}</option>
							</select>
						</div>

						<div class="form-group">
							<label for="activiteit">Niveau:</label> <select
								class="form-control" id="niveau" name="niveau"
								[(ngModel)]="professionalskillForm.niveau">
								<option *ngFor="let a of professionalskillsTypes.niveaus"
									[ngValue]="a">{{a}}</option>
							</select>
						</div>

						{{professionalskillForm | json}}

					</div>
				</div>
				<div *ngIf="!loading" class="modal-footer">
					<button type="button" class="btn btn-secondary"
						(click)="ProfessionalskillModal.hide()">Sluiten</button>
					<button type="button" class="btn btn-primary"
						(click)="addProfessionalskill()">Toevoegen</button>
				</div>
			</form>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<div bsModal #LeerdoelModal="bs-modal" class="addModal modal fade"
	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	aria-hidden="true">
	<div class="modal-dialog modal-primary" role="document">
		<div class="modal-content">
			<form #f="ngForm">
				<div class="modal-header">
					<h4 class="modal-title">Leerdoel</h4>
					<button type="button" class="close" (click)="LeerdoelModal.hide()"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div *ngIf="loading" align="center">
						<br /> <img src="assets/img/ripple.svg" />
					</div>
					<div class="form">
						<div class="form-group">
							<label for="beroepstaak">Beroepstaak:</label> <select
								class="form-control" id="beroepstaak" name="eindBT"
								[(ngModel)]="leerdoelForm.eindBT">
								<option *ngFor="let a of currentCourse.beroepstaken"
									[ngValue]="a.id">{{a.activiteit}} -
									{{a.architectuurlaag}} - {{a.niveau}}</option>
							</select>
						</div>

						<div class="form-group">
							<label for="professionalskill">Professionalskill:</label> <select
								class="form-control" id="professionalskill" name="eindPS"
								[(ngModel)]="leerdoelForm.eindPS">
								<option *ngFor="let a of currentCourse.professionalskills"
									[ngValue]="a.id">{{a.code}} - {{a.niveau}}</option>
							</select>
						</div>

						<div class="form-group">
							<label for="bloomniveau">Bloomniveau:</label> <select
								class="form-control" id="bloomniveau" name="bloomniveau"
								[(ngModel)]="leerdoelForm.bloomniveau">
								<option *ngFor="let a of allBloomniveaus" [ngValue]="a.id">{{a.niveau}}</option>
							</select>
						</div>

						<div class="form-group">
							<label for="omschrijving">Omschrijving:</label>
							<textarea name="omschrijving" id="omschrijving"
								class="form-control" [(ngModel)]="leerdoelForm.omschrijving"></textarea>
						</div>
						{{leerdoelForm | json}}

					</div>
				</div>
				<div *ngIf="!loading" class="modal-footer">
					<button type="button" class="btn btn-secondary"
						(click)="LeerdoelModal.hide()">Sluiten</button>
					<button type="button" class="btn btn-primary"
						(click)="addLeerdoel()">Toevoegen</button>
				</div>
			</form>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<div bsModal #ToetsModal="bs-modal" class="addModal modal fade"
	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	aria-hidden="true">
	<div class="modal-dialog modal-primary" role="document">
		<div class="modal-content">
			<form #f="ngForm">
				<div class="modal-header">
					<h4 class="modal-title">Toets</h4>
					<button type="button" class="close" (click)="ToetsModal.hide()"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div *ngIf="loading" align="center">
						<br /> <img src="assets/img/ripple.svg" />
					</div>
					<div class="form">
						<div class="form-group">
							<label for="naam">Naam:</label> <input type="text" name="naam"
								class="form-control" [(ngModel)]="toetsForm.naam" />
						</div>

						<div class="form-group">
							<label for="osirisResultaatType">Osiris Resultaat Type:</label> <select
								class="form-control" id="osirisResultaatType"
								name="osirisResultaatType"
								[(ngModel)]="toetsForm.osirisResultaatType">
								<option *ngFor="let a of allOsirisResultaatTypen"
									[ngValue]="a.id">{{a.naam}}</option>
							</select>
						</div>

						<div class="form-group">
							<label for="professionalskill">Gewicht:</label> <input
								type="number" name="gewicht" class="form-control"
								[(ngModel)]="toetsForm.gewicht" />
						</div>

						{{toetsForm | json}}

					</div>
				</div>
				<div *ngIf="!loading" class="modal-footer">
					<button type="button" class="btn btn-secondary"
						(click)="ToetsModal.hide()">Sluiten</button>
					<button type="button" class="btn btn-primary" (click)="addToets()">Toevoegen</button>
				</div>
			</form>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->



<div bsModal #BeoordelingselementModal="bs-modal"
	class="addModal modal fade" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-primary" role="document">
		<div class="modal-content">
			<form #f="ngForm">
				<div class="modal-header">
					<h4 class="modal-title">Beoordelings Element</h4>
					<button type="button" class="close"
						(click)="beoordelingselementModal.hide()" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div *ngIf="loading" align="center">
						<br /> <img src="assets/img/ripple.svg" />
					</div>
					<div class="form">
						<div class="form-group">
							<label for="naam"><b>Toets:</b></label><br /> {{toetsEdit.naam}}
							<hr />
						</div>

						<div class="form-group">
							<label for="naam">Naam:</label> <input type="text" name="naam"
								class="form-control" [(ngModel)]="beoordelingselementForm.naam" />
						</div>

						<div class="form-group">
							<label for="beoordelingOmschrijving">Omschrijving:</label>
							<textarea name="beoordelingOmschrijving"
								id="beoordelingOmschrijving" class="form-control"
								[(ngModel)]="beoordelingselementForm.omschrijving"></textarea>
						</div>

						<div class="form-group">
							<label for="beoordelingGewicht">Gewicht:</label> <input
								type="number" name="beoordelingGewicht" id="beoordelingGewicht"
								class="form-control"
								[(ngModel)]="beoordelingselementForm.gewicht" />
						</div>

						{{beoordelingselementForm | json}}

					</div>
				</div>
				<div *ngIf="!loading" class="modal-footer">
					<button type="button" class="btn btn-secondary"
						(click)="beoordelingselementModal.hide()">Sluiten</button>
					<button type="button" class="btn btn-primary"
						(click)="addBeoordelingselementToToets()">Toevoegen</button>
				</div>
			</form>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->