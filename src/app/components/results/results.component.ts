import { Component, OnInit } from '@angular/core';
import { CvAnalysis, ImprovementArea, Keyword } from '../../models/cv-analysis.model';

@Component({
  selector: 'app-results',
  standalone: false,
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  analysisDate: Date = new Date();
  fileUploads: any[] = [];
  isLoading: boolean = false; // Set to false since we're using static data
  selectedFileId: string | null = 'mock-cv-1';
  currentAnalysis: CvAnalysis | null = null;
  
  constructor() {}
  
  ngOnInit(): void {
    // Add mock CV files
    this.fileUploads = [
      {
        id: 'mock-cv-1',
        name: 'MyProfessionalCV.pdf',
        createdAt: new Date(),
        type: 'application/pdf',
        size: 1024 * 500, // 500 KB
        url: '#'
      }
    ];
    
    // Initialize static analysis data
    this.currentAnalysis = this.generateStaticAnalysis();
  }

  // Generate static analysis data
  private generateStaticAnalysis(): CvAnalysis {
    const improvementAreas: ImprovementArea[] = [
      {
        name: 'Skills Section',
        score: 65,
        status: 'Needs Attention',
        statusClass: 'warning',
        recommendation: 'Consider adding more specific technical skills that match your target roles.'
      },
      {
        name: 'Work Experience',
        score: 85,
        status: 'Very Good',
        statusClass: 'success',
        recommendation: 'Your experience section is strong, but try quantifying achievements with more metrics.'
      },
      {
        name: 'Education',
        score: 90,
        status: 'Excellent',
        statusClass: 'success',
        recommendation: 'Education section is well-formatted and complete.'
      },
      {
        name: 'ATS Compatibility',
        score: 45,
        status: 'Needs Improvement',
        statusClass: 'danger',
        recommendation: 'Your CV may not pass through Applicant Tracking Systems. Consider using industry-standard formats.'
      }
    ];

    const keywords: Keyword[] = [
      { text: 'Java Programming', isPresent: true },
      { text: 'Project Management', isPresent: true },
      { text: 'Data Analysis', isPresent: true },
      { text: 'Machine Learning', isPresent: false },
      { text: 'Team Leadership', isPresent: true },
      { text: 'Cloud Computing', isPresent: false },
      { text: 'Agile Methodology', isPresent: true }
    ];

    const recommendations: string[] = [
      'Enhance Skills Section: Add specific technical skills like "Cloud Computing" and "Machine Learning".',
      'Quantify Achievements: Include metrics and quantifiable results for your work experience.',
      'ATS Optimization: Use a simpler format and include more industry-specific keywords.',
      'Expand Project Details: Provide more context about your key projects and your specific role.',
      'Add a Professional Summary: Begin your CV with a concise professional summary highlighting your strengths.'
    ];

    return {
      fileId: 'mock-cv-1',
      overallScore: 75,
      improvementAreas,
      keywords,
      recommendations
    };
  }

  downloadCV(fileUrl: string): void {
    // Just for demo, do nothing
    console.log('Download clicked');
  }

  viewAnalysis(fileId: string): void {
    // Just select the file, no loading needed
    this.selectedFileId = fileId;
  }
}
