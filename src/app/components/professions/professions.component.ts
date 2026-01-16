import { Component, inject, signal, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';
import { JobsService, Job } from '../../core/services/jobs.service';

// Image mapping based on job title_key
const JOB_IMAGES: Record<string, string> = {
  'maurer': 'assets/images/jobs/maurer.jpg',
  'zimmermann': 'assets/images/jobs/zimmermann.jpg',
  'eisenflechter': 'assets/images/jobs/eisenflechter.jpg',
  'elektriker': 'assets/images/jobs/elektriker.jpg',
  'fliesenleger': 'assets/images/jobs/fliesenleger.jpg',
  'trockenbauer': 'assets/images/jobs/trockenbauer.jpg',
  'schreiner': 'assets/images/jobs/schreiner.jpg',
  'maler': 'assets/images/jobs/maler.jpg',
  'installateur': 'assets/images/jobs/installateur.jpg',
  'bauleiter': 'assets/images/jobs/bauleiter.jpg',
};

const DEFAULT_JOB_IMAGE = 'assets/images/jobs/default.jpg';

@Component({
  selector: 'app-professions',
  standalone: true,
  templateUrl: './professions.component.html',
})
export class ProfessionsComponent implements OnInit {
  private translationService = inject(TranslationService);
  private jobsService = inject(JobsService);
  private platformId = inject(PLATFORM_ID);

  jobs = signal<Job[]>([]);
  allJobs = signal<Job[]>([]);
  isLoading = signal(true);
  showAll = signal(false);
  initialLimit = 3;

  ngOnInit(): void {
    // Only load jobs on client-side to prevent SSR/prerender errors
    if (isPlatformBrowser(this.platformId)) {
      this.loadJobs();
    } else {
      this.isLoading.set(false);
    }
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  /**
   * Get translated job title based on title_key
   */
  getJobTitle(job: Job): string {
    return this.t('professions.jobTitles.' + job.title_key);
  }

  /**
   * Get translated feature based on feature key
   */
  getFeature(featureKey: string): string {
    return this.t('professions.jobFeatures.' + featureKey);
  }

  /**
   * Get image for job based on title_key
   */
  getJobImage(job: Job): string {
    return JOB_IMAGES[job.title_key] || DEFAULT_JOB_IMAGE;
  }

  loadJobs(): void {
    this.jobsService.getJobs().subscribe({
      next: (jobs) => {
        this.allJobs.set(jobs);
        this.jobs.set(jobs.slice(0, this.initialLimit));
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
        this.isLoading.set(false);
      },
    });
  }

  toggleShowAll(): void {
    if (this.showAll()) {
      this.jobs.set(this.allJobs().slice(0, this.initialLimit));
      this.showAll.set(false);
    } else {
      this.jobs.set(this.allJobs());
      this.showAll.set(true);
    }
  }

  get hasMoreJobs(): boolean {
    return this.allJobs().length > this.initialLimit;
  }
}
