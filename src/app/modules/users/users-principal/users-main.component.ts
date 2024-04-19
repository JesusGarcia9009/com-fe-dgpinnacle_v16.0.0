import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataTableDirective } from 'angular-datatables';
import { Subscription, Subject } from 'rxjs';
import { LoadingService } from '../../core/core/services/loading.service';
import { ModalService } from '../../core/core/services/modal.service';
import { SharedService } from '../../shared/shared.service';
import { UserModel } from '../model/user.model';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import DataTables from 'datatables.net';

@Component({
  selector: 'app-users-main',
  templateUrl: './users-main.component.html',
  styleUrls: ['./users-main.component.css']
})
export class UsersMainComponent implements OnInit, OnDestroy {

  tabIndex: number = 0;

  displayedColumns: string[] = ['name', 'email', 'cellphone', 'profileName', 'actions'];
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public subscriptions: Array<Subscription> = [];

  public allUsersListData: Array<UserModel> = [];

  public loanListData: Array<UserModel> = [];
  public realtorListData: Array<UserModel> = [];
  public clientListData: Array<UserModel> = [];
  public viewerListData: Array<UserModel> = [];
  public administratorListData: Array<UserModel> = [];

  dataSourceLoan: MatTableDataSource<UserModel>;
  dataSourceRealtor: MatTableDataSource<UserModel>;
  dataSourceClient: MatTableDataSource<UserModel>;
  dataSourceViewer: MatTableDataSource<UserModel>;
  dataSourceAdministrators: MatTableDataSource<UserModel>;

  //common
  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router,
    private modalService: ModalService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const ver = this.route.snapshot.paramMap.get('tabIndex');
    if (ver) {
      this.tabIndex = Number(ver);
    }
    sessionStorage.setItem('title', 'Users');
    this.loadData();
  }

  loadData() {
    this.loadingService.show();
    this.subscriptions.push(this.userService.getUserList().subscribe(async data => {
      this.loadingService.hide();
      this.allUsersListData = data;

      this.initializeLoanTable();
      this.initializeRealtorTable();
      this.initializeClientTable();
      this.initializeViewerTable();
      this.initializeAdministratorsTable();
    }, async err => {
      this.loadingService.hide();
      const modalResult = await this.modalService.open({ genericType: 'error-gen' });
      if (modalResult) {
        this.loadData();
      }
    }));
  }

  initializeLoanTable() {
    this.loanListData = this.allUsersListData.filter(x => x.profileCode === "LOAN");
    this.dataSourceLoan = new MatTableDataSource(this.loanListData);

    this.dataSourceLoan.paginator = this.paginator;
    this.dataSourceLoan.sort = this.sort;
  }

  

  async initializeRealtorTable() {
    this.realtorListData = this.allUsersListData.filter(x => x.profileCode === "REALTOR");
    this.dataSourceRealtor = new MatTableDataSource(this.realtorListData);

    this.dataSourceRealtor.paginator = this.paginator;
    this.dataSourceRealtor.sort = this.sort;
  }

  async initializeClientTable() {
    this.clientListData = this.allUsersListData.filter(x => x.profileCode === "CLIENT");
    this.dataSourceClient = new MatTableDataSource(this.clientListData);

    this.dataSourceClient.paginator = this.paginator;
    this.dataSourceClient.sort = this.sort;
  }

  async initializeViewerTable() {
    this.viewerListData = this.allUsersListData.filter(x => x.profileCode != "REALTOR" && x.profileCode != "LOAN"  && x.profileCode != "ADMINISTRATOR");
    this.dataSourceViewer = new MatTableDataSource(this.viewerListData);

    this.dataSourceViewer.paginator = this.paginator;
    this.dataSourceViewer.sort = this.sort;
  }

  async initializeAdministratorsTable() {
    this.administratorListData = this.allUsersListData.filter(x => x.profileCode === "ADMINISTRATOR");
    this.dataSourceAdministrators = new MatTableDataSource(this.administratorListData);

    this.dataSourceAdministrators.paginator = this.paginator;
    this.dataSourceAdministrators.sort = this.sort;
  }

  applyFilter(event: KeyboardEvent) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceLoan.filter = filterValue;
  }

  redirectToEdit(user: UserModel, type: string) {
    this.userService.userSelected = user;

    if(type === 'loan'){
      this.router.navigate(['/users/add-upd-loan']);
    }else if(type === 'realtor') {
      this.router.navigate(['/users/add-upd-realtor']);
    }else if(type === 'client') {
      this.router.navigate(['/users/add-upd-client']);
    }else if(type === 'viewer') {
      this.router.navigate(['/users/add-upd-user/VIEWER']);
    } else {
      this.router.navigate(['/users/add-upd-user/ADMINISTRATOR']);
    }
    
  }

  async onDelete(userSel: UserModel) {

    const resultModal = await this.modalService.open(
      {
        title: 'Delete User',
        text: `Are you sure you want to delete the user "${userSel.name + ' ' + userSel.lastName }"?`,
        icon: 'warning',
        showCancelButton: true,
        acceptText: 'Confirm',
        confirmIdentifier: 'btn-AcceptDeleteUser',
        cancelText: 'Cancel',
        cancelIdentifier: 'cancel',
      }
    );
    if (resultModal) {
      this.loadingService.show();

      this.subscriptions.push(this.userService.deleteUser(userSel).subscribe(async result => {
        this.loadingService.hide();
        const resultModal = await this.modalService.open(
          {
            title: 'User Deleted',
            text: `The user "${userSel.name + ' ' + userSel.lastName}" was successfully deleted.`,
            icon: 'success',
            showCancelButton: false,
            acceptText: 'Confirm',
            confirmIdentifier: 'btn-AcceptDeleteUser',
          }
        );

        this.loadData();
      }, async err => {
        this.loadingService.hide();
        const modalResult = await this.modalService.open({ genericType: 'error-gen' });
        if (modalResult) {
          this.onDelete(userSel);
        }
      }));

    }
  }

  getDtOptions() {
    const defaultConf = this.sharedService.getDefaultDataTableConfig();
    return {
      pagingType: "full_numbers",
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      aoColumns: [
        null,
        null,
        null,
        null,
        { "bSortable": false }
      ],
      responsive: false,
      ...defaultConf
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
  }
}
