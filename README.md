# JOLT

> **A gesture-controlled computer mouse for upper-limb amputees.**

[![Demo Video](https://img.shields.io/badge/Demo-YouTube-red?style=for-the-badge&logo=youtube)](https://youtube.com/placeholder)

---

## What is JOLT?

JOLT is a forearm band that allows users with upper limb amputations or impairments to control a computer mouse using natural arm gestures. By strapping JOLT to the residual limb, users can move the cursor by tilting their arm, click with a joystick button, and toggle their range of motion and sensititivy. 
---

## Demo

🎥 [Watch the demo on YouTube](https://youtube.com/placeholder)

---

## How It Works

JOLT uses an gyroscope to detect the rotational velocity of the forearm in real time. These gyroscope readings are filtered and mapped to cursor movement, which is transmitted wirelessly to any computer via Bluetooth HID. The computer sees JOLT as a standard Bluetooth mouse, requiring no drivers or software installation.

### Cursor Control
- **Tilt arm forward/back** → moves cursor up/down
- **Tilt arm left/right** → moves cursor left/right
- The cursor continues moving as long as the arm is tilted, and stops when the arm returns to neutral

### Clicking
- **Single press** of the joystick button → left mouse click

### Freeze / Unfreeze
- **Toggle switch ON** → freezes the cursor in place
- **Toggle switch OFF** → unfreezes and resumes cursor movement

---

## Hardware

| Component | Purpose |
|-----------|---------|
| ESP32 Dev Module | Microcontroller and BLE HID transmission |
| MPU-6050 IMU | Gyroscope for arm gesture detection |
| Joystick module | Single click input |
| Toggle switch | Freeze and unfreeze cursor movement |
| Portable USB charger | Power supply |
| Breadboard + jumper wires | Prototyping and connections |

---

## Technical Details

- **Microcontroller:** ESP32 (dual core, 240MHz).
- **Gesture sensing:** MPU-6050 gyroscope.
- **Signal filtering:** Low-pass filter to smooth gyroscope noise.
- **Wireless protocol:** Bluetooth Low Energy HID.
- **Cursor mapping:** Gyro rate scaled and constrained to ±15 pixels per frame at 50Hz.
- **Auto-calibration:** IMU settles over first 50 loop iterations on boot before cursor activates.
- **Companion web app:** Real time device dashboard built in React and TypeScript, deployed on Vercel

---

## Companion Web App

JOLT includes a web-based dashboard accessible from any Chrome or Edge browser. The app connects to JOLT over Web Bluetooth and displays:

- Device connection status
- Power and baseline state
- Live gyroscope values
- Spatial movement visualization

🌐 [![Launch Dashboard](https://img.shields.io/badge/See%20Demo-%23FF4500?style=for-the-badge)](https://jolt-dusky.vercel.app/)

---

## Repository Structure
```
├── firmware/          # Arduino/ESP32 source code
├── src/               # React web app source
│   ├── components/    # UI components
│   ├── hooks/         # Bluetooth hook
│   └── types/         # TypeScript definitions
└── README.md
```

---

## Built With

- [Arduino IDE](https://www.arduino.cc/)
- [ESP32 BLE Mouse Library](https://github.com/T-vK/ESP32-BLE-Mouse)
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel](https://vercel.com/)
- [Google AI Studio](https://aistudio.google.com/)

