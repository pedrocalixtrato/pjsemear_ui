import {PlataformLocalMenu} from '../../menu-local-navigation.component';


export const treinoMenu: PlataformLocalMenu[] = [
  {
    menuId: 'dashboard',
    link: ['/treino', 'bi'],
    icon: 'pct pct-pie-chart'
  },
  {
    menuId: 'montagem-treino',
    link: ['/treino', 'montagem-treino'],
    icon: 'pct pct-award',
  },
  {
    menuId: 'cadastros',
    icon: 'pct pct-edit',
    submenus: [
      {submenuId: 'enderecos', link: ['/enderecos']},
      {submenuId: 'alunos', link: ['/enderecos']},
      {submenuId: 'professores', link: ['/treino', 'cadastros', 'professores']},
      {submenuId: 'colaboradores', link: ['/treino', 'cadastros', 'colaboradores']}
    ]
  }
];
