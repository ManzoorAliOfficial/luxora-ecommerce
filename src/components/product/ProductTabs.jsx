import Tabs from "../common/Tabs";
import ReviewList from "./ReviewList";

export default function ProductTabs({ product }) {
  const tabs = [
    {
      label: "Description",
      content: (
        <div className="prose max-w-none">
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      ),
    },
    {
      label: `Reviews (${product.reviews || 0})`,
      content: <ReviewList />,
    },
    {
      label: "Shipping",
      content: (
        <div className="space-y-3 text-gray-600">
          <p>• Free shipping on orders over $100</p>
          <p>• Standard delivery: 5-7 business days</p>
          <p>• Express delivery: 2-3 business days</p>
          <p>• 30-day return policy</p>
        </div>
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
