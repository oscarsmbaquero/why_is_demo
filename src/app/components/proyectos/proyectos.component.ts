import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { projects } from '../../../utils/mocks/projects';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})

export class ProyectosComponent {
  proyectos = projects.map(p => ({ ...p, expanded: false }));

  openProject(url: string) {
    window.open(url, '_blank');
  }

  toggleCollapse(proyecto: any) {
    proyecto.expanded = !proyecto.expanded;
  }
}
