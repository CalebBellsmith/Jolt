import React from 'react';
import { Accordion } from './UI';

export const Help: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-zinc-900">Support Center</h2>
        <p className="text-zinc-500">Find answers and guides for your JOLT device</p>
      </div>

      <div className="space-y-4">
        <Accordion title="Connecting to Bluetooth">
          <p className="mb-3">To connect your device to the platform, follow these steps:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Ensure your device is powered on and in pairing mode.</li>
            <li>Click the Bluetooth button on the main dashboard.</li>
            <li>A browser pop-up will appear listing nearby devices.</li>
            <li>Select your "JOLT" device from the list and click "Pair".</li>
            <li>Once connected, the Bluetooth indicator will turn blue and show your device name.</li>
          </ol>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-700">
            <strong>Note:</strong> Ensure your browser has Bluetooth permissions enabled.
          </div>
        </Accordion>

        <Accordion title="Setting up your sleeve">
          <p className="mb-3">Proper placement is key for accurate spatial translation:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Slide the sleeve onto the chosen body part (e.g., Bicep).</li>
            <li>Ensure the sensor is facing outward and is snug against the skin.</li>
            <li>Calibrate the baseline by holding your limb in a neutral position for 3 seconds.</li>
            <li>The "Baseline" indicator on the dashboard will turn green once calibration is complete.</li>
          </ul>
        </Accordion>

        <Accordion title="Troubleshooting Movement">
          <p>If the cursor movement feels laggy or inaccurate:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Check battery levels (low battery can affect sensor sensitivity).</li>
            <li>Re-calibrate the baseline from the settings menu.</li>
            <li>Ensure there are no large metal objects between the device and your computer.</li>
          </ul>
        </Accordion>
      </div>
    </div>
  );
};
