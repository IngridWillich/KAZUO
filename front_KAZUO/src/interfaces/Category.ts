interface ICategory {
    id: number;
    name: string;
}

export default ICategory

export const categoriesToPreLoad: ICategory[] = [
    {  id: 1,name:'teléfono inteligente' },
    {  id:2,name:'ordenadores portátiles' },
    {  id:3,name: 'tablet' },
    {  id:4,name: 'auriculares' },
    {  id:5,name: 'cámaras' },
    {  id:6,name: 'impresoras' },
    {  id:7,name: 'monitores' },
    {  id:8,name: 'accesorios' }
  ];