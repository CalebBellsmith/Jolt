import { useState, useEffect } from 'react';

export interface BluetoothDeviceState {
  connected: boolean;
  deviceName: string | null;
  batteryLevel: number;
  powerOn: boolean;
  baselineSet: boolean;
  movement: { x: number; y: number };
}

export function useBluetooth() {
  const [deviceState, setDeviceState] = useState<BluetoothDeviceState>({
    connected: false,
    deviceName: null,
    batteryLevel: 85, // Mock initial
    powerOn: false,
    baselineSet: false,
    movement: { x: 0, y: 0 },
  });

  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    if (!navigator.bluetooth) {
      setError("Bluetooth is not supported in this browser.");
      return;
    }

    try {
      setIsScanning(true);
      // In a real scenario, we would filter by service UUIDs
      // For this demo, we'll accept all devices to show the UI flow
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service', 'human_interface_device']
      });

      setDeviceState(prev => ({
        ...prev,
        connected: true,
        deviceName: device.name || 'Unknown Device',
        powerOn: true
      }));

      device.addEventListener('gattserverdisconnected', () => {
        setDeviceState(prev => ({
          ...prev,
          connected: false,
          deviceName: null,
          powerOn: false
        }));
      });

      // Mocking some data updates since we don't have a real device
      const interval = setInterval(() => {
        setDeviceState(prev => {
          if (!prev.connected) {
            clearInterval(interval);
            return prev;
          }
          return {
            ...prev,
            baselineSet: Math.random() > 0.2, // Simulate baseline status from "potentiometer"
            batteryLevel: Math.max(0, prev.batteryLevel - 0.01),
            movement: {
              x: prev.movement.x + (Math.random() - 0.5) * 10,
              y: prev.movement.y + (Math.random() - 0.5) * 10,
            }
          };
        });
      }, 2000);

    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsScanning(false);
    }
  };

  const disconnect = () => {
    // In real Web Bluetooth, you'd call gatt.disconnect()
    setDeviceState(prev => ({
      ...prev,
      connected: false,
      deviceName: null,
      powerOn: false
    }));
  };

  const togglePower = () => {
    setDeviceState(prev => ({ ...prev, powerOn: !prev.powerOn }));
  };

  return {
    deviceState,
    isScanning,
    error,
    connect,
    disconnect,
    togglePower
  };
}
