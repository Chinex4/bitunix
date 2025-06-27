import React from "react";

const currencies = [
  "AED – د.إ",
  "AUD – A$",
  "BRL – R$",
  "CAD – C$",
  "CNY – ¥",
  "EUR – €",
  "GBP – £",
  "HKD – HKD",
  "IDR – Rp",
  "INR – ₹",
  "JPY – ¥",
  "KWD – د.ك",
  "MXN – Mex$",
  "NOK – Kr",
  "PHP – ₱",
  "PLN – zł",
  "RUB – ₽",
  "SAR – ر.س",
  "SGD – S$",
  "USD – $",
  "VND – ₫",
  "ZAR – R",
];

export default function CurrencyDropdown({ selected, onChange }) {
  return (
    <div className='max-h-[400px] overflow-y-auto pr-2 grid grid-cols-2 md:grid-cols-3 gap-3 text-[12px]'>
      {currencies.map((curr, i) => (
        <div
          key={i}
          onClick={() => onChange(curr)}
          className={`px-3 py-2 rounded cursor-pointer ${
            selected === curr ?
              "bg-white/10 text-lime-400"
            : "hover:bg-white/10"
          }`}
        >
          {curr}
        </div>
      ))}
    </div>
  );
}
