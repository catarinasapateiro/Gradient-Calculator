const form = document.querySelector("#form");
const distInput = document.querySelector("#dist");
const levelInput = document.querySelector("#leveldif");
const fractionInput = document.querySelector("#fraction");
const percentageInput = document.querySelector("#percentage");
const resetButton = document.querySelector("button");

let updating = false;

// Moved resetButton event listener outside of input handler
resetButton.addEventListener("click", function (e) {
  distInput.value = "";
  levelInput.value = "";
  fractionInput.value = "";
  percentageInput.value = "";
});

form.addEventListener("input", function (e) {
  if (updating) return;
  updating = true;

  const target = e.target;

  // Clear derived fields when independent fields are cleared
  if (target === distInput && distInput.value === "") {
    fractionInput.value = "";
    percentageInput.value = "";
  }
  if (target === levelInput && levelInput.value === "") {
    fractionInput.value = "";
    percentageInput.value = "";
  }

  // Parse values and handle empty inputs
  let dist = distInput.value ? parseFloat(distInput.value) : 0;
  let level = levelInput.value ? parseFloat(levelInput.value) : 0;
  let fraction = fractionInput.value
    ? parseFloat(fractionInput.value.replace("1:", ""))
    : 0;
  let percentage = percentageInput.value
    ? parseFloat(percentageInput.value.replace(/[^0-9.]/g, ""))
    : 0;

  try {
    if (
      [distInput, levelInput, fractionInput, percentageInput].includes(target)
    ) {
      if (target === distInput && distInput.value === "") {
        fractionInput.value = "";
        percentageInput.value = "";
      }
      if (target === levelInput && levelInput.value === "") {
        fractionInput.value = "";
        percentageInput.value = "";
      }

      // Recalculate based on valid inputs
      if (!isNaN(dist) && !isNaN(level) && dist !== 0 && level !== 0) {
        updateGradientFields(dist, level);
      } else if (!isNaN(fraction) && fraction !== 0) {
        if (!isNaN(dist) && dist !== 0) {
          level = dist / fraction;
          levelInput.value = level.toFixed(0);
          updateGradientFields(dist, level);
        } else if (!isNaN(level) && level !== 0) {
          dist = fraction * level;
          distInput.value = dist.toFixed(0);
          updateGradientFields(dist, level);
        }
      } else if (!isNaN(percentage) && percentage !== 0) {
        if (!isNaN(dist) && dist !== 0) {
          level = (percentage / 100) * dist;
          levelInput.value = level.toFixed(0);
          updateGradientFields(dist, level);
        } else if (!isNaN(level) && level !== 0) {
          dist = (level * 100) / percentage;
          distInput.value = dist.toFixed(0);
          updateGradientFields(dist, level);
        }
      }
    }
  } catch (error) {
    console.error("Calculation error:", error);
  } finally {
    updating = false;
  }
});

// Helper function to update derived fields
function updateGradientFields(dist, level) {
  const percentageVal = (level / dist) * 100;
  const fractionVal = dist / level;

  percentageInput.value = `${percentageVal.toFixed(2)}%`;
  fractionInput.value = `1:${Math.round(fractionVal)}`;
}
