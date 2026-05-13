const currentAgeInput =
  document.getElementById("currentAge");

const retirementAgeInput =
  document.getElementById("retirementAge");

const monthlyExpensesInput =
  document.getElementById("monthlyExpenses");

const currentSavingsInput =
  document.getElementById("currentSavings");

const monthlyInvestmentInput =
  document.getElementById("monthlyInvestment");

const annualReturnInput =
  document.getElementById("annualReturn");

const inflationInput =
  document.getElementById("inflation");

// RESULTS

const freedomAgeResult =
  document.getElementById("freedomAgeResult");

const targetCorpusResult =
  document.getElementById("targetCorpusResult");

const projectedCorpusResult =
  document.getElementById("projectedCorpusResult");

const fireProgressResult =
  document.getElementById("fireProgressResult");

const monthlyRetirementIncomeResult =
  document.getElementById("monthlyRetirementIncomeResult");

// HERO

const heroHeadline =
  document.getElementById("heroHeadline");

const heroDescription =
  document.getElementById("heroDescription");

// INSIGHTS

const accelerationInsight =
  document.getElementById("accelerationInsight");

const sustainabilityInsight =
  document.getElementById("sustainabilityInsight");

const inflationInsight =
  document.getElementById("inflationInsight");

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

function futureValueOfSIP(
  monthlyInvestment,
  monthlyRate,
  months
) {

  return (
    monthlyInvestment *
    (
      (
        Math.pow(
          1 + monthlyRate,
          months
        ) - 1
      ) / monthlyRate
    ) *
    (1 + monthlyRate)
  );
}

function calculate() {

  const currentAge =
    Number(currentAgeInput.value);

  const targetRetirementAge =
    Number(retirementAgeInput.value);

  const monthlyExpenses =
    Number(monthlyExpensesInput.value);

  const currentSavings =
    Number(currentSavingsInput.value);

  const monthlyInvestment =
    Number(monthlyInvestmentInput.value);

  const annualReturn =
    Number(annualReturnInput.value);

  const inflation =
    Number(inflationInput.value);

  if (
    !currentAge ||
    !monthlyExpenses ||
    !monthlyInvestment
  ) return;

  const yearsToRetirement =
    targetRetirementAge -
    currentAge;

  const inflationAdjustedExpenses =
    monthlyExpenses *
    Math.pow(
      1 + inflation / 100,
      yearsToRetirement
    );

  const annualRetirementExpenses =
    inflationAdjustedExpenses * 12;

  // 4% FIRE RULE

  const targetCorpus =
    annualRetirementExpenses * 25;

  const monthlyRate =
    annualReturn / 12 / 100;

  const months =
    yearsToRetirement * 12;

  const futureSIPValue =
    futureValueOfSIP(
      monthlyInvestment,
      monthlyRate,
      months
    );

  const futureCurrentSavings =
    currentSavings *
    Math.pow(
      1 + annualReturn / 100,
      yearsToRetirement
    );

  const projectedCorpus =
    futureSIPValue +
    futureCurrentSavings;

  const fireProgress =
    (
      projectedCorpus /
      targetCorpus
    ) * 100;

  // FIND PROJECTED FIRE AGE

  let simulatedCorpus =
    currentSavings;

  let simulatedAge =
    currentAge;

  while (
    simulatedCorpus < targetCorpus &&
    simulatedAge < 90
  ) {

    simulatedCorpus =
      simulatedCorpus *
      (1 + annualReturn / 100);

    simulatedCorpus +=
      monthlyInvestment * 12;

    simulatedAge++;
  }

  // RESULTS

  freedomAgeResult.textContent =
    `${simulatedAge} years`;

  targetCorpusResult.textContent =
    formatCurrency(targetCorpus);

  projectedCorpusResult.textContent =
    formatCurrency(projectedCorpus);

  fireProgressResult.textContent =
    `${fireProgress.toFixed(1)}%`;

  monthlyRetirementIncomeResult.textContent =
    formatCurrency(
      inflationAdjustedExpenses
    );

  // HERO

  if (
    projectedCorpus >= targetCorpus
  ) {

    heroHeadline.textContent =
      `You are on track for financial independence by age ${simulatedAge}`;

    heroDescription.textContent =
      `Your projected investments may sustain approximately ${formatCurrency(inflationAdjustedExpenses)} monthly expenses in retirement.`;

  } else {

    heroHeadline.textContent =
      `Your current trajectory may fall short of your retirement target`;

    heroDescription.textContent =
      `Increasing investments or extending retirement age may significantly improve long-term financial sustainability.`;
  }

  // ACCELERATION INSIGHT

  const boostedSIP =
    monthlyInvestment + 5000;

  const boostedCorpus =
    futureValueOfSIP(
      boostedSIP,
      monthlyRate,
      months
    ) + futureCurrentSavings;

  const difference =
    boostedCorpus - projectedCorpus;

  accelerationInsight.textContent =
    `Increasing your monthly investments by ₹5,000 could potentially add approximately ${formatCurrency(difference)} to your retirement corpus.`;

  // SUSTAINABILITY INSIGHT

  if (
    fireProgress >= 100
  ) {

    sustainabilityInsight.textContent =
      "Your projected corpus appears sufficient for sustainable long-term retirement under the 4% withdrawal framework.";

  } else if (
    fireProgress >= 70
  ) {

    sustainabilityInsight.textContent =
      "You are approaching financial independence territory, but additional savings acceleration may meaningfully improve retirement security.";

  } else {

    sustainabilityInsight.textContent =
      "Your current investment trajectory may create a meaningful retirement gap unless savings or returns improve over time.";
  }

  // INFLATION INSIGHT

  inflationInsight.textContent =
    `At ${inflation}% annual inflation, today's monthly expenses of ${formatCurrency(monthlyExpenses)} may grow to approximately ${formatCurrency(inflationAdjustedExpenses)} by retirement.`;
}

[
  currentAgeInput,
  retirementAgeInput,
  monthlyExpensesInput,
  currentSavingsInput,
  monthlyInvestmentInput,
  annualReturnInput,
  inflationInput
].forEach(input => {

  input.addEventListener(
    "input",
    calculate
  );
});

calculate();