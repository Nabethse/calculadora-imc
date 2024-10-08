import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-calorias-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './calorias-calculator.component.html',
  styleUrl: './calorias-calculator.component.css'
})
export class CaloriasCalculatorComponent {
  caloriasForm: FormGroup;
  caloriasNecesarias: number | null = null;
  activityLevels = [
    { value: 'sedentario', label: 'Sedentario (poca o ninguna actividad física)' },
    { value: 'ligero', label: 'Ligero (ejercicio ligero 1-3 días/semana)' },
    { value: 'moderado', label: 'Moderado (ejercicio moderado 3-5 días/semana)' },
    { value: 'activo', label: 'Activo (ejercicio fuerte 6-7 días/semana)' },
    { value: 'muy_activo', label: 'Muy activo (ejercicio muy intenso o físico)' }
  ];

  constructor(private fb: FormBuilder) {
    this.caloriasForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      activityLevel: ['', Validators.required]
    });
  }

  calculateCalories(): void {
    if (this.caloriasForm.valid) {
      const { age, weight, height, gender, activityLevel } = this.caloriasForm.value;
      
      let bmr: number;
      // Fórmula de Harris-Benedict (diferente para hombres y mujeres)
      if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      // Factor de actividad
      const activityMultiplier = activityLevel === 'sedentario' ? 1.2 :
                                 activityLevel === 'ligero' ? 1.375 :
                                 activityLevel === 'moderado' ? 1.55 :
                                 activityLevel === 'activo' ? 1.725 :
                                 1.9; // Muy activo

      // Calorías diarias necesarias
      this.caloriasNecesarias = bmr * activityMultiplier;
    }
  }
}
