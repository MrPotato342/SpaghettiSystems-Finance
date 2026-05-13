const salaryInput =
  document.getElementById("salary");

const hraInput =
  document.getElementById("hra");

const deduction80CInput =
  document.getElementById("deduction80C");

const deduction80DInput =
  document.getElementById("deduction80D");

const otherDeductionsInput =
  document.getElementById("otherDeductions");

const oldTaxResult =
  document.getElementById("oldTaxResult");

const newTaxResult =
  document.getElementById("newTaxResult");

const savingsResult =
  document.getElementById("savingsResult");

const recommendationHeadline =
  document.getElementById("recommendationHeadline");

const recommendationDescription =
  document.getElementById("recommendationDescription");

const strategyInsight =
  document.getElementById("strategyInsight");

const deductionInsight =
  document.getElementById("deductionInsight");

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

function calculateOldRegimeTax(
  taxableIncome
) {

  let tax = 0;

  if (taxableIncome <= 250000) {

    tax = 0;

  } else if (
    taxableIncome <= 500000
  ) {

    tax =
      (taxableIncome - 250000) * 0.05;

  } else if (
    taxableIncome <= 1000000
  ) {

    tax =
      12500 +
      (taxableIncome - 500000) * 0.2;

  } else {

    tax =
      112500 +
      (taxableIncome - 1000000) * 0.3;
  }

  return tax * 1.04;
}

function calculateNewRegimeTax(
  taxableIncome
) {

  let tax = 0;

  const slabs = [
    [400000, 0],
    [800000, 0.05],
    [1200000, 0.10],
    [1600000, 0.15],
    [2000000, 0.20],
    [2400000, 0.25],
    [Infinity, 0.30]
  ];

  let previousLimit = 0;

  for (const [limit, rate] of slabs) {

    if (taxableIncome > limit) {

      tax +=
        (limit - previousLimit) * rate;

      previousLimit = limit;

    } else {

      tax +=
        (taxableIncome - previousLimit) *
        rate;

      break;
    }
  }

  return tax * 1.04;
}

function calculate() {

  const salary =
    Number(salaryInput.value);

  const hra =
    Number(hraInput.value);

  const deduction80C =
    Number(deduction80CInput.value);

  const deduction80D =
    Number(deduction80DInput.value);

  const otherDeductions =
    Number(otherDeductionsInput.value);

  if (!salary) return;

  const totalDeductions =
    hra +
    deduction80C +
    deduction80D +
    otherDeductions;

  const oldTaxableIncome =
    Math.max(
      salary - totalDeductions,
      0
    );

  const newTaxableIncome =
    salary;

  const oldTax =
    calculateOldRegimeTax(
      oldTaxableIncome
    );

  const newTax =
    calculateNewRegimeTax(
      newTaxableIncome
    );

  const savings =
    Math.abs(oldTax - newTax);

  oldTaxResult.textContent =
    formatCurrency(oldTax);

  newTaxResult.textContent =
    formatCurrency(newTax);

  savingsResult.textContent =
    formatCurrency(savings);

  // RECOMMENDATION

  if (oldTax < newTax) {

    recommendationHeadline.textContent =
      "Old Regime Recommended";

    recommendationDescription.textContent =
      `You save approximately ${formatCurrency(savings)} annually under the old regime.`;

  } else {

    recommendationHeadline.textContent =
      "New Regime Recommended";

    recommendationDescription.textContent =
      `You save approximately ${formatCurrency(savings)} annually under the new regime.`;
  }

  // STRATEGIC INSIGHT

  if (
    totalDeductions > 300000
  ) {

    strategyInsight.textContent =
      "Your deduction profile is very strong. The old regime becomes significantly more efficient when deductions are aggressively utilized.";

  } else if (
    totalDeductions < 100000
  ) {

    strategyInsight.textContent =
      "Your deductions are relatively low. The simplified lower-tax structure of the new regime may be more beneficial.";

  } else {

    strategyInsight.textContent =
      "Your tax profile sits near the regime crossover zone. Small deduction changes can significantly affect which regime is optimal.";
  }

  // BREAK-EVEN INSIGHT

  const breakEvenEstimate =
    Math.max(
      newTax - oldTax,
      0
    ) / 0.3;

  if (
    oldTax > newTax
  ) {

    deductionInsight.textContent =
      `You would need approximately ${formatCurrency(breakEvenEstimate)} more deductions for the old regime to become competitive.`;

  } else {

    deductionInsight.textContent =
      `Your current deductions already create meaningful tax efficiency under the old regime.`;
  }
}

[
  salaryInput,
  hraInput,
  deduction80CInput,
  deduction80DInput,
  otherDeductionsInput
].forEach(input => {

  input.addEventListener(
    "input",
    calculate
  );
});

calculate();