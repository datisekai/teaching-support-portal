export const sidebarData: IMenuItem[] = [
  {
    title: "Lớp học",
    icon: "",
    path: "/class",
    children: [
      {
        title: "Danh sách lớp",
        icon: "pi pi-user",
        path: "/class",
        permission: "view-class",
      },
    ],
  },
  {
    title: "Môn học",
    icon: "",
    path: "/subject",
    children: [
      {
        title: "Danh sách môn",
        icon: "pi pi-book",
        path: "/subject",
        permission: "view-subject",
      },
    ],
  },
  {
    title: "Ngành học",
    icon: "",
    path: "/department",
    children: [
      {
        title: "Danh sách ngành",
        icon: "pi pi-user",
        path: "/department",
        permission: "view-department",
      },
    ],
  },
];

interface IMenuItem {
  title: string;
  icon?: string;
  path?: string;
  hidden?: boolean;
  children?: IMenuItem[];
  permission?: string;
}
