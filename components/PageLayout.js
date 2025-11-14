import Navbar from './Navbar';
import Footer from './Footer';
import MotionWrapper from './MotionWrapper';

export default function PageLayout({ children, motionKey }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <Navbar />
      <div className="flex-1">
        <MotionWrapper keyProp={motionKey}>{children}</MotionWrapper>
      </div>
      <Footer />
    </div>
  );
}
