import React from 'react';

const PaymentMethods = () => {
  return (
    <div>
      {/* Payment Methods */}
      <div className="order-1 lg:order-2 flex flex-wrap items-center gap-2">
        
        {/* Visa */}
        <div
          className="flex items-center px-3 py-1.5 bg-white rounded-md shadow-sm hover:scale-105 transition-all duration-200"
          title="Visa"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
            alt="Visa"
            className="h-5 w-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Mastercard */}
        <div
          className="flex items-center px-3 py-1.5 bg-white rounded-md shadow-sm hover:scale-105 transition-all duration-200"
          title="Mastercard"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="Mastercard"
            className="h-5 w-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Apple Pay */}
        <div
          className="flex items-center px-3 py-1.5 bg-white rounded-md shadow-sm hover:scale-105 transition-all duration-200"
          title="Apple Pay"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
            alt="Apple Pay"
            className="h-5 w-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Google Pay */}
        <div
          className="flex items-center px-3 py-1.5 bg-white rounded-md shadow-sm hover:scale-105 transition-all duration-200"
          title="Google Pay"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
            alt="Google Pay"
            className="h-5 w-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Easypaisa */}
        <div
          className="flex items-center px-3 py-1.5 bg-white rounded-md shadow-sm hover:scale-105 transition-all duration-200"
          title="Easypaisa"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/16/Easypaisa_logo.svg"
            alt="Easypaisa"
            className="h-5 w-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* JazzCash - Fixed to direct SVG */}
        <div
          className="flex items-center px-3 py-1.5 bg-white rounded-md shadow-sm hover:scale-105 transition-all duration-200"
          title="JazzCash"
        >
          <img
            src="https://media.licdn.com/dms/image/v2/D4D0BAQEKS3pQyEcJ1A/company-logo_200_200/B4DZpsvVc1GgAI-/0/1762760940048/jazzcash_logo?e=2147483647&v=beta&t=BlFV1DSv3DrldoVUaZjv7PbkH7IDVjeo0jEuv9ES12s"
            alt="JazzCash"
            className="h-5 w-auto object-contain"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  );
};

export default PaymentMethods;