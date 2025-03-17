export type IconProps = React.HTMLAttributes<SVGElement>;

import { DashboardIcons } from './dashboard/DashboardIcons';
import DashboardSuperAdminIcons from './dashboard/DashboardSuperAdmin';
import { LibraryIcons } from './dashboard/LibraryIcons';

const Icons = {
  arrowLeft: (props: IconProps) => (
    <svg
      width="29"
      height="15"
      viewBox="0 0 29 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 7.5H27.5M1.5 7.5L8 1M1.5 7.5L8 14"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export { Icons, LibraryIcons, DashboardIcons, DashboardSuperAdminIcons };
