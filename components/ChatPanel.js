import DocChat from './DocChat';

// Lightweight wrapper to embed the document chat with optional title/description
export default function ChatPanel({ fileId }) {
  if (!fileId) return null;
  return (
    <div className="space-y-3">
      <DocChat fileId={fileId} />
    </div>
  );
}
