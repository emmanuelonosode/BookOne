export default function LegalPageLayout({ title, children }) {
  return (
    <main className="max-w-4xl mx-auto py-22 p-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="prose prose-lg">{children}</div>
    </main>
  );
}
