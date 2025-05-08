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
  check: (props: IconProps) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10" cy="10" r="10" fill="#0D961B"/>
      <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  info: (props: IconProps) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10" cy="10" r="10" fill="#E73D30"/>
      <rect x="9" y="10" width="2" height="6" rx="1" fill="white"/>
      <rect x="9" y="6" width="2" height="2" rx="1" fill="white"/>
    </svg>
  ),
};

export { Icons, LibraryIcons, DashboardIcons, DashboardSuperAdminIcons };
