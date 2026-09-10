'use client';
import { useEffect } from 'react';

export default function PortfolioPage() {
  useEffect(() => {
    window.location.replace('/#projects');
  }, []);
  return null;
}
