const form = document.querySelector("#form");
const distInput = document.querySelector("#dist");
const levelInput = document.querySelector("#leveldif");
const fractionInput = document.querySelector("#fraction");
const percentageInput = document.querySelector("#percentage");
const resetButton = document.querySelector("button");

let updating = false;

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

  let dist = distInput.value ? parseFloat(distInput.value) : 0;
  let level = levelInput.value ? parseFloat(levelInput.value) : 0;
  let fraction = fractionInput.value
    ? parseFloat(fractionInput.value.replace("1:", ""))
    : 0;
  let percentage = percentageInput.value
    ? parseFloat(percentageInput.value.replace(/[^0-9.]/g, ""))
    : 0;

  try {
    if (target === distInput || target === levelInput) {
      if (!isNaN(dist) && !isNaN(level) && dist !== 0 && level !== 0) {
        if (target !== fractionInput) {
          fractionInput.value = `1:${(dist / level).toFixed(2)}`;
        }
        if (target !== percentageInput) {
          percentageInput.value = `${((level / dist) * 100).toFixed(2)}%`;
        }
      } else {
        if (target !== fractionInput) fractionInput.value = "";
        if (target !== percentageInput) percentageInput.value = "";
      }
    } else if (target === fractionInput) {
      if (!isNaN(fraction) && fraction !== 0) {
        if (!isNaN(dist) && dist !== 0) {
          level = dist / fraction;
          if (target !== levelInput) levelInput.value = level.toFixed(2);
        } else if (!isNaN(level) && level !== 0) {
          dist = fraction * level;
          if (target !== distInput) distInput.value = dist.toFixed(2);
        }
        if (dist !== 0 && level !== 0) {
          if (target !== percentageInput)
            percentageInput.value = `${((level / dist) * 100).toFixed(2)}%`;
        }
      }
    } else if (target === percentageInput) {
      if (!isNaN(percentage) && percentage !== 0) {
        if (!isNaN(dist) && dist !== 0) {
          level = (percentage / 100) * dist;
          if (target !== levelInput) levelInput.value = level.toFixed(2);
        } else if (!isNaN(level) && level !== 0) {
          dist = (level * 100) / percentage;
          if (target !== distInput) distInput.value = dist.toFixed(2);
        }
        if (dist !== 0 && level !== 0) {
          if (target !== fractionInput)
            fractionInput.value = `1:${(dist / level).toFixed(2)}`;
        }
      }
    }
  } catch (error) {
    console.error("Calculation error:", error);
  } finally {
    updating = false;
  }
});

function updateGradientFields(dist, level) {
  const percentageVal = (level / dist) * 100;
  const fractionVal = dist / level;

  percentageInput.value = `${percentageVal.toFixed(2)}%`;
  fractionInput.value = `1:${fractionVal.toFixed(2)}`;
}
