export default async function CustomerPage({ params }: { params: Promise<{ roId: string }> }) {
  const { roId } = await params;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">Customer Portal</h1>
      <p>Repair Order: {roId}</p>
      <p>Customer portal features coming soon...</p>
    </div>
  );
}
