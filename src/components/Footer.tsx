import { Footer as FooterDemo } from './ui/footer-demo';

interface FooterProps {
  onNavigateToServices?: (serviceId?: string) => void;
}

function Footer({ onNavigateToServices }: FooterProps) {
  return (
    <div className="block">
      <FooterDemo onNavigateToServices={onNavigateToServices} />
    </div>
  );
}

export { Footer };
