import { Routes} from '@angular/router';
import { ImcCalculatorComponent } from './component/imc-calculator/imc-calculator.component';
import { CaloriasCalculatorComponent } from './component/calorias-calculator/calorias-calculator.component';

export const routes: Routes = [ 
    {path:'', component:ImcCalculatorComponent},
    {path:'Imc', component:ImcCalculatorComponent},
    {path:'calorias', component:CaloriasCalculatorComponent}
  ];
  
