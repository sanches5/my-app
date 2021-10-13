export interface Props {

  priority?: boolean;
  setState: Function;
  list?:Promise< {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    user: { id: number; name: string; password: string };
  }[]>;
  task: {
      id: number;
      title: string;
      description: string;
      completed: boolean;
      user: { id: number; name: string; password: string };
  }
}
