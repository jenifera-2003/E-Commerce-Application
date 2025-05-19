import React, { useEffect, useRef } from 'react';

const ParticleEffect = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Star properties
    const stars = [];
    const numStars = 200;
    const shootingStars = [];
    const maxShootingStars = 3;
    
   
    const starColors = ['#ffffff', '#fffde7', '#fff9c4', '#ffecb3', '#90caf9', '#e3f2fd', '#bbdefb'];
    
   
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        opacity: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * 0.1 + 0.01,
        pulseFactor: 0
      });
    }
    
    
    const createShootingStar = () => {
      if (shootingStars.length < maxShootingStars && Math.random() < 0.01) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height / 3;
        
        shootingStars.push({
          x: startX,
          y: startY,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 10 + 5,
          angle: Math.PI / 4 + (Math.random() * Math.PI / 4),
          opacity: 1
        });
      }
    };
    
    // Animation function
    const animate = () => {
      // Clear canvas with a semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update stars
      stars.forEach(star => {
        star.pulseFactor += star.pulse;
        const currentRadius = star.radius * (1 + 0.2 * Math.sin(star.pulseFactor));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity * (0.8 + 0.2 * Math.sin(star.pulseFactor));
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      
      // Create shooting stars occasionally
      createShootingStar();
      
      // Draw and update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        
        // Draw shooting star
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        ctx.stroke();
        
        // Update shooting star position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.01;
        
        // Remove if off-screen or faded out
        if (
          star.x < 0 ||
          star.x > canvas.width ||
          star.y < 0 ||
          star.y > canvas.height ||
          star.opacity <= 0
        ) {
          shootingStars.splice(i, 1);
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default ParticleEffect;