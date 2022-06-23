import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Projects } from '../../models/models';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss'],
})
export class GridListComponent implements OnInit {
  constructor() {}

  cols: number = 4;
  rowHeight: number = 100;

  ngOnInit(): void {
    this.setCols();
    this.setRowHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setCols();
  }

  setCols() {
    const size = 300;
    const colsDivider = Math.floor(window.innerWidth / size - 0.5);
    this.cols = colsDivider <= 4 ? colsDivider : 4;
  }

  setRowHeight() {
    const maxArray: Array<number> = [];
    const size = 70;
    this.projects.forEach((project) => maxArray.push(project.todos.length));
    this.rowHeight = Math.max(...maxArray) * size;
  }

  projects: Projects[] = [
    {
      id: 1,
      title: 'Семья',
      todos: [
        {
          id: 1,
          title: 'Купить молоко',
          isCompleted: false,
        },
        {
          id: 2,
          title: 'Отправить письмо бабушке',
          isCompleted: false,
        },
        {
          id: 3,
          title: 'Купить молоко',
          isCompleted: false,
        },
        {
          id: 12,
          title: 'Отправить письмо бабушке',
          isCompleted: false,
        },
        {
          id: 13,
          title: 'Купить молоко',
          isCompleted: false,
        },
        {
          id: 14,
          title: 'Заменить масло в двигателе до 23 апреля',
          isCompleted: true,
        },
      ],
    },
    {
      id: 2,
      title: 'Работа',
      todos: [
        {
          id: 4,
          title: 'Позвонить заказчику',
          isCompleted: false,
        },
      ],
    },
    {
      id: 3,
      title: 'Прочее',
      todos: [
        {
          id: 6,
          title: 'Позвонить другу',
          isCompleted: false,
        },
      ],
    },
    {
      id: 4,
      title: 'Личное',
      todos: [
        {
          id: 7,
          title: 'Стать лучше',
          isCompleted: false,
        },
        {
          id: 8,
          title:
            'Написать письмо деду морозу и поздравить его и его внучку с новым прекрасным годом замечательного отца',
          isCompleted: false,
        },
        {
          id: 9,
          title: 'Перестать быть одиноким',
          isCompleted: false,
        },
      ],
    },
    {
      id: 5,
      title: 'Для других',
      todos: [
        {
          id: 10,
          title: 'Позвать скорую',
          isCompleted: false,
        },
        {
          id: 11,
          title: 'Назвать прекрасным',
          isCompleted: false,
        },
      ],
    },
  ];
}
