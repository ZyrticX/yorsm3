export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">404 - הדף לא נמצא</h2>
      <p className="mb-4">מצטערים, הדף שחיפשת לא קיים.</p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        חזרה לדף הבית
      </a>
    </div>
  )
}
