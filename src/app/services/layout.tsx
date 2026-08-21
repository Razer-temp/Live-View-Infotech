import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Live View Infotech — CCTV, Access Control, Fire Safety & More',
  description:
    'CCTV surveillance, access control, fire alarm systems, networking, industrial electrical solutions, and annual maintenance — designed, installed, and supported by Live View Infotech.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
