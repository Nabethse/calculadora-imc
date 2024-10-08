import { Component } from '@angular/core';
import { RouterOutlet, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImcCalculatorComponent } from './component/imc-calculator/imc-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule , ImcCalculatorComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}