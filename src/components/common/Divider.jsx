export default function Divider({ className = "", text = "" }) {
  if (text) {
    return (
      <div className={`relative flex items-center my-6 ${className}`}>
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500 bg-white">{text}</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
    );
  }

  return <hr className={`border-gray-300 my-6 ${className}`} />;
}
