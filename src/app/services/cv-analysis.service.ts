import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CvAnalysis, ImprovementArea, Keyword } from '../models/cv-analysis.model';

@Injectable({
  providedIn: 'root'
})
export class CvAnalysisService {
  private readonly collectionName = 'cv-analysis';

  constructor(private db: AngularFirestore) { }

  // Get analysis for a specific file
  getAnalysisForFile(fileId: string): Observable<CvAnalysis | null> {
    return this.db.collection(this.collectionName)
      .doc(fileId)
      .get()
      .pipe(
        map(doc => {
          if (doc.exists) {
            return doc.data() as CvAnalysis;
          }
          // If no analysis exists yet, generate mock analysis
          return this.generateMockAnalysis(fileId);
        }),
        catchError(() => {
          // Return mock data for demo purposes
          return of(this.generateMockAnalysis(fileId));
        })
      );
  }

  // Mock analysis generation (for demo purposes)
  private generateMockAnalysis(fileId: string): CvAnalysis {
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
      fileId,
      overallScore: 75,
      improvementAreas,
      keywords,
      recommendations
    };
  }

  // Save analysis results to Firestore
  saveAnalysisResults(analysis: CvAnalysis): Promise<void> {
    return this.db.collection(this.collectionName)
      .doc(analysis.fileId)
      .set(analysis);
  }
} 