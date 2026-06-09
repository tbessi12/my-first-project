const QUESTIONS = [
  // ── TEST 1 ──────────────────────────────────────────────────────────────
  {
    id: 1, test: 1,
    topic: "Power Transmission",
    question: "What is the raised part of a shaft called?",
    options: ["Bearing", "Crown", "Shoulder", "Shelf"],
    answer: 2,
    explanation: "The raised portion of a shaft is called a Shoulder. It is used to position and retain components mounted on the shaft."
  },
  {
    id: 2, test: 1,
    topic: "Lubrication",
    question: "What type of bearing should NOT be greased?",
    options: ["A roller bearing", "A permanent seal bearing", "A ball bearing", "A bad bearing"],
    answer: 1,
    explanation: "Permanent seal bearings are pre-lubricated and sealed at the factory. Adding grease can damage the seals and contaminate the bearing."
  },
  {
    id: 3, test: 1,
    topic: "Power Transmission",
    question: "How would you seat a bearing — using the outer surface or inner surface?",
    options: ["Inner, with a brass hammer", "Inner, with an arbor press", "Outer", "None of the above"],
    answer: 2,
    explanation: "A bearing should be seated by applying pressure to the outer surface (outer race) to avoid damaging the rolling elements."
  },
  {
    id: 4, test: 1,
    topic: "Power Transmission",
    question: "Why are keyways placed on a shaft?",
    options: ["To keep the pulley or gear from turning on the shaft", "So you can lock and unlock them", "So another shaft can interlock with the first shaft", "So the key stock has a place to go"],
    answer: 0,
    explanation: "Keyways (and keys) prevent a pulley or gear from rotating independently on the shaft — they lock the two together so torque is transmitted."
  },
  {
    id: 5, test: 1,
    topic: "Power Transmission",
    question: "What is the name of a key placed in the keyway that has one side flat and the other rounded?",
    options: ["Key stock", "Turn key", "Woodruff key", "Salvatore key"],
    answer: 2,
    explanation: "A Woodruff key has a flat top and a semi-circular (rounded) bottom, designed to fit into a curved keyway cut into a shaft."
  },
  {
    id: 6, test: 1,
    topic: "Lubrication",
    question: "What is essential about oil?",
    options: ["Viscosity", "Cleanliness", "Grade", "All of the above"],
    answer: 3,
    explanation: "Proper oil requires the correct viscosity (thickness/flow), cleanliness (no contaminants), and grade (proper formulation for the application)."
  },
  {
    id: 7, test: 1,
    topic: "Lubrication",
    question: "What is the difference between oil and grease?",
    options: ["Oil requires a reservoir", "Oil has lower viscosity", "Oil flows", "All of the above"],
    answer: 3,
    explanation: "Oil flows (lower viscosity), requires a reservoir to contain it, and has lower viscosity than grease — all three are correct differences."
  },
  {
    id: 8, test: 1,
    topic: "Lubrication",
    question: "What is 90W oil typically used for?",
    options: ["Chains", "Gearboxes", "Bearings", "All of the above"],
    answer: 1,
    explanation: "90W (high viscosity/weight) oil is typically used in gearboxes where heavy-duty lubrication is required under load."
  },
  {
    id: 9, test: 1,
    topic: "Shop Machines & Tools",
    question: "The number 6-32 means what to a screw or bolt?",
    options: ["6mm, 32 threads per inch", "6 threads per inch and 32mm long", "Number 6 with 32 threads per inch", "None of the above"],
    answer: 2,
    explanation: "In US screw sizing, the first number (6) is the shaft diameter (gauge number), and the second (32) is threads per inch."
  },
  {
    id: 10, test: 1,
    topic: "Shop Machines & Tools",
    question: "What does ¼-20 mean on a screw or bolt?",
    options: ["¼\" shaft, 20 threads per inch", "¼ pitch, 20mm long", "Number 1, 4mm shaft, 20mm long", "None of the above"],
    answer: 0,
    explanation: "¼-20 means the shaft diameter is ¼ inch and there are 20 threads per inch."
  },
  {
    id: 11, test: 1,
    topic: "Lubrication",
    question: "Is high or low viscosity oil used on chains?",
    options: ["Low viscosity grease", "High viscosity grease", "Low viscosity oil", "High viscosity oil"],
    answer: 2,
    explanation: "Chains require low viscosity oil (e.g., 10W) so it can penetrate into the chain links and rollers without being flung off."
  },
  {
    id: 12, test: 1,
    topic: "Basic AC/DC Theory",
    question: "P is equal to what in Ohm's Law?",
    options: ["Potential", "Power", "Parallel", "Peak"],
    answer: 1,
    explanation: "In electrical formulas, P stands for Power, measured in Watts."
  },
  {
    id: 13, test: 1,
    topic: "Basic AC/DC Theory",
    question: "What is the formula for power?",
    options: ["P = I²R, P = VI, P = V²/I", "P = I²R, P = IR, P = V²/R", "P = I²R, P = VI, P = V²/R", "P = I²V, P = VI, P = V²/R"],
    answer: 2,
    explanation: "The three power formulas are: P = I²R, P = VI (or EI), and P = V²/R (or E²/R). All three are derived from Ohm's Law."
  },
  {
    id: 14, test: 1,
    topic: "Basic AC/DC Theory",
    question: "Batteries are normally what type of current?",
    options: ["DC", "AC", "Eddy", "Electron flow"],
    answer: 0,
    explanation: "Batteries produce Direct Current (DC) — current flows in only one direction from the negative terminal to the positive terminal."
  },
  {
    id: 15, test: 1,
    topic: "Basic AC/DC Theory",
    question: "In the left-hand rule of magnetism, what direction does the thumb point?",
    options: ["In the direction of current flow", "In the opposite direction of electron flow", "In the direction of voltage flow", "In the direction of the pull of gravity"],
    answer: 0,
    explanation: "In the left-hand rule: the thumb points in the direction of conventional current flow (negative to positive), and the fingers wrap around the wire in the direction of the magnetic field."
  },
  {
    id: 16, test: 1,
    topic: "Basic AC/DC Theory",
    question: "If amperage increases and voltage remains the same, what has happened to the resistance?",
    options: ["It has stayed the same", "It has decreased", "It has increased", "All of the above"],
    answer: 1,
    explanation: "By Ohm's Law (V = IR): if V is constant and I increases, then R must decrease. Current and resistance are inversely proportional when voltage is fixed."
  },
  {
    id: 17, test: 1,
    topic: "Basic AC/DC Theory",
    question: "Grommets are used on a wire way for what purpose?",
    options: ["To block out evil government rays", "To ward off gremlins", "As a wiring harness", "Protection of wiring insulation"],
    answer: 3,
    explanation: "Grommets protect wire insulation from being cut or abraded by sharp metal edges where wires pass through holes in panels or conduit."
  },
  {
    id: 18, test: 1,
    topic: "Motors & Control Circuits",
    question: "How do you reverse the turn direction of a three-phase motor?",
    options: ["Switch any 2 wires", "Turn on the reverse switch", "Apply 480 instead of 208", "Switch 2 of the hot legs"],
    answer: 3,
    explanation: "Any 3-phase AC motor will reverse direction if any 2 of the supply phases (hot legs) are swapped. This reverses the rotating magnetic field."
  },
  {
    id: 19, test: 1,
    topic: "Basic AC/DC Theory",
    question: "One horsepower equals how many watts?",
    options: ["120W", "250W", "746W", "550W"],
    answer: 2,
    explanation: "1 horsepower = 746 watts. Also: 1 HP = 550 ft·lbs/second. Both are commonly tested conversions."
  },
  {
    id: 20, test: 1,
    topic: "Basic AC/DC Theory",
    question: "What is the peak-to-peak voltage if the VRMS is 70.7V?",
    options: ["141.4 VP-P", "198 VP-P", "70.7 VP-P", "120 VP-P"],
    answer: 1,
    explanation: "Peak = RMS × 1.414 = 70.7 × 1.414 = 99V. Peak-to-peak = 2 × Peak = 2 × 99 = 198 VP-P."
  },
  {
    id: 21, test: 1,
    topic: "Shop Machines & Tools",
    question: "When replacing a fuse, what must be considered?",
    options: ["Voltage", "Amperage", "Type", "All of the above"],
    answer: 3,
    explanation: "All three factors matter: voltage rating, amperage rating, and fuse type (fast-blow, slow-blow, etc.). Amperage is the most critical."
  },
  {
    id: 22, test: 1,
    topic: "Digital Electronics",
    question: "An NPN transistor uses what kind of polarity voltage at its base to turn it on?",
    options: ["Positive", "Capacitive", "Negative", "Inductive"],
    answer: 0,
    explanation: "An NPN transistor requires a positive voltage at the base (relative to the emitter) to forward-bias the base-emitter junction and turn it on."
  },
  {
    id: 23, test: 1,
    topic: "Digital Electronics",
    question: "What is the housing of an electronic circuit called?",
    options: ["Housing", "Container", "Circuit board", "Chassis"],
    answer: 3,
    explanation: "The metal enclosure/housing of an electronic device is called the Chassis. It often serves as the ground reference point."
  },
  {
    id: 24, test: 1,
    topic: "Digital Electronics",
    question: "What common device can be used to convert analog to digital?",
    options: ["Diode", "Transistor", "Transformer", "D to A converter"],
    answer: 0,
    explanation: "A diode can convert analog signals to digital — it conducts in one direction, effectively clipping the signal into a digital-like state."
  },
  {
    id: 25, test: 1,
    topic: "Digital Electronics",
    question: "What does the color band on a diode indicate?",
    options: ["Its resistance", "That it's a Zener diode", "A resistor must be connected to the input", "The cathode"],
    answer: 3,
    explanation: "The colored band (stripe) on a diode marks the cathode (negative terminal). Current flows from anode to cathode in conventional current direction."
  },
  {
    id: 26, test: 1,
    topic: "Digital Electronics",
    question: "What is ESD?",
    options: ["Electrostatic Discharge", "Electromotive Static Discharge", "Electric Source Distribution", "Employee Square Dance"],
    answer: 0,
    explanation: "ESD stands for Electrostatic Discharge — the sudden flow of electricity between two charged objects. It can permanently damage sensitive electronic components."
  },
  {
    id: 27, test: 1,
    topic: "Digital Electronics",
    question: "Name 2 bipolar transistors.",
    options: ["NPN and PNP", "JFET and MOSFET", "HSN and TNT", "UPN and TBS"],
    answer: 0,
    explanation: "BJT (Bipolar Junction Transistors) come in two types: NPN (Negative-Positive-Negative) and PNP (Positive-Negative-Positive)."
  },
  {
    id: 28, test: 1,
    topic: "Safety",
    question: "What action should be taken when a drill motor cord is damaged?",
    options: ["Splice the cord and use heat shrink tubing", "Solder the connection and use heat shrink tubing", "Replace the cord", "Buy a new drill"],
    answer: 2,
    explanation: "The correct safety procedure is to replace the cord entirely. Splicing or soldering a power tool cord is not an approved repair."
  },
  {
    id: 29, test: 1,
    topic: "Safety",
    question: "What equipment should be worn when grinding?",
    options: ["Body armor", "Goggles", "Kevlar", "Mouthpiece"],
    answer: 1,
    explanation: "Goggles (or a face shield) must be worn when grinding to protect eyes from sparks and flying debris. Gloves and a dust mask are also recommended."
  },
  {
    id: 30, test: 1,
    topic: "Safety",
    question: "What can be the effect of sparks in a battery room?",
    options: ["None", "Explosion", "Mar the floor", "Indicate an open"],
    answer: 1,
    explanation: "Charging batteries produce hydrogen gas. A spark in a battery room can ignite this gas and cause an explosion."
  },
  {
    id: 31, test: 1,
    topic: "Safety",
    question: "A fuse is considered a safety device — true or false?",
    options: ["True", "False"],
    answer: 0,
    explanation: "True. A fuse is a safety device designed to protect both equipment and personnel by opening (melting) when current exceeds a safe level."
  },
  {
    id: 32, test: 1,
    topic: "Safety",
    question: "What are the three factors necessary for fatal electric shock?",
    options: ["Path for current flow", "Enough current (100mA can be fatal)", "Duration of time", "All of the above"],
    answer: 3,
    explanation: "All three are required: a path for current flow through the body, sufficient current (as little as 100mA can be fatal), and enough duration of contact."
  },
  {
    id: 33, test: 1,
    topic: "Digital Electronics",
    question: "RS232 format is considered:",
    options: ["Parallel communications", "Serial interface", "Rally Sport 232 turbo", "A firmware loader"],
    answer: 1,
    explanation: "RS232 is a serial communications interface standard commonly used for PLCs, computers, and test equipment communication."
  },
  {
    id: 34, test: 1,
    topic: "Power Transmission",
    question: "If a gear having 100 teeth turns a gear having 25 teeth, and the 100-tooth gear turns at 25 RPM, what is the RPM of the 25-tooth gear?",
    options: ["100 RPM", "25 RPM", "2500 RPM", "4 RPM"],
    answer: 0,
    explanation: "Gear ratio = 100:25 = 4:1. The smaller gear turns 4× faster. 25 RPM × 4 = 100 RPM."
  },
  {
    id: 35, test: 1,
    topic: "Basic AC/DC Theory",
    question: "A 20-turn primary winding has an input voltage of 15V; the secondary winding is 100 turns. What is the secondary voltage?",
    options: ["75VAC", "15V", "75VDC", "75A"],
    answer: 0,
    explanation: "Transformer ratio: 20:100 = 1:5 (step-up). Secondary voltage = 15V × 5 = 75VAC."
  },
  {
    id: 36, test: 1,
    topic: "Basic AC/DC Theory",
    question: "If a circuit has a rating of 100V and 2000W, what size fuse should be used?",
    options: ["20V", "20W", "20A", "50mA"],
    answer: 2,
    explanation: "P = VI → I = P/V = 2000W ÷ 100V = 20A. The fuse should be rated at 20A."
  },
  {
    id: 37, test: 1,
    topic: "Basic AC/DC Theory",
    question: "A meter has an accuracy rating of ±2%. If a voltage reading is 120V, what is that 2% value?",
    options: ["24V", "2.4V", "0.24V", "24mV"],
    answer: 1,
    explanation: "2% of 120V = 0.02 × 120 = 2.4V. So the true voltage is between 117.6V and 122.4V."
  },
  {
    id: 38, test: 1,
    topic: "Basic AC/DC Theory",
    question: "How many ft·lbs/s can a 1 HP motor lift?",
    options: ["500 ft·lbs/s", "550 ft·lbs/s", "3,300 ft·lbs/s", "1,550 ft·lbs/s"],
    answer: 1,
    explanation: "1 horsepower = 550 foot-pounds per second. This is a standard conversion to memorize."
  },
  {
    id: 39, test: 1,
    topic: "Hydraulics & Pneumatics",
    question: "In a pneumatic system, what happens to air when it is compressed?",
    options: ["Volume is reduced, temperature stays the same", "Volume stays the same, temperature is reduced", "Volume is increased, temperature is reduced", "Volume is reduced, temperature is increased"],
    answer: 3,
    explanation: "When air is compressed, its volume decreases and its temperature increases. This is described by the ideal gas law (Boyle's and Charles' Laws)."
  },
  {
    id: 40, test: 1,
    topic: "Welding & Rigging",
    question: "Which metals are best welded for joining?",
    options: ["Steel and steel", "Copper and brass", "Brass and brass", "Brass and steel"],
    answer: 0,
    explanation: "Steel to steel produces the strongest weld joint. Dissimilar metals (like brass and steel) are better joined by brazing rather than welding."
  },

  // ── TEST 2 ──────────────────────────────────────────────────────────────
  {
    id: 41, test: 2,
    topic: "Power Transmission",
    question: "What does a clutch allow for?",
    options: ["Engaging and disengaging", "Braking", "Vibration", "Grip"],
    answer: 0,
    explanation: "A clutch allows a driver shaft to engage (connect) and disengage (disconnect) from a driven shaft without stopping the motor."
  },
  {
    id: 42, test: 2,
    topic: "Motors & Control Circuits",
    question: "What are the parts of a motor?",
    options: ["Generator, commutator, brushes", "Armature, Field coil, compressor, brushes", "Armature, Field magnet, commutator, brushes", "Rotor, stator, Chassis"],
    answer: 2,
    explanation: "A DC motor consists of: Armature (rotor), Field magnet (stator), Commutator, and Brushes. These four work together to produce rotation."
  },
  {
    id: 43, test: 2,
    topic: "Power Transmission",
    question: "Force is defined as any action that tends to produce or modify:",
    options: ["Power", "Friction", "Motion", "Strength"],
    answer: 2,
    explanation: "Force is defined as any action that tends to produce, change, or stop motion. F = ma (Force = mass × acceleration)."
  },
  {
    id: 44, test: 2,
    topic: "Power Transmission",
    question: "What type of gear has helical shaped teeth?",
    options: ["Worm gear", "Rack and pinion", "Helical gear", "Edge gear"],
    answer: 2,
    explanation: "A helical gear has teeth cut at an angle (helix) to the gear axis. This provides smoother, quieter operation and greater load capacity than spur gears."
  },
  {
    id: 45, test: 2,
    topic: "Power Transmission",
    question: "What is an idler gear used for?",
    options: ["To take up slack", "To mesh with other gears", "To increase speed", "To change direction of spin"],
    answer: 3,
    explanation: "An idler gear is placed between two gears to change the direction of rotation of the output gear without changing the gear ratio."
  },
  {
    id: 46, test: 2,
    topic: "Power Transmission",
    question: "What mechanical device can be used to create oscillating motion?",
    options: ["An oscilloscope", "A bearing", "A fan", "A cam"],
    answer: 3,
    explanation: "A cam converts rotational motion into oscillating (back-and-forth) or reciprocating linear motion, used in engines and many machines."
  },
  {
    id: 47, test: 2,
    topic: "Power Transmission",
    question: "What are the parts of a lever?",
    options: ["Resistance, fulcrum, work", "Load, pivot, effort", "A and B", "None of the above"],
    answer: 2,
    explanation: "A lever has three parts: Load (resistance), Pivot (fulcrum), and Effort (work applied). Both sets of terms are correct."
  },
  {
    id: 48, test: 2,
    topic: "Basic AC/DC Theory",
    question: "Potential energy is:",
    options: ["Stored energy", "Energy present in a moving body", "Both A and B", "None of the above"],
    answer: 0,
    explanation: "Potential energy is stored energy — energy that has the potential to do work. A compressed spring or elevated object are examples."
  },
  {
    id: 49, test: 2,
    topic: "Basic AC/DC Theory",
    question: "Electricity is the flow of what?",
    options: ["Voltage", "Electrons", "Protons", "Neutrons"],
    answer: 1,
    explanation: "Electric current is the flow of electrons through a conductor. Voltage (EMF) is the force that drives this electron flow."
  },
  {
    id: 50, test: 2,
    topic: "Basic AC/DC Theory",
    question: "What is the measuring unit name of current?",
    options: ["Electrons", "Ampere", "Volt", "Power"],
    answer: 1,
    explanation: "Current is measured in Amperes (Amps, A). Voltage is measured in Volts, Resistance in Ohms, and Power in Watts."
  },
  {
    id: 51, test: 2,
    topic: "Basic AC/DC Theory",
    question: "A capacitor blocks and passes what?",
    options: ["Blocks DC, passes AC", "Blocks AC, passes DC", "Blocks Reactance, passes Impedance", "Blocks Resistance, passes Reactance"],
    answer: 0,
    explanation: "A capacitor blocks DC and passes AC. This makes capacitors useful as AC filters and for coupling AC signals while blocking DC bias."
  },
  {
    id: 52, test: 2,
    topic: "Motors & Control Circuits",
    question: "An electromagnetic device which pulls in a plunger is called what?",
    options: ["Relay", "Solenoid", "Contactor", "Circuit Breaker"],
    answer: 1,
    explanation: "A solenoid is a device that converts electrical energy to linear motion by pulling an iron plunger into a hollow coil when energized."
  },
  {
    id: 53, test: 2,
    topic: "Motors & Control Circuits",
    question: "What device converts electrical energy to mechanical energy?",
    options: ["Motor", "Generator", "Transducer", "Mutual inductance"],
    answer: 0,
    explanation: "A motor converts electrical energy to mechanical (rotational) energy. A generator does the reverse — mechanical to electrical."
  },
  {
    id: 54, test: 2,
    topic: "Motors & Control Circuits",
    question: "What device converts mechanical energy to electrical energy?",
    options: ["Motor", "Generator", "Transducer", "Mutual inductance"],
    answer: 1,
    explanation: "A generator converts mechanical energy to electrical energy. It is the reverse of a motor."
  },
  {
    id: 55, test: 2,
    topic: "Motors & Control Circuits",
    question: "A _____ converts one type of energy to another.",
    options: ["Motor", "Generator", "Transducer", "Mutual inductance"],
    answer: 2,
    explanation: "A transducer is any device that converts one form of energy to another — motors, generators, microphones, and speakers are all transducers."
  },
  {
    id: 56, test: 2,
    topic: "Basic AC/DC Theory",
    question: "What type of current is commonly applied to a transformer?",
    options: ["AC", "DC", "Electron", "Inductance"],
    answer: 0,
    explanation: "Transformers require AC to function. AC creates a changing magnetic flux in the core, which induces voltage in the secondary winding. DC creates only a static field."
  },
  {
    id: 57, test: 2,
    topic: "Motors & Control Circuits",
    question: "Why is a capacitor used across the contacts of a relay?",
    options: ["To block AC", "To pass DC", "Prevent arcing", "Lower capacitive reactance"],
    answer: 2,
    explanation: "A capacitor across relay contacts absorbs the voltage spike (back-EMF) that occurs when contacts open, preventing arcing that erodes the contacts."
  },
  {
    id: 58, test: 2,
    topic: "Motors & Control Circuits",
    question: "Why is a diode used across the coil of a relay?",
    options: ["Prevents de-energizing coil voltage from being reintroduced into the line", "Turns coil voltage to DC", "Rectifies signal", "To ground AC"],
    answer: 0,
    explanation: "A flyback (freewheeling) diode across the relay coil clamps the voltage spike generated when the coil is de-energized, protecting other circuit components."
  },
  {
    id: 59, test: 2,
    topic: "Basic AC/DC Theory",
    question: "Current in a series circuit at any given point is:",
    options: ["Measured with an ohm meter", "The same", "Different", "The Voltage times the Resistance"],
    answer: 1,
    explanation: "In a series circuit, current is the same at every point. There is only one path for current to flow, so the same electrons pass through each component."
  },
  {
    id: 60, test: 2,
    topic: "Basic AC/DC Theory",
    question: "How many paths must current travel in a parallel circuit?",
    options: ["2 or more", "1", "Less than 2", "3 or more"],
    answer: 0,
    explanation: "A parallel circuit has 2 or more paths for current flow. Each branch has the same voltage, but current divides based on branch resistance."
  },
  {
    id: 61, test: 2,
    topic: "Basic AC/DC Theory",
    question: "How much resistance is in a short circuit?",
    options: ["Infinite", "0", "0A", "100M"],
    answer: 1,
    explanation: "A short circuit has (ideally) zero resistance. By Ohm's Law, with V constant and R → 0, current becomes very high (theoretically infinite)."
  },
  {
    id: 62, test: 2,
    topic: "Digital Electronics",
    question: "Name the leads on a BJT transistor.",
    options: ["Gate, Source, Drain", "Gate, Source, Drain, Receiver", "Base, Collector, Emitter", "Base, Collector, Emitter, Receiver"],
    answer: 2,
    explanation: "A Bipolar Junction Transistor (BJT) — both NPN and PNP — has three leads: Base (control input), Collector, and Emitter."
  },
  {
    id: 63, test: 2,
    topic: "Digital Electronics",
    question: "Name the leads on a MOSFET.",
    options: ["Gate, Source, Drain", "Gate, Source, Drain, Receiver", "Base, Collector, Emitter", "Base, Collector, Emitter, Receiver"],
    answer: 0,
    explanation: "A MOSFET has three leads: Gate (control), Drain, and Source — different from the Base/Collector/Emitter of a BJT."
  },
  {
    id: 64, test: 2,
    topic: "Safety",
    question: "What type of fire extinguisher is used on electrical fires?",
    options: ["A, B, C", "C, BC, ABC", "A", "B"],
    answer: 1,
    explanation: "Class C (and multi-class BC or ABC) extinguishers are safe for electrical fires because they use non-conductive agents. Never use water on electrical fires."
  },
  {
    id: 65, test: 2,
    topic: "Safety",
    question: "How far out should the bottom of a ladder go for each foot of height?",
    options: ["The same distance", "1/2 foot", "1/4 foot", "1/3 foot"],
    answer: 2,
    explanation: "The base of a ladder should be placed 1 foot away from the wall for every 4 feet of height — the 4:1 rule (1/4 of the height)."
  },
  {
    id: 66, test: 2,
    topic: "Safety",
    question: "Who may remove a lockout?",
    options: ["Your supervisor", "You", "The buddy with the extra key", "The person who put it there"],
    answer: 3,
    explanation: "Only the person who applied the lockout may remove it. This is a core OSHA lockout/tagout (LOTO) rule to prevent accidental energization."
  },
  {
    id: 67, test: 2,
    topic: "Safety",
    question: "Who is responsible for safety?",
    options: ["Each individual", "Management", "OSHA", "Safety Officer"],
    answer: 0,
    explanation: "Safety is every individual's responsibility. OSHA states that each employee must comply with all applicable safety and health standards."
  },
  {
    id: 68, test: 2,
    topic: "Basic AC/DC Theory",
    question: "If 200 ft·lbs of work is expended to lift 20 lbs onto a 10-foot platform, how much work is required if a 20-foot ramp is used instead?",
    options: ["400 ft·lbs", "20,000 ft·lbs", "20 ft·lbs", "200 ft·lbs"],
    answer: 3,
    explanation: "Work = Force × Distance. The same work (200 ft·lbs) is done regardless of path — a longer ramp reduces the force needed but not the total work."
  },
  {
    id: 69, test: 2,
    topic: "Shop Machines & Tools",
    question: "What tool is best suited to remove debris from a grindstone?",
    options: ["Chisel", "Dressing tool", "Stone cleanser", "Aluminum"],
    answer: 1,
    explanation: "A dressing tool (wheel dresser) is used to remove debris and restore the shape of a grinding wheel. Never use aluminum — it can cause the wheel to become unbalanced."
  },
  {
    id: 70, test: 2,
    topic: "Shop Machines & Tools",
    question: "What is a countersink bit used for?",
    options: ["Make a recess, cone-shaped hole", "Counter sink screws", "A and B", "None of the above"],
    answer: 2,
    explanation: "A countersink bit creates a conical recess in material so that flathead screws sit flush with or below the surface."
  },
  {
    id: 71, test: 2,
    topic: "Shop Machines & Tools",
    question: "What is used to remove the rough edge of a freshly cut pipe?",
    options: ["Your teeth", "Sander", "Reamer", "Pipe edger"],
    answer: 2,
    explanation: "A reamer is used to smooth and deburr the inside edge of a freshly cut pipe, removing the rough ridge left by the pipe cutter."
  },
  {
    id: 72, test: 2,
    topic: "Shop Machines & Tools",
    question: "Solder is made of lead and tin — what is the percentage of each?",
    options: ["40% lead, 60% tin", "60% lead, 40% tin", "50% lead, 50% tin", "30% lead, 70% tin"],
    answer: 0,
    explanation: "Standard 60/40 solder is 60% tin and 40% lead. Remember: we 'TIN' the iron, and TIN is the higher percentage."
  },
  {
    id: 73, test: 2,
    topic: "Shop Machines & Tools",
    question: "What kind of solder is used on electronic circuits?",
    options: ["60-40 acid core", "60-40 silver solder", "60-40 rosin core", "60-40-22 hike core"],
    answer: 2,
    explanation: "60/40 rosin core solder is used for electronics. Acid core solder is corrosive and used for plumbing, not electronics."
  },
  {
    id: 74, test: 2,
    topic: "Shop Machines & Tools",
    question: "What does a good solder connection look like?",
    options: ["A volcano", "A blob", "Rough and dull", "Smooth and shiny"],
    answer: 3,
    explanation: "A good solder joint is smooth and shiny, indicating complete wetting and proper bonding. A dull, grainy joint is a 'cold solder joint' with high resistance."
  },
  {
    id: 75, test: 2,
    topic: "Shop Machines & Tools",
    question: "A cold solder joint increases what?",
    options: ["Heat sink", "Reactance", "Resistance", "Solder usage"],
    answer: 2,
    explanation: "A cold solder joint has a poor electrical connection, which increases resistance at that junction — causing signal problems or component failure."
  },

  // ── TEST 3 ──────────────────────────────────────────────────────────────
  {
    id: 76, test: 3,
    topic: "Power Transmission",
    question: "What is a shear pin used for?",
    options: ["To stop excessive vibration", "Installation of gears and sprockets", "A mechanical fuse designed to break under specific torque", "To hold gears to a shaft"],
    answer: 2,
    explanation: "A shear pin is a mechanical fuse — it is designed to break (shear) when torque exceeds a safe limit, protecting the equipment from damage."
  },
  {
    id: 77, test: 3,
    topic: "Basic AC/DC Theory",
    question: "When a device or wire is shorted, what is the indication in the circuit?",
    options: ["High current and low resistance", "Low current and high resistance", "High current and high resistance", "Low current and low resistance"],
    answer: 0,
    explanation: "A short circuit has near-zero resistance, so by Ohm's Law (I = V/R), current becomes very high while resistance is very low."
  },
  {
    id: 78, test: 3,
    topic: "Digital Electronics",
    question: "What is used to protect electronic equipment from electrostatic discharge?",
    options: ["Power couplings", "Powering up equipment on a UPS", "Wearing a grounded wrist strap", "Shunting the circuit with a capacitor"],
    answer: 2,
    explanation: "A grounded wrist strap safely drains static electricity from your body before it can damage sensitive electronic components."
  },
  {
    id: 79, test: 3,
    topic: "Digital Electronics",
    question: "A logic gate has multiple inputs. When ANY input is high, the output is high. What type of gate is it?",
    options: ["OR", "NOR", "AND", "XOR"],
    answer: 0,
    explanation: "An OR gate: output is HIGH if one or more inputs are HIGH. Output is LOW only when ALL inputs are LOW."
  },
  {
    id: 80, test: 3,
    topic: "Digital Electronics",
    question: "What is the time required for a signal to move through a logic circuit called?",
    options: ["Time ratio", "Charge constant", "Frequency", "Propagation delay"],
    answer: 3,
    explanation: "Propagation delay is the time it takes for a signal change at the input to appear at the output of a logic gate or circuit."
  },
  {
    id: 81, test: 3,
    topic: "Basic AC/DC Theory",
    question: "What maximum size fuse should be used in a circuit with 4200W of power and 120VAC?",
    options: ["20A", "30A", "40A", "50A"],
    answer: 1,
    explanation: "I = P/V = 4200W ÷ 120V = 35A. A fuse is a safety device — the maximum safe fuse size below 35A is 30A."
  },
  {
    id: 82, test: 3,
    topic: "Safety",
    question: "A Class C fire extinguisher uses which component to extinguish a fire?",
    options: ["Foam", "Water", "CO2", "Soda-Acid"],
    answer: 2,
    explanation: "Class C fire extinguishers use CO2 or dry chemical agents — both non-conductive. Water and foam conduct electricity and must NEVER be used on electrical fires."
  },
  {
    id: 83, test: 3,
    topic: "Safety",
    question: "Two technicians and one mechanic are assigned to work on a de-energized circuit. How many lockouts are required?",
    options: ["1", "2", "3", "4"],
    answer: 2,
    explanation: "OSHA lockout/tagout requires one lockout per person working on the equipment — so 3 people = 3 lockouts, each with only 1 key."
  },
  {
    id: 84, test: 3,
    topic: "Safety",
    question: "A fuse gets hot while in a circuit. What can be the underlying cause?",
    options: ["Voltage rating too low", "Current rating too high", "Wattage rating too high", "Fuse clips have poor connection or improper tension"],
    answer: 3,
    explanation: "A hot fuse usually indicates high resistance at the fuse clips (poor contact/tension), not the fuse itself. A loose clip causes a voltage drop and heat."
  },
  {
    id: 85, test: 3,
    topic: "Basic AC/DC Theory",
    question: "If the peak-to-peak voltage of a sine wave is 200V, what is the RMS value?",
    options: ["35.35V", "100V", "141.4V", "70.7V"],
    answer: 3,
    explanation: "Peak = P-P ÷ 2 = 100V. RMS = Peak × 0.707 = 100V × 0.707 = 70.7V."
  },
  {
    id: 86, test: 3,
    topic: "Basic AC/DC Theory",
    question: "In a purely capacitive circuit, which leads by 90°?",
    options: ["Voltage", "Power", "Watts", "Current"],
    answer: 3,
    explanation: "In a capacitive (ICE) circuit, Current leads Voltage by 90°. Remember the mnemonic: ICE — In a Capacitive circuit, current (I) leads voltage (E)."
  },
  {
    id: 87, test: 3,
    topic: "Shop Machines & Tools",
    question: "What type of file is used to file a round hole?",
    options: ["Rat tail", "Reamer", "Drill", "Flat"],
    answer: 0,
    explanation: "A rat-tail (round) file is used to enlarge or smooth round holes. Its tapered circular cross-section fits inside curved surfaces."
  },
  {
    id: 88, test: 3,
    topic: "Shop Machines & Tools",
    question: "Which tool should be used to remove a gear from a shaft?",
    options: ["Brass sledgehammer", "Ball peen hammer", "Gear puller", "Die"],
    answer: 2,
    explanation: "A gear puller applies even, controlled force to remove a gear from a shaft without damaging the shaft, gear, or bearings."
  },
  {
    id: 89, test: 3,
    topic: "Shop Machines & Tools",
    question: "When measuring the gap between the flat edges of a spark plug, what tool is used?",
    options: ["Feeler gauge", "Vernier caliper", "Micrometer", "Eyeball"],
    answer: 0,
    explanation: "A feeler gauge (thickness gauge) is used to measure small gaps, such as spark plug gaps. It consists of thin metal blades of known thickness."
  },
  {
    id: 90, test: 3,
    topic: "Shop Machines & Tools",
    question: "When checking a circuit with a maximum voltage of 24V, what range should the meter initially be set to for voltage?",
    options: ["10V", "15V", "25V", "50V"],
    answer: 2,
    explanation: "Always start with the meter range set just above the expected voltage. For 24V, set it to 25V. Starting too low can damage the meter."
  },
  {
    id: 91, test: 3,
    topic: "Shop Machines & Tools",
    question: "When checking across a capacitor with an analog meter, the needle jumps to zero then slowly moves to infinite resistance. What does this mean?",
    options: ["The cap is shorted", "The cap is probably good", "The capacitor is open", "Nothing"],
    answer: 1,
    explanation: "This is normal capacitor charging behavior — it is probably good. The initial zero reading shows charging current, then the cap charges and blocks DC (reads infinite)."
  },
  {
    id: 92, test: 3,
    topic: "Shop Machines & Tools",
    question: "When checking across a capacitor with an analog meter, the needle jumps to zero and STAYS there. What does this mean?",
    options: ["The cap is shorted", "The cap is probably good", "The capacitor is open", "Nothing"],
    answer: 0,
    explanation: "If the needle stays at zero (0 ohms), the capacitor is shorted internally and cannot hold a charge. It must be replaced."
  },
  {
    id: 93, test: 3,
    topic: "Welding & Rigging",
    question: "What is the advantage of brazing over welding?",
    options: ["Hotter flame", "Lower flame temperature", "No flux", "Join dissimilar metals"],
    answer: 1,
    explanation: "Brazing uses a lower flame temperature than welding, which allows joining of metals that would be damaged by welding temperatures. It can also join dissimilar metals."
  },
  {
    id: 94, test: 3,
    topic: "Welding & Rigging",
    question: "When rigging and hoisting, where should the mounts be secured on the load?",
    options: ["Above center of gravity", "Below center of gravity", "At center of gravity", "One above and one below"],
    answer: 0,
    explanation: "Rigging points must always be above the center of gravity. If below, the load will tip or flip when lifted."
  },
  {
    id: 95, test: 3,
    topic: "Welding & Rigging",
    question: "When using oxyacetylene, how far should the tank valve be opened?",
    options: ["Halfway open", "All the way closed", "All the way open", "1 to 1.5 turns"],
    answer: 3,
    explanation: "The acetylene tank valve should be opened 1 to 1.5 turns — enough for flow, but quick to close in an emergency. Oxygen valves are opened fully."
  },
  {
    id: 96, test: 3,
    topic: "Pumps & Piping",
    question: "What is the pipe fitting called with threads on BOTH inside and outside?",
    options: ["Coupling", "Bushing", "Reducer", "Union"],
    answer: 1,
    explanation: "A bushing has threads on both the inside (female) and outside (male), used to connect pipes of different sizes."
  },
  {
    id: 97, test: 3,
    topic: "Basic AC/DC Theory",
    question: "Why does a power station use high voltage when transmitting electricity?",
    options: ["To reduce the size and weight of the metal needed", "To increase the size and weight of the metal needed", "To increase the current", "To step down the voltage for households"],
    answer: 0,
    explanation: "High voltage transmission reduces current (P = VI), which allows smaller, lighter conductors. Less current means less resistive loss (P = I²R)."
  },
  {
    id: 98, test: 3,
    topic: "Power Transmission",
    question: "What kind of bearing has the least metal-to-metal contact?",
    options: ["Roller bearing", "Needle bearing", "Ball bearing", "Pillow block bearing"],
    answer: 2,
    explanation: "Ball bearings have the least metal-to-metal contact — only point contact — resulting in lower friction and less heat generation."
  },
  {
    id: 99, test: 3,
    topic: "Digital Electronics",
    question: "A Megger shows a change in reading. What does this mean?",
    options: ["The motor has started", "Proper resistance", "Future problems with the motor", "A good connection to the motor"],
    answer: 2,
    explanation: "A Megger (megohmmeter) tests insulation resistance. Any conductivity (change in reading) indicates insulation breakdown — predicting future motor failure."
  },
  {
    id: 100, test: 3,
    topic: "Digital Electronics",
    question: "In a PLC conveyor configuration, what supplies AC voltage to the motor?",
    options: ["Motor driver", "PLC", "I/O", "Data+"],
    answer: 0,
    explanation: "The motor driver card receives its power from the I/O supply and controls the conveyor motor. The PLC outputs logic signals to the motor driver, which then supplies the actual motor power."
  },

  // ── TEST 4 ──────────────────────────────────────────────────────────────
  {
    id: 101, test: 4,
    topic: "Power Transmission",
    question: "What are the reasons a gear is used?",
    options: ["To change direction and speed of rotation", "To move rotational motion to a different axis", "To keep rotation of two axes synchronized", "All of the above"],
    answer: 3,
    explanation: "Gears are used for four reasons: change direction of rotation, change speed, move rotation to a different axis, and synchronize two axes."
  },
  {
    id: 102, test: 4,
    topic: "Motors & Control Circuits",
    question: "Which of the following components converts electrical energy to LINEAR motion?",
    options: ["Motor", "Solenoid", "Generator", "Alternator"],
    answer: 1,
    explanation: "A solenoid converts electrical energy to linear (straight-line) motion by pulling a plunger into its coil. A motor creates rotational motion."
  },
  {
    id: 103, test: 4,
    topic: "Power Transmission",
    question: "What is the RPM of a driven gear with 40 teeth when the driver gear has 60 teeth rotating at 100 RPM?",
    options: ["67 RPM", "2000 RPM", "150 RPM", "115 RPM"],
    answer: 2,
    explanation: "Ratio = 60:40 = 3:2. Driven RPM = Driver RPM × (Driver teeth ÷ Driven teeth) = 100 × (60/40) = 150 RPM."
  },
  {
    id: 104, test: 4,
    topic: "Basic AC/DC Theory",
    question: "What percentage will current change if voltage is constant but resistance triples?",
    options: ["0%", "33.3%", "300%", "100%"],
    answer: 1,
    explanation: "If R triples (×3), current drops to 1/3 of original = 33.3% of original (a 66.7% decrease). By Ohm's Law: I = V/R — inversely proportional."
  },
  {
    id: 105, test: 4,
    topic: "Basic AC/DC Theory",
    question: "Which component does a power supply use as a filtering element?",
    options: ["Rectifier", "Inductor", "Capacitor", "Microfiber"],
    answer: 2,
    explanation: "A capacitor is used as the filter in a DC power supply. It smooths the pulsating DC output of the rectifier by charging during peaks and discharging between them."
  },
  {
    id: 106, test: 4,
    topic: "Basic AC/DC Theory",
    question: "What does a full-wave rectifier do?",
    options: ["Reads carrier wave signals", "Converts AC to pulsating DC", "Converts BOTH halves of an AC cycle to DC", "Decodes gate input data"],
    answer: 2,
    explanation: "A full-wave rectifier (4 diodes in bridge configuration) converts BOTH the positive and negative halves of an AC cycle into pulsating DC."
  },
  {
    id: 107, test: 4,
    topic: "Basic AC/DC Theory",
    question: "If a resistor is fixed and the current through it increases, what will most likely happen?",
    options: ["Power will decrease", "Resistance will decrease", "Voltage across it will decrease", "Voltage across it will increase"],
    answer: 3,
    explanation: "By Ohm's Law (V = IR): with R fixed, if I increases, V must increase proportionally."
  },
  {
    id: 108, test: 4,
    topic: "Safety",
    question: "What does an interlock primarily prevent?",
    options: ["Damage to equipment", "Shock", "Injury to personnel", "Fire"],
    answer: 2,
    explanation: "An interlock switch prevents access to dangerous areas while equipment is running, primarily protecting personnel from injury."
  },
  {
    id: 109, test: 4,
    topic: "Safety",
    question: "Which is a Class C fire?",
    options: ["Chemical", "Electrical", "Wood", "Paper"],
    answer: 1,
    explanation: "Class C fires involve energized electrical equipment. Class A = ordinary combustibles; Class B = flammable liquids; Class D = metals."
  },
  {
    id: 110, test: 4,
    topic: "Safety",
    question: "What term refers to energy loss due to magnetic material or electronic propagation?",
    options: ["Hysteresis", "Delay", "Conductance", "Reactance"],
    answer: 0,
    explanation: "Hysteresis is the energy loss in magnetic materials due to the lagging of magnetization behind the magnetizing force. It appears as heat in transformer cores and motors."
  },
  {
    id: 111, test: 4,
    topic: "Basic AC/DC Theory",
    question: "The peak voltage of a sine wave is 100V. What is the effective (RMS) voltage?",
    options: ["100V", "141.4V", "70.7V", "73.7V"],
    answer: 2,
    explanation: "RMS = Peak × 0.707 = 100V × 0.707 = 70.7V. RMS (effective) voltage is what a voltmeter reads and what does equivalent work to DC."
  },
  {
    id: 112, test: 4,
    topic: "Shop Machines & Tools",
    question: "What does a VOM do?",
    options: ["Stores data bits", "Measures Voltage and Resistance", "Virtual Ohm Meter", "Measures current"],
    answer: 1,
    explanation: "VOM = Volt-Ohm Meter. It measures Voltage and Resistance (and often current). It is the same as a multi-meter."
  },
  {
    id: 113, test: 4,
    topic: "Shop Machines & Tools",
    question: "What is an Allen wrench used to turn?",
    options: ["Nuts", "Bolts", "Set screws", "Valves"],
    answer: 2,
    explanation: "An Allen wrench (hex key) is specifically designed to turn set screws — fasteners with a hexagonal socket in their head."
  },
  {
    id: 114, test: 4,
    topic: "Shop Machines & Tools",
    question: "What is measured with a tachometer?",
    options: ["Voltage", "Current", "Wattage", "RPM"],
    answer: 3,
    explanation: "A tachometer measures rotational speed in RPM (Revolutions Per Minute). It is used to check motor and conveyor speeds."
  },
  {
    id: 115, test: 4,
    topic: "Hydraulics & Pneumatics",
    question: "Hydraulic systems are based on the fact that force applied at one point is transmitted using:",
    options: ["Compressible liquids", "Incompressible fluid", "Power factor", "Mass times acceleration"],
    answer: 1,
    explanation: "Hydraulic systems rely on incompressible fluid (Pascal's Law) — pressure applied to a confined fluid is transmitted equally in all directions."
  },
  {
    id: 116, test: 4,
    topic: "Hydraulics & Pneumatics",
    question: "Which component can assist in a 'safe stop' in the event of a power outage in a pneumatic system?",
    options: ["Accumulator", "Pressure relief valve", "Pump housing", "Regulator"],
    answer: 0,
    explanation: "An accumulator stores compressed air/fluid energy and can supply pressure to safely bring a system to a controlled stop when power fails."
  },
  {
    id: 117, test: 4,
    topic: "Hydraulics & Pneumatics",
    question: "Which can be damaging to a hydraulic system?",
    options: ["Rectification", "Filtration", "Incompressible fluids", "Air bubbles"],
    answer: 3,
    explanation: "Air bubbles in a hydraulic system cause cavitation — vapor bubbles collapse violently, damaging pump impellers, valves, and seals."
  },
  {
    id: 118, test: 4,
    topic: "Welding & Rigging",
    question: "What is the residue from welding called?",
    options: ["Ferrous material", "Braze", "Slag", "Residue"],
    answer: 2,
    explanation: "Slag is the non-metallic residue left on the surface of a weld bead after welding. It must be chipped away with a tack hammer before painting or subsequent passes."
  },
  {
    id: 119, test: 4,
    topic: "Motors & Control Circuits",
    question: "What two parts of an electric motor are responsible for changing the direction of the current?",
    options: ["Commutator and brushes", "Commutator and armature", "Stator and rotor", "Start capacitor"],
    answer: 0,
    explanation: "The commutator and brushes work together: as the armature rotates, the commutator reverses the connection to the power source, keeping the motor turning in one direction."
  },
  {
    id: 120, test: 4,
    topic: "Pumps & Piping",
    question: "What are the 3 processes by which heat may be transferred?",
    options: ["Conduction, convection, radiation", "Water, air, fire", "Boilers, radiators, coils", "Source, sink, and drain"],
    answer: 0,
    explanation: "Heat transfers by: Conduction (direct contact), Convection (fluid movement), and Radiation (electromagnetic waves). All three appear on the 955 exam."
  },
];

const FLASHCARDS = [
  { front: "Ohm's Law", back: "V = IR\nI = V/R\nR = V/I\nPower: P = VI = I²R = V²/R" },
  { front: "1 Horsepower equals", back: "746 Watts\n550 ft·lbs/second" },
  { front: "RMS Voltage formula", back: "VRMS = Vpeak × 0.707\nVpeak = VRMS × 1.414\nVpeak-to-peak = 2 × Vpeak" },
  { front: "Transformer turns ratio", back: "Vs/Vp = Ns/Np\n(Secondary V / Primary V = Secondary turns / Primary turns)\nStep-up: more secondary turns → higher voltage\nStep-down: fewer secondary turns → lower voltage" },
  { front: "ELI the ICE man", back: "ELI: In an Inductive (L) circuit, Voltage (E) LEADs Current (I)\nICE: In a Capacitive (C) circuit, Current (I) LEADs Voltage (E)" },
  { front: "Gear ratio formula", back: "Ratio = Driver teeth / Driven teeth\nDriven RPM = Driver RPM × (Driver teeth / Driven teeth)\nSmaller gear always spins faster" },
  { front: "Fire extinguisher classes", back: "A = Ordinary combustibles (wood, paper)\nB = Flammable liquids (grease, oil, gas)\nC = Electrical fires (non-conductive agent)\nD = Flammable metals" },
  { front: "Lockout/Tagout rules", back: "1. One lock per person\n2. Only ONE key per lock\n3. Only the person who applied it can remove it\n4. New worker adds their lock BEFORE old lock comes off\n5. Never cut another person's lock" },
  { front: "Logic gate: AND", back: "Output HIGH only when ALL inputs are HIGH\nOutput LOW if any input is LOW\n(Like series circuit — all must be on)" },
  { front: "Logic gate: OR", back: "Output HIGH when ANY input is HIGH\nOutput LOW only when ALL inputs are LOW\n(Like parallel circuit — any can be on)" },
  { front: "Logic gate: NOT (Inverter)", back: "One input, one output\nOutput is OPPOSITE of input\nHigh in → Low out\nLow in → High out" },
  { front: "Logic gate: NAND", back: "AND + NOT (inverted AND)\nOutput LOW only when ALL inputs are HIGH\nOutput HIGH in all other cases\n(Bubble on output symbol)" },
  { front: "Logic gate: NOR", back: "OR + NOT (inverted OR)\nOutput HIGH only when ALL inputs are LOW\nOutput LOW in all other cases" },
  { front: "NPN transistor", back: "Bipolar Junction Transistor (BJT)\nLeads: Base, Collector, Emitter\nPositive voltage at BASE turns it ON\nUsed as: amplifier or switch\nSilicon: 0.7V drop; Germanium: 0.3V" },
  { front: "MOSFET leads", back: "Gate (G) — control input\nDrain (D)\nSource (S)\nEnhanced MOSFET used as electronic switch\nVoltage-controlled (vs BJT which is current-controlled)" },
  { front: "Series circuit rules", back: "Current is the SAME everywhere\nVoltages ADD up to source\nResistances ADD: R_total = R1 + R2 + ...\nOne break stops ALL current" },
  { front: "Parallel circuit rules", back: "Voltage is the SAME across all branches\nCurrents ADD up to total\nReciprocal resistance: 1/R_total = 1/R1 + 1/R2\nOne branch opening doesn't stop others" },
  { front: "AWG wire gauge", back: "Lower AWG number = thicker wire = more current capacity\n10 AWG = 30A\n12 AWG = 20A\n14 AWG = 15A\nLarger number = thinner wire" },
  { front: "Solenoid vs Relay vs Contactor", back: "Solenoid: converts electrical energy to LINEAR motion (plunger)\nRelay: solenoid + contacts; low voltage/current switching\nContactor: oversized relay; switches high-current AC to motors" },
  { front: "Capacitor in a motor", back: "Start capacitor: creates phase shift to START single-phase motor\nRun capacitor: permanently in circuit for two-phase-like operation\nCentrifugal switch disconnects start cap near operating speed" },
  { front: "Types of bearings", back: "Ball bearing: least metal-to-metal contact, lowest friction\nRoller bearing: higher load capacity\nNeedle bearing: very thin rollers, tight spaces\nPermanent seal bearing: do NOT grease" },
  { front: "Lubrication: oil vs grease", back: "Oil: flows, lower viscosity, needs reservoir\nGrease: thicker, stays in place, no reservoir\nChains → low viscosity oil (10W)\nGearboxes → 90W oil\nHigh temp, low speed → EP grease" },
  { front: "Hydraulics basics", back: "Uses INCOMPRESSIBLE fluid\nPressure = Force / Area\nSmaller piston → larger piston = force multiplication\nHigh pressure at PUMP OUTPUT\nAir bubbles = cavitation damage" },
  { front: "Pneumatics basics", back: "Uses compressible air\nCompressing air: volume ↓, temperature ↑\nOiler installed AFTER the separator\nAccumulator provides safe stop on power loss\nPressure relief valve protects system if regulator fails" },
  { front: "Thermocouple", back: "When a conductor is heated, it generates EMF (voltage)\nUsed to measure temperature\nExample: gas oven thermostat\nAlso detects if pilot light goes out → shuts off gas valve" },
  { front: "PLC (Programmable Logic Controller)", back: "Digital computer for industrial automation\nI/O voltage: typically 18-24VDC\nUses ladder logic programming\nConnects to: sensors, limit switches, motors, solenoids\nCommunicates via RS232 (DB9) or RS485/Ethernet" },
  { front: "Megohmmeter (Megger)", back: "Tests insulation resistance (millions of ohms)\nHigh voltage device — NEVER use on live circuits\nA change in reading = insulation breakdown = future failure\nUsed on motors, cables, and transformers" },
  { front: "Multimeter (VOM) usage", back: "Voltmeter: connect in PARALLEL\nAmmeter: connect in SERIES (breaks circuit)\nOhmmeter: NEVER connect to live circuit (has own battery)\nAlways set to highest range first, then adjust down" },
  { front: "Solder types & technique", back: "Electronics: 60/40 Rosin core (60% tin, 40% lead)\nNever: acid core (corrosive to PCB)\nGood joint: smooth and shiny\nCold joint: dull, grainy = high resistance\nIron tip: made of copper, must be tinned" },
  { front: "Welding: Oxyacetylene", back: "Acetylene valve: open 1–1.5 turns\nOxygen valve: open ALL the way\nFirst weld pass = TACK weld\nAfter heating: relaxes constriction in circular material\nSlug/slag removed with tack hammer" },
];
