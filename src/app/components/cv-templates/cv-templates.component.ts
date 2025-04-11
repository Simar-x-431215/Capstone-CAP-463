import { Component, OnInit } from '@angular/core';

interface CvTemplate {
  id: number;
  name: string;
  fileName: string;
  description: string;
  category: string;
  color: string;
}

@Component({
  selector: 'app-cv-templates',
  standalone: false,
  templateUrl: './cv-templates.component.html',
  styleUrls: ['./cv-templates.component.css']
})
export class CvTemplatesComponent implements OnInit {
  templates: CvTemplate[] = [];
  filteredTemplates: CvTemplate[] = [];
  categories: string[] = ['All', 'Business', 'Creative', 'Legal', 'Academic', 'Sales', 'Teaching', 'Medical', 'Other'];
  selectedCategory: string = 'All';
  searchQuery: string = '';
  
  // Category colors mapping
  categoryColors: {[key: string]: string} = {
    'Business': 'var(--primary-color)',
    'Creative': 'var(--accent-color)',
    'Legal': 'var(--secondary-color)',
    'Academic': 'var(--primary-color)',
    'Sales': 'var(--accent-color)',
    'Teaching': 'var(--secondary-color)',
    'Medical': 'var(--primary-color)',
    'Other': 'var(--secondary-color)'
  };
  
  ngOnInit(): void {
    this.loadTemplates();
    this.filteredTemplates = [...this.templates];
  }
  
  loadTemplates() {
    this.templates = [
      {
        id: 1,
        name: 'Classic Management',
        fileName: 'Classic management resume.docx',
        description: 'Professional template for management positions with a classic design.',
        category: 'Business',
        color: this.categoryColors['Business']
      },
      {
        id: 2,
        name: 'Swiss Design',
        fileName: 'Swiss design resume.docx',
        description: 'Clean, minimalist design with Swiss typography principles.',
        category: 'Creative',
        color: this.categoryColors['Creative']
      },
      {
        id: 3,
        name: 'Attorney Resume',
        fileName: 'Attorney resume.docx',
        description: 'Professional template for legal practitioners.',
        category: 'Legal',
        color: this.categoryColors['Legal']
      },
      {
        id: 4,
        name: 'Bold Attorney',
        fileName: 'Bold attorney resume.docx',
        description: 'Stand out with this bold design for legal professionals.',
        category: 'Legal',
        color: this.categoryColors['Legal']
      },
      {
        id: 5,
        name: 'Creative Teaching',
        fileName: 'Creative teaching resume.docx',
        description: 'Eye-catching template for educators with a creative flair.',
        category: 'Teaching',
        color: this.categoryColors['Teaching']
      },
      {
        id: 6,
        name: 'Stylish Teaching',
        fileName: 'Stylish teaching resume.docx',
        description: 'Modern design for educators focused on visual presentation.',
        category: 'Teaching',
        color: this.categoryColors['Teaching']
      },
      {
        id: 7,
        name: 'Geometric Resume',
        fileName: 'Geometric resume.docx',
        description: 'Geometric patterns add visual interest to this modern template.',
        category: 'Creative',
        color: this.categoryColors['Creative']
      },
      {
        id: 8,
        name: 'Modern Nursing',
        fileName: 'Modern nursing resume.docx',
        description: 'Clean template designed for healthcare professionals.',
        category: 'Medical',
        color: this.categoryColors['Medical']
      },
      {
        id: 9,
        name: 'Paralegal Resume',
        fileName: 'Paralegal resume.docx',
        description: 'Professional template for paralegal and legal support roles.',
        category: 'Legal',
        color: this.categoryColors['Legal']
      },
      {
        id: 10,
        name: 'Playful Business',
        fileName: 'Playful business resume.docx',
        description: 'Business resume with a playful twist for creative industries.',
        category: 'Business',
        color: this.categoryColors['Business']
      },
      {
        id: 11,
        name: 'Social Media Marketing',
        fileName: 'Social media marketing resume.docx',
        description: 'Designed for digital marketers and social media professionals.',
        category: 'Business',
        color: this.categoryColors['Business']
      },
      {
        id: 12,
        name: 'Stylish Sales',
        fileName: 'Stylish sales resume.docx',
        description: 'Eye-catching template to showcase your sales achievements.',
        category: 'Sales',
        color: this.categoryColors['Sales']
      },
      {
        id: 13,
        name: 'Modern Bold Sales',
        fileName: 'Modern bold sales resume.docx',
        description: 'Bold design that helps sales professionals stand out.',
        category: 'Sales',
        color: this.categoryColors['Sales']
      },
      {
        id: 14,
        name: 'ATS Bold Accounting',
        fileName: 'ATS Bold accounting resume.docx',
        description: 'ATS-friendly template for accounting professionals.',
        category: 'Business',
        color: this.categoryColors['Business']
      },
      {
        id: 15,
        name: 'Modern Hospitality',
        fileName: 'Modern hospitality resume.docx',
        description: 'Clean design for hospitality industry professionals.',
        category: 'Business',
        color: this.categoryColors['Business']
      },
      {
        id: 16,
        name: 'ATS Classic HR',
        fileName: 'ATS classic HR resume.docx',
        description: 'ATS-optimized template for human resources professionals.',
        category: 'Business',
        color: this.categoryColors['Business']
      },
      {
        id: 17,
        name: 'Color Block Resume',
        fileName: 'Color block resume.docx',
        description: 'Vibrant template with color blocks for creative professionals.',
        category: 'Creative',
        color: this.categoryColors['Creative']
      },
      {
        id: 18,
        name: 'Industry Manager Resume',
        fileName: 'Industry manager resume.docx',
        description: 'Specialized template for industry and manufacturing managers.',
        category: 'Business',
        color: this.categoryColors['Business']
      },
      {
        id: 19,
        name: 'Cover Letter (Referred)',
        fileName: 'Resume cover letter when referred.docx',
        description: 'Cover letter template for when you have been referred by someone.',
        category: 'Other',
        color: this.categoryColors['Other']
      },
      {
        id: 20,
        name: 'Cover Letter (Temporary)',
        fileName: 'Resume cover letter for temporary position.docx',
        description: 'Cover letter template for temporary or contract positions.',
        category: 'Other',
        color: this.categoryColors['Other']
      }
    ];
    
    this.filteredTemplates = [...this.templates];
  }
  
  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }
  
  applySearch() {
    this.applyFilters();
  }
  
  applyFilters() {
    if (this.selectedCategory === 'All' && !this.searchQuery) {
      this.filteredTemplates = [...this.templates];
    } else {
      this.filteredTemplates = this.templates.filter(template => {
        const matchesCategory = this.selectedCategory === 'All' || template.category === this.selectedCategory;
        const matchesSearch = !this.searchQuery || 
          template.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
          template.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
      });
    }
  }
  
  downloadTemplate(fileName: string) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', `assets/Cv-templates/${fileName}`);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
