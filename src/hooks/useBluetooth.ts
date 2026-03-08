import { useState, useRef } from 'react';

const SERVICE_UUID     = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const STATUS_CHAR_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a9';
const CLICK_CHAR_UUID  = 'beb5483e-36e1-4688-b7f5-ea07361b26ab';
const IMU_CHAR_UUID    = 'beb5483e-36e1-4688-b7f5-ea07361b26ad';

export interface IMUData {
  pitch: number;
  roll: number;
  yaw: number;
}

export interface BluetoothDeviceState {
  connected: boolean;
  deviceName: string | null;
  batteryLevel: number;
  powerOn: boolean;
  baselineSet: boolean;
  movement: { x: number; y: number };
  lastEvent: string | null;
  imu: IMUData;
}

export function useBluetooth() {
  const [deviceState, setDeviceState] = useState<BluetoothDeviceState>({
    connected: false,
    deviceName: null,
    batteryLevel: 100,
    powerOn: false,
    baselineSet: false,
    movement: { x: 0, y: 0 },
    lastEvent: null,
    imu: { pitch: 0, roll: 0, yaw: 0 },
  });

  const [isScanning, setIsScanning] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const gattServerRef = useRef<BluetoothRemoteGATTServer | null>(null);
  const clickCharRef  = useRef<BluetoothRemoteGATTCharacteristic | null>(null);

  const connect = async () => {
    if (!navigator.bluetooth) {
      setError('Bluetooth is not supported in this browser. Use Chrome or Edge.');
      return;
    }
    try {
      setIsScanning(true);
      setError(null);

      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { namePrefix: 'J' },
          { namePrefix: 'A' },
          { namePrefix: 'B' },
          { namePrefix: 'C' },
          { namePrefix: 'D' },
          { namePrefix: 'E' },
          { namePrefix: 'F' },
          { namePrefix: 'G' },
          { namePrefix: 'H' },
          { namePrefix: 'I' },
          { namePrefix: 'K' },
          { namePrefix: 'L' },
          { namePrefix: 'M' },
          { namePrefix: 'N' },
          { namePrefix: 'O' },
          { namePrefix: 'P' },
          { namePrefix: 'Q' },
          { namePrefix: 'R' },
          { namePrefix: 'S' },
          { namePrefix: 'T' },
          { namePrefix: 'U' },
          { namePrefix: 'V' },
          { namePrefix: 'W' },
          { namePrefix: 'X' },
          { namePrefix: 'Y' },
          { namePrefix: 'Z' },
          { namePrefix: 'a' },
          { namePrefix: 'b' },
          { namePrefix: 'c' },
          { namePrefix: 'd' },
          { namePrefix: 'e' },
          { namePrefix: 'f' },
          { namePrefix: 'g' },
          { namePrefix: 'h' },
          { namePrefix: 'i' },
          { namePrefix: 'j' },
          { namePrefix: 'k' },
          { namePrefix: 'l' },
          { namePrefix: 'm' },
          { namePrefix: 'n' },
          { namePrefix: 'o' },
          { namePrefix: 'p' },
          { namePrefix: 'q' },
          { namePrefix: 'r' },
          { namePrefix: 's' },
          { namePrefix: 't' },
          { namePrefix: 'u' },
          { namePrefix: 'v' },
          { namePrefix: 'w' },
          { namePrefix: 'x' },
          { namePrefix: 'y' },
          { namePrefix: 'z' },
          { namePrefix: '0' },
          { namePrefix: '1' },
          { namePrefix: '2' },
          { namePrefix: '3' },
          { namePrefix: '4' },
          { namePrefix: '5' },
          { namePrefix: '6' },
          { namePrefix: '7' },
          { namePrefix: '8' },
          { namePrefix: '9' },
        ],
        optionalServices: [SERVICE_UUID],
      });

      device.addEventListener('gattserverdisconnected', () => {
        setDeviceState(prev => ({
          ...prev,
          connected: false,
          deviceName: null,
          powerOn: false,
          baselineSet: false,
          imu: { pitch: 0, roll: 0, yaw: 0 },
        }));
        gattServerRef.current = null;
        clickCharRef.current  = null;
      });

      const server  = await device.gatt!.connect();
      gattServerRef.current = server;
      const service = await server.getPrimaryService(SERVICE_UUID);

      // Status characteristic
      try {
        const statusChar = await service.getCharacteristic(STATUS_CHAR_UUID);
        await statusChar.startNotifications();
        statusChar.addEventListener('characteristicvaluechanged', (event: any) => {
          const status = new TextDecoder().decode(event.target.value);
          if (status === 'ZEROED') {
            setDeviceState(prev => ({ ...prev, baselineSet: true, lastEvent: 'IMU Zeroed' }));
          } else if (status === 'CLICK') {
            setDeviceState(prev => ({ ...prev, lastEvent: 'Click Fired' }));
          }
        });
      } catch {
        console.warn('Status characteristic not found, skipping');
      }

      // Click characteristic
      try {
        clickCharRef.current = await service.getCharacteristic(CLICK_CHAR_UUID);
      } catch {
        console.warn('Click characteristic not found, skipping');
      }

      // IMU characteristic: parses "pitch,roll,yaw" string
      try {
        const imuChar = await service.getCharacteristic(IMU_CHAR_UUID);
        await imuChar.startNotifications();
        imuChar.addEventListener('characteristicvaluechanged', (event: any) => {
          const raw = new TextDecoder().decode(event.target.value);
          const parts = raw.split(',');
          if (parts.length === 3) {
            const pitch = parseFloat(parts[0]);
            const roll  = parseFloat(parts[1]);
            const yaw   = parseFloat(parts[2]);
            if (!isNaN(pitch) && !isNaN(roll) && !isNaN(yaw)) {
              setDeviceState(prev => ({
                ...prev,
                imu: { pitch, roll, yaw },
                movement: { x: roll, y: pitch },
              }));
            }
          }
        });
      } catch {
        console.warn('IMU characteristic not found, skipping');
      }

      setDeviceState(prev => ({
        ...prev,
        connected: true,
        deviceName: device.name || 'JOLT Band',
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
      await clickCharRef.current.writeValue(new TextEncoder().encode('1'));
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
      imu: { pitch: 0, roll: 0, yaw: 0 },
    }));
    gattServerRef.current = null;
    clickCharRef.current  = null;
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
    togglePower,
    triggerClick,
  };
}
