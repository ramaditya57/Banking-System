export default function OverviewCard({ title, value }) {
  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-sm min-w-[140px] sm:min-w-[180px] flex-1">
      <h4 className="text-sm text-gray-600 font-medium">{title}</h4>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{value}</h2>
    </div>
  );
}
