import { Component, TrackByFunction } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { projects } from '../../../utils/mocks/projects';

import { CarouselModule } from 'primeng/carousel';

export const SLIDER_BLUE = [
  'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1744144237/home_azul-5_igdppo.avif',
  'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1744144238/home_azul-4_wt2nqb.avif',
  'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1744144238/home_azul-3_nkabkj.avif',
  'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1744144237/home_azul-6_barypr.avif',
  'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1745393962/8b42f65d-897c-4e82-a62b-18bf478593ca_sqa604.jpg',
  'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1744144238/home_azul-8_k7e8w7.avif',
];

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  animations: [
    trigger('expandAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  //projects = projects;
   selectedIndex: number | null = null;
   projectStates: boolean[] = [];
   //projects: any = [];
    projects = projects;

    responsiveOptionsPartys = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];


trackByProjectId!: TrackByFunction<{ id: number; title: string; type: string; year: string; image: string; }>;

 ngOnInit() {
  //this.projects = projects;
  //this.projectStates = this.projects.map(() => false);
}

toggleProject(id: number): void {
  this.projectStates[id] = !this.projectStates[id];
}
}
