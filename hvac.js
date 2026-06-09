/* ══════════════════════════════════════════════
   HVAC DIAGNOSTIC TOOL
   Refrigerant & Airflow Only — No Electrical
══════════════════════════════════════════════ */

// ── P-T Tables (psig → °F saturation temp) ───
// Each entry: [psig, °F]
const PT = {
  R410A: [
    [50,2],[60,8],[70,14],[80,19],[90,24],[100,29],[110,33],[120,38],
    [130,42],[140,46],[150,50],[160,54],[170,57],[180,61],[190,64],
    [200,67],[220,74],[240,80],[260,86],[280,91],[300,97],[325,103],
    [350,109],[375,115],[400,120],[425,126],[450,131],[475,136],[500,141]
  ],
  R22: [
    [10,0],[20,8],[30,16],[40,23],[50,29],[60,35],[70,40],[80,45],
    [90,50],[100,54],[110,59],[120,63],[130,67],[140,71],[150,75],
    [160,79],[170,83],[180,86],[200,93],[220,100],[240,106],[260,112],
    [280,118],[300,123],[320,128],[340,133]
  ],
  R32: [
    [50,4],[60,11],[70,17],[80,23],[90,28],[100,33],[110,38],[120,42],
    [130,47],[140,51],[150,55],[160,58],[175,64],[190,69],[210,75],
    [230,81],[250,87],[270,92],[300,101],[330,109],[360,117],[400,127],
    [440,137],[480,146]
  ],
  // R-454B (A2L) — bubble-point saturation, close to but slightly below R-410A
  R454B: [
    [50,1],[60,7],[70,13],[80,18],[90,23],[100,28],[110,32],[120,37],
    [130,41],[140,45],[150,49],[160,52],[170,56],[180,59],[190,63],
    [200,66],[220,72],[240,78],[260,84],[280,90],[300,95],[325,101],
    [350,107],[375,112],[400,118],[425,123],[450,128],[475,133],[500,138]
  ]
};

// Linear interpolation
function interpPT(table, psig) {
  if (psig === null || psig === '') return null;
  const p = parseFloat(psig);
  if (isNaN(p)) return null;
  if (p <= table[0][0]) return table[0][1];
  if (p >= table[table.length-1][0]) return table[table.length-1][1];
  for (let i = 0; i < table.length - 1; i++) {
    const [p1, t1] = table[i];
    const [p2, t2] = table[i+1];
    if (p >= p1 && p <= p2) {
      return t1 + (t2 - t1) * ((p - p1) / (p2 - p1));
    }
  }
  return null;
}

// Reverse lookup: saturation °F → psig (for non-condensables standing test)
function interpTP(table, tempF) {
  if (tempF === null || tempF === '') return null;
  const t = parseFloat(tempF);
  if (isNaN(t)) return null;
  if (t <= table[0][1]) return table[0][0];
  if (t >= table[table.length-1][1]) return table[table.length-1][0];
  for (let i = 0; i < table.length - 1; i++) {
    const [p1, t1] = table[i];
    const [p2, t2] = table[i+1];
    if (t >= t1 && t <= t2) {
      return p1 + (p2 - p1) * ((t - t1) / (t2 - t1));
    }
  }
  return null;
}

// ── Helpers ───────────────────────────────────
const $ = id => document.getElementById(id);
const val = id => { const v = parseFloat($(id).value); return isNaN(v) ? null : v; };
const fmt = (n, d=1) => n === null ? '—' : n.toFixed(d);

// Target superheat table for fixed orifice systems
// Rows = outdoor ambient °F, Cols = indoor wet bulb °F
// [55, 60, 63, 65, 67, 70, 72, 75]
const TARGET_SH_WB = [55, 60, 63, 65, 67, 70, 72, 75];
const TARGET_SH_OD = [65, 70, 75, 80, 85, 90, 95, 100, 105, 110];
const TARGET_SH_TABLE = [
  // outdoor\wb  55  60  63  65  67  70  72  75
  /* 65  */    [ 25, 22, 20, 19, 18, 15, 13, 11],
  /* 70  */    [ 27, 24, 22, 21, 20, 17, 15, 13],
  /* 75  */    [ 29, 26, 24, 23, 22, 19, 17, 14],
  /* 80  */    [ 31, 28, 26, 25, 24, 21, 19, 16],
  /* 85  */    [ 33, 30, 28, 27, 26, 23, 21, 18],
  /* 90  */    [ 35, 32, 30, 29, 28, 25, 23, 20],
  /* 95  */    [ 38, 34, 32, 31, 30, 27, 25, 22],
  /* 100 */    [ 40, 36, 34, 33, 31, 28, 26, 23],
  /* 105 */    [ 42, 38, 36, 35, 33, 30, 28, 25],
  /* 110 */    [ 44, 40, 38, 37, 35, 32, 30, 27],
];

function getTargetSH(outdoorDB, indoorWB) {
  if (outdoorDB === null || indoorWB === null) return null;
  // clamp to table bounds
  const od = Math.max(65, Math.min(110, outdoorDB));
  const wb = Math.max(55, Math.min(75, indoorWB));

  // find bracket rows/cols
  let ri = 0, rj = TARGET_SH_OD.length - 1;
  for (let i = 0; i < TARGET_SH_OD.length - 1; i++) {
    if (od >= TARGET_SH_OD[i] && od <= TARGET_SH_OD[i+1]) { ri = i; rj = i+1; break; }
  }
  let ci = 0, cj = TARGET_SH_WB.length - 1;
  for (let i = 0; i < TARGET_SH_WB.length - 1; i++) {
    if (wb >= TARGET_SH_WB[i] && wb <= TARGET_SH_WB[i+1]) { ci = i; cj = i+1; break; }
  }

  // bilinear interpolation
  const t = (od - TARGET_SH_OD[ri]) / (TARGET_SH_OD[rj] - TARGET_SH_OD[ri]);
  const s = (wb - TARGET_SH_WB[ci]) / (TARGET_SH_WB[cj] - TARGET_SH_WB[ci]);
  const sh = TARGET_SH_TABLE[ri][ci] * (1-t)*(1-s)
           + TARGET_SH_TABLE[ri][cj] * (1-t)*s
           + TARGET_SH_TABLE[rj][ci] * t*(1-s)
           + TARGET_SH_TABLE[rj][cj] * t*s;
  return Math.round(sh);
}

// ── State ─────────────────────────────────────
let mode = 'cooling';

// ── Mode toggle ───────────────────────────────
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    mode = btn.dataset.mode;
    updateLabels();
    recalcLive();
  });
});

function updateLabels() {
  if (mode === 'heating') {
    $('lbl-suction').childNodes[0].textContent = 'Suction Pressure ';
    $('lbl-discharge').childNodes[0].textContent = 'Discharge Pressure ';
    $('lbl-suction-temp').childNodes[0].textContent = 'Suction Line Temp ';
    $('lbl-outdoor').childNodes[0].textContent = 'Outdoor Ambient ';
    // Heat pump note
    $('wb-field').classList.add('hidden');
  } else {
    $('lbl-suction').childNodes[0].textContent = 'Suction Pressure ';
    $('lbl-discharge').childNodes[0].textContent = 'Discharge Pressure ';
    $('lbl-suction-temp').childNodes[0].textContent = 'Suction Line Temp ';
    $('lbl-outdoor').childNodes[0].textContent = 'Outdoor Ambient ';
    const metering = $('metering').value;
    if (metering === 'fixed') $('wb-field').classList.remove('hidden');
  }
}

// ── Metering device change ────────────────────
$('metering').addEventListener('change', () => {
  updateTargetDisplay();
  if ($('metering').value === 'fixed' && mode === 'cooling') {
    $('wb-field').classList.remove('hidden');
  } else {
    $('wb-field').classList.add('hidden');
  }
});

// ── Live calculations ─────────────────────────
function recalcLive() {
  const ref    = $('refrigerant').value;
  const table  = PT[ref];
  const sp     = val('suction-press');
  const dp     = val('discharge-press');
  const st     = val('suction-temp');
  const lt     = val('liquid-temp');
  const rdb    = val('return-db');
  const sup    = val('supply-temp');
  const od     = val('outdoor-temp');
  const wb     = val('return-wb');

  // Sat temps
  const evapSat = interpPT(table, sp);
  const condSat = interpPT(table, dp);

  // Superheat = suction line temp − evap sat temp
  const sh = (st !== null && evapSat !== null) ? st - evapSat : null;
  // Subcooling = cond sat temp − liquid line temp
  const sc = (lt !== null && condSat !== null) ? condSat - lt : null;
  // Delta T
  const dt = (rdb !== null && sup !== null) ? rdb - sup : null;
  // Compression ratio (absolute pressures = psig + 14.7)
  const cr = (sp !== null && dp !== null && sp > 0) ? (dp + 14.7) / (sp + 14.7) : null;

  // Update displays
  $('out-evap-sat').textContent = evapSat !== null ? `Evap Sat Temp: ${fmt(evapSat)}°F` : '— Evap Sat Temp: —';
  $('out-cond-sat').textContent = condSat !== null ? `Cond Sat Temp: ${fmt(condSat)}°F` : '— Cond Sat Temp: —';
  $('out-superheat').textContent = sh !== null ? `Superheat: ${fmt(sh)}°F` : '— Superheat: —';
  $('out-subcooling').textContent = sc !== null ? `Subcooling: ${fmt(sc)}°F` : '— Subcooling: —';
  $('out-delta-t').textContent = dt !== null ? `ΔT: ${fmt(dt)}°F` : '— ΔT: —';
  $('out-comp-ratio').textContent = cr !== null ? fmt(cr,2) + ' : 1' : '—';

  // Target values
  updateTargetDisplay(od, wb);
}

function updateTargetDisplay(od, wb) {
  const metering = $('metering').value;
  const targetSHbox = $('target-sh-box');
  const targetSCbox = $('target-sc-box');

  if (metering === 'txv') {
    targetSHbox.classList.add('hidden');
    targetSCbox.classList.remove('hidden');
    $('target-sc-val').textContent = '10–20 °F';
  } else {
    // Fixed orifice — show target SH
    targetSCbox.classList.add('hidden');
    targetSHbox.classList.remove('hidden');
    const odv  = od  !== undefined ? od  : val('outdoor-temp');
    const wbv  = wb  !== undefined ? wb  : val('return-wb');
    const tsh  = getTargetSH(odv, wbv);
    $('target-sh-val').textContent = tsh !== null ? tsh + ' °F' : 'Enter OD & WB';
  }
}

// Total External Static Pressure (TESP) = |supply| + |return|
function recalcStatic() {
  const ss = val('supply-static');
  const rs = val('return-static');
  if (ss === null && rs === null) {
    $('out-tesp').textContent = '— TESP: —';
    return;
  }
  const tesp = Math.abs(ss || 0) + Math.abs(rs || 0);
  $('out-tesp').textContent = `TESP: ${tesp.toFixed(2)} in. WC`;
}

// Wire all inputs for live updates
['suction-press','discharge-press','suction-temp','liquid-temp',
 'return-db','return-wb','supply-temp','outdoor-temp','refrigerant'].forEach(id => {
  $(id).addEventListener('input', recalcLive);
});
['supply-static','return-static','rated-esp'].forEach(id => {
  $(id).addEventListener('input', recalcStatic);
});

// ══════════════════════════════════════════════
// SINGLE FINDING RENDERER (for inline tools)
// ══════════════════════════════════════════════
function findingHTML(f) {
  return `
    <div class="finding ${f.sev}">
      <div class="finding-icon">${f.icon}</div>
      <div class="finding-body">
        <div class="finding-title">${f.title}</div>
        <div class="finding-detail">${f.detail}</div>
        ${f.causes && f.causes.length ? `
          <div class="finding-causes"><ul>${f.causes.map(c=>`<li>${c}</li>`).join('')}</ul></div>` : ''}
      </div>
    </div>`;
}

// ══════════════════════════════════════════════
// NON-CONDENSABLES TEST
// ══════════════════════════════════════════════
function ncExpected() {
  const ref = $('refrigerant').value;
  const amb = val('nc-ambient');
  const exp = interpTP(PT[ref], amb);
  $('out-nc-expected').textContent = exp !== null
    ? `Expected standing: ${exp.toFixed(0)} psig @ ${amb}°F`
    : '— Expected standing: —';
  return exp;
}
$('nc-ambient').addEventListener('input', ncExpected);
$('refrigerant').addEventListener('change', ncExpected);

$('btn-nc-check').addEventListener('click', () => {
  const amb = val('nc-ambient');
  const standing = val('nc-standing');
  const out = $('nc-result');
  if (amb === null || standing === null) {
    out.innerHTML = findingHTML({ sev:'info', icon:'ℹ️',
      title:'Enter ambient temp and standing pressure',
      detail:'The system must be off long enough (often 30+ min, ideally overnight) for refrigerant temperature to equalize with the surrounding air.', causes:[] });
    return;
  }
  const expected = interpTP(PT[$('refrigerant').value], amb);
  if (expected === null) { out.innerHTML = ''; return; }
  const diff = standing - expected;
  if (diff > 10) {
    out.innerHTML = findingHTML({ sev: diff > 25 ? 'crit' : 'warn', icon:'🫧',
      title:`Non-Condensables Likely — standing ${standing.toFixed(0)} psig vs expected ${expected.toFixed(0)} psig (+${diff.toFixed(0)})`,
      detail:'Standing pressure is meaningfully higher than the refrigerant\'s saturation pressure at this temperature. Air or nitrogen is most likely trapped in the system, which raises head pressure and reduces efficiency during operation.',
      causes:[
        'System opened without proper evacuation (air left in)',
        'Incomplete vacuum / micron level not reached before charging',
        'Leak on the low side allowing air ingestion under vacuum conditions',
        'Recommended fix: recover, replace liquid line drier, evacuate to ≤500 microns with a decay test, then weigh in fresh charge',
      ] });
  } else if (diff < -10) {
    out.innerHTML = findingHTML({ sev:'info', icon:'ℹ️',
      title:`Standing pressure low — ${standing.toFixed(0)} psig vs expected ${expected.toFixed(0)} psig (${diff.toFixed(0)})`,
      detail:'Standing pressure is below expected. This usually means the system is undercharged or has not fully equalized to ambient yet. Verify the system is truly off and settled, and check charge by weight.',
      causes:[] });
  } else {
    out.innerHTML = findingHTML({ sev:'ok', icon:'✅',
      title:`No Non-Condensables Indicated — standing ${standing.toFixed(0)} psig ≈ expected ${expected.toFixed(0)} psig`,
      detail:'Standing pressure matches the refrigerant\'s saturation pressure for this ambient temperature (within ±10 psig). Air/nitrogen contamination is unlikely.',
      causes:[] });
  }
});

// ══════════════════════════════════════════════
// LEAK RATE / EPA 608 HELPER
// ══════════════════════════════════════════════
$('btn-leak-check').addEventListener('click', () => {
  const trigger    = parseFloat($('leak-appliance').value);
  const fullCharge = val('leak-fullcharge');
  const added      = val('leak-added');
  const days       = val('leak-days');
  const out = $('leak-result');

  if (fullCharge === null || added === null || days === null || days <= 0 || fullCharge <= 0) {
    out.innerHTML = findingHTML({ sev:'info', icon:'ℹ️',
      title:'Enter full charge, refrigerant added, and days',
      detail:'Days since last charge must be greater than zero. The full charge is the appliance\'s total normal operating charge from the data plate.', causes:[] });
    return;
  }

  // Annualized leak rate (EPA method): (lbs added / full charge) × (365 / days) × 100
  const annualRate = (added / fullCharge) * (365 / days) * 100;
  const exceeded = annualRate > trigger;
  const applianceName = $('leak-appliance').selectedOptions[0].text;
  const note50 = fullCharge < 50
    ? '<br><em>Note: EPA 608 leak-repair requirements apply to appliances with a full charge of 50 lbs or more. This unit is under 50 lbs, but tracking leaks is still good practice.</em>'
    : '';

  out.innerHTML = findingHTML({
    sev: exceeded ? 'crit' : 'ok',
    icon: exceeded ? '🧪' : '✅',
    title: `Annualized Leak Rate: ${annualRate.toFixed(1)}% — Trigger for ${applianceName} is ${trigger}%`,
    detail: (exceeded
      ? `This rate <strong>exceeds</strong> the EPA 608 leak-rate trigger. For applicable appliances (≥50 lbs), a leak inspection and repair are required, with follow-up verification tests. Document the leak, repairs, and verification.`
      : `This rate is below the EPA 608 leak-rate trigger. Continue to log refrigerant additions and monitor over time.`)
      + `<br><br>Calculation: (${added} lbs ÷ ${fullCharge} lbs) × (365 ÷ ${days} days) × 100 = <strong>${annualRate.toFixed(1)}%</strong>` + note50,
    causes: exceeded ? [
      'Locate the leak (electronic detector, bubbles, UV dye, or nitrogen pressure test)',
      'Common leak points: schrader cores, flare/braze joints, coil U-bends, line-set rub-outs',
      'Repair, then perform initial + follow-up verification leak tests',
      'Record leak rate, repair date, and verification results for compliance',
    ] : []
  });
});

// ══════════════════════════════════════════════
// DIAGNOSIS ENGINE
// ══════════════════════════════════════════════
$('btn-diagnose').addEventListener('click', runDiagnosis);

function runDiagnosis() {
  const ref     = $('refrigerant').value;
  const sys     = $('system-type').value;
  const metering= $('metering').value;
  const table   = PT[ref];
  const sp      = val('suction-press');
  const dp      = val('discharge-press');
  const st      = val('suction-temp');
  const lt      = val('liquid-temp');
  const rdb     = val('return-db');
  const rwb     = val('return-wb');
  const sup     = val('supply-temp');
  const od      = val('outdoor-temp');

  // Calculated values
  const evapSat = interpPT(table, sp);
  const condSat = interpPT(table, dp);
  const sh = (st !== null && evapSat !== null) ? st - evapSat : null;
  const sc = (lt !== null && condSat !== null)  ? condSat - lt  : null;
  const dt = (rdb !== null && sup !== null)     ? rdb - sup     : null;
  const cr = (sp !== null && dp !== null && sp > 0) ? (dp + 14.7) / (sp + 14.7) : null;
  const tsh = (metering === 'fixed') ? getTargetSH(od, rwb) : null;

  // Target superheat tolerance ±5°F; target subcooling 10–20°F
  const findings = [];

  // ── 1. SUPERHEAT ────────────────────────────
  if (sh !== null) {
    if (metering === 'txv') {
      if (sh > 12) {
        findings.push({
          area: 'Superheat', sev: sh > 20 ? 'crit' : 'warn',
          icon: '🌡️',
          title: `High Superheat — ${fmt(sh)}°F (target: 8–12°F for TXV)`,
          detail: 'The suction line temperature is significantly higher than evaporator saturation. The refrigerant is superheating too much before reaching the compressor.',
          causes: mode === 'cooling' ? [
            'Low refrigerant charge (most common)',
            'TXV/EEV stuck closed or underfeeding',
            'Refrigerant restriction (filter drier, kinked line, liquid line valve)',
            'Low airflow over evaporator coil (dirty filter, dirty coil, blower issue)',
            'Excessively high heat load / low indoor humidity',
          ] : [
            'Low refrigerant charge',
            'Restriction in refrigerant circuit',
            'Defrost issue — ice on outdoor coil restricting airflow',
          ]
        });
      } else if (sh < 5) {
        findings.push({
          area: 'Superheat', sev: sh < 2 ? 'crit' : 'warn',
          icon: '🌡️',
          title: `Low Superheat — ${fmt(sh)}°F (target: 8–12°F for TXV)`,
          detail: 'Very low superheat means liquid refrigerant may be flooding back to the compressor — a serious condition that causes compressor damage.',
          causes: mode === 'cooling' ? [
            'Overcharge of refrigerant',
            'TXV/EEV stuck open or overfeeding',
            'Low heat load (undersized or oversized coil)',
            'TXV bulb lost charge or is poorly clamped',
          ] : [
            'Overcharge of refrigerant',
            'TXV stuck open in heating mode',
          ]
        });
      } else {
        findings.push({
          area: 'Superheat', sev: 'ok',
          icon: '✅',
          title: `Superheat Normal — ${fmt(sh)}°F`,
          detail: 'Superheat is within the normal range for a TXV/EEV system (8–12°F).',
          causes: []
        });
      }
    } else {
      // Fixed orifice
      if (tsh !== null) {
        const diff = sh - tsh;
        if (diff > 5) {
          findings.push({
            area: 'Superheat', sev: diff > 12 ? 'crit' : 'warn',
            icon: '🌡️',
            title: `High Superheat — ${fmt(sh)}°F (target: ${tsh}°F ±5)`,
            detail: `Actual superheat is ${fmt(diff)}°F above target. System is running low on refrigerant or has an airflow/restriction issue.`,
            causes: [
              'Low refrigerant charge (undercharge)',
              'Refrigerant restriction (filter drier, metering orifice clogged)',
              'Low airflow over evaporator — check filter, coil, blower',
              'Refrigerant leak',
            ]
          });
        } else if (diff < -5) {
          findings.push({
            area: 'Superheat', sev: diff < -12 ? 'crit' : 'warn',
            icon: '🌡️',
            title: `Low Superheat — ${fmt(sh)}°F (target: ${tsh}°F ±5)`,
            detail: `Actual superheat is ${fmt(Math.abs(diff))}°F below target. Risk of liquid flood-back to compressor.`,
            causes: [
              'Overcharge of refrigerant',
              'Metering orifice too large or damaged',
              'Low outdoor ambient (system oversized for load)',
              'High indoor airflow causing reduced load on coil',
            ]
          });
        } else {
          findings.push({
            area: 'Superheat', sev: 'ok',
            icon: '✅',
            title: `Superheat Normal — ${fmt(sh)}°F (target: ${tsh}°F)`,
            detail: 'Superheat is within ±5°F of target — charge appears correct.',
            causes: []
          });
        }
      } else {
        findings.push({
          area: 'Superheat', sev: 'info',
          icon: 'ℹ️',
          title: `Superheat: ${fmt(sh)}°F — Enter outdoor temp & wet bulb for target`,
          detail: 'For fixed orifice systems, enter the outdoor ambient temp and return air wet bulb to calculate the target superheat.',
          causes: []
        });
      }
    }
  }

  // ── 2. SUBCOOLING ────────────────────────────
  if (sc !== null) {
    if (sc > 20) {
      findings.push({
        area: 'Subcooling', sev: sc > 25 ? 'crit' : 'warn',
        icon: '🧊',
        title: `High Subcooling — ${fmt(sc)}°F (target: 10–20°F)`,
        detail: 'Liquid refrigerant is being cooled well below condensing temperature. Excess liquid is backing up in the condenser.',
        causes: mode === 'cooling' ? [
          'Overcharge of refrigerant (most common)',
          'Liquid line restriction — filter drier clogged, kinked line, partially closed valve',
          'Condenser coil partially blocked (liquid backing up)',
        ] : [
          'Overcharge of refrigerant',
          'Restriction in liquid line circuit',
        ]
      });
    } else if (sc < 5) {
      findings.push({
        area: 'Subcooling', sev: sc < 2 ? 'crit' : 'warn',
        icon: '🧊',
        title: `Low Subcooling — ${fmt(sc)}°F (target: 10–20°F)`,
        detail: 'Little or no subcooling means refrigerant may be flashing in the liquid line before it reaches the metering device — causing loss of capacity.',
        causes: mode === 'cooling' ? [
          'Low refrigerant charge (undercharge)',
          'Liquid line flash — check for flash points (filter drier, angle stops, line elevation)',
          'Overheated liquid line (check for insulation)',
        ] : [
          'Low refrigerant charge',
          'Insufficient heat rejection at indoor coil in heating mode',
        ]
      });
    } else {
      findings.push({
        area: 'Subcooling', sev: 'ok',
        icon: '✅',
        title: `Subcooling Normal — ${fmt(sc)}°F`,
        detail: 'Subcooling is within the normal range (10–20°F). Liquid line is properly subcooled.',
        causes: []
      });
    }
  }

  // ── 3. SUCTION PRESSURE ──────────────────────
  if (evapSat !== null) {
    const normalLow = mode === 'cooling' ? 35 : 25;
    const normalHigh = mode === 'cooling' ? 50 : 45;
    if (evapSat < normalLow) {
      findings.push({
        area: 'Suction Pressure', sev: evapSat < 20 ? 'crit' : 'warn',
        icon: '📉',
        title: `Low Suction Pressure — Evap Sat ${fmt(evapSat)}°F`,
        detail: `Evaporator saturation temperature is ${fmt(evapSat)}°F — lower than the normal ${normalLow}–${normalHigh}°F range. Low suction reduces capacity and risks compressor overheating.`,
        causes: mode === 'cooling' ? [
          'Low refrigerant charge',
          'Refrigerant restriction (filter drier, TXV, metering device)',
          'Low airflow over evaporator coil — dirty filter, dirty coil, blocked ducts, blower issue',
          'Low indoor heat load (very cold return air or low occupancy)',
          'Evaporator coil iced over',
        ] : [
          'Low refrigerant charge',
          'Outdoor coil iced over — check defrost system',
          'Low outdoor ambient (below rated range)',
          'Airflow restriction over outdoor coil',
        ]
      });
    } else if (evapSat > normalHigh) {
      findings.push({
        area: 'Suction Pressure', sev: 'warn',
        icon: '📈',
        title: `High Suction Pressure — Evap Sat ${fmt(evapSat)}°F`,
        detail: `Evaporator saturation temperature is ${fmt(evapSat)}°F — higher than the normal range. High suction pressure increases discharge pressure and compressor load.`,
        causes: mode === 'cooling' ? [
          'Overcharge of refrigerant',
          'Excessive indoor heat load (very hot/humid space)',
          'TXV/EEV stuck open or overfeeding',
          'Compressor valve failure (check discharge pressure)',
          'High airflow over evaporator carrying more heat',
        ] : [
          'Overcharge of refrigerant',
          'High outdoor ambient temperature',
          'Defrost cycle active',
        ]
      });
    } else {
      findings.push({
        area: 'Suction Pressure', sev: 'ok',
        icon: '✅',
        title: `Suction Pressure Normal — Evap Sat ${fmt(evapSat)}°F`,
        detail: `Evaporator saturation temperature is in the normal range (${normalLow}–${normalHigh}°F).`,
        causes: []
      });
    }
  }

  // ── 4. DISCHARGE PRESSURE ────────────────────
  if (condSat !== null) {
    const odTemp = od !== null ? od : 95;
    // Normal condensing temp = outdoor ambient + 20–30°F (rule of thumb for air-cooled)
    const normalCondLow  = mode === 'cooling' ? odTemp + 15 : 80;
    const normalCondHigh = mode === 'cooling' ? odTemp + 35 : 110;

    if (condSat < normalCondLow) {
      findings.push({
        area: 'Discharge Pressure', sev: 'warn',
        icon: '📉',
        title: `Low Discharge Pressure — Cond Sat ${fmt(condSat)}°F`,
        detail: `Condensing temperature is only ${fmt(condSat - odTemp)}°F above outdoor ambient — lower than normal. Can indicate low refrigerant or compressor issue.`,
        causes: mode === 'cooling' ? [
          'Low refrigerant charge',
          'Low outdoor ambient temperature (check if within operating range)',
          'Compressor valve failure — check compression ratio',
          'Condenser fan moving too much air',
        ] : [
          'Low indoor heat load',
          'Low indoor airflow',
          'Refrigerant undercharge',
        ]
      });
    } else if (condSat > normalCondHigh) {
      findings.push({
        area: 'Discharge Pressure', sev: condSat > odTemp + 45 ? 'crit' : 'warn',
        icon: '📈',
        title: `High Discharge Pressure — Cond Sat ${fmt(condSat)}°F`,
        detail: `Condensing temperature is ${fmt(condSat - odTemp)}°F above outdoor ambient — higher than normal. High discharge pressure overloads the compressor.`,
        causes: mode === 'cooling' ? [
          'Dirty or blocked condenser coil — most common',
          'Condenser airflow restricted (panels off, debris, overgrown vegetation)',
          'Condenser fan motor slow or failed — check airflow',
          'Overcharge of refrigerant',
          'Non-condensables (air/nitrogen) in refrigerant circuit',
          'Recirculating hot discharge air (unit in enclosure)',
        ] : [
          'Overcharge of refrigerant',
          'Low indoor airflow — dirty air filter, dirty evaporator coil',
          'Indoor blower issue',
        ]
      });
    } else {
      findings.push({
        area: 'Discharge Pressure', sev: 'ok',
        icon: '✅',
        title: `Discharge Pressure Normal — Cond Sat ${fmt(condSat)}°F`,
        detail: `Condensing temperature is ${fmt(condSat - odTemp)}°F above outdoor ambient — within the normal 20–30°F range.`,
        causes: []
      });
    }
  }

  // ── 5. DELTA T (Air) ─────────────────────────
  if (dt !== null) {
    if (dt < 14) {
      findings.push({
        area: 'Airflow / ΔT', sev: dt < 10 ? 'crit' : 'warn',
        icon: '💨',
        title: `Low ΔT — ${fmt(dt)}°F (target: 16–22°F in cooling)`,
        detail: `The temperature difference across the coil is only ${fmt(dt)}°F. This indicates the air is not being cooled enough per pass — either too much airflow or too little cooling capacity.`,
        causes: mode === 'cooling' ? [
          'Low refrigerant charge reducing capacity',
          'Excessive airflow — check blower speed setting',
          'Refrigerant flooding evaporator (low superheat scenario)',
          'Space not yet at setpoint — system still pulling down',
          'Evaporator coil iced over (check suction pressure)',
        ] : [
          'Low refrigerant charge',
          'Low heat output from heat pump (check defrost)',
          'Auxiliary/emergency heat not energizing when needed',
        ]
      });
    } else if (dt > 22) {
      findings.push({
        area: 'Airflow / ΔT', sev: dt > 28 ? 'crit' : 'warn',
        icon: '💨',
        title: `High ΔT — ${fmt(dt)}°F (target: 16–22°F)`,
        detail: `The temperature difference across the coil is ${fmt(dt)}°F — higher than normal. Air is being over-cooled per pass, which usually means insufficient airflow.`,
        causes: mode === 'cooling' ? [
          'Dirty air filter — most common cause of high ΔT',
          'Dirty evaporator coil blocking airflow',
          'Blower running on wrong speed tap (too slow)',
          'Duct restriction — collapsed duct, closed damper, blocked register',
          'Undersized ductwork for equipment',
          'Return air grilles blocked or undersized',
        ] : [
          'Dirty filter or dirty indoor coil',
          'Blower too slow',
          'Restricted ductwork',
        ]
      });
    } else {
      findings.push({
        area: 'Airflow / ΔT', sev: 'ok',
        icon: '✅',
        title: `ΔT Normal — ${fmt(dt)}°F`,
        detail: 'Temperature split across the evaporator coil is within the normal range — airflow appears adequate.',
        causes: []
      });
    }
  }

  // ── 6. COMPRESSION RATIO ─────────────────────
  if (cr !== null) {
    if (cr < 2) {
      findings.push({
        area: 'Compression Ratio', sev: 'warn',
        icon: '⚙️',
        title: `Low Compression Ratio — ${fmt(cr,2)} : 1`,
        detail: 'Very low compression ratio may indicate compressor valve failure, very low outdoor ambient, or low refrigerant charge. A healthy ratio is typically 2.5–4.5:1 for air-cooled systems.',
        causes: [
          'Compressor valve failure (leaking discharge valves)',
          'Low refrigerant charge',
          'Very low outdoor ambient temperature',
        ]
      });
    } else if (cr > 5) {
      findings.push({
        area: 'Compression Ratio', sev: cr > 7 ? 'crit' : 'warn',
        icon: '⚙️',
        title: `High Compression Ratio — ${fmt(cr,2)} : 1`,
        detail: `A compression ratio of ${fmt(cr,2)}:1 is high. Compressor must work much harder, causing high discharge temps, increased wear, and possible compressor failure.`,
        causes: [
          'Dirty/blocked condenser coil pushing discharge pressure up',
          'Low suction pressure (restriction, low charge, iced coil)',
          'Non-condensables in the system',
          'Overcharge compounding a restriction',
        ]
      });
    } else {
      findings.push({
        area: 'Compression Ratio', sev: 'ok',
        icon: '✅',
        title: `Compression Ratio Normal — ${fmt(cr,2)} : 1`,
        detail: 'Compression ratio is within the healthy range (2.5–5:1) for this type of system.',
        causes: []
      });
    }
  }

  // ── 7. DUCT STATIC PRESSURE ──────────────────
  const ss = val('supply-static');
  const rs = val('return-static');
  const ratedEsp = val('rated-esp');
  if (ss !== null || rs !== null) {
    const tesp = Math.abs(ss || 0) + Math.abs(rs || 0);
    const limit = ratedEsp !== null ? ratedEsp : 0.5;
    if (tesp > limit) {
      const over = ((tesp - limit) / limit) * 100;
      findings.push({
        area: 'Static Pressure', sev: tesp > limit * 1.4 ? 'crit' : 'warn',
        icon: '🌬️',
        title: `High Total External Static — ${tesp.toFixed(2)}" WC (rated ${limit.toFixed(2)}")`,
        detail: `TESP is ${over.toFixed(0)}% over the equipment's rated external static. High static chokes airflow (CFM), which directly causes airflow-side refrigerant symptoms (low ΔT split, low suction, coil freezing in cooling).`,
        causes: [
          'Undersized ductwork for the equipment CFM',
          'Dirty air filter or overly restrictive high-MERV filter',
          'Dirty evaporator/indoor coil',
          'Closed or restricted dampers, registers, or grilles',
          'Crushed, kinked, or collapsed flex duct',
          'Undersized or dirty return air path',
        ]
      });
      // Pinpoint which side is worse
      if (ss !== null && rs !== null) {
        if (Math.abs(rs) > Math.abs(ss)) {
          findings.push({
            area: 'Static Pressure', sev: 'info', icon: 'ℹ️',
            title: `Return side is the bottleneck (${Math.abs(rs).toFixed(2)}" vs supply ${Math.abs(ss).toFixed(2)}")`,
            detail: 'The return static is higher than supply. Focus on the return path — filter, return grille size, and return duct sizing.',
            causes: []
          });
        } else {
          findings.push({
            area: 'Static Pressure', sev: 'info', icon: 'ℹ️',
            title: `Supply side is the bottleneck (${Math.abs(ss).toFixed(2)}" vs return ${Math.abs(rs).toFixed(2)}")`,
            detail: 'The supply static is higher than return. Focus on the supply path — coil cleanliness, supply duct sizing, dampers, and registers.',
            causes: []
          });
        }
      }
    } else {
      findings.push({
        area: 'Static Pressure', sev: 'ok', icon: '✅',
        title: `Static Pressure OK — ${tesp.toFixed(2)}" WC (rated ${limit.toFixed(2)}")`,
        detail: 'Total external static pressure is at or below the equipment rating. Airflow restriction is unlikely to be a problem.',
        causes: []
      });
    }
  }

  // ── 8. CHARGE CALCULATOR / GUIDANCE ──────────
  // Uses subcooling for TXV/EEV, superheat for fixed orifice (cooling only)
  if (mode === 'cooling') {
    if (metering === 'txv' && sc !== null) {
      const targetSC = 12; // mid of 10-20 typical OEM ~10-12
      const diff = sc - targetSC;
      if (Math.abs(diff) >= 3) {
        const action = diff > 0 ? 'RECOVER' : 'ADD';
        // ~ rule of thumb: ~2-3°F subcooling change per oz on typical residential
        findings.push({
          area: 'Charge', sev: 'info', icon: '⚖️',
          title: `Charge Guidance — ${action} refrigerant (subcooling ${fmt(sc)}°F vs ~${targetSC}°F)`,
          detail: diff > 0
            ? `Subcooling is ${fmt(diff)}°F high → system is likely OVERCHARGED. Recover refrigerant in small increments, allowing 10–15 min to stabilize between adjustments. Confirm against the OEM data plate / charging chart.`
            : `Subcooling is ${fmt(Math.abs(diff))}°F low → system is likely UNDERCHARGED. Add refrigerant in small increments (charge as liquid for blends like R-410A/R-454B), allowing 10–15 min to stabilize. ALWAYS check for and repair leaks before adding refrigerant.`,
          causes: []
        });
      }
    } else if (metering === 'fixed' && sh !== null && tsh !== null) {
      const diff = sh - tsh;
      if (Math.abs(diff) >= 5) {
        const action = diff > 0 ? 'ADD' : 'RECOVER';
        findings.push({
          area: 'Charge', sev: 'info', icon: '⚖️',
          title: `Charge Guidance — ${action} refrigerant (superheat ${fmt(sh)}°F vs target ${tsh}°F)`,
          detail: diff > 0
            ? `Superheat is ${fmt(diff)}°F above target → system is likely UNDERCHARGED. Add refrigerant slowly and re-measure target superheat (it shifts with indoor WB & outdoor DB). Verify airflow is correct FIRST — low airflow mimics undercharge. Check for leaks before charging.`
            : `Superheat is ${fmt(Math.abs(diff))}°F below target → system is likely OVERCHARGED. Recover refrigerant slowly and re-measure. Verify airflow is not excessive.`,
          causes: []
        });
      }
    }
  } else {
    findings.push({
      area: 'Charge', sev: 'info', icon: 'ℹ️',
      title: 'Charge in heating mode — verify by weight',
      detail: 'In heating mode, superheat/subcooling charging methods are unreliable. Verify charge by weight (recover, evacuate, weigh in per data plate) or use the manufacturer\'s heating-mode charging chart.',
      causes: []
    });
  }

  // ── 9. Minimum data check ────────────────────
  if ([sp, dp, st, lt].filter(v => v !== null).length < 2) {
    findings.unshift({
      area: 'Data', sev: 'info',
      icon: 'ℹ️',
      title: 'Enter more readings for a full diagnosis',
      detail: 'Connect your manifold gauges and temperature probes. At minimum, enter suction pressure, discharge pressure, suction line temp, and liquid line temp for a complete refrigerant diagnosis.',
      causes: []
    });
  }

  renderResults(findings, { sh, sc, dt, cr, evapSat, condSat });
}

// ══════════════════════════════════════════════
// RENDER RESULTS
// ══════════════════════════════════════════════
function renderResults(findings, calcs) {
  // Summary chips
  const chips = [
    { label: 'Superheat',  value: calcs.sh   !== null ? fmt(calcs.sh)+'°F'   : '—', sev: findSev(findings,'Superheat') },
    { label: 'Subcooling', value: calcs.sc   !== null ? fmt(calcs.sc)+'°F'   : '—', sev: findSev(findings,'Subcooling') },
    { label: 'ΔT Air',     value: calcs.dt   !== null ? fmt(calcs.dt)+'°F'   : '—', sev: findSev(findings,'Airflow') },
    { label: 'Comp Ratio', value: calcs.cr   !== null ? fmt(calcs.cr,2)+':1' : '—', sev: findSev(findings,'Compression') },
    { label: 'Evap Sat',   value: calcs.evapSat !== null ? fmt(calcs.evapSat)+'°F' : '—', sev: findSev(findings,'Suction') },
    { label: 'Cond Sat',   value: calcs.condSat !== null ? fmt(calcs.condSat)+'°F' : '—', sev: findSev(findings,'Discharge') },
  ];

  $('summary-row').innerHTML = chips.map(c => `
    <div class="summary-chip ${c.sev}">
      <span class="chip-label">${c.label}</span>
      <span class="chip-value">${c.value}</span>
    </div>
  `).join('');

  // Separate by severity for display order: crit → warn → ok → info
  const order = ['crit','warn','ok','info'];
  findings.sort((a,b) => order.indexOf(a.sev) - order.indexOf(b.sev));

  $('findings-list').innerHTML = findings.map(f => `
    <div class="finding ${f.sev}">
      <div class="finding-icon">${f.icon}</div>
      <div class="finding-body">
        <div class="finding-title">${f.title}</div>
        <div class="finding-detail">${f.detail}</div>
        ${f.causes.length ? `
          <div class="finding-causes">
            <ul>${f.causes.map(c => `<li>${c}</li>`).join('')}</ul>
          </div>` : ''}
      </div>
    </div>
  `).join('');

  $('card-results').classList.remove('hidden');
  $('card-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function findSev(findings, area) {
  const f = findings.find(x => x.area.includes(area));
  return f ? f.sev : '';
}

// ── Reset ─────────────────────────────────────
const INPUT_IDS = ['suction-press','discharge-press','suction-temp','liquid-temp',
  'return-db','return-wb','supply-temp','outdoor-temp',
  'supply-static','return-static'];

$('btn-reset').addEventListener('click', () => {
  $('card-results').classList.add('hidden');
  INPUT_IDS.forEach(id => { $(id).value = ''; });
  ['out-evap-sat','out-cond-sat','out-superheat','out-subcooling',
   'out-delta-t'].forEach(id => {
    $(id).textContent = id.replace('out-','— ').replace(/-/g,' ') + ': —';
  });
  $('out-comp-ratio').textContent = '—';
  $('out-tesp').textContent = '— TESP: —';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Print ─────────────────────────────────────
$('btn-print').addEventListener('click', () => window.print());

// ══════════════════════════════════════════════
// SAVE / LOAD JOBS  (localStorage)
// ══════════════════════════════════════════════
const JOBS_KEY = 'hvac_jobs';
const SELECT_IDS = ['system-type','refrigerant','metering','rated-esp'];

function getJobs() {
  try { return JSON.parse(localStorage.getItem(JOBS_KEY)) || {}; }
  catch { return {}; }
}
function saveJobs(jobs) { localStorage.setItem(JOBS_KEY, JSON.stringify(jobs)); }

function snapshot() {
  const data = { mode, _saved: new Date().toLocaleString() };
  INPUT_IDS.forEach(id => data[id] = $(id).value);
  SELECT_IDS.forEach(id => data[id] = $(id).value);
  return data;
}

function applySnapshot(data) {
  SELECT_IDS.forEach(id => { if (data[id] !== undefined) $(id).value = data[id]; });
  INPUT_IDS.forEach(id => { if (data[id] !== undefined) $(id).value = data[id]; });
  // restore mode
  if (data.mode) {
    mode = data.mode;
    document.querySelectorAll('.mode-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.mode === mode));
  }
  updateLabels();
  recalcLive();
  recalcStatic();
}

function refreshJobList() {
  const jobs = getJobs();
  const sel = $('load-job-select');
  const names = Object.keys(jobs).sort();
  sel.innerHTML = '<option value="">Load saved job…</option>' +
    names.map(n => `<option value="${n.replace(/"/g,'&quot;')}">${n}</option>`).join('');
}

$('btn-save-job').addEventListener('click', () => {
  const name = $('job-name').value.trim();
  if (!name) { alert('Enter a job / customer name before saving.'); return; }
  const jobs = getJobs();
  jobs[name] = snapshot();
  saveJobs(jobs);
  refreshJobList();
  $('load-job-select').value = name;
  alert(`Saved "${name}".`);
});

$('load-job-select').addEventListener('change', e => {
  const name = e.target.value;
  if (!name) return;
  const jobs = getJobs();
  if (jobs[name]) {
    $('job-name').value = name;
    applySnapshot(jobs[name]);
  }
});

$('btn-delete-job').addEventListener('click', () => {
  const name = $('load-job-select').value;
  if (!name) { alert('Select a saved job to delete.'); return; }
  if (!confirm(`Delete saved job "${name}"?`)) return;
  const jobs = getJobs();
  delete jobs[name];
  saveJobs(jobs);
  refreshJobList();
});

// ── Init ──────────────────────────────────────
updateLabels();
updateTargetDisplay();
refreshJobList();
