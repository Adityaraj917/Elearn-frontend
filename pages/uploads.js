import Header from '../components/Header';
import Footer from '../components/Footer';
import FileUploader from '../components/FileUploader';
import AgentPanel from '../components/AgentPanel';
import { useState } from 'react';

export default function Uploads() {
  const [lastUpload, setLastUpload] = useState(null);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container-wide flex-1 py-8">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">Uploads</h1>
            <FileUploader onUploaded={setLastUpload} />
            {lastUpload && (
              <div className="card p-4 text-sm">
                <div className="font-medium">Upload complete</div>
                <div>File ID: {lastUpload.fileId}</div>
                <div>File Name: {lastUpload.fileName}</div>
                <div className="text-green-700">{lastUpload.message}</div>
              </div>
            )}
          </div>
          <div className="md:col-span-1">
            <AgentPanel floating={false} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
