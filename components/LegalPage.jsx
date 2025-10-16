export default function LegalPageLayout({ title, children }) {
  return (
    <main className="max-w-4xl mx-auto md:py-28 p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="prose prose-lg">{children}</div>
    </main>
  );
}
