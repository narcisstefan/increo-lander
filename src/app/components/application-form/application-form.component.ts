import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  styleUrl: './application-form.component.scss',
})
export class ApplicationFormComponent {
  private translationService = inject(TranslationService);
  private fb = inject(FormBuilder);

  isSubmitted = signal(false);
  isSubmitting = signal(false);
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

      setTimeout(() => {
        console.log('Form submitted:', this.form.value);
        this.isSubmitting.set(false);
        this.isSubmitted.set(true);
      }, 1500);
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
  }
}
