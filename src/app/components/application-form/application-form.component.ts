import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../core/services/translation.service';

interface LanguageOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './application-form.component.html',
})
export class ApplicationFormComponent {
  private translationService = inject(TranslationService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  isSubmitted = signal(false);
  isSubmitting = signal(false);
  hasError = signal(false);
  fileName = signal<string | null>(null);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{8,}$/)]],
      profession: ['', Validators.required],
      experience: ['', Validators.required],
      german: [false],
      italian: [false],
      french: [false],
      portuguese: [false],
      english: [false],
      cv: [null],
    });
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  get professions(): string[] {
    return this.translationService.getArray('form.professions') as string[];
  }

  get experienceOptions(): string[] {
    return this.translationService.getArray('form.experienceOptions') as string[];
  }

  get languages(): LanguageOption[] {
    return this.translationService.getArray('form.languages') as LanguageOption[];
  }

  get hasLanguageSelected(): boolean {
    return this.languages.some((lang) => this.form.get(lang.id)?.value === true);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName.set(file.name);
      this.form.patchValue({ cv: file });
    }
  }

  removeFile(): void {
    this.fileName.set(null);
    this.form.patchValue({ cv: null });
  }

  onSubmit(): void {
    if (!this.hasLanguageSelected) {
      return;
    }

    if (this.form.valid) {
      this.isSubmitting.set(true);
      this.hasError.set(false);

      // Get selected languages
      const selectedLanguages = this.languages
        .filter(lang => this.form.get(lang.id)?.value === true)
        .map(lang => lang.label);

      const payload = {
        fullName: this.form.get('fullName')?.value,
        email: this.form.get('email')?.value,
        phone: this.form.get('phone')?.value,
        profession: this.form.get('profession')?.value,
        experience: this.form.get('experience')?.value,
        languages: selectedLanguages,
      };

      this.http.post('/api/send-application', payload).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.isSubmitted.set(true);
        },
        error: (err) => {
          console.error('Application submit error:', err);
          this.isSubmitting.set(false);
          this.hasError.set(true);
        },
      });
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    this.form.reset();
    this.fileName.set(null);
    this.isSubmitted.set(false);
    this.hasError.set(false);
  }
}
