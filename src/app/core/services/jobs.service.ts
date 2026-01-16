import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
    id: number;
    title_key: string;
    location: string;
    salary: string;
    feature_keys?: string[];
    is_active: boolean;
    created_at: string;
}

@Injectable({
    providedIn: 'root',
})
export class JobsService {
    private http = inject(HttpClient);

    /**
     * Get all active jobs from API
     */
    getJobs(): Observable<Job[]> {
        return this.http.get<Job[]>('/api/jobs');
    }

    /**
     * Get limited number of jobs (for initial display)
     */
    getJobsLimited(limit: number): Observable<Job[]> {
        return this.http.get<Job[]>(`/api/jobs?limit=${limit}`);
    }
}
