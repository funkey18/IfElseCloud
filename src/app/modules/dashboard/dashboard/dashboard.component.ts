import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../../../services/http.service';
import { ConstantsService } from '../../../constants/constants.service';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { ToastrService } from 'ngx-toastr';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('vendorChart') vendorChartRef!: ElementRef<HTMLCanvasElement>;

  grid_columns: any[] = [];
  grid_data: any[] = [];
  filteredMembers: any[] = [];
  currentDeleteId: string | null = null;
  selectedMemberName: string | null = null;

  searchQuery: string = '';
  page: number = 1;
  itemsPerPage: number = 10;
  loading: boolean = false;
  selectAllChecked: boolean = false;
  selectedMemberIds: Set<string> = new Set();

  constructor(
    private httpService: HttpService,
    public constants: ConstantsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTeamMembers();
  }

  ngAfterViewInit(): void {
    this.initVendorBreakdownChart();
  }

  initVendorBreakdownChart(): void {
    const ctx = this.vendorChartRef?.nativeElement?.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found.');
      return;
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
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
        datasets: [
          {
            label: 'Security Rating',
            data: [78, 94, 50, 83, 61, 100, 89, 72, 94, 83, 67, 78],
            backgroundColor: '#9333ea',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Security Rating',
            },
          },
        },
      },
    });
  }

  getTeamMembers(): void {
    this.loading = true;
    this.httpService
      .getRequest(this.constants.SERVER_URLS['GET_MEMBERS_LIST'])
      .subscribe({
        next: (res: any) => {
          this.grid_columns = res.grid_columns || [];
          this.grid_data = res.grid_data || [];
          this.filteredMembers = [...this.grid_data];
          this.loading = false;
        },
        error: (err) => {
          console.error('API Error:', err);
          this.loading = false;
        },
      });
  }

  setDeleteId(id: string): void {
    this.currentDeleteId = id;
    const member = this.grid_data.find((m) => m.id === id);
    if (member) {
      this.selectedMemberName = `${member.name.first_name} ${member.name.last_name}`;
    } else {
      this.selectedMemberName = null;
    }
  }

  deleteMember(): void {
    if (!this.currentDeleteId) return;

    this.grid_data = this.grid_data.filter(
      (member) => member.id !== this.currentDeleteId
    );
    this.filteredMembers = this.filteredMembers.filter(
      (member) => member.id !== this.currentDeleteId
    );
    this.currentDeleteId = null;
  }

  filterMembers(): void {
    const search = this.searchQuery.toLowerCase();
    this.filteredMembers = this.grid_data.filter((member) => {
      const fullName =
        `${member.name.first_name} ${member.name.last_name}`.toLowerCase();
      const email = member.email.toLowerCase();
      const role = member.role.toLowerCase();
      const status = member.status.toLowerCase();
      const teams = member.teams
        .map((t: any) => t.value.toLowerCase())
        .join(' ');

      return (
        fullName.includes(search) ||
        email.includes(search) ||
        role.includes(search) ||
        status.includes(search) ||
        teams.includes(search)
      );
    });
    this.page = 1;
  }

  showMemberNamePopup(member: any): void {
    this.selectedMemberName = `${member.name.first_name} ${member.name.last_name}`;
    // Show the modal using Bootstrap's JS API
    const modal = document.getElementById('memberNameModal');
    if (modal) {
      // @ts-ignore
      const bsModal = new window.bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  toggleSelectAll(): void {
    this.selectAllChecked = !this.selectAllChecked;
    if (this.selectAllChecked) {
      this.filteredMembers.forEach((member) => this.selectedMemberIds.add(member.id));
    } else {
      this.selectedMemberIds.clear();
    }
  }

  toggleMemberSelection(memberId: string): void {
    if (this.selectedMemberIds.has(memberId)) {
      this.selectedMemberIds.delete(memberId);
    } else {
      this.selectedMemberIds.add(memberId);
    }
    this.selectAllChecked =
      this.filteredMembers.length > 0 &&
      this.filteredMembers.every((member) => this.selectedMemberIds.has(member.id));
  }
}
