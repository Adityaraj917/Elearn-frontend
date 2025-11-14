import PageLayout from '../components/PageLayout';

export default function PrivacyPage() {
  return (
    <PageLayout motionKey="privacy">
      <section className="container-wide py-12">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <div className="prose-base mt-3 space-y-4">
          <p>
            This is a placeholder privacy policy for SAARTHI. We respect your privacy. Uploaded files are processed for the sole purpose of generating summaries and quizzes.
          </p>
          <p>
            When running locally, files stay on your machine. If you deploy SAARTHI to a server, ensure you provide a compliant storage solution and update this policy accordingly.
          </p>
          <p>
            Contact us at the Contact page for any questions.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
