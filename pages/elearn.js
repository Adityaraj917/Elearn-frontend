import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import FileUploader from '../components/FileUploader';
import SummarizerView from '../components/SummarizerView';
import QuizView from '../components/QuizView';
import DocChat from '../components/DocChat';

export default function ElearnPage() {
  const [fileInfo, setFileInfo] = useState(null);
  const [mode, setMode] = useState(null); // 'summary' | 'quiz' | 'chat'

  return (
    <PageLayout motionKey="elearn">
      <div className="container-wide p-6 space-y-8">
        <h1 className="text-3xl font-bold mb-4">Saarthi eLearn</h1>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Upload Your Document</h2>
          <FileUploader onUploaded={(data) => setFileInfo(data)} />
        </div>

        {fileInfo && (
          <div className="flex flex-wrap gap-3">
            <button className={`btn ${mode==='summary' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setMode('summary')}>
              Summarize Notes
            </button>
            <button className={`btn ${mode==='quiz' ? 'btn-secondary' : 'btn-outline'}`} onClick={() => setMode('quiz')}>
              Generate Quiz
            </button>
            <button className={`btn ${mode==='chat' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setMode('chat')}>
              AI Chat
            </button>
          </div>
        )}

        {mode === 'summary' && fileInfo && (
          <SummarizerView fileId={fileInfo.fileId} />
        )}
        {mode === 'quiz' && fileInfo && (
          <QuizView fileId={fileInfo.fileId} />
        )}
        {mode === 'chat' && fileInfo && (
          <DocChat fileId={fileInfo.fileId} />
        )}
      </div>
    </PageLayout>
  );
}
