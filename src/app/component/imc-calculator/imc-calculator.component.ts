import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule} from '@angular/router';

interface IMCRecord {
  name: string;
  date: string;
  imc: string;
  category: string;
}
@Component({
  selector: 'app-imc-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './imc-calculator.component.html',
  styleUrl: './imc-calculator.component.css'
})
export class ImcCalculatorComponent {
  imcForm: FormGroup;  // Definimos el FormGroup
  imc: string | null = null;
  category: string = '';
  advice: string = '';
  trend: string = '';
  history: IMCRecord[] = [];

  constructor() {
    // Inicializamos el formulario con los campos necesarios y sus validadores
    this.imcForm = new FormGroup({
      name: new FormControl('', Validators.required),
      weight: new FormControl(0, [Validators.required, Validators.min(1)]),
      height: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  }

  calculateIMC(): void {
    if (this.imcForm.valid) {
      const { weight, height, name } = this.imcForm.value;

      const heightInMeters = height / 100;
      const calculatedIMC = weight / (heightInMeters * heightInMeters);

      this.imc = calculatedIMC.toFixed(1);
      this.category = this.getIMCCategory(calculatedIMC);
      this.advice = this.getAdvice(this.category);
      this.trend = this.analyzeTrend(calculatedIMC); // Analizar tendencia

      const record: IMCRecord = {
        name,
        date: new Date().toLocaleString(),
        imc: this.imc,
        category: this.category
      };

      this.history.push(record);
    } else {
      console.log('Valores no válidos');
    }
  }

  getIMCCategory(imc: number): string {
    if (imc < 18.5) return 'Bajo peso';
    if (imc >= 18.5 && imc < 24.9) return 'Peso normal';
    if (imc >= 25 && imc < 29.9) return 'Sobrepeso';
    return 'Obesidad';
  }

  getAdvice(category: string): string {
    switch (category) {
      case 'Bajo peso':
        return 'Es importante consultar a un profesional de la salud para obtener asesoramiento sobre el aumento de peso de manera saludable.';
      case 'Peso normal':
        return '¡Buen trabajo! Mantén un estilo de vida saludable.';
      case 'Sobrepeso':
        return 'Considera hablar con un nutricionista sobre estrategias para perder peso de manera saludable.';
      case 'Obesidad':
        return 'Es recomendable consultar a un médico para obtener un plan personalizado para perder peso.';
      default:
        return '';
    }
  }

  analyzeTrend(currentIMC: number): string {
    const name = this.imcForm.get('name')?.value;
    
    // Filtrar el historial por el mismo nombre
    const userHistory = this.history.filter(record => record.name === name);

    if (userHistory.length < 2) {
      return 'No hay suficiente historial para analizar la tendencia.';
    }

    const previousIMC = parseFloat(userHistory[userHistory.length - 2].imc);
    if (currentIMC < previousIMC) {
      return 'Tu IMC ha mejorado desde la última vez. ¡Sigue así!';
    } else if (currentIMC > previousIMC) {
      return 'Tu IMC ha aumentado desde la última vez. Considera ajustar tu dieta o aumentar tu actividad física.';
    } else {
      return 'Tu IMC se ha mantenido estable desde la última vez.';
    }
  }
}
