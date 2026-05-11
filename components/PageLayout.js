import Navbar from './Navbar';
import Footer from './Footer';
import MotionWrapper from './MotionWrapper';

export default function PageLayout({ children, motionKey }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark text-slate-800 dark:text-slate-200 bg-mesh">
      <Navbar />
      <div className="flex-1 relative z-10">
        <MotionWrapper keyProp={motionKey}>{children}</MotionWrapper>
      </div>
      <Footer />
    </div>
  );
}
