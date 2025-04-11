import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  
  title = 'Skill-Sync';
  isSidebarExpanded = true;
  isMobile = false;

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  ngAfterViewInit() {
    // Access the sidebar component after view initialization
    if (this.sidebar) {
      this.isSidebarExpanded = this.sidebar.isExpanded;
      // Subscribe to sidebar state changes
      this.sidebar.sidebarStateChanged.subscribe((expanded: boolean) => {
        this.isSidebarExpanded = expanded;
      });
    }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.isSidebarExpanded = false;
    }
  }
}
