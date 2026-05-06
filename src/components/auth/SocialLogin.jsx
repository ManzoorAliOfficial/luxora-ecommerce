export default function SocialLogin() {
  const socials = [
    { name: "Google", icon: "🔍", color: "border-red-300 hover:bg-red-50" },
    { name: "Facebook", icon: "📘", color: "border-blue-300 hover:bg-blue-50" },
    { name: "Apple", icon: "🍎", color: "border-gray-300 hover:bg-gray-50" },
  ];

  return (
    <div className="space-y-3">
      {socials.map((social) => (
        <button
          key={social.name}
          type="button"
          className={`
            w-full flex items-center justify-center gap-3 px-4 py-3
            border-2 rounded-lg transition-all duration-200
            ${social.color}
          `}
        >
          <span className="text-2xl">{social.icon}</span>
          <span className="font-medium text-gray-700">
            Continue with {social.name}
          </span>
        </button>
      ))}
    </div>
  );
}
