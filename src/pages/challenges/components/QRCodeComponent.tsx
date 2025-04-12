import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export const QRCodeComponent = ({ value }: { value: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, (error) => {
        if (error) console.error('Error generating QR code:', error);
      });
    }
  }, [value]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `qrcode-${value}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <canvas ref={canvasRef} />
      <button
        onClick={handleDownload}
        className="rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
      >
        Download
      </button>
    </div>
  );
};
