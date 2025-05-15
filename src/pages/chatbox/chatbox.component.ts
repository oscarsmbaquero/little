import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent {

  menu =[
    {
      id:1,
      imageUrl:
        'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1742489552/contable_srluxc.png',
      description: 'Contable',
      link: ['/chat', 'contable'],
      badge: true,
    },
    {
      id:2,
      imageUrl:
        'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1742489553/comercial_citvwr.png',
      description: 'Comercial',
      link: ['/chat', 'comercial'],
      badge: true,
    },
    {
      id:3,
      imageUrl:
        'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1742489553/abogado_hkxqwk.jpg',
      description: 'Abogado',
      link: ['/chat', 'abogado'],
      badge: true,
    },
    {
      id:4,
      imageUrl:
        'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1742489553/tecnico_d99vup.jpg',
      description: 'Técnico',
      link: ['/chat', 'tecnico'],
      badge: true,
    }
  
]

}
