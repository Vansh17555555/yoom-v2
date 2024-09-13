import React, { useRef, useState, useEffect } from 'react';

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const startDrawing = (e: React.MouseEvent) => {
    if (ctx) {
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (isDrawing && ctx) {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (ctx) {
      setIsDrawing(false);
      ctx.closePath();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.strokeStyle = '#000000'; // Default stroke color
        context.lineWidth = 2; // Default line width
        setCtx(context);
      }
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid #000000', background: 'white' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button
        onClick={clearCanvas}
        style={{ position: 'absolute', top: '10px', left: '10px', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Clear
      </button>
    </div>
  );
};

export default Whiteboard;