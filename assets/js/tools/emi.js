const loanAmountInput =
  document.getElementById("loanAmount");

const interestRateInput =
  document.getElementById("interestRate");

const loanYearsInput =
  document.getElementById("loanYears");

const extraPaymentInput =
  document.getElementById("extraPayment");

const emiResult =
  document.getElementById("emiResult");

const originalInterest =
  document.getElementById("originalInterest");

const interestSaved =
  document.getElementById("interestSaved");

const timeSaved =
  document.getElementById("timeSaved");

const newDuration =
  document.getElementById("newDuration");

const impactHeadline =
  document.getElementById("impactHeadline");

const impactDescription =
  document.getElementById("impactDescription");

const recommendationText =
  document.getElementById("recommendationText");

const efficiencyMetric =
  document.getElementById("efficiencyMetric");

function formatCurrency(value) {

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }
  ).format(value);
}

function formatYears(months) {

  const years = Math.floor(months / 12);

  const remainingMonths = months % 12;

  return `${years}y ${remainingMonths}m`;
}

function calculateEMI(principal, annualRate, years) {

  const monthlyRate =
    annualRate / 12 / 100;

  const months =
    years * 12;

  return (
    principal *
    monthlyRate *
    Math.pow(1 + monthlyRate, months)
  ) / (
    Math.pow(1 + monthlyRate, months) - 1
  );
}

function simulateLoan(
  principal,
  annualRate,
  years,
  extraPayment
) {

  const emi =
    calculateEMI(
      principal,
      annualRate,
      years
    );

  const monthlyRate =
    annualRate / 12 / 100;

  let balance = principal;

  let totalInterest = 0;

  let months = 0;

  while (
    balance > 0 &&
    months < 1000
  ) {

    const interest =
      balance * monthlyRate;

    const payment =
      emi + extraPayment;

    const principalPaid =
      payment - interest;

    balance -= principalPaid;

    totalInterest += interest;

    months++;
  }

  return {
    emi,
    totalInterest,
    months
  };
}

function calculate() {

  const principal =
    Number(loanAmountInput.value);

  const rate =
    Number(interestRateInput.value);

  const years =
    Number(loanYearsInput.value);

  const extra =
    Number(extraPaymentInput.value);

  if (
    !principal ||
    !rate ||
    !years
  ) return;

  const originalEMI =
    calculateEMI(
      principal,
      rate,
      years
    );

  const originalMonths =
    years * 12;

  const originalRepayment =
    originalEMI * originalMonths;

  const originalInterestAmount =
    originalRepayment - principal;

  const prepaid =
    simulateLoan(
      principal,
      rate,
      years,
      extra
    );

  const savedInterest =
    originalInterestAmount -
    prepaid.totalInterest;

  const monthsSaved =
    originalMonths -
    prepaid.months;

  const efficiency =
    extra > 0
      ? (
          savedInterest /
          (extra * prepaid.months)
        ).toFixed(2)
      : 0;

  // RESULTS

  emiResult.textContent =
    formatCurrency(originalEMI);

  originalInterest.textContent =
    formatCurrency(
      originalInterestAmount
    );

  interestSaved.textContent =
    formatCurrency(
      savedInterest
    );

  timeSaved.textContent =
    formatYears(monthsSaved);

  newDuration.textContent =
    formatYears(prepaid.months);

  // HERO INSIGHT

  impactHeadline.textContent =
    `You save ${formatCurrency(savedInterest)} in interest`;

  impactDescription.textContent =
    `Your loan closes ${formatYears(monthsSaved)} earlier with monthly prepayments.`;

  // EFFICIENCY

  if (extra > 0) {

    efficiencyMetric.textContent =
      `Every extra ₹1 paid monthly saves approximately ₹${efficiency} in future interest.`;

  } else {

    efficiencyMetric.textContent =
      `Add a monthly prepayment to see long-term savings impact.`;
  }

  // RECOMMENDATION ENGINE

  const interestRatio =
    originalInterestAmount /
    principal;

  if (extra === 0) {

    recommendationText.textContent =
      `Even modest prepayments early in a loan can dramatically reduce long-term interest burden.`;

  } else if (
    interestRatio > 0.8 &&
    monthsSaved > 48
  ) {

    recommendationText.textContent =
      `Your loan is highly interest-heavy. Current prepayments are extremely effective and significantly accelerate debt freedom.`;

  } else if (
    monthsSaved > 72
  ) {

    recommendationText.textContent =
      `Your strategy aggressively reduces loan duration. Reducing tenure usually creates larger savings than reducing EMI.`;

  } else if (
    monthsSaved < 12
  ) {

    recommendationText.textContent =
      `Your current prepayment amount has limited impact. Slightly increasing monthly prepayment could produce disproportionately larger savings.`;

  } else {

    recommendationText.textContent =
      `Your prepayment strategy meaningfully reduces both repayment stress and long-term interest costs.`;
  }
}

[
  loanAmountInput,
  interestRateInput,
  loanYearsInput,
  extraPaymentInput
].forEach(input => {

  input.addEventListener(
    "input",
    calculate
  );
});

calculate();
