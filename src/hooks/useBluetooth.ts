import { useState, useRef } from 'react';

// UUIDs matching the ESP32 code exactly
const SERVICE_UUID      = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const EMG_CHAR_UUID     = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
const STATUS_CHAR_UUID  = 'beb5483e-36e1-4688-b7f5-ea07361b26a9';
const CLICK_CHAR_UUID   = 'beb5483e-36e1-4688-b7f5-ea07361b26ab';

export interface BluetoothDeviceState {
  connected: boolean;
  deviceName: string | null;
  batteryLevel: number;
  powerOn: boolean;
  baselineSet: boolean;
  movement: { x: number; y: number };
  emgValue: number;
  emgHistory: number[];
}

export function useBluetooth() {
  const [deviceState, setDeviceState] = useState<BluetoothDeviceState>({
    connected: false,
    deviceName: null,
    batteryLevel: 85,
    powerOn: false,
    baselineSet: false,
    movement: { x: 0, y: 0 },
    emgValue: 0,
    emgHistory: [],
  });

  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs to hold BLE objects across renders
  const gattServerRef = useRef<BluetoothRemoteGATTServer | null>(null);
  const clickCharRef  = useRef<BluetoothRemoteGATTCharacteristic | null>(null);

  // EMG threshold for triggering clicks (set per profile)
  const emgThresholdRef = useRef<number>(2500);

  // Debounce click to prevent double firing
  const lastClickTime = useRef<number>(0);
  const CLICK_DEBOUNCE_MS = 400;

  const connect = async () => {
    if (!navigator.bluetooth) {
      setError('Bluetooth is not supported in this browser. Use Chrome or Edge.');
      return;
    }
    try {
      setIsScanning(true);
      setError(null);

      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE_UUID] }],
        optionalServices: [SERVICE_UUID],
      });

      device.addEventListener('gattserverdisconnected', () => {
        setDeviceState(prev => ({
          ...prev,
          connected: false,
          deviceName: null,
          powerOn: false,
          baselineSet: false,
        }));
        gattServerRef.current = null;
        clickCharRef.current = null;
      });

      const server  = await device.gatt!.connect();
      gattServerRef.current = server;

      const service = await server.getPrimaryService(SERVICE_UUID);

      // --- EMG characteristic: stream raw values ---
      const emgChar = await service.getCharacteristic(EMG_CHAR_UUID);
      await emgChar.startNotifications();
      emgChar.addEventListener('characteristicvaluechanged', (event: any) => {
        const raw   = new TextDecoder().decode(event.target.value);
        const value = parseInt(raw);
        if (isNaN(value)) return;

        setDeviceState(prev => ({
          ...prev,
          emgValue: value,
          emgHistory: [...prev.emgHistory.slice(-99), value], // keep last 100 samples
        }));

        // Click detection with debounce
        const now = Date.now();
        if (value > emgThresholdRef.current && now - lastClickTime.current > CLICK_DEBOUNCE_MS) {
          lastClickTime.current = now;
          triggerClick();
        }
      });

      // --- Status characteristic: IMU zero events ---
      const statusChar = await service.getCharacteristic(STATUS_CHAR_UUID);
      await statusChar.startNotifications();
      statusChar.addEventListener('characteristicvaluechanged', (event: any) => {
        const status = new TextDecoder().decode(event.target.value);
        if (status === 'ZEROED') {
          setDeviceState(prev => ({ ...prev, baselineSet: true }));
        }
      });

      // --- Click characteristic: we write to this to trigger clicks ---
      clickCharRef.current = await service.getCharacteristic(CLICK_CHAR_UUID);

      setDeviceState(prev => ({
        ...prev,
        connected: true,
        deviceName: device.name || 'EMG Band',
        powerOn: true,
      }));

    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsScanning(false);
    }
  };

  const triggerClick = async () => {
    if (!clickCharRef.current) return;
    try {
      const encoder = new TextEncoder();
      await clickCharRef.current.writeValue(encoder.encode('1'));
    } catch (err) {
      console.error('Click write failed:', err);
    }
  };

  const disconnect = () => {
    if (gattServerRef.current?.connected) {
      gattServerRef.current.disconnect();
    }
    setDeviceState(prev => ({
      ...prev,
      connected: false,
      deviceName: null,
      powerOn: false,
      baselineSet: false,
    }));
    gattServerRef.current = null;
    clickCharRef.current  = null;
  };

  const togglePower = () => {
    setDeviceState(prev => ({ ...prev, powerOn: !prev.powerOn }));
  };

  const setThreshold = (value: number) => {
    emgThresholdRef.current = value;
  };

  return {
    deviceState,
    isScanning,
    error,
    connect,
    disconnect,
    togglePower,
    triggerClick,
    setThreshold,
  };
}
