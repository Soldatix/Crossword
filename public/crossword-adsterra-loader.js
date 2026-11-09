/* Crossword — original Adsterra desktop/mobile GET CODE.
 * One banner at the top of the page, outside crossword controls.
 * Do not request ads without valid shared first-party advertising consent.
 * Parser-time document.write is used in existing Apps & Games web pilots
 * but is not independently endorsed by the provider.
 */
(() => {
  "use strict";
  if (location.hostname !== "crossword.appsandgames.org") return;
  if (document.readyState !== "loading") return;
  if (navigator.onLine === false) return;

  const script = document.currentScript;
  const slot = script?.parentElement;
  const area = slot?.parentElement;
  const unit = script?.dataset.unit;
  if (!slot?.classList.contains("crossword-ad-unit") ||
      area?.id !== "crossword-ad-area") return;

  const desktop = matchMedia("(min-width: 800px)").matches;
  const mobile = matchMedia("(min-width: 320px) and (max-width: 799px)").matches;
  if (!((desktop && unit === "desktop") || (mobile && unit === "mobile"))) return;

  let allowed = false;
  try {
    const cookie = document.cookie.split(";").map(s => s.trim())
      .find(s => s.startsWith("ag_privacy_choices_v1="));
    const choice = cookie && JSON.parse(decodeURIComponent(
      cookie.slice("ag_privacy_choices_v1=".length)));
    const age = choice && Date.now() - choice.timestamp;
    allowed = !!choice && choice.version === 1 &&
      choice.partnerRevision === "adsterra-2026-11" &&
      choice.advertising === true && Number.isFinite(age) &&
      age >= 0 && age <= 180 * 24 * 60 * 60 * 1000;
  } catch (_) { allowed = false; }
  if (!allowed) return;

  const tags = {
    desktop: "<script>\n  atOptions = {\n    'key' : '6c9f68248eca776ad984f297f9d480a3',\n    'format' : 'iframe',\n    'height' : 90,\n    'width' : 728,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/6c9f68248eca776ad984f297f9d480a3\"></script>",
    mobile: "<script>\n  atOptions = {\n    'key' : 'a926522292fb7c9d38f82b7ef5c47c51',\n    'format' : 'iframe',\n    'height' : 50,\n    'width' : 320,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/a926522292fb7c9d38f82b7ef5c47c51\"></script>"
  };
  area.hidden = false;
  slot.hidden = false;
  const label = document.createElement("span");
  label.className = "crossword-ad-label";
  label.textContent = "Advertisement";
  slot.insertBefore(label, script);
  document.write(tags[unit]);
})();
